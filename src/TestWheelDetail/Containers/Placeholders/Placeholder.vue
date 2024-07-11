<template>
  <div class="placeholder">
    <div class="placeholder-message">
      <div class="icon" :class="[iconClass]"></div>
      <div class="text">{{ text }}</div>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  iconClass: String,
  text: String
});
</script>

<style lang="scss" scoped>

.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: var(--spacing-distance-16, 1rem);

  &-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-distance-4, 0.25rem);

    .icon {
      width: 1.875rem;
      height: 1.875rem;
      font-size: 1.875rem;
      color: var(--text-text-caption, #606373);
    }

    .text {
      color: var(--text-text-caption, #606373);

      font-size: 0.875rem;
      font-style: normal;
      font-weight: 300;
      line-height: 0.875rem;
    }
  }
}

</style>
