<template>
  <div class="info-game-verify">
    <div class="verify__group">
      <div
        class="verify-row"
        v-for="(item, index) in infoGame"
        :key="index"
      >
        <span class="label">{{item.label}}</span>
        <span class="value">{{item.value}}</span>
      </div>
    </div>
    <button class="btn-gray verify__btn" @click="showModalVerify = true">verify</button>
  </div>
  <modal-verify-probably-fair
    class="w-100" :item="currentGame"
    :selectValue="selectedValue"
    v-if="showModalVerify"
    @close="showModalVerify = false"
  />
</template>

<script setup>
import ModalVerifyProbablyFair from './ModalVerifyProbablyFair.vue';
import { ref } from 'vue';

defineProps({
  currentGame: Object,
  infoGame: Array,
  selectedValue: {
    type: String,
    default: 'winner'
  }
});

const showModalVerify = ref(false);

</script>

<style lang="scss" scoped>
.info-game-verify {
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background-color: #21232F;
  border-radius: 0.375rem;
  flex-grow: 3;

  .verify__group {
    display: grid;
    width: 100%;
    gap: 0.5rem;
    min-width: 10rem;
    .verify-row {
      width: 100%;
      display: flex;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 400;
      line-height: 0.75rem;
      color: #FCFCFD;
      overflow: hidden;
      .label {
        min-width: 6rem;
        color: #A8ABBA;
        font-weight: 300;
      }
      .value {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .verify__btn {
    border: 0;
  }
}

@media (max-width: 993px) {
  .info-game-verify {
    flex-direction: column;
    gap: 1rem;
    .verify__group {
      .verify-row {
        flex-direction: column;
      }
    }
    .verify__btn {
      width: 100%;
    }
  }
}
</style>
