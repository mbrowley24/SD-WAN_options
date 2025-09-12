# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from io import BytesIO
from openpyxl import load_workbook
from pathlib import Path
from services import workbook, configData

production = "https://whale-app-dwbzw.ondigitalocean.app"
test = "http://localhost:3000"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],  # explicit origins only
    allow_credentials = False,   # allow cookies/Authorization
    allow_methods     = [""],
    allow_headers     = ["*"],
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
async def sdwanConfigre(req: Request):
    
    data = await req.json()
    columns = ["A", "B", "C", "D", "E", "F", "G"]
    topology_rows = [17, 18, 19, 20, 21, 22]

    template_path = Path("templates/Meraki ACD Default Config.xlsx")
    template_bytes = template_path.read_bytes()

    wb = load_workbook(BytesIO(template_bytes))
 
    ws = wb["Network"]
    topology = data['topology']

    row = 17
    for mxTop in topology:
        print(mxTop)
            
        ws[f'A{row}'] = mxTop['size']
        ws[f'B{row}'] = mxTop['hostname']
        ws[f'C{row}'] = mxTop['ha']
        ws[f'D{row}'] = mxTop['topology']
        ws[f'E{row}'] = mxTop['utm']
        ws[f'F{row}'] = mxTop['lan_routing']
        


    out = BytesIO()
    wb.save(out)
    out.seek(0)
    filename = filename = f'{data["hostname"]}-mx-config-template'

    return Response(
        content=out.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Cache-Control": "no-store",
        }
    )

@app.post("/single-site")
async def sdwanConfigreOneMXOneVlan(req: Request):
    
    data = await req.json()

    template_path = Path("templates/Meraki ACD Default Config.xlsx")
    template_bytes = template_path.read_bytes()

    wb = load_workbook(BytesIO(template_bytes))

    content_categories = configData.CATEGORY_TO_ROW
    block_lists        = configData.BLOCKLISTS_FULLNAMES

    wbService = workbook.workbook(wb=wb, categories=content_categories, block_lists=block_lists)

    wbService.singleSiteOneNetwork(data=data)
    wbService.moderateContentFilterSBS(data['business_type'])

    
    
    out = BytesIO()
    wb.save(out)
    out.seek(0)
    filename = f'{data["hostname"]}-mx-config-template.xlsx'
    
    return Response(
        content=out.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}; filename*=UTF-8''{quote(filename)}',
            "Cache-Control": "no-store",
        }
    )
