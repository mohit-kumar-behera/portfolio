from django.conf import settings
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_mail(options):
  FROM_ACCOUNT_EMAIL = settings.HOST_GMAIL_ACCOUNT
  FROM_ACCOUNT_PASSWORD = settings.HOST_GMAIL_PASSWORD
  RECEIVER_ACCOUNT_EMAIL = settings.USER_ACCOUNT_EMAIL

  server = smtplib.SMTP(host = 'smtp.gmail.com', port = 587)
  server.ehlo()
  server.starttls()
  server.login(FROM_ACCOUNT_EMAIL, FROM_ACCOUNT_PASSWORD)
  
  msg = MIMEMultipart('alternative')
  msg['From'] = f'Mohit Kumar <{FROM_ACCOUNT_EMAIL}>'
  msg['To'] = RECEIVER_ACCOUNT_EMAIL
  msg['Subject'] = options.subject
  content = options.message + f' - {options.name}, {options.email}'

  print(options)

  text_part = MIMEText(content, 'plain')
  msg.attach(text_part)

  mail_msg = msg.as_string()

  try:
    server.sendmail(FROM_ACCOUNT_EMAIL, RECEIVER_ACCOUNT_EMAIL, mail_msg)
    print("success")
  except:
    print("fail")
    pass
  
  server.quit()
