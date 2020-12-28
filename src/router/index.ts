import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import(/* webpackChunkName: "Login" */ '../views/Login.vue')
        },
        {
            path: '/',
            name: 'Dashboard',
            component: () =>
                import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
            children: [
                {
                    path: '/reports',
                    name: 'Reports',
                    component: () =>
                        import(/* webpackChunkName: "Dashboard" */ '../views/Reports.vue'),
                },
                {
                    path: '/reports/:id',
                    name: 'Reports details',
                    component: () =>
                        import(/* webpackChunkName: "Dashboard" */ '../views/ReportDetails.vue'),
                },
                {
                    path: '*',
                    redirect: 'reports'
                }
            ],
        },
        {
            path: '*',
            redirect: 'login'
        }
    ]
;

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login' && store.getters.isLoggedIn) {
        next({name: 'Reports'});
    } else if (to.name !== 'Login' && !store.getters.isLoggedIn) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;
