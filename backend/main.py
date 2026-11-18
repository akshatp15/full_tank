from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import fills, auth

# Creating FastAPI object
app = FastAPI()

# Setting up middleware, allows requests to backend from any site 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["GET", "PUT", "POST", "DELETE"],
    allow_headers=["*"],
)

# App uses the routers located inside the games.py and auth.py files
app.include_router(fills.router)
app.include_router(auth.router)
