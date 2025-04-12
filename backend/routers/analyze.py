from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Report, User
from pydantic import BaseModel, Field
from datetime import datetime
from coin_model import get_input, predict
from ai import coin_summary

router = APIRouter()

class CoinAnalyzeResponse(BaseModel):
    address: str
    predicted_roi: float
    summary: str
    created_at: datetime

@router.get("/{token_address}", response_model=List[CoinAnalyzeResponse])
def get_analyze_by_token_address(token_address: str, db: Session = Depends(get_db)):
    """
    Get Token ROI Prediction.
    """
    summary, predicted_roi = coin_summary(token_address)

    return [
        CoinAnalyzeResponse(
            address=token_address,
            predicted_roi=predicted_roi,
            summary=summary,
            created_at=datetime.utcnow(),
            
        )
    ]