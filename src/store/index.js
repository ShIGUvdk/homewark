import { createStore } from "vuex";
import users from "../store/modules/users"

const store = createStore({
    modules: {
        users
    }
})

export default store;