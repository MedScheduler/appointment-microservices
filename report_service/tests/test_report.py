import sys
import os
from pydantic import ValidationError, field_validator
from datetime import datetime

# Adicionando o diretório raiz ao caminho de importação
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import pytest
from app.models import Report  # Assumindo que seu modelo está no diretório app.models

# Teste de validação de dados (erro de tipo)
def test_invalid_data():
    # Testando data inválida
    with pytest.raises(ValidationError):  
        Report(
            doctor_id="doctor123",
            doctor_name="Dr. Smith",
            patient_id="patient456",
            patient_name="John Doe",
            consultation_date="invalid-date",  # Data inválida, deve lançar um erro
            diagnosis="Healthy",
            observations="No further issues."
        )
    
    # Testando tipo inválido para observations
    with pytest.raises(ValidationError):  
        Report(
            doctor_id="doctor123",
            doctor_name="Dr. Smith",
            patient_id="patient456",
            patient_name="John Doe",
            consultation_date="2025-01-17T09:30:00",
            diagnosis="Healthy",
            observations=12345  # Tipo inválido para observations, deve ser string
        )
