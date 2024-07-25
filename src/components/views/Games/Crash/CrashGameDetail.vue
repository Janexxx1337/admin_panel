<template>
  <div class="container">
    <TableDetails
        :page-size="pageSize"
        :winning-bet="winningBet"
        :main-cards="mainCards"
        :grouped-bets="groupedBets"
        :winning-grouped-bets="winningGroupedBets"
        :losing-grouped-bets="losingGroupedBets"
        :current-page="currentPage"
        :winning-page="winningPage"
        :losing-page="losingPage"
        :active-tab="activeTab"
        @update:activeTab="activeTab = $event"
        @update:currentPage="currentPage = $event"
        @update:winningPage="winningPage = $event"
        @update:losingPage="losingPage = $event"
        @update:selectedItems="selectedItems = $event"
    />
  </div>
</template>

<script setup>
import TableDetails from '@/components/ui-kit/GamesTable/TableDetails.vue';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { crashGamesData } from '@/data/Crash/CrashGamesData.js';

const route = useRoute();
const gameId = route.params.id;

const selectedItems = ref([]);
const currentPage = ref(1);
const pageSize = ref(5);
const winningBet = ref('X3');
const activeTab = ref('bets');
const winningPage = ref(1);
const losingPage = ref(1);

const game = computed(() => {
  const allGames = [...crashGamesData.completedGames, ...crashGamesData.activeGames];
  return allGames.find(g => g.game_id === parseInt(gameId));
});

const mainCards = computed(() => {
  if (!game.value) return [];
  return [
    { title: 'Игра', value: `#${game.value.game_id}` },
    { title: 'Дата начала', value: new Date(game.value.date).toLocaleString() },
    { title: 'Дата завершения', value: new Date(new Date(game.value.date).getTime() + 1000 * 60 * 60 * 24).toLocaleString() },
    { title: 'Количество игроков', value: game.value.players },
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
  console.log('groupedBets:', groups); // Логирование данных для groupedBets
  return groups;
});

const winningGroupedBets = computed(() => {
  const result = groupedBets.value;
  console.log('winningGroupedBets:', result); // Логирование данных для winningGroupedBets
  return result;
});

const losingGroupedBets = computed(() => {
  if (!game.value) return [];
  const groups = [];
  ['x2_losses', 'x3_losses'].forEach(type => {
    if (game.value[type] && game.value[type].length > 0) {
      groups.push({ bet: type.toUpperCase(), items: game.value[type] });
    }
  });
  console.log('losingGroupedBets:', groups); // Логирование данных для losingGroupedBets
  return groups;
});

watch(groupedBets, () => {
  console.log("groupedBets updated: ", groupedBets.value);
});

watch(winningGroupedBets, () => {
  console.log("winningGroupedBets updated: ", winningGroupedBets.value);
});

watch(losingGroupedBets, () => {
  console.log("losingGroupedBets updated: ", losingGroupedBets.value);
});

</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table-item-image {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

:deep(.row-active) {
  background-color: #f0f8ff;
}

:deep(.el-table__row) {
  cursor: pointer;
}

.table {
  margin-top: 32px;
}

:deep(.el-tabs--border-card>.el-tabs__header) {
  padding: 0;
}

.table-footer {
  text-align: right;
  margin-top: 10px;
  font-weight: bold;
}
</style>
