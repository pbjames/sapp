from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Report, User
from pydantic import BaseModel, Field
from datetime import datetime
from coin_model import get_input, predict

router = APIRouter()

class CoinAnalyzeResponse(BaseModel):
    address: str
    predicted_roi: float
    created_at: datetime

@router.get("/{token_address}", response_model=List[CoinAnalyzeResponse])
def get_predicted_roi_by_token_address(token_address: str, db: Session = Depends(get_db)):
    """
    Get Token ROI Prediction.
    """
    input_df = get_input(token_address)
    predicted_roi = predict(input_df)

    return [
        CoinAnalyzeResponse(
            address=token_address,
            predicted_roi=predicted_roi[0],
            created_at=datetime.utcnow()
        )
    ]