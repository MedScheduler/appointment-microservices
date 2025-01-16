from fastapi import APIRouter, HTTPException
from app.models import Report, ReportInDB
from app.database import create_report, get_report_by_id, get_reports, update_report, delete_report

router = APIRouter()

# Criar um novo relatório
@router.post("/reports", response_model=ReportInDB, status_code=201)
async def create_report_route(report: Report):
    created_report = await create_report(report)
    return created_report

# Obter todos os relatórios
@router.get("/reports", response_model=list[ReportInDB])
async def get_reports_route(skip: int = 0, limit: int = 10):
    reports = await get_reports(skip, limit)
    return reports

# Obter um relatório por ID
@router.get("/reports/{report_id}", response_model=ReportInDB)
async def get_report_by_id_route(report_id: str):
    report = await get_report_by_id(report_id)
    if report:
        return report
    raise HTTPException(status_code=404, detail="Report not found")

# Atualizar um relatório por ID
@router.put("/reports/{report_id}", response_model=ReportInDB)
async def update_report_route(report_id: str, report: Report):
    updated_report = await update_report(report_id, report)
    if updated_report:
        return updated_report
    raise HTTPException(status_code=404, detail="Report not found")

# Deletar um relatório por ID
@router.delete("/reports/{report_id}", status_code=204)
async def delete_report_route(report_id: str):
    success = await delete_report(report_id)
    if not success:
        raise HTTPException(status_code=404, detail="Report not found")
