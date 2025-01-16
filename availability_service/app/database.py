from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Conectando ao MongoDB
client = AsyncIOMotorClient("mongodb://mongo:27017/")  # Conectando ao MongoDB

# Escolhendo o banco de dados
db = client["availability_db"]  # Banco de dados para disponibilidade

# Escolhendo a coleção
collection = db["availability_service"]  # Coleção para disponibilidade

# Função assíncrona para inserir a disponibilidade
async def insert_availability(availability_data):
    result = await collection.insert_one(availability_data)
    return result

# Função assíncrona para buscar todas as disponibilidades
async def get_availabilities():
    availability_cursor = collection.find()
    availabilities = await availability_cursor.to_list(length=100)
    return availabilities

# Função assíncrona para buscar a disponibilidade por ID
async def get_availability_by_id(availability_id):
    availability = await collection.find_one({"_id": ObjectId(availability_id)})
    return availability

# Função assíncrona para deletar a disponibilidade
async def delete_availability(availability_id):
    result = await collection.delete_one({"_id": ObjectId(availability_id)})
    return result

# Função assíncrona para atualizar a disponibilidade
async def update_availability_in_db(availability_id: str, availability_data: dict):
    result = await collection.update_one(
        {"_id": ObjectId(availability_id)},
        {"$set": availability_data}
    )
    return result
