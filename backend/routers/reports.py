from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional, Union
from database import get_db
from models import Report, User
from pydantic import BaseModel, Field
from datetime import datetime
from routers.users import get_current_user

router = APIRouter()

class ReportResponse(BaseModel):
    id: int
    content: str
    report_type: str
    user_id: int
    image_data: Optional[str] = None  # Optional base64 encoded image, properly typed to accept None
    created_at: datetime


class ReportCreate(BaseModel):
    content: str = Field(..., description="The LLM-generated content for the report")
    report_type: str = Field(..., description="The type of report")
    image_data: Optional[str] = None  # Optional base64 encoded image

@router.get("/", response_model=List[ReportResponse])
def get_reports_by_wallet(current_user: User = Depends(get_current_user)):
    """
    Get all reports for the authenticated user.
    """
    # Directly access reports from the authenticated user
    return [
        {
            "id": report.id,
            "content": report.content,
            "report_type": report.report_type,
            "image_data": report.image_data,  # No need for conditional, Optional[str] handles None values
            "user_id": report.user_id,
            "created_at": report.created_at,
        } for report in current_user.reports
    ]

@router.get("/{report_id}", response_model=ReportResponse)
def get_report_by_id(report_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """
    Get a specific report by its ID for the authenticated user.
    """
    # Find the report by ID
    report = db.query(Report).filter(Report.id == report_id, Report.user_id == current_user.id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found or not authorized")

    return {
        "id": report.id,
        "content": report.content,
        "report_type": report.report_type,
        "image_data": report.image_data,  # No need for conditional, Optional[str] handles None values
        "user_id": report.user_id,
        "created_at": report.created_at,
    }


#This logic is going to be used when we generate reports for the user to automatically post to their database
@router.post("/report/{wallet_address}", response_model=ReportResponse, status_code=status.HTTP_201_CREATED)
def create_report(wallet_address: str, report_data: ReportCreate, db: Session = Depends(get_db)):
    """
    Create a new report for a user based on their wallet address.
    """
    # Find the user by wallet address
    user = db.query(User).filter(User.wallet_address == wallet_address).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create a new report instance
    new_report = Report(
        content=report_data.content,
        report_type=report_data.report_type,
        image_data=report_data.image_data,
        user_id=user.id
    )
    
    # Add to database and commit
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    
    return new_report

