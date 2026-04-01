from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/restaurants", methods=["GET"])
def get_restaurants():

    lat = request.args.get("lat")
    lng = request.args.get("lng")

    url = "https://overpass-api.de/api/interpreter"

    query = f"""
    [out:json];
    node["amenity"="restaurant"](around:3000,{lat},{lng});
    out;
    """

    response = requests.get(url, params={'data': query})
    data = response.json()

    restaurants = []

    for place in data["elements"]:
        restaurants.append({
            "name": place.get("tags", {}).get("name", "Unknown"),
            "lat": place.get("lat"),
            "lng": place.get("lon")
        })

    return jsonify(restaurants)

if __name__ == "__main__":
    import os
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=False)
