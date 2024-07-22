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
import { useRoute } from 'vue-router';
import { classicGamesData } from '@/data/Classic/ClassicData.js';

const route = useRoute();
const gameId = route.params.id;

const selectedItems = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const winningBet = ref('X3');
const activeTab = ref('bets');
const winningPage = ref(1);

const game = computed(() => {
  const allGames = [...classicGamesData.completedGames, ...classicGamesData.activeGames];
  return allGames.find(g => g.game_id === parseInt(gameId));
});

const mainCards = computed(() => {
  if (!game.value) return [];
  return [
    { title: 'Игра', value: `#${game.value.game_id}` },
    { title: 'Дата', value: new Date(game.value.date).toLocaleString() },
    { title: 'Игроки', value: game.value.players },
    { title: 'Выиграшнная ставка', value: game.value.winner_ticket || 'N/A' },
    { title: 'Итоговая сумма', value: `${game.value.game_value}$` }
  ];
});

const groupedBets = computed(() => {
  if (!game.value) return [];
  const groups = [];
  ['x2_wins', 'x3_wins', 'x5_wins', 'x50_wins'].forEach(type => {
    if (game.value[type] && game.value[type].length > 0) {
      groups.push({ bet: type.toUpperCase(), items: game.value[type] });
    }
  });
  return groups;
});

const winningGroupedBets = computed(() => groupedBets.value);
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
