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
    setAllPlayers(context,  allPlayers){
      context.commit('setAllPlayers', allPlayers)
      if(context.getters.currentPlayer){
        let currentPlayer = allPlayers.find(currentPlayer => currentPlayer.id === context.getters.currentPlayer.id);
        if(currentPlayer){
          context.commit('setCurrentPlayer', currentPlayer);
        }else{
          context.commit('setCurrentPlayer', {});
        }
      }
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
    },
    consent: (state, getters) => {
      if(getters.allPlayersVoted && getters.allPlayers.length > 1){
        let value = getters.allPlayers[0].chosenCard.value;
        for (const player of getters.allPlayers){
          if(value !== player.chosenCard.value){
            return false;
          }
        }
        return true
      }
      return false;
    },
    consentCard: (state, getters) => {
      if(getters.consent){
        return getters.allPlayers[0].chosenCard;
      }
      return null;
    },
    explainPlayers: (state, getters) => {
      let explainPlayers = [];
      if(getters.allPlayersVoted && !getters.consent){
        let min = Math.min.apply(Math, getters.allPlayers.map(function(player) { return player.chosenCard.value; }))
        let max = Math.max.apply(Math, getters.allPlayers.map(function(player) { return player.chosenCard.value; }))
        let minPlayers = getters.allPlayers.filter(function(player){ return player.chosenCard.value == min; })
        let maxPlayers = getters.allPlayers.filter(function(player){ return player.chosenCard.value == max; })
        explainPlayers.push(...minPlayers);
        explainPlayers.push(...maxPlayers);
      }
      
      return explainPlayers
    }
  }
})
