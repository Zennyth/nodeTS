import requests
import uuid
import json

min_latitude =  45.723967; step_latitude = 0.06 / 6.0; range_latitude = 1
min_longitude = 4.797831; step_longitude = 0.011; range_longitude = 10


sensors = []
for latitude in range(range_latitude):
    for longitude in range(range_longitude):
        sensors.append({
            "id": str(uuid.uuid4()),
            "latitude": min_latitude + latitude * step_latitude,
            "longitude": min_longitude + longitude * step_longitude,
            "radius": 0.01929018172830706 / 2,
            "intensity": 0
        })


# print(sensors)
headers = {'content-type': 'application/json', 'x-access-token': 'eb0dfd4f-cdc9-4546-9296-5bcdd69767e6'}
# print(len(sensors))
r = requests.post("http://localhost:3000/api/sensors", json=sensors, headers=headers)
# print(r.text)

