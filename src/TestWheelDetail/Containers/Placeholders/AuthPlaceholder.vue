<template>
  <Placeholder
    :icon-class="'icon-lock'"
    :text="'Log in to see inventory'"
  >
    <template #default>
      <ui-btn @click="activate">
        <div class="auth">
          <i class="icon icon-stream"></i>
          <div class="text">Login</div>
        </div>
      </ui-btn>
    </template>
  </Placeholder>
</template>

<script setup>
import UiBtn from '../../UI/UiBtn.vue';
import Placeholder from './Placeholder.vue';

defineProps({
  activate: Function
});
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-distance-8, 0.5rem);

  .icon {
    width: 0.875rem;
    height: 0.875rem;
    font-size: 0.875rem;
  }

  .text {
    color: var(--text-text-primary, #fcfcfd);
    text-align: center;
    /* Button 0.75rem Medium */

    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.75rem; /* 100% */
    text-transform: uppercase;
  }
}
</style>
