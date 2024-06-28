import { ref, computed, onMounted } from 'vue';

export function useDeposits() {
    const deposits = ref([]);
    const paginatedDeposits = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const totalPages = ref(0);
    const searchQuery = ref('');
    const filterProvider = ref('');

    const fetchDeposits = async (page = 1) => {
        currentPage.value = page;
        try {
            const response = await fetch(`http://localhost:8000/deposits?page=${page}&limit=${itemsPerPage}`);
            if (response.ok) {
                const data = await response.json();
                deposits.value = data.deposits;
                totalPages.value = Math.ceil(data.total / itemsPerPage);
                updatePaginatedDeposits();
            } else {
                console.error('Failed to fetch deposits:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching deposits:', error);
        }
    };

    const updatePaginatedDeposits = () => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        paginatedDeposits.value = deposits.value.slice(start, end);
    };

    const uniqueProviders = computed(() => {
        const providers = deposits.value.map(deposit => deposit.provider);
        return [...new Set(providers)];
    });

    const filteredDeposits = computed(() => {
        return paginatedDeposits.value.filter(deposit => {
            return (
                deposit.user_nickname.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
                (filterProvider.value === '' || deposit.provider === filterProvider.value)
            );
        });
    });

    onMounted(() => {
        fetchDeposits();
    });

    return {
        deposits,
        paginatedDeposits,
        currentPage,
        itemsPerPage,
        totalPages,
        searchQuery,
        filterProvider,
        fetchDeposits,
        updatePaginatedDeposits,
        uniqueProviders,
        filteredDeposits
    };
}
