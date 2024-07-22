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
        @update:activeTab="activeTab = $event"
        @update:currentPage="currentPage = $event"
        @update:winningPage="winningPage = $event"
        @update:selectedItems="selectedItems = $event"
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
  { title: 'БАНК', value: '150000044$' },
  { title: 'Айтемы', value: '34' },
  { title: 'Игроки', value: '15' },
  { title: 'Выиграшнная ставка', value: 'X3' },
  { title: 'Выиграшнный билет', value: '150000044$' },
  { title: 'Хеш игры', value: '423434394939BFjdfnfdjdfi992' }
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
