from pydantic import BaseModel, field_validator, ConfigDict
from bson import ObjectId
from typing import Optional
from datetime import datetime

# Função auxiliar para converter ObjectId para str
def str_object_id(v: ObjectId) -> str:
    return str(v) if v else None

class Report(BaseModel):
    doctor_id: str  # ID do médico que criou o relatório
    doctor_name: str  # Nome do médico
    patient_id: str  # ID do paciente
    patient_name: str  # Nome do paciente
    consultation_date: datetime  # Data da consulta
    diagnosis: str  # Diagnóstico feito pelo médico
    observations: Optional[str] = None  # Observações adicionais sobre a consulta

    # ConfigDict ao invés de Config para Pydantic v2.0
    model_config = ConfigDict(
        json_encoders={ObjectId: str_object_id}  # Converter ObjectId para string
    )
    
    # Usando field_validator em vez de @validator
    @field_validator('consultation_date')
    def check_consultation_date(cls, value):
        if isinstance(value, str):
            try:
                datetime.strptime(value, "%Y-%m-%dT%H:%M:%S")
            except ValueError:
                raise ValueError("Invalid date format. Please use 'YYYY-MM-DDTHH:MM:SS'")
        return value

class ReportInDB(Report):
    id: str  # Usando string para id, ao invés de ObjectId

    model_config = ConfigDict(
        arbitrary_types_allowed=True,  # Permite tipos arbitrários como ObjectId
        json_encoders={ObjectId: str_object_id}  # Converter ObjectId para string
    )