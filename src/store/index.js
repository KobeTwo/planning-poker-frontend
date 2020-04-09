import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentGame: {},
    currentGameInstance: {},
    currentPlayer: {},
    allPlayers:[] 
  },
  mutations: {
    setCurrentGame(state, currentGame){
      state.currentGame = currentGame;
    }, 
    setCurrentGameInstance(state, currentGameInstance){
      state.currentGameInstance = currentGameInstance;
    }, 
    setCurrentPlayer(state, currentPlayer){
      state.currentPlayer = currentPlayer;
    },
    setAllPlayers(state, allPlayers){
      state.allPlayers = allPlayers;
    }
  },
  actions: {
    setCurrentGame(context, currentGame){
      context.commit('setCurrentGame', currentGame)
    },
    setCurrentGameInstance(context, gameInstance){
      context.commit('setCurrentGameInstance', gameInstance)
    },
    setCurrentPlayer(context, currentPlayer){
      context.commit('setCurrentPlayer', currentPlayer)
    },
    setAllPlayers(context, allPlayers){
      context.commit('setAllPlayers', allPlayers)
    }
  },
  modules: {
  },
  getters: {
    currentGame: state => {
      return state.currentGame;
    },
    currentGameInstance: state => {
      return state.currentGameInstance;
    },
    currentPlayer: state => {
      return state.currentPlayer;
    },
    possibleCards: state => {
      if(state.currentGameInstance.game?.cards){
        return state.currentGameInstance?.game?.cards;
      }else{
        return [];
      }
    },
    allPlayers: state => {
      return state.allPlayers;
    },
    otherPlayers: state => {
      let otherPlayers = [];
      state.allPlayers.forEach(function (player) {
        if(state.currentPlayer && player.id != state.currentPlayer.id){
          otherPlayers.push(player);
        }
      });
      return otherPlayers
    },
    otherPlayersVoted: (state, getters) => {
      for (const player of getters.otherPlayers){
        if(!player.chosenCard){
          return false;
        }
      }
      return true;
    },
    allPlayersVoted: (state, getters) => {
      for (const player of getters.allPlayers){
        if(!player.chosenCard){
          return false;
        }
      }
      return true;
    }
  }
})
