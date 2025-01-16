from fastapi import FastAPI
from app.routes import router

app = FastAPI()

# Incluindo os endpoints
app.include_router(router, prefix="/api/v1", tags=["Reviews"])

@app.get("/")
def root():
    return {"message": "Review Service is Running!"}