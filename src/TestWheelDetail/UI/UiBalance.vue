<template>
  <div class="balance d-flex">
    <div :class="[noCurrencyColor ? '' : 'currency']">$</div>
    <div class="balance-value">{{ value.toFixed(2) }}</div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    required: true
  },
  noCurrencyColor: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>

.balance {
  font-weight: 600;
}

</style>
