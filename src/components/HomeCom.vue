<template>
    <div>
        <div class="row">
            <div class="p-4 col col-lg-6">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">ФИО</span>
                    <input v-model="nameUser" @input="validFIO" type="text" class="form-control">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Дата рождения</span>
                    <VueDatePicker class="form-control" v-model="birthday" :format="formatDTP" />
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="inputGroupSelect01">Специализация</span>
                    <select v-model="specialisation" class="form-select" id="inputGroupSelect01">
                        <option v-for="(item, index) in optionsSpec" :key="index" :value="item.code">{{ item.value }}
                        </option>
                    </select>
                </div>
                <div v-if="error" class="alert alert-warning" role="alert">
                    Ошика: не все поля заполнены
                </div>
                <button @click="insertUser" type="button" class="btn btn-primary">Отправить</button>
            </div>

        </div>

        <div class="row">
            <div class="p-4 col col-lg-12">
                <TableCom :userslist="usersList" />
            </div>
        </div>


    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import TableCom from "@/components/TableCom.vue"
import { mapGetters, mapActions } from 'vuex'


export default {
    data() {
        let birthday = new Date(),
            birthday2 = new Date(),
            optionsSpec = []
        return {
            nameUser: '',
            specialisation: 1,
            birthday, birthday2,
            optionsSpec,
            error: ''
        }
    },
    components: {
        VueDatePicker,
        TableCom
    },
    computed: {
        ...mapGetters('users', ['usersList'])
    },
    mounted() {
        this.loadOptions();
    },
    methods: {
        ...mapActions('users', ['addUser']),

        async loadOptions() {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "dictName": "ARM_OccupationArea" })
            }
            const response = await fetch('https://pp.credit/Services/BrokerService/api/Application/Dictionary', requestOptions);
            this.optionsSpec = (await response.json()).description;

        },
        validFIO() {
            this.nameUser = this.nameUser.replace(/[^а-яА-ЯёЁ\s]/g, '');
        },
        formatDTP() {
            const day = this.birthday.getDate();
            const month = this.birthday.getMonth() + 1;
            const year = this.birthday.getFullYear();
            return `${year}-${month}-${day}`
        },
        insertUser() {
            this.error = false;
            if (!this.nameUser || !this.birthday || !this.specialisation) {
                this.error = true;
            } else {
                let objectUser = {
                    id: new Date().valueOf(),
                    nameUser: this.nameUser,
                    birthday: `${this.birthday.getFullYear()}-${this.birthday.getMonth() + 1}-${this.birthday.getDate()}`,
                    specialisation: this.specialisation,
                    lvl: Math.floor(Math.random() * 3) + 1
                }
                this.addUser(objectUser);
            }
        }
    },
    watch: {
        nameUser(value) {
            if (value) { this.error = false; }
        },
        date(value) {
            if (value) { this.error = false; }
        },
        specialisation(value) {
            if (value) { this.error = false; }
        },
    }
}
</script>

<style lang="scss" scoped></style>