from fastapi import FastAPI
from app.routes import router

app = FastAPI()

# Incluindo as rotas com prefixo e tags
app.include_router(router, prefix="/api/v1", tags=["Reports"])

@app.get("/")
def root():
    return {"message": "Report Service is Running!"}
