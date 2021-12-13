
import store from '@/store';
import axios from "@/util/axios";

export default {
  getAll: async () => {
    const response = await axios.get('/stations');
    if(response.data) {
      store.dispatch('syncStations', response.data);
    } else {
      return [];
    }
  },
}