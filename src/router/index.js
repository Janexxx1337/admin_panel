import { createRouter, createWebHistory } from 'vue-router';
import AdminPanel from '@/components/AdminPanel.vue';
import UsersTable from '@/components/UsersTable.vue';
import Deposits from '@/components/Deposits.vue';
import UserCard from '@/components/UserCard.vue';
import Withdrawals from '@/components/Withdrawals.vue';

const routes = [
    {
        path: '/admin',
        name: 'AdminPanel',
        component: AdminPanel,
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
        credentials: 'include', // This will include the cookies in the request
    });

    const isAuthenticated = response.ok;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'AdminPanel' });
    } else {
        next();
    }
});

export default router;
