<template>
  <div class="table">
    <el-main>
      <el-tabs :model-value="activeTab" @update:model-value="$emit('update:activeTab', $event)" type="border-card">
        <!-- Таблица ставок -->
        <el-tab-pane label="Таблица ставок" name="bets">
          <h2>Таблица ставок</h2>
          <BetTable
              :bets="groupedBets"
              :page-size="pageSize"
              :total="groupedBets.length"
              :current-page="currentPage"
              :route-name="route.name"
              @update:currentPage="handlePageChange"
              @update:selectedItems="updateSelectedItems"
          />
        </el-tab-pane>

        <!-- Выигрышные ставки -->
        <el-tab-pane label="Выигрышные ставки" name="winning-bets">
          <h2>Выигрышные ставки</h2>
          <BetTable
              :bets="winningGroupedBets"
              :page-size="pageSize"
              :total="winningGroupedBets.length"
              :current-page="winningPage"
              :route-name="route.name"
              @update:currentPage="handleWinningPageChange"
              @update:selectedItems="updateSelectedItems"
          />
        </el-tab-pane>

        <!-- Проигрышные ставки -->
        <el-tab-pane v-if="route.name === 'CrashGameDetail'" label="Проигрышные ставки" name="losing-bets">
          <h2>Проигрышные ставки</h2>
          <BetTable
              :bets="losingGroupedBets"
              :page-size="pageSize"
              :total="losingGroupedBets.length"
              :current-page="losingPage"
              :route-name="route.name"
              @update:currentPage="handleLosingPageChange"
              @update:selectedItems="updateSelectedItems"
          />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import BetTable from '@/components/ui-kit/GamesTable/BetTable.vue';
import losingBetsData from '@/data/Crash/LosingBets.js';

const props = defineProps({
  groupedBets: Array,
  pageSize: {
    type: Number,
    default: 10
  },
  winningGroupedBets: Array,
  losingGroupedBets: {
    type: Array,
    default: () => losingBetsData
  },
  selectedItems: Array,
  currentPage: Number,
  winningPage: Number,
  losingPage: {
    type: Number,
    default: 1
  },
  activeTab: String
});

const emit = defineEmits(['update:activeTab', 'update:currentPage', 'update:winningPage', 'update:losingPage', 'update:selectedItems']);

const route = useRoute();

function handlePageChange(page) {
  emit('update:currentPage', page);
}

function handleWinningPageChange(page) {
  emit('update:winningPage', page);
}

function handleLosingPageChange(page) {
  emit('update:losingPage', page);
}

function updateSelectedItems(items) {
  emit('update:selectedItems', items);
}
</script>

<style scoped>
.table {
  margin-top: 32px;
}

:deep(.el-tabs--border-card>.el-tabs__header) {
  padding: 0;
}
</style>
