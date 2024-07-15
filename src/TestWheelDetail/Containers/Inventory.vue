<template>
  <div class="inventory">
    <slot name="title">
      <div class="group d-flex justify-content-between w-100">
        <div class="head d-flex align-items-baseline">
          <div class="title d-flex align-items-center">
            <div class="title-value title-card">
              Inventory
            </div>
          </div>
          <span>456</span>
        </div>
        <button class="btn-common">SHOP</button>
      </div>
    </slot>
    <div
      class="d-flex gap-3 flex-column w-100"
      v-if="slots['actions'] || slots['sub-title']"
    >
      <slot name="actions"></slot>
      <slot name="sub-title"></slot>
    </div>

    <div class="items-container-parent w-100" :style="{ height: containerHeight }">
      <items-container class="h-100" v-if="isActive" />

      <auth-placeholder
        :activate="activate"
        @click.stop
        v-else
      />
    </div>

    <div class="foot d-flex align-items-center justify-content-between w-100">
      <div class="details">
        <div class="foot-title">Selected</div>
        <div class="foot-value">
          <div class="balance d-flex">
            <div class="currency">$</div>
            <div class="balance-value">{{ 0.00 }}</div>
          </div>
        </div>
      </div>
      <div class="btns-group">
        <div class="btn-gray" :class="{ disabled: !isActive }">SELECT ALL $23.34</div>
        <slot name="foot-btns"></slot>
      </div>
    </div>
    <div class="actions w-100" :class="{ disabled: !isActive }">
      <slot name="actions-btn">
        <button class="btn-main w-100">MAKE BET $110.00</button>
      </slot>
    </div>
  </div>
</template>

<script setup>
import ItemsContainer from './ItemsContainer.vue';
import AuthPlaceholder from './Placeholders/AuthPlaceholder.vue';

const slots = defineSlots();

import { ref, computed } from 'vue';

const props = defineProps({
  itemsConHeight: {
    type: [Number, String],
    default: 298,
  },
  showAuth: {
    type: Boolean,
    default: false,
  },
});

const isActive = ref(props.showAuth);

const activate = () => {
  isActive.value = true;
};

const containerHeight = computed(() => {
  return typeof props.itemsConHeight === 'string'
    ? props.itemsConHeight
    : `${props.itemsConHeight / 16}rem`;
});
</script>

<style lang="scss" scoped>
:deep(.head) {
  gap: 0.5rem;
  .title-value {
    font-size: 1.125rem;
  }
  span {
    color: #a8abba;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 0.875rem;
  }
}

.inventory {
  display: flex;
  width: 24.375rem;
  height: 37.5rem;
  padding: var(--spacing-distance-20, 1.25rem);
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-distance-12, 0.75rem);
  flex-shrink: 0;
  background: #1a1c25;
  border-radius: 0.75rem;

  .foot {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 300;
    line-height: 0.875rem;

    &-title {
      color: #a8abba;
    }

    &-value {
      color: #fcfcfd;

      .balance {
        font-weight: 600;
      }
    }

    .details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
  }

  .actions {
    &.disabled {
      :deep(button) {
        opacity: 0.3;
        pointer-events: none;
      }
    }
  }
  &-group-slot {
    gap: 1rem;
  }
}

.btns-group {
  display: flex;
  gap: 0.25rem;
}

.items-container-parent {
  // width: 22.25rem;
  min-width: 100%;
}

/* width */
::-webkit-scrollbar {
  width: 0.25rem;
  border-radius: 0.1875rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1a1c25;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #2a2c3b;
  border-radius: 0.1875rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2a2c3b;
}
</style>
