import { useRouter } from 'vue-router';

export function useAuth() {
    const router = useRouter();

    async function logout() {
        try {
            const response = await fetch('http://localhost:8000/admin/logout', {
                method: 'POST',
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = '/admin';
            } else {
                console.error('Failed to logout');
            }
        } catch (err) {
            console.error('Error during logout:', err);
        }
    }

    return {
        logout
    };
}
