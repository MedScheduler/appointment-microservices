from fastapi import APIRouter, HTTPException, status
from app.models import Appointment
from app.database import (
    insert_appointment, get_appointments, get_appointment_by_id, delete_appointment, update_appointment_in_db
)
from bson import ObjectId

router = APIRouter()

# Criar agendamento
@router.post("/appointments", status_code=status.HTTP_201_CREATED)
async def create_appointment(appointment: Appointment):
    appointment_data = appointment.dict()
    result = await insert_appointment(appointment_data)
    return {"id": str(result.inserted_id), "message": "Appointment created successfully"}

# Listar agendamentos
@router.get("/appointments")
async def get_appointments_route():
    appointments = await get_appointments()
    for appointment in appointments:
        appointment["_id"] = str(appointment["_id"])
    return appointments

# Buscar agendamento por ID
@router.get("/appointments/{appointment_id}")
async def get_appointment(appointment_id: str):
    appointment = await get_appointment_by_id(appointment_id)
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    appointment["_id"] = str(appointment["_id"])
    return appointment

# Deletar agendamento
@router.delete("/appointments/{appointment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_appointment_route(appointment_id: str):
    result = await delete_appointment(appointment_id)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment deleted successfully"}

# Atualizar agendamento
@router.put("/appointments/{appointment_id}", status_code=status.HTTP_200_OK)
async def update_appointment(appointment_id: str, appointment: Appointment):
    appointment_data = appointment.dict(exclude_unset=True)
    result = await update_appointment_in_db(appointment_id, appointment_data)
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment updated successfully"}
