from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from app.models import Report, ReportInDB

# Conectando ao MongoDB
client = AsyncIOMotorClient("mongodb://mongo:27017/")  # Conectando ao MongoDB

# Escolhendo o banco de dados
db = client["report_db"]  # Banco de dados para relatórios

# Escolhendo a coleção
collection = db["report_service"]  # Coleção para relatórios


# Funções CRUD
async def create_report(report: Report) -> ReportInDB:
    result = await collection.insert_one(report.dict())
    return ReportInDB(**report.dict(), id=str(result.inserted_id))

async def get_report_by_id(report_id: str) -> ReportInDB:
    document = await collection.find_one({"_id": ObjectId(report_id)})
    if document:
        return ReportInDB(**document)
    return None

async def get_reports(skip: int, limit: int) -> list[ReportInDB]:
    cursor = collection.find().skip(skip).limit(limit)
    reports = await cursor.to_list(length=limit)
    
    # Converter _id para id em cada relatório
    for report in reports:
        report['id'] = str(report['_id'])  # Converte _id para string
        del report['_id']  # Remove o campo _id, já que agora usamos id
    
    return [ReportInDB(**report) for report in reports]

async def update_report(report_id: str, report: Report) -> ReportInDB:
    updated_document = await collection.find_one_and_update(
        {"_id": ObjectId(report_id)}, {"$set": report.dict()}, return_document=True
    )
    if updated_document:
        return ReportInDB(**updated_document)
    return None

async def delete_report(report_id: str) -> bool:
    result = await collection.delete_one({"_id": ObjectId(report_id)})
    return result.deleted_count > 0
