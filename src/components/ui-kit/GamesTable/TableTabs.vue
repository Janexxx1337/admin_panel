<template>
  <div class="table">
    <el-main>
      <el-tabs :model-value="activeTab" @update:model-value="$emit('update:activeTab', $event)" type="border-card">
        <el-tab-pane label="Таблица ставок" name="bets">
          <el-divider></el-divider>
          <h2>Таблица ставок</h2>
          <el-collapse>
            <el-collapse-item
                v-for="(betGroup, index) in pagedGroupedBets"
                :title="getTitle(betGroup, index)"
                :name="index"
                :key="index"
            >
              <el-table
                  :data="betGroup.items || []"
                  style="width: 100%"
                  @row-click="selectRow"
                  :row-class-name="getRowClassName"
                  stripe
                  border
              >
                <el-table-column prop="weapon_id" label="ID предмета"></el-table-column>
                <el-table-column prop="weapon_img" label="Предмет">
                  <template v-slot="scope">
                    <img :src="scope.row.weapon_img" alt="item" class="table-item-image" />
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Стоимость предмета ($)"></el-table-column>
                <el-table-column prop="time" label="Время ставки"></el-table-column>
              </el-table>
              <div class="table-footer">
                <strong>Общая стоимость: {{ calculateTotalAmount(betGroup.items) }}$</strong>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="groupedBets.length"
              :page-size="pageSize"
              v-if="groupedBets.length > pageSize"
              @current-change="handlePageChange"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="Выигрышные ставки" name="winning-bets">
          <h2>Выигрышные ставки</h2>
          <el-collapse>
            <el-collapse-item
                v-for="(betGroup, index) in pagedWinningGroupedBets"
                :title="getTitle(betGroup, index)"
                :name="index"
                :key="index"
            >
              <el-table
                  :data="betGroup.items || []"
                  style="width: 100%"
                  @row-click="selectRow"
                  :row-class-name="getRowClassName"
                  stripe
                  border
              >
                <el-table-column prop="weapon_id" label="ID предмета"></el-table-column>
                <el-table-column prop="weapon_img" label="Предмет">
                  <template v-slot="scope">
                    <img :src="scope.row.weapon_img" alt="item" class="table-item-image" />
                  </template>
                </el-table-column>
                <el-table-column prop="amount" label="Стоимость предмета ($)"></el-table-column>
                <el-table-column prop="time" label="Время ставки"></el-table-column>
              </el-table>
              <div class="table-footer">
                <strong>Общая стоимость: {{ calculateTotalAmount(betGroup.items) }}$</strong>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="winningGroupedBets.length"
              :page-size="pageSize"
              v-if="winningGroupedBets.length > pageSize"
              @current-change="handleWinningPageChange"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  groupedBets: Array,
  pageSize: {
    type: Number,
    default: 10
  },
  winningGroupedBets: Array,
  selectedItems: Array,
  currentPage: Number,
  winningPage: Number,
  activeTab: String
});

const emit = defineEmits(['update:activeTab', 'update:currentPage', 'update:winningPage', 'update:selectedItems']);

const selectedRow = ref(null);
const route = useRoute();

console.log('Current route:', route);

const pagedGroupedBets = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.groupedBets.slice(start, end);
});

const pagedWinningGroupedBets = computed(() => {
  const start = (props.winningPage - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.winningGroupedBets.slice(start, end);
});

watch(pagedGroupedBets, () => {
  console.log("pagedGroupedBets updated: ", pagedGroupedBets.value);
});

watch(pagedWinningGroupedBets, () => {
  console.log("pagedWinningGroupedBets updated: ", pagedWinningGroupedBets.value);
});

function handlePageChange(page) {
  emit('update:currentPage', page);
}

function handleWinningPageChange(page) {
  emit('update:winningPage', page);
}

function selectRow(row) {
  selectedRow.value = row;
  emit('update:selectedItems', Array(row.quantity).fill().map((_, index) => ({
    image: row.weapon_img,
    index
  })));
}

function getRowClassName({ row }) {
  return row === selectedRow.value ? 'row-active' : '';
}

function calculateTotalAmount(items) {
  return items.reduce((total, item) => total + item.amount, 0);
}

function getRandomSector() {
  const sectors = ['X2', 'X3', 'X5', 'X50'];
  return sectors[Math.floor(Math.random() * sectors.length)];
}

function getRandomCoefficient() {
  return (Math.random() * (56.6 - 1.1) + 1.1).toFixed(1);
}

function getTitle(betGroup, index) {
  const baseTitle = `Ставка: - Игрок: ${betGroup.items[0]?.steamID} - Общая стоимость: ${calculateTotalAmount(betGroup.items)}$`;
  let additionalInfo = '';

  console.log('route.name:', route.name);

  if (route.name === 'CoinflipGameDetail') {
    additionalInfo = index % 2 === 0 ? 'Сторона: T' : 'Сторона: CT';
  } else if (route.name === 'another') {
    additionalInfo = `Сектор: ${getRandomSector()}`;
  } else if (route.name === 'CrashGameDetail') {
    additionalInfo = `- Коэффициент: ${getRandomCoefficient()}`;
  }

  return `${baseTitle} ${additionalInfo}`;
}
</script>

<style scoped>
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
