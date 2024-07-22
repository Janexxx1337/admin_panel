<template>
  <div class="filter_panel">
    <el-row :gutter="20" class="mb-4">
      <el-col :span="12">
        <el-select v-model="localFilterType" placeholder="Select Type" class="filter-select">
          <el-option label="Все" value="all"></el-option>
          <el-option label="Завершенные" value="completed"></el-option>
          <el-option label="Активные" value="active"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-date-picker
            v-model="localFilterDate"
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            class="filter-select"
            clearable
            @change="updateFilterDate"
        ></el-date-picker>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  filterType: String,
  filterDate: Array,
});

const emit = defineEmits(['update:filterType', 'update:filterDate']);

const localFilterType = ref(props.filterType);
const localFilterDate = ref(props.filterDate || []);

watch(localFilterType, (newValue) => {
  emit('update:filterType', newValue);
});

watch(localFilterDate, (newValue) => {
  emit('update:filterDate', newValue);
});

function updateFilterDate(value) {
  localFilterDate.value = value ? value : [];
}
</script>

<style scoped>
.filter_panel {
  display: flex;
  justify-content: center;
}

.filter-select {
  width: 100%;
}
</style>
