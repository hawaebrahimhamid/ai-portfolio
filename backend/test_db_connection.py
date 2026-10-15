
from sqlalchemy import text

from database import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT current_database()"))
        print("Connected to database:", result.scalar_one())

except Exception as error:
    print("Database connection failed.")
    print("Error type:", type(error).__name__)
    print("Details:", error)
