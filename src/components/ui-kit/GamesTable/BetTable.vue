<template>
  <div>
    <el-collapse>
      <el-collapse-item
          v-for="(betGroup, index) in pagedBets"
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
        :total="total"
        :page-size="pageSize"
        v-if="total > pageSize"
        @current-change="handlePageChange"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  bets: Array,
  pageSize: {
    type: Number,
    default: 10
  },
  total: Number,
  currentPage: Number,
  selectedItems: Array,
  routeName: String
});

const emit = defineEmits(['update:currentPage', 'update:selectedItems']);

const selectedRow = ref(null);

const pagedBets = computed(() => {
  const start = (props.currentPage - 1) * props.pageSize;
  const end = start + props.pageSize;
  return props.bets.slice(start, end);
});

watch(pagedBets, () => {
  console.log("pagedBets updated: ", pagedBets.value);
});

function handlePageChange(page) {
  emit('update:currentPage', page);
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

function getTitle(betGroup, index) {
  const baseTitle = `Ставка: - Игрок: ${betGroup.items[0]?.steamID} - Общая стоимость: ${calculateTotalAmount(betGroup.items)}$`;
  let additionalInfo = '';

  if (props.routeName === 'CoinflipGameDetail') {
    additionalInfo = index % 2 === 0 ? 'Сторона: T' : 'Сторона: CT';
  } else if (props.routeName === 'another') {
    additionalInfo = `Сектор: ${getRandomSector()}`;
  } else if (props.routeName === 'CrashGameDetail') {
    additionalInfo = `- Коэффициент: ${getRandomCoefficient()}`;
  }

  return `${baseTitle} ${additionalInfo}`;
}

function getRandomSector() {
  const sectors = ['X2', 'X3', 'X5', 'X50'];
  return sectors[Math.floor(Math.random() * sectors.length)];
}

function getRandomCoefficient() {
  return (Math.random() * (56.6 - 1.1) + 1.1).toFixed(1);
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

.table-footer {
  text-align: right;
  margin-top: 10px;
  font-weight: bold;
}
</style>
