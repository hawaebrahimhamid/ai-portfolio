
from database import create_tables
from models import ContactMessage


def main():
    create_tables()
    print("Database tables created successfully.")
    print("Table ready: contact_messages")


if __name__ == "__main__":
    main()
