import Vue from "vue";

export default {
  state: () => ({ 
    teams: {}
  }),
  mutations: { 
    updateTeams(state, teams) {
      state.teams = teams || {};
    },
    SOCKET_onUpdateTeams(state, updatedTeams) {
      updatedTeams.forEach(updatedTeam => {
        Vue.set(state.teams, updatedTeam.id, updatedTeam);
      })
    },
  },
  actions: { 
    syncTeams(context, teams) {
      const newState = {};
      teams.forEach(team => {
        newState[team.id] = team;
      });
      context.commit("updateTeams", newState);
    }
  },
  getters: {
    numberOfTeams(state) {
      return Object.keys(state.teams).length;
    }
  }
};