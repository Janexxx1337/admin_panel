<template>
  <div class="game-items-area w-100">
    <div class="game-items-side side-left"
         :class="game.host.side"
         :style="{ opacity: game.winner && game[game.winner].side === opponentSide ? 0.3 : 1 }">
      <coinflip-items-data-line :host="game.host" :player="game.host" />
      <div class="items ui-container">
        <steam-item-min
          class="item-slot"
          v-for="(el, index) in game.host.items"
          :key="index"
          :rarity="el"
          :icon-url="'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD'"
          :selectable="false"
        />
        <div class="item-slot empty" v-for="n in Array.from({ length: hostEmptySlots })"></div>
      </div>
    </div>

    <div class="game-items-side side-right"
         :class="opponentSide"
         :style="{ opacity: game.winner && game[game.winner].side === game.host.side ? 0.3 : 1 }">
      <coinflip-items-data-line :host="game.host" :player="game.opponent" />
      <div class="items ui-container" ref="parentItems">
        <div class="probe" ref="probe">
          <div ref="probeItem">
            <steam-item-min />
          </div>
        </div>
        <steam-item-min
          class="item-slot"
          v-for="(el, index) in (game.opponent ? game.opponent.items : [])"
          :key="index"
          :rarity="el"
          :icon-url="'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD'"
          :selectable="false"
        />
        <div class="item-slot empty" v-for="n in Array.from({ length: opponentEmptySlots })"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SteamItemMin from '../SteamItemMin.vue';
import CoinflipItemsDataLine from './CoinflipItemsDataLine.vue';
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';

const props = defineProps({
  game: Object,
});

const probe = ref(null);
const probeItem = ref(null);

const opponentSide = computed(() => {
  return props.game.host.side === 't' ? 'ct' : 't';
});

const parentItems = ref(null);
const hostEmptySlots = ref(0);
const opponentEmptySlots = ref(0);

const calculateEmptySlots = (items) => {
  if (!probe.value || !probeItem.value || !parentItems.value) {
    return 0;
  }

  const style = window.getComputedStyle(probe.value);
  const gapY = parseFloat(style.rowGap) || 0;
  const gapX = parseFloat(style.columnGap) || 0;
  const itemWidth = probeItem.value.offsetWidth || 0;
  const itemHeight = probeItem.value.offsetHeight || 0;
  const columns = Math.floor((parentItems.value.offsetWidth + gapX) / (itemWidth + gapX - 1));
  const rows = Math.floor((parentItems.value.offsetHeight + gapY) / (itemHeight + gapY));
  const totalSlots = columns * rows;
  const emptySlots = totalSlots - items.length;
  return emptySlots > 0 ? emptySlots : 0;
};

const updateEmptySlots = () => {
  hostEmptySlots.value = calculateEmptySlots(props.game.host.items);
  opponentEmptySlots.value = calculateEmptySlots(props.game.opponent ? props.game.opponent.items : []);
};

onMounted(() => {
  watchEffect(() => {
    updateEmptySlots();
  });

  window.addEventListener('resize', updateEmptySlots);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateEmptySlots);
});
</script>

<style lang="scss" scoped>
.game-items-area {
  display: flex;
  gap: var(--spacing-distance-20, 1.25rem);
  flex-wrap: wrap;

  .game-items-side {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex: 1 1 calc(50% - 0.625rem);
    justify-content: space-between;

    .items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
      gap: var(--spacing-distance-4, 0.25rem);
      height: 31.25rem;
      overflow-y: auto;
      position: relative;

      .item-slot {
        display: flex;
        height: 5rem;
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        border-radius: 0.375rem;
        &.empty {
          background: rgb(0 0 0 / 9%);
        }
      }
    }
  }
}

.probe {
  position: absolute;
  left: 0;
  right: 0;
  display: inherit;
  gap: inherit;
  grid-template-columns: inherit;
  opacity: 0;
  z-index: -1;
}

@media (max-width: 993px) {
  .game-items-area {
    flex-flow: column nowrap;
    .game-items-side {
      .items {
        height: 10.5rem;
      }
    }
  }
}
</style>
