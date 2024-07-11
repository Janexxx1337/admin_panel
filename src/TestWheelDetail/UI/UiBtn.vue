<template>
  <div class="button" @click="handleClick">
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

<style lang="scss" scoped>
.button {
  display: flex;
  padding: 0.625rem var(--spacing-distance-24, 1.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-distance-8, 0.5rem);

  border-radius: 0.375rem;
  background: var(--button-primary-default, #ED7753);
  cursor: pointer;
}

.text {
  color: var(--text-text-primary, #FCFCFD);
  text-align: center;

  font-size: 0.75rem;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
}
</style>
