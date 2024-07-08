import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useUser() {
    const route = useRoute();
    const router = useRouter();
    const user = ref(null);
    const balanceAmount = ref(0);
    const notificationMessage = ref('');
    const showNotification = ref(false);

    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            user.value = await response.json();
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const banUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${user.value.id}/ban`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            notificationMessage.value = `Пользователь ${user.value.nickname} был забанен.`;
            showNotification.value = true;
            fetchUser(user.value.id); // Обновляем данные пользователя после бана
            setTimeout(() => {
                showNotification.value = false;
            }, 2000);
        } catch (error) {
            console.error('Error banning user:', error);
        }
    };

    const unbanUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/users/${user.value.id}/unban`, {
                method: 'PUT'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            notificationMessage.value = `Пользователь ${user.value.nickname} был разбанен.`;
            showNotification.value = true;
            fetchUser(user.value.id); // Обновляем данные пользователя после разбана
            setTimeout(() => {
                showNotification.value = false;
            }, 2000);
        } catch (error) {
            console.error('Error unbanning user:', error);
        }
    };

    const updateBalance = async (action) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${user.value.id}/balance`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: parseFloat(balanceAmount.value), action })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedUser = await response.json();
            user.value.balance = updatedUser.balance;
            fetchUser(user.value.id); // Обновляем данные пользователя после обновления баланса
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };

    const updateStatus = async (userToUpdate) => {
        try {
            const response = await fetch(`http://localhost:8000/users/${userToUpdate.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_status: userToUpdate.payment_status })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchUser(userToUpdate.id); // Обновляем данные пользователя после изменения статуса
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return {
        user,
        balanceAmount,
        fetchUser,
        banUser,
        unbanUser,
        updateBalance,
        updateStatus,
        notificationMessage,
        showNotification,
    };
}
