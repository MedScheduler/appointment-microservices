from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId

# Conectando ao MongoDB
client = AsyncIOMotorClient("mongodb://mongo:27017/")  # Conectando ao MongoDB

# Escolhendo o banco de dados
db = client["review_db"]  # Banco de dados para reviews

# Escolhendo a coleção
collection = db["reviews_service"]  # Coleção para reviews

# Função assíncrona para inserir um documento
async def insert_review(review_data):
    result = await collection.insert_one(review_data)
    return result

# Função assíncrona para buscar todos os documentos
async def get_reviews():
    reviews_cursor = collection.find()
    reviews = await reviews_cursor.to_list(length=100)
    return reviews

# Função assíncrona para buscar todos os documentos
async def get_reviews_by_appointment_id_list(id_list):
    reviews_cursor = collection.find({"appointment_id": {"$in": id_list}}, {"rating": 1, "comment": 1, "appointment_id": 1})
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