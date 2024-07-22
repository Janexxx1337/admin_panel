<template>
  <el-button @click="goBack" class="back-button">
    <span class="material-symbols-outlined">arrow_back</span>
    <span>Назад</span>
  </el-button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #66b1ff;
}

.back-button .material-symbols-outlined {
  margin-right: 8px;
}
</style>
