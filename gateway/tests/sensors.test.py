import requests
import uuid
import json

min_latitude =  45.723967; step_latitude = 0.06 / 6.0; range_latitude = 6
min_longitude = 4.797831; step_longitude = 0.011; range_longitude = 10


sensors = []

## Simualtion d'un feux
# sensors.append({"id":'38', "latitude":45.753967, "longitude": 4.8858310000000005, "intensity":29, "radius":0.00964509086415353})
# sensors.append({"id":'47', "latitude":45.763967, "longitude": 4.874831, "intensity":8, "radius":0.00964509086415353})
# sensors.append({"id":'48', "latitude":45.763967, "longitude": 4.8858310000000005, "intensity":90, "radius":0.00964509086415353})

## Arret d'un feu
sensors.append({"id":'38', "latitude":45.753967, "longitude": 4.8858310000000005, "intensity":0, "radius":0.00964509086415353})
sensors.append({"id":'47', "latitude":45.763967, "longitude": 4.874831, "intensity":0, "radius":0.00964509086415353})
sensors.append({"id":'48', "latitude":45.763967, "longitude": 4.8858310000000005, "intensity":0, "radius":0.00964509086415353})


# print(sensors)
headers = {'content-type': 'application/json', 'x-access-token': 'eb0dfd4f-cdc9-4546-9296-5bcdd69767e6'}
# print(len(sensors))
r = requests.post("http://localhost:3000/api/sensors", json=sensors, headers=headers)
# print(r.text)

