# main.py
import os
from fastapi import FastAPI, HTTPException
import firebase_admin
from firebase_admin import credentials, db
from datetime import date

from pydantic import BaseModel, EmailStr, constr, condate

# cred_path = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
cred_path = "C:/Users/Chirath/Downloads/raylabs-804be-firebase-adminsdk-ciwuz-6f00e2e5b4.json"
cred = credentials.Certificate(cred_path)

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://raylabs-804be-default-rtdb.asia-southeast1.firebasedatabase.app/'
})

app = FastAPI()

@app.get('/')
async def root():
    return {'message': 'Hello World'}

class User(BaseModel):
    email: EmailStr  # Ensures the email is valid
    gender: str
    birthdate: str
    password: str

    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "gender": "male",
                "birthdate": "1990-01-01",
                "password": "securepassword123"
            }
        }

@app.post('/users')
async def create_user(user: User):
    ref = db.reference('users')
    ref.push({
        'email': user.email,
        'gender': user.gender,
        'birthdate': user.birthdate,
        'password': user.password
    })
    return user
