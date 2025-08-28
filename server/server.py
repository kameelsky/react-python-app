import os

import uvicorn
from api.auth.routes import router as auth_router
from api.tools.routes import router as tools_router
from api.admin.routes import router as admin_router
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))
SERVER_PORT = os.getenv("NEXT_PUBLIC_SERVER_PORT")
PRODUCTION = os.getenv("NEXT_PUBLIC_PRODUCTION")
PRODUCTION_SERVER_IP = os.getenv("NEXT_PUBLIC_PRODUCTION_SERVER_IP")
CLIENT_PORT = os.getenv("CLIENT_PORT")

if PRODUCTION == "True": origins = [f"http://{PRODUCTION_SERVER_IP}:{CLIENT_PORT}"]
else: origins = [f"http://localhost:{CLIENT_PORT}"]

Header = f'''
***
Production: {PRODUCTION}
CORS Origins: {", ".join(origins)}
***
'''
print(Header)

app = FastAPI(title="REST API", version="1.0.0", root_path="/api", docs_url="/docs", redoc_url="/redoc")
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth_router, prefix="/auth", tags=["authentication"], include_in_schema=False)
app.include_router(tools_router, prefix="/tools", tags=["tools"], include_in_schema=False)
app.include_router(admin_router, prefix="/admin", tags=["admin"], include_in_schema=True)

@app.get("/")
def home_page():
    return FileResponse("index.html")

if __name__ == "__main__":
    uvicorn.run("server:app", port=SERVER_PORT, reload=True)
