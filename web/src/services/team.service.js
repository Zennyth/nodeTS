
import store from '@/store';
import axios from "@/util/axios";

export default {
  getAll: async () => {
    const response = await axios.get('/teams');
    if(response.data) {
      store.dispatch('syncTeams', response.data);
    } else {
      return [];
    }
  },
}