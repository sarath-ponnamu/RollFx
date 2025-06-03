import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_EMAIL = os.getenv("SMTP_EMAIL", "your-default-email@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "your-default-app-password")

# Frontend URL to be used in the verification link
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

def send_verification_email(membername: str, username: str, password: str, email: str, token: str):
    msg = EmailMessage()
    msg["Subject"] = "Welcome to RollFX – Verify Your Email Address"
    msg["From"] = SMTP_EMAIL
    msg["To"] = email

    verification_link = f"{FRONTEND_URL}/verify/{token}"

    # Plain text fallback
    text_content = f"""\
Hi {membername},

Thank you for registering with RollFX!

Your username: {username}
Your password: {password}

To complete your registration and activate your account, please verify your email address by clicking the link below:
{verification_link}

If you didn’t sign up for a RollFX account, you can safely ignore this email.

Best regards,  
The RollFX Team
"""

    # HTML content
    html_content = f"""\
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c3e50;">Welcome to <span style="color: #e67e22;">RollFX</span>, {membername}!</h2>
    <p>We’re excited to have you onboard. Here are your registration details:</p>
    <ul>
      <li><strong>Username:</strong> {username}</li>
      <li><strong>Password:</strong> {password}</li>
    </ul>
    <p>To verify your email and activate your account, please click the button below:</p>
    <p>
      <a href="{verification_link}" style="display: inline-block; padding: 12px 20px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
    </p>
    <p>If the button above doesn’t work, copy and paste the following URL into your browser:</p>
    <p style="color: #555;"><a href="{verification_link}">{verification_link}</a></p>
    <hr>
    <p style="font-size: 0.9em; color: #888;">If you did not sign up for this account, you can safely ignore this message.</p>
    <p style="font-size: 0.9em; color: #888;">– The RollFX Team</p>
  </body>
</html>
"""

    msg.set_content(text_content)
    msg.add_alternative(html_content, subtype="html")

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)
