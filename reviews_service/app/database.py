from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Conectando ao MongoDB
client = AsyncIOMotorClient("mongodb://localhost:27017/")  # Ajuste a URI se necessário

# Escolhendo o banco de dados
db = client["MedScheduler"]  # Substitua pelo nome do seu banco

# Escolhendo uma coleção
collection = db["reviews_service"]  # Substitua pelo nome da sua coleção

# Função assíncrona para inserir um documento
async def insert_review(review_data):
    result = await collection.insert_one(review_data)
    return result

# Função assíncrona para buscar todos os documentos
async def get_reviews():
    reviews_cursor = collection.find()
    reviews = await reviews_cursor.to_list(length=100)
    return reviews

# Função assíncrona para buscar um documento pelo ID
async def get_review_by_id(review_id):
    review = await collection.find_one({"_id": ObjectId(review_id)})
    return review

# Função assíncrona para deletar um documento
async def delete_review(review_id):
    result = await collection.delete_one({"_id": ObjectId(review_id)})
    return result

# Função assíncrona para atualizar o review no MongoDB
async def update_review_in_db(review_id: str, review_data: dict):
    result = await collection.update_one(
        {"_id": ObjectId(review_id)},  # Encontra o review pelo ID
        {"$set": review_data}          # Atualiza os dados do review
    )
    return result