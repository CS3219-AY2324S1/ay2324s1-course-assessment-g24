from core.config import settings  # Assuming you have a settings file

DATABASE_URL = settings.DATABASE_URL  # Adjust as needed
DATABASE_NAME = settings.DATABASE_NAME  # Adjust as needed

DATABASE_URL_WITH_DB = f"{DATABASE_URL}/{DATABASE_NAME}"
