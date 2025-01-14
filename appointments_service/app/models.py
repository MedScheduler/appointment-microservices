from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class Appointment(BaseModel):
    user_id: str = Field(..., description="ID do usuário que agendou")
    service_id: str = Field(..., description="ID do serviço")
    date: datetime = Field(..., description="Data do agendamento (inclui data e hora)")
    status: str = Field(default="Aguardando Confirmação", description="Status do agendamento")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
 