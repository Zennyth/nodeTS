
import store from '@/store';
import axios from "@/util/axios";

export default {
  getAll: async () => {
    const response = await axios.get('/sensors');
    if(response.data) {
      store.dispatch('syncSensors', response.data);
    } else {
      return [];
    }
  },
}