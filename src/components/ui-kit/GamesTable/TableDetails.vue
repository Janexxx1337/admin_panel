<template>
  <div class="container">
    <el-container>
      <TableInfo
          :main-cards="mainCards"
          :page-size="pageSize"
          :winning-bet="winningBet"
      />
      <TableTabs
          :grouped-bets="groupedBets"
          :winning-grouped-bets="winningGroupedBets"
          :page-size="pageSize"
          :current-page="currentPage"
          :winning-page="winningPage"
          :active-tab="activeTab"
          @update:active-tab="updateActiveTab"
          @update:current-page="updateCurrentPage"
          @update:winning-page="updateWinningPage"
          @update:selected-items="updateSelectedItems"
      />
    </el-container>
  </div>
</template>

<script setup>
import TableInfo from "@/components/ui-kit/GamesTable/TableInfo.vue";
import TableTabs from "@/components/ui-kit/GamesTable/TableTabs.vue";

const props = defineProps({
  pageSize: Number,
  winningBet: String,
  mainCards: Array,
  groupedBets: Array,
  winningGroupedBets: Array,
  currentPage: Number,
  winningPage: Number,
  activeTab: String,
});

const emit = defineEmits(['update:activeTab', 'update:currentPage', 'update:winningPage', 'update:selectedItems']);

function updateActiveTab(value) {
  emit('update:activeTab', value);
}

function updateCurrentPage(value) {
  emit('update:currentPage', value);
}

function updateWinningPage(value) {
  emit('update:winningPage', value);
}

function updateSelectedItems(value) {
  emit('update:selectedItems', value);
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
