# import pandas as pd
# import glob

# csv_files = ["test_data.csv", "top_gainer.csv", "top_vol_24h.csv", "example_data_2.csv", "example_data_3.csv", "example_data.csv", "last_traded.csv"]
# df_list = [pd.read_csv(f) for f in csv_files]
# combined = pd.concat(df_list, ignore_index=True)

# unique_df = combined.drop_duplicates(subset="address", keep="first")

# unique_df.to_csv("data.csv", index=False)
import pandas as pd
import glob
import time
import requests
import numpy as np



# df = pd.read_csv("data_with_roi.csv")  # or whatever your combined CSV is called

# # Calculate ROI for each row
# roi_list = []
# count = 0
# for idx, row in df.iterrows():
#     if pd.notnull(row['roi']):
#         continue 

#     print(f"Processing {row['address']} ({idx + 1}/{len(df)})")

#     roi = calculate_roi(row)  # current_price is fetched inside the function
#     df.at[idx, 'roi'] = roi

#     count += 1
#     if count % 14 == 0:
#         time.sleep(60)

# # Add ROI column
# # df["roi"] = roi_list

# # Save to a new CSV
# df.to_csv("data_with_roi_updated.csv", index=False)

# df = pd.read_csv("data_with_roi_updated.csv")

# # Extract known ROI values
# real_roi = df["roi"].dropna()

# # Fill missing ROI values by sampling
# num_missing = df["roi"].isna().sum()
# synthetic_rois = np.random.choice(real_roi, size=num_missing, replace=True)

# # Assign synthetic ROIs to NaNs
# df.loc[df["roi"].isna(), "roi"] = synthetic_rois

# # Save
# df.to_csv("data_with_synthetic_roi_2.csv", index=False)



# print(get_current_price('0x1B77C87e078B4586DE4cA81AAA388A2Ab9Cb0849'))
# pool_address = get_pool_address('0x1B77C87e078B4586DE4cA81AAA388A2Ab9Cb0849')
# print(pool_address)
# ohlc_time, ohlc_price = get_price_hours_ago(pool_address, 8)

# print(ohlc_time)
# print(ohlc_price)


# csv_files = ["test_data.csv", "top_gainer.csv", "top_vol_24h.csv", "example_data_2.csv", "example_data_3.csv", "example_data.csv", "last_traded.csv"]
# df_list = [pd.read_csv(f) for f in csv_files]
# combined = pd.concat(df_list, ignore_index=True)

# unique_df = combined.drop_duplicates(subset="address", keep="first")

# roi_list = []
# for idx, row in unique_df.iterrows():
#     address = row["address"]
#     current_price = get_current_price(address)
#     roi = calculate_roi(row, current_price)
#     roi_list.append(roi)
#     time.sleep(1.2)  # To avoid being rate-limited by Gecko

# unique_df["roi"] = roi_list

# # Step 4: Save final dataset
# unique_df.to_csv("data_with_roi.csv", index=False)

# df = pd.read_csv("dataset.csv")

# sentimental_value = []
# count = 0

# for idx, row in df.iterrows():
#     if pd.notnull(row['roi']):
#         continue 

#     print(f"Processing {row['address']} ({idx + 1}/{len(df)})")

#     roi = calculate_roi(row)  # current_price is fetched inside the function
#     df.at[idx, 'roi'] = roi

#     count += 1
#     if count % 14 == 0:
#         time.sleep(60)

# Add ROI column
# df["roi"] = roi_list
