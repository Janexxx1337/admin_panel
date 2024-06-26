import { createRouter, createWebHistory } from 'vue-router';
import AdminPanel from '@/components/AdminPanel.vue';
import UsersTable from '@/components/UsersTable.vue';
import Deposits from '@/components/Deposits.vue';
import UserCard from '@/components/UserCard.vue';

const routes = [
    {
        path: '/admin',
        name: 'AdminPanel',
        component: AdminPanel
    },
    {
        path: '/users',
        name: 'UsersTable',
        component: UsersTable
    },
    {
        path: '/deposits',
        name: 'Deposits',
        component: Deposits
    },
    {
        path: '/user/:id',
        name: 'UserCard',
        component: UserCard
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
