
import html
import logging
import os

import resend
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(
    dotenv_path=Path(__file__).resolve().parent / ".env"
)

logger = logging.getLogger(__name__)

CONTACT_NOTIFICATION_EMAIL = os.getenv(
    "CONTACT_NOTIFICATION_EMAIL",
    "hawaebrahimhamid@gmail.com",
)

RESEND_FROM_EMAIL = os.getenv(
    "RESEND_FROM_EMAIL",
    "onboarding@resend.dev",
)


def send_contact_notification(
    name: str,
    email: str,
    message: str,
) -> bool:
    """Send an email notification about a newly saved contact message."""

    api_key = os.getenv("RESEND_API_KEY")

    if not api_key:
        logger.warning(
            "contact_notification_skipped reason=missing_api_key"
        )
        return False

    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_message = html.escape(message)

    plain_text = (
        "You received a new message through your portfolio contact form.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}"
    )

    html_content = f"""
    <h2>New Portfolio Contact Message</h2>
    <p><strong>Name:</strong> {safe_name}</p>
    <p><strong>Email:</strong> {safe_email}</p>
    <p><strong>Message:</strong></p>
    <p>{safe_message.replace(chr(10), '<br>')}</p>
    """

    try:
        resend.api_key = api_key

        resend.Emails.send(
            {
                "from": RESEND_FROM_EMAIL,
                "to": [CONTACT_NOTIFICATION_EMAIL],
                "subject": "New portfolio contact message",
                "reply_to": email,
                "text": plain_text,
                "html": html_content,
            }
        )

        logger.info("contact_notification_sent")
        return True

    except Exception as exc:
        # Never log contact details, API keys, or exception contents.
        logger.error(
            "contact_notification_failed error_type=%s",
            type(exc).__name__,
        )
        return False
