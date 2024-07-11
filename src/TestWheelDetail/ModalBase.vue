<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModal">
      <div class="modal-wrapper">
        <div class="modal-container" ref="modalContainer">
          <i class="icon icon-cross-x modal-close" @click="emit('close')"></i>
          <div class="modal-header" v-show="withHeader">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer" v-show="withFooter">
            <slot name="footer">
              default footer
              <button class="btn-main" @click="emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close']);
const modalContainer = ref(null);

defineProps({
  withHeader: {
    type: Boolean,
    default: true
  },
  withFooter: {
    type: Boolean,
    default: true
  }
});

const closeModal = (event) => {
  if (modalContainer.value && !modalContainer.value.contains(event.target)) {
    emit('close');
  }
};
</script>

<style lang="scss" scoped>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 18.75rem;
  margin: 0 auto;
  padding: 1.25rem 1.875rem;

  border-radius: var(--spacing-rounding-12, 0.75rem);
  background: var(--surface-surface-3, #21232F);

  box-shadow: 0 0.125rem 0.5rem rgb(0 0 0 / 33%);
  transition: all 0.3s ease;
  position: relative;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}

.modal-close {

  width: 0.875rem;
  height: 0.875rem;
  font-size: 0.875rem;

  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  cursor: pointer;
  z-index: 5;
}

</style>
