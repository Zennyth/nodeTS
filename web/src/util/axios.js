import axios from "axios";

import store from "@/store";

export default axios.create({
  baseURL: 'http://localhost:3100/api/',
  timeout: 3000,
  headers: {
    'x-access-token': store.getters.token != null ? store.getters.token : undefined,
  }
});