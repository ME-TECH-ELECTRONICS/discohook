from flask import Flask, request
import requests

app = Flask(__name__)

DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/your_webhook_url"

@app.route('/', methods=['POST'])
def receive_and_forward():
    data = request.json

    # Forward to Discord webhook
    if data:
        message = {
            "content": f"Received data: {data}"
        }
        requests.post(DISCORD_WEBHOOK_URL, json=message)

    return {"status": "ok"}, 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)