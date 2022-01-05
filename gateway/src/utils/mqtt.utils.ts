import { Sensor } from '../models';

const mqtt = require('mqtt');
const clientId = "clientTest"
const connectUrl = `mqtt://${process.env.BROCKER_URL}`


const OPTIONS = {
    clientId,
    //clean: true,
    connectTimeout: 4000,
    //username: 'emqx',
    //password: 'public',
    reconnectPeriod: 1000,
}

export const client = mqtt.connect(connectUrl, OPTIONS)

export const subscribe = (topic: string) => {
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
}

export const publish = (topic: string, data: Sensor[]) => {
    client.publish(topic, JSON.stringify(data), { qos: 0, retain: true }, (error) => {
        if (error) {
          console.error(error)
        }
    })
}