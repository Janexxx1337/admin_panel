import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useAuth() {
    const router = useRouter();
    const isAuthenticated = ref(true);

    function logout() {
        isAuthenticated.value = false;
        router.push('/admin');
    }

    return {
        isAuthenticated,
        logout
    };
}
