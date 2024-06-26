from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.admin import app as admin_app
from app.users import app as users_app
from app.deposits import app as deposits_app

main_app = FastAPI()

# Настройка CORS для основного приложения
origins = [
    "http://localhost:5174",  # Добавьте все допустимые источники
    "http://localhost:8000",
]

main_app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Включение маршрутов из admin, users и deposits приложений
main_app.mount("/admin", admin_app)
main_app.mount("/users", users_app)
main_app.mount("/deposits", deposits_app)

print("Mounted routes in main_app:")
for route in main_app.routes:
    print(f"Path: {route.path}, Name: {route.name}")

print("Mounted routes in users_app:")
for route in users_app.routes:
    print(f"Path: {route.path}, Name: {route.name}")

print("Mounted routes in deposits_app:")
for route in deposits_app.routes:
    print(f"Path: {route.path}, Name: {route.name}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(main_app, host="0.0.0.0", port=8000)
