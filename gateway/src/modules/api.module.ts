import { Sensor } from '../models';

import {onEvent} from "../utils/websocket.util";

export const init = async () => {

}

export const on = (event: string, callback: Function) => {
    onEvent(event, callback);
}

export const send = (sensors: Sensor[]) => {
    
}

export default {
    init,
    on,
    send
}