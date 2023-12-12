export default {
    namespaced: true,
    state: {
        users: [
            { id: 1, nameUser: 'Максим Олегович Густов', birthday: '1994-12-13', specialisation: 10, lvl: 3 },
            { id: 2, nameUser: 'Валерий Иванович Чучкевич', birthday: '1994-02-13', specialisation: 2, lvl: 2 },
            { id: 3, nameUser: 'Злобин Петр Михайлович', birthday: '1994-04-13', specialisation: 3, lvl: 1 },

        ]
    },
    getters: {
        usersList: state => state.users
    },
    mutations: {
        addNewUser: (state, user) => state.users.push(user),
        removeUser: (state, id) => (
            state.users.splice(state.users.map(e => e.id).indexOf(id), 1)
        ),
        updateUser: (state, user) => (
            state.users[state.users.map(e => e.id).indexOf(user.id)] = { ...user }
            
        ),
    },
    actions: {
        addUser({ commit }, user) {
            commit("addNewUser", user)
        },
        deleteUser({ commit }, id) {
            commit("removeUser", id)
        },
        editUser({ commit }, user) {
            commit("updateUser", user)
        }
    }
}