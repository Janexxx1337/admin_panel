import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/views/Login.vue';
import UsersTable from '@/components/views/UsersTable.vue';
import Deposits from '@/components/views/Deposits.vue';
import UserCard from '@/components/views/UserCard.vue';
import Withdrawals from '@/components/views/Withdrawals.vue';
import WheelGameList from '@/components/views/Games/WheelGameList.vue';
import CoinflipGameList from '@/components/views/Games/CoinflipGameList.vue';
import WheelGameDetail from '@/components/views/Games/WheelGameDetail.vue';
import CoinflipGameDetail from '@/components/views/Games/CoinflipGameDetail.vue'; // Импортируем новый компонент
import WheelHistoryGame from '@/TestWheelDetail/wheel/WheelHistoryGame.vue'; // Импортируем новый компонент
import CoinflipGame from '@/TestWheelDetail/coinflip/CoinflipGame.vue'; // Импортируем новый компонент

const routes = [
    // другие маршруты
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
    {
        path: '/wheelgames',
        name: 'WheelGameList',
        component: WheelGameList,
        meta: { requiresAuth: true },
    },
    {
        path: '/coinflipgames',
        name: 'CoinflipGameList',
        component: CoinflipGameList,
        meta: { requiresAuth: true },
    },
    {
        path: '/wheelgames/:id',
        name: 'WheelGameDetail',
        component: WheelGameDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/coinflipgames/:id',
        name: 'CoinflipGameDetail',
        component: CoinflipGameDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/coinfliptest/:gameId',
        name: 'CoinflipTest',
        component: CoinflipGame,
        meta: { requiresAuth: true },
    },
    {
        path: '/wheeltest/:gameId',
        name: 'WheelTest',
        component: WheelHistoryGame,
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
