import { ref } from 'vue';
import { useRouter } from 'vue-router';

export function useAdminLogin() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');
    const error = ref(null);
    const successMessage = ref(null);

    async function login() {
        try {
            const response = await fetch('http://localhost:8000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.value,
                    password: password.value,
                }),
                credentials: 'include', // This will include the cookies in the request
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            successMessage.value = data.message;

            // После успешного входа перезагружаем страницу
            window.location.href = '/users';
        } catch (err) {
            error.value = 'Failed to login: ' + err.message;
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
