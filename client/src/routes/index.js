import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../components/home.vue'
import LoginComponent from '../components/login.vue'
import RegisterComponent from '../components/register.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomeComponent
        },
        {
            path: '/login',
            component: LoginComponent
        },
        {
            path: '/register',
            component: RegisterComponent
        }
    ]
})

export default router;