import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useAdminLogin() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const error = ref(null);
    const successMessage = ref(null);

    function login() {
        if (username.value === '123' && password.value === '123') {
            successMessage.value = 'Успешный вход';

            // Перенаправление после успешного входа
            router.push('/users');
        } else {
            error.value = 'Неправильный логин или пароль';
        }
    }

    return {
        username,
        password,
        error,
        successMessage,
        login,
    };
}
