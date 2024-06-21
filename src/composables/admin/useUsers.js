// src/composables/useUsers.js
import { ref, onMounted } from 'vue';

export function useUsers() {
    const users = ref([]);

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:8000/users', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            users.value = await response.json();
        } catch (error) {
            console.error("Failed to load users:", error);
        }
    }

    async function updateStatus(user) {
        try {
            const response = await fetch(`http://localhost:8000/users/${user.id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ payment_status: user.payment_status })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Status updated successfully');
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    }

    onMounted(fetchUsers);

    return {
        users,
        fetchUsers,
        updateStatus
    };
}
