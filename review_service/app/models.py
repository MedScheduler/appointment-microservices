from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

# Schema para validação e criação de Reviews
class Review(BaseModel):
    user_id: str = Field(..., description="ID do paciente")
    doctor_id: str = Field(..., description="ID do médico")
    appointment_id: str = Field(..., description="ID da consulta")
    rating: int = Field(..., ge=1, le=5, description="Nota de 1 a 5")
    comment: Optional[str] = Field(None, description="Comentário opcional")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
