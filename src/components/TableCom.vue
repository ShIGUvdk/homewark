<template>
    <div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">ФИО</th>
                    <th scope="col">Дата рождения</th>
                    <th scope="col">Код специализации</th>
                    <th scope="col">Важность</th>
                    <th scope="col">options</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in userslist" :key="index">
                    <th scope="row">{{ user.id }}</th>
                    <td>
                        <InputUNameUser :objectUser="user" :myvalue="user.nameUser" :type="'nameuser'"
                            :key="`inputName${index}`" />
                    </td>
                    <td>{{ user.birthday }}</td>
                    <td>{{ user.specialisation }}</td>
                    <td>
                        <InputUNameUser :objectUser="user" :myvalue="user.lvl" :type="'lvluser'"
                            :key="`inputLvl${index}`" />
                    </td>
                    <td><button @click="removeUser(user.id)" type="button" class="btn btn-danger">Удалить</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
 
<script>
import { mapActions } from "vuex"
import InputUNameUser from "./InputUNameUser.vue";

export default {
    props: ['userslist'],

    data() {

        return {}
    },
    components: {
        InputUNameUser
    },
    mounted() {
    },
    methods: {
        ...mapActions('users', ['deleteUser']),

        removeUser(id) {
            this.deleteUser(id);
        }
    }
}
</script>
 
<style lang="scss" scoped></style>