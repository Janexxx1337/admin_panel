<template>
  <radial-progress
    :completed-steps="completedSteps"
    :diameter="diameterInPx"
    :inner-stroke-width="innerStrokeWidthInPx"
    :inner-stroke-color="innerStrokeColor"
    :stroke-width="strokeWidthInPx"
    :total-steps="totalSteps"
    :start-color="startColor"
    :stop-color="stopColor"
    :stroke-linecap="strokeLinecap"
    :is-clockwise="isClockwise"
  >
    <slot></slot>
  </radial-progress>
</template>

<script setup>
import RadialProgress from 'vue3-radial-progress';

import {ref, computed, onMounted, onBeforeUnmount, nextTick} from 'vue';

const props = defineProps({
  completedSteps: Number,
  diameter: Number,
  innerStrokeWidth: Number,
  innerStrokeColor: String,
  strokeWidth: Number,
  totalSteps: Number,
  startColor: String,
  stopColor: String,
  strokeLinecap: String,
  isClockwise: Boolean,
});

const base = ref(parseFloat(getComputedStyle(document.documentElement).fontSize));

const diameterInPx = computed(() => {
  return remToPx(props.diameter);
});

const innerStrokeWidthInPx = computed(() => {
  return remToPx(props.innerStrokeWidth);
});

const strokeWidthInPx = computed(() => {
  return remToPx(props.strokeWidth);
});

const remToPx = (rem) => {
  return rem * base.value;
};

const onResize = () => {
  base.value = parseFloat(getComputedStyle(document.documentElement).fontSize);
};

onMounted(() => {
  window.addEventListener('resize', onResize);

  nextTick(() => {
    onResize();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

</script>
