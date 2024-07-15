import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';

export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth);

  const updateWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  watchEffect(updateWidth);

  const small = computed(() => windowWidth.value >= 576);
  const medium = computed(() => windowWidth.value >= 768);
  const large = computed(() => windowWidth.value >= 992);
  const extraLarge = computed(() => windowWidth.value >= 1200);
  const extraExtraLarge = computed(() => windowWidth.value >= 1400);

  return {
    windowWidth,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  };
}