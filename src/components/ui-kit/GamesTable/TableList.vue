<template>
  <div>
    <el-table :data="paginatedData" style="width: 100%" stripe border>
      <el-table-column prop="date" label="Date" sortable>
        <template #default="scope">
          {{ new Date(scope.row.date).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="players" label="Игроки" sortable></el-table-column>
      <el-table-column prop="bank" label="Банк" sortable>
        <template #default="scope">
          {{ scope.row.game_value }}$
        </template>
      </el-table-column>
      <el-table-column prop="winner" label="Победитель" sortable>
        <template #default="scope">
          <router-link
              :to="{ name: 'UserCard', params: { id: 1} }"
              v-if="scope.row.winner"
          >
            {{ scope.row.winner }}
          </router-link>
          <span v-else>N/A</span>
        </template>
      </el-table-column>

      <el-table-column label="Действия">
        <template #default="scope">
          <router-link :to="{ name: routeName, params: { id: scope.row[routeIdKey] } }">
            <el-button type="primary">Детали</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="totalItems"
        :page-size="pageSize"
        @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  data: Array,
  totalItems: Number,
  pageSize: Number,
  currentPage: Number,
  filterType: String,
  filterDate: Array,
  routeName: String,
  routeIdKey: String
});

const emit = defineEmits(['update:currentPage']);

const filteredGames = computed(() => {
  let result = props.data;

  if (props.filterType === 'completed') {
    result = result.filter(game => game.winner !== undefined && game.winner !== null);
  } else if (props.filterType === 'active') {
    result = result.filter(game => game.winner === undefined || game.winner === null);
  }

  if (Array.isArray(props.filterDate) && props.filterDate.length === 2) {
    const [start, end] = props.filterDate.map(date => new Date(date));
    result = result.filter(game => {
      const gameDate = new Date(game.date);
      return gameDate >= start && gameDate <= end;
    });
  }

  return result;
});

const paginatedData = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize;
  return filteredGames.value.slice(start, start + props.pageSize);
});

const handlePageChange = (page) => {
  emit('update:currentPage', page);
};
</script>

<style scoped>
.item span {
  font-size: 14px;
}

:deep(.el-button) {
  display: block;
  margin: 0 auto;
  width: 100%;
}
</style>
