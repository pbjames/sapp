from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Report, User
from pydantic import BaseModel, Field
from datetime import datetime
from coin_model import get_input, predict
from ai import coin_summary
from routers.users import get_current_user
import json

router = APIRouter()

class CoinAnalyzeResponse(BaseModel):
    address: str
    predicted_roi: float
    summary: str
    created_at: datetime

@router.get("/{token_address}", response_model=List[CoinAnalyzeResponse])
def get_analyze_by_token_address(
    token_address: str, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get Token ROI Prediction and save it to user's reports.
    """
    summary, predicted_roi = coin_summary(token_address)
    
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