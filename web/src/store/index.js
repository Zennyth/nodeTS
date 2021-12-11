import Vue from 'vue'
import Vuex from 'vuex'

import sensor from "./sensor.store";
import emergency from "./emergency.store";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    sensor,
    emergency
  },
  strict: debug,
})