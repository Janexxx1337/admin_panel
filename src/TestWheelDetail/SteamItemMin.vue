<template>
  <div
    class="item item-min"
    :class="[{ 'selected': isSelected && selectable}, {'sold-out': soldOut}]"
    @mouseenter="onMouseEnter($event)"
    @mouseleave="onMouseLeave"
    @click="toggleSelection"
  >
    <div class="item-glow">
      <div class="item-glow-inner" :class="['glow-' + rarity]"></div>
    </div>

    <div class="item-head d-flex justify-content-between w-100">
      <div class="stattrack">ST</div>
      <div class="wear">FT</div>
    </div>

    <img class="image" :src="iconUrl" alt="item" />
    <!-- <img class="image-sold-out" src="/img/svg/alert/alert-danger-icon.svg" alt="item" v-if="soldOut"/> -->

    <div class="item-foot">
      <div class="price"><div class="currency">$</div>0.00</div>
    </div>
    <div class="item-min-tooltip" v-if="showTooltip">
      <div class="name">
        Safecracker Voltzmann
        <div class="name-sub">
          The Professionals
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  rarity: {
    type: String,
  },
  selectable: {
    type: Boolean,
    default: true
  },
  iconUrl: {
    type: String
  },
  soldOut: Boolean,
  showTooltip: Boolean,
  parent: {
    type: Object,
    default: null
  },
});

const base = ref(parseFloat(getComputedStyle(document.documentElement).fontSize));

const isSelected = ref(false);
const toggleSelection = () => {
  isSelected.value = !isSelected.value;
};

const onMouseEnter = (event) => {
  const tooltip = event.target.querySelector('.item-min-tooltip');

  if (!tooltip) return;

  tooltip.style.display = 'flex';
  tooltip.style.zIndex = '10';

  const tooltipRect = tooltip.getBoundingClientRect();
  let left = 0;
  let bottom = 0;

  if (props.parent) {
    const wrapperRect = props.parent.getBoundingClientRect();

    if (tooltipRect.top < wrapperRect.top) {
      bottom = tooltipRect.top - wrapperRect.top;
    }

    if (tooltipRect.left < wrapperRect.left) {
      left = wrapperRect.left - tooltipRect.left;
    } else if (tooltipRect.right > wrapperRect.right) {
      left = wrapperRect.right - tooltipRect.right - 10;
    }
  }

  tooltip.style.left = `calc(50% + ${left / base.value}rem)`;
  tooltip.style.bottom = `calc(100% + 0.625rem + ${bottom / base.value}rem)`;
};

const onMouseLeave = (event) => {
  const tooltip = event.target.querySelector('.item-min-tooltip');

  if (tooltip) {
    tooltip.style.left = '50%';
    tooltip.style.bottom = 'calc(100% + 0.625rem)';
    tooltip.style.display = 'none';
  }
};
</script>

<style lang="scss" scoped>

.item-min {
  width: 5rem;
  height: 5rem;
  padding: 0.375rem 0.5rem;
  background: #2A2C3B;
  border-radius: 0.375rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0;
  display: inline-flex;
  position: relative;
  cursor: pointer;
  border: 0.0625rem solid transparent;
  z-index: 0;

  &-tooltip {
    display: none;
    padding: var(--spacing-distance-8, 0.5rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: max-content;
    gap: var(--spacing-distance-4, 0.25rem);
    border-radius: var(--spacing-rounding-6, 0.375rem);
    background: var(--surface-surface-5, #373B4A);
    position: absolute;
    bottom: calc(100% + 0.625rem);
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.2s ease 0.1s, visibility 0.2s ease;
    z-index: 0;
    text-align: center;
    z-index: 9999;

    .name {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #FCFCFD;

      &-sub {
        font-weight: 300;
        color: #A8ABBA;
      }
    }
  }

  &:hover {
    z-index: 1;
  }
}

.item {
  &-glow {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    overflow: hidden;
    left: 0;
    top: 0;
    &-inner {
      width: 5rem;
      height: 2.75rem;
      position: absolute;
      background: rgb(176 195 217 / 35%);
      border-radius: 4.125rem;
      filter: blur(3.125rem);
      left: 0;
      bottom: 100%;
    }
  }

  &.selected {
    border: 0.0625rem solid #ED7753;
  }

  .glow-consumer {
    background: rgb(176 195 217 / 35%);
  }

  .glow-industrial {
    background: rgb(94 152 217 / 35%);
  }

  .glow-milspec {
    background: rgb(75 105 255 / 35%);
  }

  .glow-restricted {
    background: rgb(136 71 255 / 35%);
  }

  .glow-classified {
    background: rgb(211 46 230 / 35%);
  }

  .glow-covert {
    background: rgb(235 75 75 / 35%);
  }

  .glow-knife {
    background: rgb(255 174 57 / 35%);
  }

  &-head {
    font-size: 0.75rem;
    font-weight: 300;
    line-height: 0.75rem;
    word-wrap: break-word;
    z-index: 1;
    position: relative;

    .stattrack {
      color: #EF985A;
    }

    .wear {
      color: #A8ABBA;
    }
  }

  &-foot {
    .price {
      display: flex;
      color: #FCFCFD;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 0.75rem;
      word-wrap: break-word;
      margin-top: 0.0625rem;
    }
  }

  .image {
    width: 4rem;
    height: 2.875rem;
    position: absolute;
    top: 0.94rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .image-sold-out {
    width: 1.25rem;
    height: 1.25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.sold-out {
    .item-head,
    .item-foot {
      mix-blend-mode: luminosity;
    }
    .image {
      opacity: 0.3;
      mix-blend-mode: luminosity;
    }
  }
}
</style>
