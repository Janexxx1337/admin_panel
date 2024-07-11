<template>
  <div
    class="btn-wheel"
    :class="['btn-wheel--side-' + side,
             { 'active': active },
             {'tab-sections': bank !== null && bank !== undefined}]"
  >
    <div class="btn-wheel-inner">
      <div class="btn-wheel-inner__text">
        X{{ getSideMultiplier(side) }}
      </div>
      <div class="btn-wheel-inner__bank" v-if="bank !== null && bank !== undefined">
        <span class="currency">$</span>{{ bank.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  side: {
    type: String,
    required: true
  },
  active: Boolean,
  bank: Number,
});

const getSideMultiplier = (side) => {
  switch (side) {
    case 'blue':
      return 2;
    case 'yellow':
      return 3;
    case 'red':
      return 5;
    case 'green':
      return 50;
  }
};
</script>

<style lang="scss" scoped>

.btn-wheel {
  display: flex;
  padding: 1.0625rem 1.5rem;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  cursor: pointer;
  border: 0.0625rem solid var(--Button-Gray-default, #373B4A);
  background: var(--Surface-Surface-3, #21232F);
  border-radius: 0.375rem;

  &-inner {
    &__text {
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.125rem; /* 100% */
    }
  }
}

.btn-wheel--side-blue {
  &.active {
    border: 0.0625rem solid var(--Wheel-Blue, #188BCC);
    background: linear-gradient(180deg, rgb(25 143 210 / 0%) 0%, rgb(25 143 210 / 20%) 100%), var(--Surface-Surface-3, #21232F);
  }

  .btn-wheel-inner {
    &__text {
      color: #35B1F8;
    }
  }
}

.btn-wheel--side-yellow {
  .btn-wheel-inner {
    &__text {
      color: #FFBC69;
    }
  }

  &.active {
    border: 0.0625rem solid var(--Wheel-Yellow, #E9A653);
    background: linear-gradient(180deg, rgb(233 166 83 / 0%) 0%, rgb(233 166 83 / 20%) 100%), var(--Surface-Surface-3, #21232F);
  }
}

.btn-wheel--side-red {
  &.active {
    border: 0.0625rem solid var(--Wheel-Red, #DD464A);
    background: linear-gradient(180deg, rgb(221 70 74 / 0%) 0%, rgb(221 70 74 / 20%) 100%), var(--Surface-Surface-3, #21232F);
  }

  .btn-wheel-inner {
    &__text {
      color: #E94A4E;
    }
  }
}

.btn-wheel--side-green {
  &.active {
    border: 0.0625rem solid var(--Wheel-Green, #28B54F);
    background: linear-gradient(180deg, rgb(40 181 79 / 0%) 0%, rgb(40 181 79 / 20%) 100%), var(--Surface-Surface-3, #21232F);
  }

  .btn-wheel-inner {
    &__text {
      color: #23FA5F;
    }
  }
}

.btn-wheel.tab-sections {
  justify-content: start;
  align-items: start;
  padding: 0.5rem;

  .btn-wheel-inner {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    &__text {
      font-size: 0.875rem;
      line-height: 0.875rem;
    }

    &__bank {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 600;
      line-height: 0.75rem;
    }
  }
}

</style>
