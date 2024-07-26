<template>
  <div class="container">
    <TableDetails
        :page-size="pageSize"
        :winning-bet="winningBet"
        :main-cards="mainCards"
        :grouped-bets="groupedBets"
        :winning-grouped-bets="winningGroupedBets"
        :current-page="currentPage"
        :winning-page="winningPage"
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
        @update:current-page="currentPage = $event"
        @update:winning-page="winningPage = $event"
        @update:selected-items="selectedItems = $event"
    />
  </div>
</template>

<script setup>
import TableDetails from '@/components/ui-kit/GamesTable/TableDetails.vue';
import { ref, computed } from 'vue';
import { items, winningItems } from '@/data/CoinFlip/CoinflipDetails.js';

const selectedItems = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const winningBet = ref('X3');
const activeTab = ref('bets');
const winningPage = ref(1);

const mainCards = [
  { title: 'Игра', value: '#2299292' },
  { title: 'Дата начала', value: new Date().toLocaleString() },
  { title: 'Дата завершения', value: new Date(new Date().getTime() + 1000 * 60 * 60 * 24).toLocaleString() },
  { title: 'Количество игроков', value: '15' },
];


const groupedBets = computed(() => items);

const winningGroupedBets = computed(() => {
  const groups = winningItems.reduce((acc, item) => {
    if (!acc[item.bet]) {
      acc[item.bet] = { bet: item.bet, items: [] };
    }
    acc[item.bet].items.push(item);
    return acc;
  }, {});
  return Object.values(groups);
});
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
