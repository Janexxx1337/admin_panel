from fastapi import FastAPI
from app.admin import app as admin_app
from app.users import app as users_app

main_app = FastAPI()

# Включение маршрутов из admin и users приложений
main_app.mount("/admin", admin_app)
main_app.mount("/", users_app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(main_app, host="0.0.0.0", port=8000)
