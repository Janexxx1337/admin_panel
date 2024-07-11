<template>
  <div class="title d-flex align-items-center">
    <div class="icon" v-if="withIcon">
      <slot name="icon"></slot>
    </div>
    <div class="title-value title-card">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: String
  },
  withIcon: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>

.title {
  color: var(--text-text-primary, #FCFCFD);
  /* Title 1.5rem Regular */

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.icon {
  max-height: 1.625rem;
  margin-right: 0.5rem;
  font-size: 1.25rem;

}

</style>
