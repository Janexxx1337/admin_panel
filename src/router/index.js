import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/components/views/Login.vue';
import UsersTable from '@/components/views/UsersTable.vue';
import Deposits from '@/components/views/Deposits.vue';

import UserCard from '@/components/views/UserCard.vue';
import Withdrawals from '@/components/views/Withdrawals.vue';
import WheelGameList from '@/components/views/Games/Wheel/WheelGameList.vue';

import CoinflipGameList from '@/components/views/Games/CoinFlip/CoinflipGameList.vue';
import WheelGameDetail from '@/components/views/Games/Wheel/WheelGameDetail.vue';
import CoinflipGameDetail from '@/components/views/Games/CoinFlip/CoinflipGameDetail.vue';

import Transactions from '@/components/views/Transactions.vue';
import TransactionDetail from "@/components/views/TransactionDetail.vue";
import ClassicGames from '@/components/views/Games/Classic/ClassicGames.vue';
import ClassicGameDetail from '@/components/views/Games/Classic/ClassicGameDetail.vue';

const routes = [
    {
        path: '/admin',
        name: 'Login',
        component: Login,
    },
    {
        path: '/classicgames',
        name: 'ClassicGames',
        component: ClassicGames,
    },
    {
        path: '/classicgames/:id',
        name: 'ClassicGameDetail',
        component: ClassicGameDetail,
    },
    {
        path: '/withdrawals',
        name: 'Withdrawals',
        component: Withdrawals,
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions,
    },
    {
        path: '/transaction/:id',
        name: 'TransactionDetail',
        component: TransactionDetail,
    },
    {
        path: '/users',
        name: 'UsersTable',
        component: UsersTable,
    },
    {
        path: '/deposits',
        name: 'Deposits',
        component: Deposits,
    },
    {
        path: '/user/:id',
        name: 'UserCard',
        component: UserCard,
    },
    {
        path: '/wheelgames',
        name: 'WheelGameList',
        component: WheelGameList,
    },
    {
        path: '/coinflipgames',
        name: 'CoinflipGameList',
        component: CoinflipGameList,
    },
    {
        path: '/wheelgames/:id',
        name: 'WheelGameDetail',
        component: WheelGameDetail,
    },
    {
        path: '/coinflipgames/:id',
        name: 'CoinflipGameDetail',
        component: CoinflipGameDetail,
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
