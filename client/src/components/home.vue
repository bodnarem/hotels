<template>
    <v-app>
        <c-header></c-header>
    </v-app>
</template>

<script>
import HeaderComponent from './header'
import { mapGetters } from 'vuex'

export default {
    name: 'home',
    components: {
        'c-header': HeaderComponent
    },
    data() {
        return {

        }
    }
}
</script>

