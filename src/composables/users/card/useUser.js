import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useUser() {
    const route = useRoute();
    const router = useRouter();
    const user = ref(null);
    const balanceAmount = ref(0);

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
            alert(`User ${user.value.nickname} has been banned.`);
            router.push('/users');
        } catch (error) {
            console.error('Error banning user:', error);
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
        } catch (error) {
            console.error('Error updating balance:', error);
        }
    };

    return {
        user,
        balanceAmount,
        fetchUser,
        banUser,
        updateBalance,
    };
}
