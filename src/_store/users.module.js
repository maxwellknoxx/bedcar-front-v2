import { userService } from '../_services';

export const users = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            userService.getAll()
                .then(
                    users => commit('getAllSuccess', users),
                    error => commit('getAllFailure', error)
                );
        },

        createUser({commit}) {
            commit('createUser');
            userService.createUser().then(response => {
                commit('getAllSuccess', response)
            })
        }

    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, users) {
            state.all = { items: users };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }, 
        createUser(state) {
            state.all = { loading: true };
        },
        getUser(state, users) {
            state.all = { items: users };
        }
    }
}