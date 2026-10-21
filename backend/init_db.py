
from database import create_tables
from models import ContactMessage, PortfolioKnowledge


def main():
    create_tables()
    print("Database tables checked/created successfully.")
    print("Table ready: contact_messages")
    print("Table ready: portfolio_knowledge")


if __name__ == "__main__":
    main()
