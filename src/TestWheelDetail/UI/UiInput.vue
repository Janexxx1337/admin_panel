<template>
  <div class="form-row" :class="{ 'flex-column': slots.default }">
    <label class="input-label" v-if="slots.default" :for="name"><slot></slot></label>
    <div
      class="input-group w-100 d-flex"
      :class="{ 'edit-input': stateEdit && stateSave }"
    >
      <div class="input-wrapper w-100" :class="{ 'input-changed': showCheckIcon && stateSave }">
        <input
          type="text"
          class="input"
          :name="name"
          :placeholder="placeholder"
          :value="internalValue"
          @input="onInputChange"
          @focus="focusInput"
          autocomplete="nope"
        />
        <i class="icon icon-check"></i>
      </div>
      <button class="btn-main btn-save w-100" @click="saveInput">SAVE</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);

const slots = defineSlots();

const props = defineProps({
  placeholder: String,
  name: {
    type: String,
    required: true,
  },
  stateSave: {
    type: Boolean,
    default: false,
  },
  modelValue: String,
});

const stateEdit = ref(false);
const internalValue = ref(props.modelValue);
const valueChanged = ref(false);
const initialValueLoaded = ref(props.modelValue !== '');

const showCheckIcon = computed(() => {
  // Отображать галочку только если поле не пустое и (было изменено или изначально передано непустое значение)
  return internalValue.value && (valueChanged.value || initialValueLoaded.value);
});

const focusInput = () => {
  stateEdit.value = true;
};

const saveInput = () => {
  if (internalValue.value !== props.modelValue) {
    valueChanged.value = true; // Только устанавливайте, если значение изменилось
    emit('update:modelValue', internalValue.value);
  }

  stateEdit.value = false;
};

const onInputChange = (event) => {
  internalValue.value = event.target.value;
};

onMounted(() => {
  initialValueLoaded.value = !!props.modelValue; // Установить флаг, если начальное значение было предоставлено
});

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    internalValue.value = newVal;
    // Отмечать как измененное, если новое значение отличается от старого
    valueChanged.value = newVal !== oldVal;
  },
);

</script>

<style lang="scss" scoped>
.form-row {
  width: 100%;
  display: flex;
  gap: 0.5rem;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;

  border-radius: var(--spacing-rounding-6, 0.375rem);
  border: 0.0625rem solid var(--surface-surface-5, #373b4a);

  width: 6.25rem;
  height: 2.5rem;
  padding: 0.8125rem var(--spacing-distance-12, 0.75rem);

  overflow: hidden;
  color: var(--text-text-secondary, #a8abba);
  text-overflow: ellipsis;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 0.875rem;
  position: relative;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
}

.input-group {
  gap: 0.75rem;

  .btn-save {
    max-width: 5rem;
    padding: 0.8125rem 1.25rem;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 0.875rem;
    display: none;
  }

  &.edit-input {
    .btn-save {
      display: flex;
    }
    .input {
      color: #fcfcfd;
      border: 0.0625rem solid #606373;
    }
  }

  .input-wrapper {
    position: relative;
    .icon {
      position: absolute;
      right: 0.75rem;
      top: 0.8125rem;
      font-size: 0.875rem;
      display: none;
      &-check {
        color: #09e48d;
      }
      &-cross-x {
        color: #ed6158;
      }
    }
    &.input-changed {
      .icon {
        display: inline;
      }
      .input {
        padding-right: 2.375rem;
      }
    }
  }
}

.input::placeholder {
  color: var(--text-text-caption, #606373);
  opacity: 1; /* Firefox */
}

.input-label {
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 300;
  line-height: 0.875rem;
  color: #a8abba;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.25rem;
}
</style>
