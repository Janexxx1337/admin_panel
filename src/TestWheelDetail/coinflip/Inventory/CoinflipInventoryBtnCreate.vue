<template>
  <div
    class="wrapper-btn wrapper-fixed-btn w-100"
    :class="{ 'show-inventory': isMobileInventoryShown }"
  >
    <button
      class="btn-gray btn-back-games"
      @click="goBackGames"
      v-if="!large && showBackToGames"
    >
      BACK TO GAMES
    </button>
    <button
      v-else-if="isOnJoinPage"
      class="btn-main w-100"
      @click="joinGame()"
      :class="{ disabled: disabledBtn }"
    >
      JOIN $0.00
    </button>
    <button
      v-else
      class="btn-main w-100"
      @click="createCoinflip()"
      :class="{ disabled: disabledBtn }"
    >
      CREATE COINFLIP
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useWindowWidth } from '../../composables';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const { large } = useWindowWidth();

const props = defineProps({
  isMobileInventoryShown: Boolean,
  currentGame: Object
});

const emit = defineEmits(['changeMobileInventoryShown']);

const disabledBtn = computed(() => {
  return props.currentGame && props.currentGame.opponent;
});

const showBackToGames = computed(() => {
  return (
    route.name === 'coinflip-game' &&
    props.currentGame &&
    props.currentGame.winner
  );
});

const isOnJoinPage = computed(() => {
  return (
    route.name === 'coinflip-game' &&
    props.currentGame &&
    !props.currentGame.opponent
  );
});

const createCoinflip = () => {
  emit('changeMobileInventoryShown', !props.isMobileInventoryShown);
};

const joinGame = () => {
  emit('changeMobileInventoryShown', !props.isMobileInventoryShown);
};

const goBackGames = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
  .btn-back-games {
    display: flex;
    height: auto;
    padding: 1.0625rem 1.5rem;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
    border: none;
    width: 100%;
  }
</style>
