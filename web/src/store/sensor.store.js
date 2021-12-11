import Vue from "vue";

export default {
  state: () => ({ 
    sensors: {}
  }),
  mutations: { 
    updateSensors(state, sensors) {
      state.sensors = sensors || {};
    },
    SOCKET_onUpdateSensor(state, updatedSensor) {
      Vue.set(state.sensors, updatedSensor.id, updatedSensor);
    },
  },
  actions: { 
    syncSensors(context, sensors) {
      const newState = {};
      sensors.forEach(sensor => {
        newState[sensor.id] = sensor;
      });
      context.commit("updateSensors", newState);
    }
  },
  getters: {
    numberOfSensors(state) {
      return Object.keys(state.sensors).length;
    }
  }
};