<template>
  <div class="container mt-4">
    <h1>Wheel Games</h1>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'completed' }" @click="activeTab = 'completed'">Completed Games</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'active' }" @click="activeTab = 'active'">Active Games</a>
      </li>
    </ul>

    <div v-if="activeTab === 'completed'" class="tab">
      <h2>Completed Games</h2>
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
        <tr>
          <th>Game ID</th>
          <th>Date</th>
          <th>Bank</th>
          <th>Players</th>
          <th>X2 Amount</th>
          <th>X3 Amount</th>
          <th>X5 Amount</th>
          <th>X50 Amount</th>
          <th>Winner</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in completedGames" :key="game.id">
          <td>{{ game.game_id }}</td>
          <td>{{ new Date(game.date).toLocaleString() }}</td>
          <td>{{ calculateTotalPrice([...game.x2_wins, ...game.x3_wins, ...game.x5_wins, ...game.x50_wins]) }}$</td>
          <td>{{ game.players }}</td>
          <td>
            <div v-for="(item, index) in game.x2_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x2_wins.length > 2" class="item-more">
              +{{ game.x2_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x2_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x3_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x3_wins.length > 2" class="item-more">
              +{{ game.x3_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x3_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x5_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x5_wins.length > 2" class="item-more">
              +{{ game.x5_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x5_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x50_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x50_wins.length > 2" class="item-more">
              +{{ game.x50_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x50_wins) }}$</div>
          </td>
          <td>{{ game.winner || 'N/A' }}</td>
          <td>
            <button @click="openModal(game)" class="btn btn-primary">
              Детали
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="activeTab === 'active'" class="tab">
      <h2>Active Games</h2>
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
        <tr>
          <th>Game ID</th>
          <th>Date</th>
          <th>Bank</th>
          <th>Players</th>
          <th>X2 Amount</th>
          <th>X3 Amount</th>
          <th>X5 Amount</th>
          <th>X50 Amount</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in activeGames" :key="game.id">
          <td>{{ game.game_id }}</td>
          <td>{{ new Date(game.date).toLocaleString() }}</td>
          <td>{{ calculateTotalPrice([...game.x2_wins, ...game.x3_wins, ...game.x5_wins, ...game.x50_wins]) }}$</td>
          <td>{{ game.players }}</td>
          <td>
            <div v-for="(item, index) in game.x2_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x2_wins.length > 2" class="item-more">
              +{{ game.x2_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x2_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x3_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x3_wins.length > 2" class="item-more">
              +{{ game.x3_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x3_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x5_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x5_wins.length > 2" class="item-more">
              +{{ game.x5_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x5_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x50_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x50_wins.length > 2" class="item-more">
              +{{ game.x50_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x50_wins) }}$</div>
          </td>
          <td>
            <button @click="openModal(game)" class="btn btn-primary">
              Детали
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Game Details</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><strong>Date:</strong> {{ new Date(selectedGame.date).toLocaleString() }}</p>
            <p><strong>Players:</strong> {{ selectedGame.players }}</p>
            <p><strong>Bank:</strong> {{ calculateTotalPrice([...selectedGame.x2_wins, ...selectedGame.x3_wins, ...selectedGame.x5_wins, ...selectedGame.x50_wins]) }}$</p>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(item, index) in [...selectedGame.x2_wins, ...selectedGame.x3_wins, ...selectedGame.x5_wins, ...selectedGame.x50_wins]" :key="index" :class="['carousel-item', { active: index === 0 }]">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const completedGames = ref([]);
const activeGames = ref([]);
const selectedGame = ref(null);
const showModal = ref(false);
const activeTab = ref('completed');  // Для управления активной вкладкой

const fetchCompletedGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/wheelgame/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const games = data.wheel_games;
    completedGames.value = games.filter(game => !game.is_active);
  } catch (error) {
    console.error('Error fetching completed games:', error);
  }
};

const fetchActiveGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/wheelgame/activegames/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    activeGames.value = data.active_wheel_games;
  } catch (error) {
    console.error('Error fetching active games:', error);
  }
};

const imageError = (event) => {
  event.target.src = 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD';
};

const openModal = (game) => {
  selectedGame.value = game;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

onMounted(() => {
  fetchCompletedGames();
  fetchActiveGames();
});
</script>

<style scoped>
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.table thead th {
  background-color: #343a40;
  color: white;
}

.item-list {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.item-image {
  width: 100px;
  height: 50px;
  object-fit: cover;
  margin-right: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.item-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item span {
  font-size: 14px;
}

.item-more {
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  margin-top: 8px;
}

.item-more:hover {
  text-decoration: underline;
}

.total-price {
  font-weight: bold;
  margin-top: 5px;
}

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.nav-link {
  cursor: pointer;
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
