import { createRouter, createWebHistory } from 'vue-router';
import AdminPanel from '@/components/AdminPanel.vue';
import UsersTable from '@/components/UsersTable.vue';

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
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

export default router;
