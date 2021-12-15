import { Sensor } from '../models';

import {onEvent} from "../utils/websocket.util";
import { initAxios, post } from '../utils/axios.util';

export const init = async () => {
    await initAxios();
}

export const on = (event: string, callback: Function) => {
    onEvent(event, callback);
}

export const send = (sensors: Sensor[]) => {
    return post("/sensors/", sensors);
}

export default {
    init,
    on,
    send
}