import Vue from "vue";

export default {
  state: () => ({ 
    emergencies: {}
  }),
  mutations: { 
    updateEmergencies(state, emergencies) {
      state.emergencies = emergencies || {};
    },
    SOCKET_onUpdateEmergency(state, updatedEmergency) {
      Vue.set(state.emergencies, updatedEmergency.id, updatedEmergency);
    },
  },
  actions: { 
    syncEmergencies(context, emergencies) {
      const newState = {};
      emergencies.forEach(sensor => {
        newState[sensor.id] = sensor;
      });
      context.commit("updateEmergencies", newState);
    }
  },
  getters: {
    numberOfEmergencies(state) {
      return Object.keys(state.emergencies).length;
    }
  }
};