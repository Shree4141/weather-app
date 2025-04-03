from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS  # 🔹 Import CORS

# Load API key
load_dotenv()
API_KEY = os.getenv("API_KEY")

app = Flask(__name__)
CORS(app)  # 🔹 Enable CORS

@app.route("/weather", methods=["GET"])
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    weather_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}"
    response = requests.get(weather_url)

    return response.json()

if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
