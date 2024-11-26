from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sockets import sio_app
import uvicorn

app =  FastAPI()


app.mount('/', app= sio_app)



app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_credentials = True, 
    allow_methods = ['*'],
    allow_headers = ['*'],
)

