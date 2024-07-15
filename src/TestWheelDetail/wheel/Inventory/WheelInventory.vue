<template>
  <div
    class="click-close-inventory w-100 h-100"
    :class="{ 'show-inventory': isMobileInventoryShown }"
    @click="emit('changeMobileInventoryShown', false)"
  ></div>
  <inventory
    :items-con-height="270"
    :class="{ 'show-inventory': isMobileInventoryShown }"
    ref="coinflipInventory"
  >
    <template v-slot:title>
      <div class="d-flex justify-content-between w-100">
        <div class="title d-flex align-items-center">
          <div class="icon">
            <i class="icon icon-Wheel"></i>
          </div>
          <div class="title-value title-card">Wheel</div>
        </div>
        <div class="btn-close-inventory" @click="emit('changeMobileInventoryShown', false)">
          <i class="icon icon-cross-x"></i>
        </div>
      </div>
    </template>
    <template v-slot:actions>
      <div class="d-flex w-100 gap-1">
        <WheelInventoryBtns />
      </div>
    </template>
    <template v-slot:sub-title>
      <div class="mobile-wrapper d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center w-100">
          <div class="head d-flex align-items-baseline">
            <div class="title d-flex align-items-center">
              <div class="title-value title-card">Inventory</div>
            </div>
            <span>456</span>
          </div>

          <button class="btn-common" @click="showModal = true">SHOP</button>
          <!-- <modal-shop class="w-100" v-if="showModal" @close="showModal = false" /> -->
        </div>
      </div>
    </template>
    <template v-slot:actions-btn>
      <slot
        name="actions-btn"
      ></slot>
    </template>
  </inventory>
</template>

<script setup>
import Inventory from '../../Containers/Inventory.vue';
import WheelInventoryBtns from './WheelInventoryBtns.vue';
// import ModalShop from '@/components/Base/Modals/ModalShop.vue';

import { ref } from 'vue';

const props = defineProps({
  currentGame: Object,
  isMobileInventoryShown: Boolean,
});

const emit = defineEmits(['changeMobileInventoryShown']);
const showModal = ref(false);
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.3;
}

:deep(.inventory-group-slot) {
  gap: 0.75rem;
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

.title {
  color: var(--text-text-primary, #FCFCFD);
  /* Title 1.5rem Regular */

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .icon {
    max-height: 1.625rem;
    margin-right: 0.5rem;
    font-size: 1.25rem;
  }
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
    border-top: 0.0625rem solid var(--Surface-Surface-4, #2A2C3B);
    border-radius: 0;
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
