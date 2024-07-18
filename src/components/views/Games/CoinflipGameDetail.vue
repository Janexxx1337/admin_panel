<template>
  <el-container class="mt-4 container">
    <el-card shadow="hover" class="card">
      <el-row>
        <el-col :span="24">
          <el-page-header @back="goBack" content="Детали Coinflip Игры"></el-page-header>
        </el-col>
      </el-row>
      <div v-if="game">
        <el-row class="game-info">
          <el-col :span="12"><p><strong>Game ID:</strong> {{ game.id }}</p></el-col>
          <el-col :span="12"><p><strong>Date:</strong> {{ formattedDate }}</p></el-col>
          <el-col :span="12"><p><strong>Players:</strong> {{ game.players }}</p></el-col>
          <el-col :span="12"><p><strong>Bank:</strong> {{ totalBank }}$</p></el-col>
          <el-col :span="12"><p><strong>Total Items:</strong> {{ totalItems }}</p></el-col>
        </el-row>
        <el-divider></el-divider>
        <h2>Победитель</h2>
        <p><strong>Победитель:</strong> {{ game.winner || 'N/A' }}</p>
        <p><strong>Победный билет:</strong> {{ game.winner_ticket }}</p>
        <p><strong>Стоимость игры:</strong> {{ game.game_value }}</p>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width: 300px; margin: 0 auto;">
          <div class="carousel-inner">
            <div v-for="(item, index) in game.items" :key="index" :class="['carousel-item', { active: index === 0 }]">
              <img :src="item.image_url" :alt="item.name" class="d-block w-100" @error="imageError" />
              <div class="carousel-caption d-none d-md-block">
                <h5>{{ item.name }}</h5>
                <p>{{ item.rarity }} - {{ item.price }}$</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div v-else>
        <el-empty description="Loading..."></el-empty>
      </div>
    </el-card>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { coinflipGamesData } from '@/data/CoinflipGames';

const route = useRoute();
const router = useRouter();
const game = ref(null);

const fetchGameDetails = (gameId) => {
  game.value = coinflipGamesData.completedGames.find(g => g.id === parseInt(gameId)) ||
      coinflipGamesData.activeGames.find(g => g.id === parseInt(gameId));
};

const imageError = (event) => {
  event.target.src = 'https://via.placeholder.com/100x50?text=No+Image';
};

const formattedDate = computed(() => {
  return game.value ? new Date(game.value.date).toLocaleString() : '';
});

const totalItems = computed(() => {
  return game.value ? game.value.items.length : 0;
});

const totalBank = computed(() => {
  return game.value ? calculateTotalPrice(game.value.items) : 0;
});

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchGameDetails(route.params.id);
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.card {
  background: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

.game-info p {
  margin: 5px 0;
  font-size: 1.2rem;
  color: #333;
}

h1, h2 {
  text-align: center;
  color: #333;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 10px;
  color: #fff;
}
</style>
