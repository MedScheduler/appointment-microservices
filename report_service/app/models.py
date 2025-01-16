from pydantic import BaseModel
from bson import ObjectId
from typing import Optional

# Função auxiliar para converter ObjectId para str
def str_object_id(v: ObjectId) -> str:
    return str(v) if v else None

class Report(BaseModel):
    doctor_id: str  # ID do médico que criou o relatório
    doctor_name: str  # Nome do médico
    patient_id: str  # ID do paciente
    patient_name: str  # Nome do paciente
    consultation_date: str  # Data da consulta
    diagnosis: str  # Diagnóstico feito pelo médico
    observations: Optional[str] = None  # Observações adicionais sobre a consulta

    class Config:
        json_encoders = {
            ObjectId: str_object_id  # Converter ObjectId para string
        }

class ReportInDB(Report):
    id: str  # Usando string para id, ao invés de ObjectId

    class Config:
        arbitrary_types_allowed = True  # Permite tipos arbitrários como ObjectId
        json_encoders = {
            ObjectId: str_object_id  # Converter ObjectId para string
        }
