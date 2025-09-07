# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from io import BytesIO
from openpyxl import load_workbook
from pathlib import Path

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["http://localhost:3000"],  # explicit origins only
    allow_credentials = True,                   # allow cookies/Authorization
    allow_methods     = ["GET","POST","PUT","DELETE","OPTIONS"],
    allow_headers     = ["Content-Type","Authorization"],
    expose_headers    = ["Content-Disposition"],   # e.g., for file downloads
    max_age           = 600,  # cache preflight (seconds)allow_origins = ["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("/sdwan")
async def sdwanConfig():
    print("in sdwan")
    template_path = Path("templates/Meraki ACD Default Config.xlsx")
    template_bytes = template_path.read_bytes()

    wb = load_workbook(BytesIO(template_bytes))

    out = BytesIO()
    wb.save(out)
    out.seek(0)
    filename = "test_template"

    return Response(
        content=out.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Cache-Control": "no-store",
        }
    )