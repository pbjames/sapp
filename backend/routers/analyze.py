from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Report, User
from pydantic import BaseModel, Field
from datetime import datetime
from coin_model import get_input, predict
from ai import coin_summary, analyze_coin_and_image
from routers.users import get_current_user
from database import get_db
import json
import coins
import requests
import base64


router = APIRouter()

class CoinAnalyzeResponse(BaseModel):
    address: str
    predicted_roi: float
    summary: str
    created_at: datetime

# def ipfs_to_http(ipfs_uri: str, gateway: str = "https://ipfs.io/ipfs/") -> str:
#     if not ipfs_uri.startswith("ipfs://"):
#         raise ValueError(f"Invalid IPFS URI: {ipfs_uri}")
#     cid_or_path = ipfs_uri.replace("ipfs://", "")
#     return gateway + cid_or_path

@router.get("/{token_address}", response_model=List[CoinAnalyzeResponse])
def get_analyze_by_token_address(
    token_address: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get Token ROI Prediction and save it to user's reports.
    """
    coin_data = coins.get_coin(token_address)
    image_url = coin_data.mediaContent.previewImage.medium

    print(image_url)

    # response = requests.get(http_url)
    # response.raise_for_status()

    # image_bytes = response.content
    # encoded = base64.b64encode(image_bytes).decode("utf-8")

    response_text, summary_text, predicted_roi = analyze_coin_and_image(token_address, image_url)
    summary = response_text + summary_text
    
    # Create response object
    current_time = datetime.utcnow()
    response = CoinAnalyzeResponse(
        address=token_address,
        predicted_roi=predicted_roi,
        summary=summary,
        created_at=current_time,
    )
    
    # Prepare data for saving as a report
    report_content = {
        "address": response.address,
        "predicted_roi": response.predicted_roi,
        "summary": response.summary,
        "analyzed_at": response.created_at.isoformat()
    }
    
    # Create a new report
    new_report = Report(
        content=json.dumps(report_content),
        report_type="Coin Analysis",
        user_id=current_user.id
    )
    
    # Save to database
    db.add(new_report)
    db.commit()
    
    # Return the same response as before
    return [response]