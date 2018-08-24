<template>
    <v-app>
        <v-toolbar dark>
            <v-toolbar-title>HOTELS</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-layout row align-center style="max-width: 650px">
            <v-text-field
                placeholder="быстрый поиск..."
                single-line
                append-icon="search"
                color="white"
                hide-details
                v-model="search"
            ></v-text-field>
        </v-layout>

            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat @click="login()">Войти</v-btn>
                <v-btn flat>Регистрация</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        {{ token }}
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            search: null
        }
    },
    computed: {
        ...mapGetters({
        token: 'getToken'
        })
    },
    methods: {
        login() {
            this.$store.dispatch('LOGIN', {email: 'admin@hotels.ru', password: '12345'});
        }
    }
}
</script>

