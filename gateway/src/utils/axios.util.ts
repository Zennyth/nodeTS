import axios from "axios";

let rest = null;

export const initAxios = () => {
    rest = axios.create({
        baseURL: `${process.env.SERVER_URL}/api/`,
        timeout: 1000,
        headers: {'x-access-token': process.env.API_W}
    });
}

export const post = async (url: string, data: any) => {
    return await axios.post(url, data);
}