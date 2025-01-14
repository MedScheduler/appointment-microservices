from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Conectando ao MongoDB
client = AsyncIOMotorClient("mongodb://localhost:27017/")  # Ajuste a URI se necessário

# Escolhendo o banco de dados
db = client["MedScheduler"]  # Substitua pelo nome do seu banco

# Escolhendo uma coleção para disponibilidade
availability_collection = db["doctor_availability"]  # Coleção de disponibilidade de médicos


# Função assíncrona para inserir a disponibilidade
async def insert_availability(availability_data):
    result = await availability_collection.insert_one(availability_data)
    return result

# Função assíncrona para buscar todas as disponibilidades
async def get_availabilities():
    availability_cursor = availability_collection.find()
    availabilities = await availability_cursor.to_list(length=100)
    return availabilities

# Função assíncrona para buscar a disponibilidade por ID
async def get_availability_by_id(availability_id):
    availability = await availability_collection.find_one({"_id": ObjectId(availability_id)})
    return availability

# Função assíncrona para deletar a disponibilidade
async def delete_availability(availability_id):
    result = await availability_collection.delete_one({"_id": ObjectId(availability_id)})
    return result

# Função assíncrona para atualizar a disponibilidade
async def update_availability_in_db(availability_id: str, availability_data: dict):
    result = await availability_collection.update_one(
        {"_id": ObjectId(availability_id)},
        {"$set": availability_data}
    )
    return result
