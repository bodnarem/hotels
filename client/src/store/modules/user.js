const LOGIN = 'LOGIN';
const SET_TOKEN = 'SET_TOKEN';

import http from '../../http'

const state = {
    user: {
        token: localStorage.getItem('token'),
        firstname: '',
        secondname: ''
    }
}

const mutations = {
    [LOGIN]: (state, user) => {
        state.user = user;
    },

    [SET_TOKEN]: (state, token) => {
        state.token = token;
    }
}

const actions = {
    [LOGIN]: async ({commit}, payload) => {
        await http.post('/users/login', payload)
            .then((pkg) => {
                const req = pkg.data;
                commit('SET_TOKEN', req.data.token);
                commit('LOGIN', req.data.user)
            })
            .catch(() => {
                
            })
    }
}   

const getters = {
    getToken(state) {
        return state.token;
    },

    getUser(state) {
        return state.user;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}