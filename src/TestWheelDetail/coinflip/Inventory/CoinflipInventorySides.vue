<template>
  <div class="inventory-sides d-flex flex-column w-100">
    <div class="sides-title">Select a side</div>
    <div class="inventory-bar sides d-flex w-100">
      <div class="side side-yellow" :class="{ active: active === 0 }" @click="active = 0">
        <div class="icon"></div>
        <div class="name">T-SIDE</div>
      </div>
      <div class="side side-blue" :class="{ active: active === 1 }" @click="active = 1">
        <div class="name">CT-SIDE</div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>

<style lang="scss" scoped>
.inventory-sides {
  gap: 0.5rem;
  .sides-title {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 300;
    line-height: 0.875rem;
    color: #A8ABBA;
  }
  .sides {
    .side {
      display: flex;
      width: 100%;
      height: 3.125rem;
      padding: 0 var(--spacing-distance-16, 1rem);
      align-items: center;
      gap: var(--spacing-distance-12, 0.75rem);
      background: var(--surface-surface-3, #21232F);

      cursor: pointer;

      .name {
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 0.875rem;
      }
    }

    .side-yellow {
      border-radius: var(--spacing-rounding-6, 0.375rem) 0 0 var(--spacing-rounding-6, 0.375rem);

      .icon {
        height: 1.875rem;
        width: 1.875rem;
        border-radius: 2.25rem;
        border: 0.0625rem solid var(--06-coinflip-yelow, #FFC728);
        background: var(--02-black-gray-3, #2F3240) url('/img/svg/coinflip/t-side.svg') no-repeat center;
        background-size: contain;
        filter: grayscale(1);
        opacity: 0.7;
      }

      .name {
        color: var(--text-text-secondary, #A8ABBA);
      }
    }

    .side-blue {
      justify-content: end;
      border-radius: 0 var(--spacing-rounding-6, 0.375rem) var(--spacing-rounding-6, 0.375rem) 0;

      .icon {
        height: 1.875rem;
        width: 1.875rem;
        border-radius: 2.875rem;
        border: 0.0625rem solid var(--coinflip-blue, #1F9EFE);
        background: var(--surface-surface-4, #2A2C3B) url('/img/svg/coinflip/ct-side.svg') no-repeat center;
        background-size: contain;
        filter: grayscale(1);
        opacity: 0.7;
      }

      .name {
        color: var(--text-text-secondary, #A8ABBA);
      }
    }

    .side.active {
      background: var(--surface-surface-4, #2A2C3B);

      .icon {
        filter: grayscale(0);
        opacity: 1;
      }
    }

    .side-yellow.active {
      .name {
        color: var(--coinflip-yellow, #FFC728);
      }
    }

    .side-blue.active {
      .name {
        color: var(--coinflip-blue, #1F9EFE);
      }
    }
  }
}
</style>
