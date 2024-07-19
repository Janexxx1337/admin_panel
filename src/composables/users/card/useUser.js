import { ref } from 'vue';
import { usersData } from '@/data/Users.js';

export function useUser() {
    const user = ref(null);
    const balanceAmount = ref(0);
    const showNotification = ref(false);
    const notificationMessage = ref('');
    const notificationTitle = ref('');

    function fetchUser(userId) {
        const foundUser = usersData.find(u => u.id === parseInt(userId));
        if (foundUser) {
            user.value = { ...foundUser, avatar: '', nickname: 'User' + foundUser.id, deposits: [], withdrawals: [], bets: [] };
        }
    }

    function banUser() {
        if (user.value) {
            user.value.banned = true;
            showNotification.value = true;
            notificationTitle.value = 'Успех';
            notificationMessage.value = 'Пользователь забанен';
        }
    }

    function unbanUser() {
        if (user.value) {
            user.value.banned = false;
            showNotification.value = true;
            notificationTitle.value = 'Успех';
            notificationMessage.value = 'Пользователь разбанен';
        }
    }

    function updateBalance(type) {
        if (user.value) {
            if (type === 'credit') {
                user.value.balance += balanceAmount.value;
            } else if (type === 'debit') {
                user.value.balance -= balanceAmount.value;
            }
            showNotification.value = true;
            notificationTitle.value = 'Успех';
            notificationMessage.value = `Баланс ${type === 'credit' ? 'начислен' : 'списан'}`;
        }
    }

    return {
        user,
        balanceAmount,
        fetchUser,
        banUser,
        unbanUser,
        updateBalance,
        notificationMessage,
        showNotification,
        notificationTitle
    };
}
