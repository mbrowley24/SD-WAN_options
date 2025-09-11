# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from io import BytesIO
from openpyxl import load_workbook
from pathlib import Path

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["*"],  # explicit origins only
    allow_credentials = False,                   # allow cookies/Authorization
    allow_methods     = ["*"],
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
    filename = "test_template"

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
    columns = ["A", "B", "C", "D", "E", "F", "G"]
    topology_rows = [17, 18, 19, 20, 21, 22]
    print(data)
    template_path = Path("templates/Meraki ACD Default Config.xlsx")
    template_bytes = template_path.read_bytes()

    wb = load_workbook(BytesIO(template_bytes))
    
    ws = wb["Network"]
    print(data['customerName'] )
    ws["B8"]   = data['customerName']     
    ws["B12"]  = data["address"]
    
    ws["A17"]  = data['size']
    ws["B17"]  = data["hostname"]
    ws["C17"]  = "No"
    ws["D17"]  = "hub"
    ws["E17"]  = "yes"
    ws["F17"]  = "static"
    ws["A25"]  = data["hostname"]
    ws["B25"]  = "WAN1"
    ws["C25"]  = data["provider"]
    ws["D25"]  = data["ipAssignment"]
    ws["E25"]  = data["network"]
    ws["F25"]  = data["gateway"]
    ws['G25']  = data["description"]
    ws["A49"]  = data["hostname"]
    ws['B49']  = "LAN1"
    ws["C49"]  = "data"
    ws["D49"]  = "1"
    ws["E49"]  = "10.0.0.0/24"
    ws["F49"]  = "10.0.0.1"
    ws["G49"]  = "internal"
    ws["A58"]  = data["hostname"]
    ws["B58"]  = "1"
    ws["C58"]  = "8.8.8.8"
    ws["D58"]  = "75.75.75.75"
    ws["G58"]  = "10.0.0.2-10.0.0.240"
    ws["A66"]  = data["hostname"]
    ws["B66"]  = "1"
    ws["C66"]  = "10.0.0.1"
    
    out = BytesIO()
    wb.save(out)
    out.seek(0)
    filename = f'{data["hostname"]}-mx-config-template'

    return Response(
        content=out.getvalue(),
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
            "Cache-Control": "no-store",
        }
    )
