import http from '../../http'

const state = {
    token: localStorage.getItem('token')
}

const mutations = {
    login(state, token) {
        state.token = token;
        localStorage.setItem('token', token);
    }
}

const actions = {
    login({commit}, data) {
        return new Promise((resolve, reject) => {
            http.post('users/login', data).then(response => {
                if(response.data.data.status == 'success')
                {
                    commit('login', response.data.data.token);
                    resolve(response);
                }
                else
                    reject(response);
            }).catch(reason => {
                reject(reason);
            });
        });
    }
}

const getters = {
    getToken(state) {
        return state.token;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}