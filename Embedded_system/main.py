from flask import Flask, request, jsonify
from joblib import load
from flask_cors import CORS  # Import CORS from flask_cors
import numpy as np
import json
import requests
import firebase_admin
from firebase_admin import credentials, db
import serial
import time


app = Flask(__name__)
CORS(app)
app.duration =0
app.energy = 0
app.power = 0

#/home/magdyhussien/Downloads/smartbike-ab002-firebase-adminsdk-kaubp-b591e75264.json

# Load the model (ensure this path is correct)
model = load('/home/magdyhussien/Downloads/random_forest_regressor2.joblib')
cred = credentials.Certificate('/home/magdyhussien/Downloads/smartbike-ab002-firebase-adminsdk-kaubp-b591e75264.json')
    #https://smartbike-ab002-default-rtdb.firebaseio.com/
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://smartbike-ab002-default-rtdb.firebaseio.com/'
})

ser = serial.Serial('/dev/ttyACM0', 57600 ,timeout=1)
ser.flush()


def collect_and_process_sensor_data(duration=3):
    end_time = time.time() + duration
    sensor_data = []
    while time.time() < end_time:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').strip()
            values = line.split(',')
            # Check if the record has 7 values and does not contain 'kk'
            if len(values) == 7 and "kk" not in values:
                sensor_data.append(list(map(float, values)))
    
    if sensor_data:
        predictions = model.predict(sensor_data)
        average_prediction = np.mean(predictions)
        return average_prediction
    else:
        return None


@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.get_json()
    distance = data.get('distance')
    #form = data.get('form')
    # You can now use these values or store them as needed
    print("Received distance:", distance)
    # print("Received form data:", form)
    model_input = [[0.5 ,34.93 ,0.98 ,5 ,216]]
    predictions = model.predict(model_input)
    app.power = predictions * 36.5
    print(distance.split(" ")[0])
    duration_str = distance.split(" ")[0]
    app.duration = duration_str.replace('"',"")
    
    app.energy = app.power * int(app.duration)
    print("predictions come from model" + str(predictions))
    print("app.power will be "  + str(app.power))
    print("energy will be " + str(energy))
    url = 'http://127.0.1.1:3002/results'
    predictions_list = predictions.tolist()
    data_to_send = {
        'power': app.power.tolist(),
        'energy': app.energy.tolist(),
        'prediction': predictions.tolist()
    }
    send_data(url, data_to_send)
    # comeFromSensor(duration,energy)
    return jsonify({"status": "Data received successfully"}), 200

def comeFromSensor(energy):
    while True:
        predictions = collect_and_process_sensor_data()
        if predictions is not None:
            power = predictions * 36.5
            print('hahaha')
            print(timeStampFromArduino)
            print(app.duration)
            print(energy)
            timeStampFromArduino = 3
            print(timeStampFromArduino)
            app.duration = int(app.duration) - timeStampFromArduino
            print(app.duration)
            energyBefore = power * app.duration
            print(energyBefore)
            app.energy = abs(float(energy) - energyBefore)
            print("predictions come from model" + str(predictions))
            print("power will be "  + str(power))
            print("energy will be " + str(app.energy))
            url = 'http://127.0.1.1:3000/results'
            predictions_list = predictions.tolist()
            data_to_send = {
                'power': power.tolist(),
                'energy': app.energy.tolist(),
                'prediction': predictions.tolist()
            }
            send_data(url, data_to_send)
        else:
            print('error in sensor data we will out loop')

def send_data(url, data):
   
    ref = db.reference('sensors')
    ref.set({
        'power': data["power"],
        'energy': data["energy"],
        'prediction': data["prediction"]
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
