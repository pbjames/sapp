import coins
import pandas as pd
import time
import requests
import joblib
import os
from transformers import pipeline
from datetime import datetime, timezone
from sklearn.model_selection import train_test_split
from sklearn.metrics import root_mean_squared_error, r2_score
from sklearn.svm import SVR
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.impute import SimpleImputer

def get_current_price(token_address: str) -> float | None:
    url = f"https://api.geckoterminal.com/api/v2/networks/base/tokens/{token_address}"
    try:
        res = requests.get(url)
        if res.status_code != 200:
            return None
        data = res.json()
        return float(data["data"]["attributes"]["price_usd"])
    except Exception as e:
        print(f"Price fetch failed for {token_address}: {e}")
        return None

def get_pool_address(token_address: str):
    url = f"https://api.dexscreener.com/token-pairs/v1/base/{token_address}"
    try:
        res = requests.get(url)
        if res.status_code != 200:
            return None
        data = res.json()
        return data[0]['pairAddress']
    except Exception as e:
        print(f"Price fetch failed for {token_address}: {e}")
        return None

def get_price_hours_ago(token_address: str, hours_ago: int = 9) -> float | None:
    now = int(time.time())
    from_ts = now - (hours_ago + 1) * 3600
    to_ts = now - hours_ago * 3600

    url = f"https://api.geckoterminal.com/api/v2/networks/base/pools/{token_address}/ohlcv/hour"

    print(url)
    params = {
        'limit': 10
    }

    try:
        res = requests.get(url)

        if res.status_code != 200:
            print(f"Error fetching OHLC data: {res.status_code}")
            return None
        
        data = res.json()
        ohlc_list = data['data']['attributes']['ohlcv_list'][8]
        ohlc_time = ohlc_list[0]
        ohlc_price = ohlc_list[4]
        
        return ohlc_time, ohlc_price

    except Exception as e:
        print(f"Failed to get OHLC price for {token_address}: {e}")
        return None
    
def calculate_roi(row) -> float | None:
    try:
        address = row['address']
        current_price = get_current_price(address)
        pool_address = get_pool_address(address)
        _, ohlc_price = get_price_hours_ago(pool_address)

        return current_price / ohlc_price - 1

    except:
        return None

def sentimental_analysis(comments):
    if not comments:
        return 0.0
    
    pipe = pipeline("text-classification", model="tabularisai/multilingual-sentiment-analysis")
    total_score = 0

    for comment in comments:
        res = pipe(comment)
        score = res[0]['score']
        total_score += score

    avg_score = total_score / len(comments)
    print(avg_score)

    return avg_score

def get_days_since_created(created_at_str: str):
    created_at = datetime.strptime(created_at_str, "%Y-%m-%dT%H:%M:%S").replace(tzinfo=timezone.utc)
    now = datetime.now(timezone.utc)
    delta = now - created_at
    return delta.days

def calculate_roi(token):
    try:
        market_cap = float(token.marketCap)
        total_supply = float(token.totalSupply)
        current_price = market_cap / total_supply

        if token.creatorEarnings and float(token.totalSupply) > 0:
            creator_earnings = float(token.creatorEarnings[0].amount.amountDecimal)
            mint_price = creator_earnings / float(token.totalSupply)
        else:
            mint_price = current_price

        roi = (current_price - mint_price) / mint_price
        return roi

    except Exception as e:
        print(f"ROI calculation failed for {token.address}: {e}")
        return None

def construct_dataset():
    cursor = None
    collected_tokens = 0
    max_tokens = 200
    page_size = 100
    data = []

    while collected_tokens < max_tokens:
        res = coins.explore(count=page_size, list_type="TOP_VOLUME_24H", cursor=cursor)
        time.sleep(5)


        for edge in res.exploreList.edges:
            token = edge.node
            print(token)
            print(f"Processing token: {token.name} ({token.address})")

            if token.zoraComments and token.zoraComments.edges:
                comments = [ZoraCommentEdge.node.comment for ZoraCommentEdge in token.zoraComments.edges]
            else:
                comments = []

            comments_sentimental_score = sentimental_analysis(comments)

            earnings = token.creatorEarnings[0].amount.amountDecimal if token.creatorEarnings else 0.0
            days_since_created = get_days_since_created(token.createdAt)

            record = {
                "address": token.address,
                "total_supply": token.totalSupply,
                "volume_24h": token.volume24h,
                "total_volume": token.totalVolume,
                "market_cap": token.marketCap,
                "market_cap_change_24h": token.marketCapDelta24h,
                "creator_earnings": earnings,
                "days_since_created": days_since_created,
                "unique_holders": token.uniqueHolders,
                "transfers": token.transfers.count,
                "comments_sentimental_score": comments_sentimental_score,
            }

            data.append(record)
            collected_tokens += 1
            if collected_tokens >= max_tokens:
                break

        if res.exploreList.pageInfo.hasNextPage:
            cursor = res.exploreList.pageInfo.endCursor
        else:
            break

    df = pd.DataFrame(data)
    df.to_csv('top_vol_24h.csv', index=False)

def add_sentiment(csv):
    df = pd.read_csv('dataset.csv')

    failed_addresses = []

    for idx, row in df.iterrows():
        try:
            if row["comments_sentimental_score"] == 0:
                print(f"Processing: {row['address']} ({idx + 1}/{len(df)})")
                token = coins.get_coin(row['address'])

                if not token.zoraComments or not token.zoraComments.edges:
                    print("No comments, skipping.")
                    continue

                comments = [edge.node.comment for edge in token.zoraComments.edges]
                new_score = sentimental_analysis(comments)
                df.at[idx, "comments_sentimental_score"] = new_score

                time.sleep(2)
        except Exception as e:
            failed_addresses.append(row['address'])

    df.to_csv("updated_sentiment.csv", index=False)

    if failed_addresses:
        with open("failed_sentiment_addresses.txt", "w") as f:
            for addr in failed_addresses:
                f.write(addr + "\n")

def data_preprocessing(df):
    df = df[df['roi'].notnull()]
    df = df.drop(columns=["address"], errors="ignore") 

    X = df.drop(columns=["roi"])
    y = df["roi"]

    return X, y

def grid_search(X, y):
    imputer = SimpleImputer(strategy="mean")
    X_imputed = imputer.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.2, random_state=42)

    pipeline = make_pipeline(StandardScaler(), SVR())
    param_grid = {
        "svr__C": [0.1, 1, 10, 100],
        "svr__epsilon": [0.01, 0.1, 0.2],
        "svr__kernel": ["linear", "rbf"]
    }

    grid = GridSearchCV(pipeline, param_grid, scoring="r2", cv=5, verbose=1, n_jobs=-1)
    grid.fit(X_train, y_train)

    print("Best Parameters:", grid.best_params_)
    print("Best CV R² Score:", grid.best_score_)

    best_model = grid.best_estimator_
    y_pred = best_model.predict(X_test)

    print("Test R² Score:", r2_score(y_test, y_pred))
    print("Test RMSE:", root_mean_squared_error(y_test, y_pred))

def train_model(X, y): 
    imputer = SimpleImputer(strategy="mean")
    X_imputed = imputer.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X_imputed, y, test_size=0.2, random_state=42)
    model = make_pipeline(StandardScaler(), SVR(kernel='rbf', C=1, epsilon=0.01))
    model.fit(X_train, y_train)

    joblib.dump(model, "svr_best_model.pkl")

def get_input(address):
    token = coins.get_coin(address)

    if token.zoraComments and token.zoraComments.edges:
        comments = [ZoraCommentEdge.node.comment for ZoraCommentEdge in token.zoraComments.edges]
    else:
        comments = []

    comments_sentimental_score = sentimental_analysis(comments)

    earnings = token.creatorEarnings[0].amount.amountDecimal if token.creatorEarnings else 0.0
    days_since_created = get_days_since_created(token.createdAt)

    record = {
                "address": address,
                "total_supply": token.totalSupply,
                "volume_24h": token.volume24h,
                "total_volume": token.totalVolume,
                "market_cap": token.marketCap,
                "market_cap_change_24h": token.marketCapDelta24h,
                "creator_earnings": earnings,
                "days_since_created": days_since_created,
                "unique_holders": token.uniqueHolders,
                "transfers": token.transfers.count,
                "comments_sentimental_score": comments_sentimental_score,
            }
    
    df = pd.DataFrame([record])

    return df

def predict(data: pd.DataFrame):
    X = data.drop(columns=["address"], errors="ignore")

    if not os.path.exists('svr_best_model.pkl'):
        print("Model not found. Training new model...")
        df = pd.read_csv("dataset/complete_dataset.csv")
        X_train, y_train = data_preprocessing(df)
        trained_model = train_model(X_train, y_train)
        joblib.dump(trained_model, "svr_best_model.pkl")

    pipeline = joblib.load("svr_best_model.pkl")
    
    predictions = pipeline.predict(X)
    return predictions

# input = get_input('')
# print(input)
# print("Predicted ROI:", predict(input))


