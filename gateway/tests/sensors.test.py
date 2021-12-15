import requests
import uuid
import json

min_latitude =  45.723967; step_latitude = 0.006; range_latitude = 6
min_longitude = 4.907738; step_longitude = 0.11/6; range_longitude = 10


sensors = []
for latitude in range(range_latitude):
    for longitude in range(range_longitude):
        sensors.append({
            "id": str(uuid.uuid4()),
            "latitude": min_latitude + latitude * step_latitude,
            "longitude": min_longitude + longitude * step_longitude,
            "radius": 10,
            "intensity": 30
        })


print(sensors)
headers = {'content-type': 'application/json', 'x-access-token': 'eb0dfd4f-cdc9-4546-9296-5bcdd69767e6'}
r = requests.post("http://localhost:3000/api/sensors", json=sensors, headers=headers)
print(r.text)