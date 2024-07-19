import { ref } from 'vue';

export function useAuth() {
    const isAuthenticated = ref(true);

    function logout() {
        isAuthenticated.value = false;
        window.location.href = '/admin';
    }

    return {
        isAuthenticated,
        logout
    };
}
