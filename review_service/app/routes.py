from fastapi import APIRouter, HTTPException, status
from app.models import Review
from app.database import insert_review, get_reviews, get_review_by_id, delete_review, update_review_in_db, get_reviews_by_appointment_id_list

router = APIRouter()

@router.post("/reviews", status_code=status.HTTP_201_CREATED)
async def create_review(review: Review):
    review_data = review.dict()
    result = await insert_review(review_data)  # Usando a função assíncrona de inserção
    return {"id": str(result.inserted_id), "message": "Review created successfully"}

@router.get("/reviews")
async def get_reviews_route():
    reviews = await get_reviews()  # Usando a função assíncrona para recuperar todos os reviews
    for review in reviews:
        review["_id"] = str(review["_id"])
    return reviews

@router.get("/reviews/{review_id}")
async def get_review(review_id: str):
    review = await get_review_by_id(review_id)  # Usando a função assíncrona para buscar um review
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review["_id"] = str(review["_id"])
    return review

@router.get("/reviews/apointment-ids/{id_list}")
async def get_reviews_by_ids_route(id_list: str):
    id_list = id_list.split(",")
    reviews = await get_reviews_by_appointment_id_list(id_list)
    for review in reviews:
        review["_id"] = str(review["_id"])
    return reviews

@router.delete("/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_review_route(review_id: str):
    result = await delete_review(review_id)  # Usando a função assíncrona para deletar um review
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")
    return {"message": "Review deleted successfully"}

@router.put("/reviews/{review_id}", status_code=status.HTTP_200_OK)
async def update_review(review_id: str, review: Review):
    review_data = review.dict(exclude_unset=True)  # Exclui campos não enviados

    result = await update_review_in_db(review_id, review_data)  # Função assíncrona para atualizar no DB

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Review not found")

    return {"message": "Review updated successfully"}