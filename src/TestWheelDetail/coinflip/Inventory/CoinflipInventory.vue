<template>
  <div
    class="click-close-inventory w-100 h-100"
    :class="{ 'show-inventory': isMobileInventoryShown }"
    @click="emit('changeMobileInventoryShown', false)"
  ></div>
  <inventory
    :items-con-height="large ? 276 : 250"
    :class="{ 'show-inventory': isMobileInventoryShown }"
    ref="coinflipInventory"
  >
    <template v-slot:title>
      <div class="d-flex justify-content-between w-100">
        <ui-title with-icon>
          <template v-slot:default> Coinflip </template>
          <template v-slot:icon>
            <i class="icon icon-Coinflip"></i>
          </template>
        </ui-title>
        <div class="btn-close-inventory" @click="emit('changeMobileInventoryShown', false)">
          <i class="icon icon-cross-x"></i>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <div class="d-flex w-100 gap-1">
        <coinflip-inventory-sides />
      </div>
    </template>
    <template v-slot:sub-title>
      <div class="mobile-wrapper d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center w-100">
          <div class="head d-flex align-items-baseline">
            <ui-title>
              <template v-slot:default> Inventory </template>
            </ui-title>
            <span>456</span>
          </div>

          <button class="btn-common" @click="showModal">SHOP</button>
          <modal-shop class="w-100" v-if="isModalShown" @close="hideModal" />
        </div>
        <coinflip-items-data-line
          v-if="isOnJoinPage && !large"
          :host="currentGame.host"
          :player="currentGame.opponent"
        />
      </div>
    </template>
    <template v-slot:actions-btn>
      <slot
        name="actions-btn"
        :isOnJoinPage="isOnJoinPage"
      ></slot>
    </template>
  </inventory>
</template>

<script setup>
import Inventory from '../../Containers/Inventory.vue';
import CoinflipInventorySides from './CoinflipInventorySides.vue';
import UiTitle from '../../UI/UiTitle.vue';
// import ModalShop from '@/components/Base/Modals/ModalShop.vue';
import CoinflipItemsDataLine from '../CoinflipItemsDataLine.vue';

import { useWindowWidth } from '../../composables';

import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  currentGame: Object,
  isMobileInventoryShown: Boolean,
});
const emit = defineEmits(['changeMobileInventoryShown']);
const { large } = useWindowWidth();

const isModalShown = ref(false);

const isOnJoinPage = computed(() => {
  return (
    route.name === 'coinflip-game' &&
    props.currentGame &&
    !props.currentGame.opponent
  );
});

const showModal = () => {
  isModalShown.value = true;
};

const hideModal = () => {
  isModalShown.value = false;
};
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.3;
}
.click-close-inventory {
  position: fixed;
  background: transparent;
  z-index: 10;
  left: 0;
  display: none;
  top: 100%;
}
.btn-close-inventory {
  display: none;
  font-size: 0.875rem;
  color: #a8abba;
}
.mobile-wrapper {
  gap: 0.75rem;
}
@media (max-width: 993px) {
  .btn-close-inventory {
    display: block;
  }
  .click-close-inventory {
    display: block;
    &.show-inventory {
      top: 0;
    }
  }
  .inventory {
    width: 100%;
    position: fixed;
    bottom: -100%;
    z-index: 4;
    height: auto;
    transition: all 0.5s ease-in-out;
    &.show-inventory {
      bottom: calc(3.75rem - 0.0625rem);
      z-index: 12 !important;
    }
  }
  .wrapper-btn {
    bottom: calc(3.75rem - 0.0625rem);
    left: 0;
    padding: 0.75rem 1.25rem;
    transition: all 0.5s ease-in-out;
    background-color: #171820;
    z-index: 4;
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
    &.show-inventory {
      padding: 0;
      z-index: 12 !important;
    }
  }
}
</style>
