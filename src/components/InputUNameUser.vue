<template>
    <div>
        <div class="row">
            <div v-if="buttonOpt" class="col">
                <input v-model="thisvalue" @input="validFIO" type="text" class="form-control">
            </div>
            <div clss="col">
                <div v-if="!buttonOpt">
                    {{ myvalue }}
                    <button @click="showBut(true)" type="button" class="btn btn-light"><i class="bi bi-pencil"></i></button>
                </div>
                <div v-if="buttonOpt">
                    <button @click="showBut(false)" type="button" class="btn btn-warning">Cansel</button>
                    <button @click="save(false)" type="button" class="btn btn-success">Save</button>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    props: ['myvalue', 'objectUser', 'type'],

    data() {
        let thisvalue = ''
        return {
            thisvalue,
            buttonOpt: false,
            allObject: []
        }
    },
    mounted() {
        this.loadItem()
    },
    computed: {
        ...mapGetters('users', ['usersList'])
    },
    methods: {
        ...mapActions('users', ['editUser']),

        loadItem() {
            this.thisvalue = this.myvalue;
            this.allObject = this.objectUser;
        },
        validFIO() {
            if (this.type === "nameuser") {
                this.thisvalue = this.thisvalue.replace(/[^а-яА-ЯёЁ\s]/g, '');
            }

        },
        showBut(val) {
            this.buttonOpt = val;
        },
        save(val) {
            if (this.type === "nameuser") {
                this.allObject.nameUser = this.thisvalue;
            }
            if (this.type === "lvluser") {
                this.allObject.lvl = this.thisvalue;
            }

            this.editUser(this.allObject);
            this.buttonOpt = val;

        }
    }
}
</script>

<style lang="scss" scoped></style>