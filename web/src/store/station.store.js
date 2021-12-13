import Vue from "vue";

export default {
  state: () => ({ 
    stations: {}
  }),
  mutations: { 
    updateStations(state, stations) {
      state.stations = stations || {};
    },
    SOCKET_onUpdateStations(state, updatedStations) {
      updatedStations.forEach(updatedStation => {
        Vue.set(state.stations, updatedStation.id, updatedStation);
      })
    },
  },
  actions: { 
    syncStations(context, stations) {
      const newState = {};
      stations.forEach(station => {
        newState[station.id] = station;
      });
      context.commit("updateStations", newState);
    }
  },
  getters: {
    numberOfStations(state) {
      return Object.keys(state.stations).length;
    }
  }
};