import Vue from 'vue';
import DashboardPlugin from './plugins/dashboard-plugin';
import App from './App.vue';

// router setup
import router from './routes/router';
// plugin setup
Vue.use(DashboardPlugin);

// store
import store from './store'

// socket
import io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: io({query: {token: "4739f58f-5e35-4235-8ac5-4fdba549d641"}}),
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router,
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
  },
});
