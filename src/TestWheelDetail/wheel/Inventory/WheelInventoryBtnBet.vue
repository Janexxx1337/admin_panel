<template>
  <div
    class="wrapper-btn wrapper-fixed-btn w-100"
    :class="{ 'show-inventory': isMobileInventoryShown }"
  >
    <button
      class="btn-main w-100"
      @click="joinGame"
      :class="{ disabled: disabledBtn }"
    >
      MAKE BET {{ large ? ' $0.00' : ''}}
    </button>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useRoute } from 'vue-router';
import { useWindowWidth } from '../../composables';

const { large } = useWindowWidth();
const route = useRoute();
const props = defineProps({
  currentGame: Object,
  isMobileInventoryShown: Boolean,
});
const emit = defineEmits(['changeMobileInventoryShown']);

const disabledBtn = computed(() => {
  return route.name === 'wheel-history' ||
  route.name === 'wheel-history-game' ||
  props.currentGame.winner !== null;
});

const joinGame = () => {
  emit('changeMobileInventoryShown', !props.isMobileInventoryShown);
};
</script>