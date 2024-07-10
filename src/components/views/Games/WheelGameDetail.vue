<template>
  <div class="container mt-4">
    <div class="card">
      <h1>Детали</h1>
      <div v-if="game">
        <div class="game-info">
          <p><strong>Game ID:</strong> {{ game.game_id }}</p>
          <p><strong>Date:</strong> {{ formattedDate }}</p>
          <p><strong>Players:</strong> {{ game.players }}</p>
          <p><strong>Bank:</strong> {{ totalBank }}$</p>
          <p><strong>Total Items:</strong> {{ totalItems }}</p>
        </div>
        <h2>Победители</h2>
        <p><strong>Победитель:</strong> {{ game.winner || 'N/A' }}</p>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width: 300px;">
          <div class="carousel-inner">
            <div v-for="(item, index) in allWins" :key="index" :class="['carousel-item', { active: index === 0 }]">
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
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const game = ref(null);

const fetchGameDetails = async (gameId) => {
  try {
    const response = await fetch(`http://localhost:8000/wheelgame/${gameId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    game.value = data;
  } catch (error) {
    console.error('Error fetching game details:', error);
  }
};

const imageError = (event) => {
  event.target.src = 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD';
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

const formattedDate = computed(() => {
  return game.value ? new Date(game.value.date).toLocaleString() : '';
});

const totalItems = computed(() => {
  return game.value ? game.value.x2_wins.length + game.value.x3_wins.length + game.value.x5_wins.length + game.value.x50_wins.length : 0;
});

const totalBank = computed(() => {
  return game.value ? calculateTotalPrice([...game.value.x2_wins, ...game.value.x3_wins, ...game.value.x5_wins, ...game.value.x50_wins]) : 0;
});

const allWins = computed(() => {
  return game.value ? [...game.value.x2_wins, ...game.value.x3_wins, ...game.value.x5_wins, ...game.value.x50_wins] : [];
});

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
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
}

.game-info p {
  margin: 5px 0;
}

h1, h2 {
  text-align: center;
  color: #333;
}

.winner-detail {
  max-width: 500px;
  margin: 0 auto;
}

.carousel {
  margin-top: 10px;
}

.carousel-inner .carousel-item {
  transition: transform 0.6s ease-in-out;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}
</style>
