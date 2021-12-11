
import store from '@/store';
import axios from "@/util/axios";

export default {
  getAll: async () => {
    const response = await axios.get('/emergencies');
    if(response.data) {
      store.dispatch('syncEmergencies', response.data);
    } else {
      return [];
    }
  },
}