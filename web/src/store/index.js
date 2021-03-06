import Vue from 'vue'
import Vuex from 'vuex'

import sensor from "./sensor.store";
import emergency from "./emergency.store";
import team from "./team.store";
import station from "./station.store";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    sensor,
    emergency,
    team,
    station,
  },
  strict: debug,
});