from flask import Flask, request
import requests
import os

app = Flask(__name__)

DISCORD_WEBHOOK_URL = os.getenv("WEBHOOK_URL")

@app.route('/', methods=['POST'])
def receive_and_forward():
    data = request.json

    if data and DISCORD_WEBHOOK_URL:
        message = {
            "content": f"Received data: {data}"
        }
        requests.post(DISCORD_WEBHOOK_URL, json=message)

    return {"status": "ok"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
