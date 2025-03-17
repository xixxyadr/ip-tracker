from flask import Flask, request, jsonify, render_template
import requests  # Pastikan library requests sudah terinstall

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/track')
def track_ip():
    ip = request.args.get('ip')
    if not ip:
        return jsonify({"error": "No IP address provided"}), 400

    try:
        response = requests.get(f"http://ip-api.com/json/{ip}")
        data = response.json()
        return jsonify({
            "ip": data.get("query"),
            "city": data.get("city"),
            "region": data.get("regionName"),
            "country": data.get("country"),
            "isp": data.get("isp"),
            "lat": data.get("lat"),
            "lon": data.get("lon")
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
