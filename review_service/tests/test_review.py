import sys
import os

# Adicionando o diretório raiz ao caminho de importação
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import pytest
from datetime import datetime
from app.models import Review  # Assumindo que seu modelo está no diretório app.models

# Teste básico para criação de uma avaliação (Review)
def test_create_review():
    # Criação de uma instância de Review com dados fictícios
    review = Review(
        user_id="patient123",  # Adicionando o user_id
        doctor_id="doctor123",
        appointment_id="appointment123",  # Adicionando o appointment_id
        rating=4,  # Agora um inteiro dentro do intervalo de 1 a 5
        comment="Great doctor, highly recommend!",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    # Verificando se os dados foram atribuídos corretamente
    assert review.user_id == "patient123"
    assert review.doctor_id == "doctor123"
    assert review.appointment_id == "appointment123"
    assert review.rating == 4
    assert review.comment == "Great doctor, highly recommend!"
    assert review.created_at is not None
    assert review.updated_at is not None

# Teste de valores padrão
def test_default_values():
    # Criação de uma instância de Review sem fornecer valores de created_at, updated_at
    review = Review(
        user_id="patient456",  # Adicionando o user_id
        doctor_id="doctor789",
        appointment_id="appointment101",  # Adicionando o appointment_id
        rating=5,  # Nota válida
        comment="Excellent care!"
    )

    # Verificando se os valores padrões de created_at e updated_at foram atribuídos corretamente
    assert review.created_at is not None
    assert review.updated_at is not None

def test_invalid_data():
    with pytest.raises(ValueError):  # Esperamos que lance um ValueError se o tipo de dado estiver errado
        Review(
            user_id="patient123",
            doctor_id="doctor456",
            appointment_id="appointment789",
            rating="invalid_rating",  # Tipo inválido, deve lançar um erro
            comment="Great doctor!",
            created_at="invalid_date"  # Data inválida, deve lançar um erro
        )

    with pytest.raises(ValueError):  # Esperamos que lance um ValueError se a classificação for inválida
        Review(
            user_id="patient123",
            doctor_id="doctor456",
            appointment_id="appointment789",
            rating=6,  # Classificação inválida, deve estar entre 1 e 5
            comment="Great doctor!",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
