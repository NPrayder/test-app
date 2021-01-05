import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import { CHECK_TOKEN_EXISTING } from '@/store/actionTypes';

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
            component: () =>
                import(/* webpackChunkName: "Dashboard" */ '../views/DashboardLayout.vue'),
            children: [
                {
                    path: '/',
                    name: 'Dashboard',
                    component: () =>
                        import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard.vue'),
                },
                {
                    path: '/user-report/:id',
                    name: 'User report',
                    component: () =>
                        import(/* webpackChunkName: "Dashboard" */ '../views/DetailedUserReport.vue'),
                },
                {
                    path: '/progress-report/:id',
                    name: 'Progress report',
                    component: () =>
                        import(/* webpackChunkName: "Dashboard" */ '../views/ProgressReport.vue'),
                },
                {
                    path: '/diagnostic-report/:id',
                    name: 'Diagnostic report',
                    component: () =>
                        import(/* webpackChunkName: "Dashboard" */ '../views/DiagnosticReport.vue'),
                },
                {
                    path: '*',
                    redirect: '/'
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

router.beforeEach(async (to, from, next) => {
    await store.dispatch(CHECK_TOKEN_EXISTING);

    if (to.name === 'Login' && store.getters.isLoggedIn) {
        next({name: 'Dashboard'});
    } else if (to.name !== 'Login' && !store.getters.isLoggedIn) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router;
