import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/views/Login.vue';
import UsersTable from '@/components/views/UsersTable.vue';
import Deposits from '@/components/views/Deposits.vue';
import UserCard from '@/components/views/UserCard.vue';
import Withdrawals from '@/components/views/Withdrawals.vue';

const routes = [
    {
        path: '/admin',
        name: 'Login',
        component: Login,
    },
    {
        path: '/withdrawals',
        name: 'Withdrawals',
        component: Withdrawals,
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'UsersTable',
        component: UsersTable,
        meta: { requiresAuth: true },
    },
    {
        path: '/deposits',
        name: 'Deposits',
        component: Deposits,
        meta: { requiresAuth: true },
    },
    {
        path: '/user/:id',
        name: 'UserCard',
        component: UserCard,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const response = await fetch('http://localhost:8000/admin/me', {
        method: 'GET',
        credentials: 'include',
    });

    const isAuthenticated = response.ok;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'AdminPanel' });
    } else {
        next();
    }
});

export default router;
