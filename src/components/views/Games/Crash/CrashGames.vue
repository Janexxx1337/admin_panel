<template>
  <el-container class="mt-4 container">
    <el-header>
      <h1>Crash Games</h1>
    </el-header>

    <FilterPanel
        :filter-type="filterType"
        :filter-date="filterDate"
        @update:filter-type="filterType = $event"
        @update:filter-date="filterDate = $event"
    />

    <LoadingComponent v-if="loading" />

    <div v-else>
      <TableList
          :data="games"
          :total-items="games.length"
          :page-size="pageSize"
          :current-page="currentPage"
          :filter-type="filterType"
          :filter-date="filterDate"
          :route-name="'CrashGameDetail'"
          :route-id-key="'game_id'"
          @update:current-page="handleCurrentChange"
      />
    </div>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { crashGamesData } from '@/data/Crash/CrashGamesData';
import FilterPanel from '@/components/ui-kit/FilterPanel.vue';
import LoadingComponent from '@/components/ui-kit/LoadingComponent.vue';
import TableList from '@/components/ui-kit/GamesTable/TableList.vue';

const games = ref([...crashGamesData.completedGames, ...crashGamesData.activeGames]);
const loading = ref(false);
const pageSize = ref(10);
const currentPage = ref(1);
const filterType = ref('all');
const filterDate = ref([]);

const handleCurrentChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.item span {
  font-size: 14px;
}
</style>
