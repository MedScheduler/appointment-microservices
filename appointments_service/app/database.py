from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Conexão ao MongoDB
client = AsyncIOMotorClient("mongodb://localhost:27017/")
db = client["MedScheduler"]  # Banco de dados para o agendamento
collection = db["appointments_service"]  # Nome da coleção

# Função assíncrona para inserir um agendamento
async def insert_appointment(appointment_data):
    result = await collection.insert_one(appointment_data)
    return result

# Função assíncrona para buscar todos os agendamentos
async def get_appointments():
    appointments_cursor = collection.find()
    appointments = await appointments_cursor.to_list(length=100)
    return appointments

# Função assíncrona para buscar agendamento pelo ID
async def get_appointment_by_id(appointment_id):
    appointment = await collection.find_one({"_id": ObjectId(appointment_id)})
    return appointment

# Função assíncrona para deletar um agendamento
async def delete_appointment(appointment_id):
    result = await collection.delete_one({"_id": ObjectId(appointment_id)})
    return result

# Função assíncrona para atualizar o agendamento no MongoDB
async def update_appointment_in_db(appointment_id: str, appointment_data: dict):
    result = await collection.update_one(
        {"_id": ObjectId(appointment_id)},
        {"$set": appointment_data}
    )
    return result
