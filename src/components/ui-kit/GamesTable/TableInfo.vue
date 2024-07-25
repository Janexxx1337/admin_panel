<template>
  <el-aside width="300px">
    <div class="inventory">
      <BackButton />
      <div class="inventory_bets">
        <div class="game_details">
          <div class="game_details-cards">
            <el-card class="game-card" v-for="(card, index) in mainCards" :key="index">
              <div class="game-card-content">
                <span class="game-card-title">{{ card.title }}:</span>
                <span>{{ card.value }}</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import BackButton from '@/components/ui-kit/BackButton.vue';

const props = defineProps({
  pageSize: Number,
  winningBet: String,
  mainCards: Array,
});
</script>

<style scoped>

.game-card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inventory_items img {
  width: 25%;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
}

ul {
  display: flex;
  gap: 0.5rem;
  padding: 0;
}

ul li {
  list-style: none;
  border: 1px solid goldenrod;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

ul li.active {
  background-color: #f0c674;
  color: white;
}
</style>
