<template>
  <div class="wheel-inventory-btns">
    <div class="title">Select a sector</div>
    <div class="wrapper-btns">
      <wheel-inventory-button
        v-for="color in ['blue', 'yellow', 'red', 'green']"
        :key="color"
        :side="color"
        :active="activeColor === color"
        @click="setActiveColor(color)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import WheelInventoryButton from './WheelInventoryButton.vue';

const activeColor = ref('blue');

function setActiveColor(color) {
  activeColor.value = color;
}

</script>

<style lang="scss" scoped>
.wheel-inventory-btns {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  flex-direction: column;

  .title {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 300;
    line-height: 0.875rem;
    color: #A8ABBA;
  }

  .wrapper-btns {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.25rem;

    :deep(.btn-wheel) {
      padding: 0.9375rem 1.5rem;
    }
  }
}

@media (max-width: 993px) {
  .wheel-inventory-btns {
    .wrapper-btns {
      :deep(.btn-wheel) {
        padding: 0;
        height: 3.375rem;
        flex: 1 0 calc(25% - 0.1875rem);
      }
    }
  }
}
</style>
