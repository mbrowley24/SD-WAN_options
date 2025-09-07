# main.py
from fastapi import FastAPI
from fastapi.responses import Response
from io import BytesIO
from openpyxl import load_workbook
from pathlib import Path

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("")
async def sdwanConfig():
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
        header={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Cache-Control": "no-store",
        }
    )