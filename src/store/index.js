import { createStore } from "vuex";

const store = createStore({
    state:{coinsData:[]},
    mutations:{
        saveCoins(state, action) {
            state.coinsData = action
        }
    },
    actions:{
        addCoins({commit}, payload) {
            commit('saveCoins', payload)
        }
    },
    getters:{
        getCoinsName(state) {
            return state.coinsData
        },
    }
})


export default store;