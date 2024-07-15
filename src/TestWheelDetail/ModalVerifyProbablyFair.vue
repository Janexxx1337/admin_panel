<template>
  <modal-base :with-header="false" :with-footer="false">
    <template v-slot:body>
      <div class="content-wrapper">
        <i class="icon icon-cross-x modal-body-close" @click="emit('close')"></i>
        <ui-title with-icon>
          <template v-slot:default> Verify provably fair </template>
          <template v-slot:icon>
            <i class="icon icon-shield"></i>
          </template>
        </ui-title>
        <div class="round-info d-flex flex-column">
          <div class="round-info__title d-flex">
            <span>Round info</span>
            <div class="btn-check btn-gray">
              check at site <i class="icon icon-expand"></i>
            </div>
          </div>
          <div class="round-info__content">
            <UiInput
              v-for="input in computedInputFields"
              :key="input.name"
              :class="input.name"
              :name="input.name"
              :placeholder="input.placeholder"
            >
              <template #default>
                {{ input.label }}
                <div v-if="input.info" class="info" :data-tooltip="input.info">
                  <i class="icon icon-information-circle"></i>
                </div>
              </template>
            </UiInput>
          </div>
        </div>
        <div class="how-check">
          <div class="how-check__title">How to check? (Example)</div>
          <div class="how-check__content">
            <div class="row-content">
              <div>Number =</div>
              <span>0.51267828771285217236742190086</span>
            </div>
            <div class="row-content">
              <div>Hash =</div>
              <span>c29345615e879435e74b7f5280015e11</span>
            </div>
            <div class="row-content">
              <div>Bank =</div>
              $46.48
            </div>
            <div class="row-content">
              <div>Ticket =</div>
              <span>0.51267828771285217236742190086</span> * 46.48 * 100 = 2382
            </div>
            <div class="row-content">
              You can put this info and check hash at MD5 generator site.
            </div>
          </div>
        </div>
        <div class="explanation">
          <div class="explanation__title">Explanation</div>
          <div class="explanation__content">
            <p>
              Before the start of each game, a game number from 0 to 1 is randomly
              generated (19 symbols).
            </p>
            <p>It is hashed using MD5, after which this hash is displayed at the game.</p>
            <p>Each player receives 1 ticket for every $0.01 (1 cent) of deposit.</p>
            <p>
              At the end of the game, a winning ticket is selected according to the
              formula: game number * bank * 100. The player whose bet had such a ticket
              becomes the winner.
            </p>
            <p>
              Immediately after the end of the game, the game number becomes available.
            </p>
          </div>
        </div>
      </div>
    </template>
  </modal-base>
</template>

<script setup>
import ModalBase from './ModalBase.vue';
import UiInput from './UI/UiInput.vue';
import UiTitle from './UI/UiTitle.vue';

import { ref } from 'vue';

const emit = defineEmits(['close']);

const props = defineProps({
  item: Object,
  selectValue: {
    type: String,
    default: 'winner'
  }
});

const inputFields = ref([
  {
    name: 'game',
    label: 'Game',
    placeholder: '2481527',
    info: null,
  },
  {
    name: 'hash',
    label: 'Hash',
    placeholder: 'eda8564a897161a9ddf41e1f96b9555a',
    info: null,
  },
  {
    name: 'number',
    label: 'Number',
    placeholder: 'The game is not over',
    info:
      'Before the start of each game, a game number is randomly generated. It is hashed using MD5, then this hash is displayed before the game starts.<br> The game number becomes available after the game ends.',
  },
  {
    name: 'ticket',
    label: 'Ticket',
    placeholder: 'Winner not yet determined',
    info:
      'From the start of the game, the multiplier grows rapidly until the crash. Everyone who managed to take the winnings before the crash is the winner. The final multiplier is displayed after the end of the game (the moment of the crash).',
  },
]);

const computedInputFields = inputFields.value.map(field => {
  let newPlaceholder = field.placeholder;

  if (field.name === 'number') {
    newPlaceholder = props.item[props.selectValue] ? '0.66601462914078551472054217040' : 'The game is not over';
  } else if (field.name === 'ticket') {
    newPlaceholder = props.item[props.selectValue] ? '2068' : 'Winner not yet determined';
  }

  return {
    ...field,
    placeholder: newPlaceholder
  };
});
</script>

<style lang="scss" scoped>
:deep(.modal-body) {
  margin: auto 0;
}

:deep(.modal-container) {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  background: none;
  padding: 0;
  overflow-y: scroll;
}

:deep(.modal-close) {
  display: none;
}

.content-wrapper {
  margin: 1.25rem auto;
  width: 100%;
  display: flex;
  height: max-content;
  flex-direction: column;
  gap: 1.25rem;
  max-width: 31.25rem;
  padding: var(--spacing-distance-24, 1.5rem);
  background-color: #21232f;
  border-radius: 0.75rem;
  position: relative;
}

.modal-body-close {
  width: 0.875rem;
  height: 0.875rem;
  font-size: 0.875rem;
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  cursor: pointer;
  z-index: 5;
}

:deep(.title) {
  gap: 0.5rem 0;
  flex-wrap: wrap;
}

.round-info {
  gap: 0.75rem;
  &__title {
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    span {
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.125rem;
      flex-grow: 20;
    }
    .btn-check {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: 0.75rem;
      gap: 0.5rem;
      flex-grow: 1;
      i {
        font-size: 0.875rem;
      }
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    :deep(.form-row) {
      position: relative;
      .input {
        width: 100%;
        pointer-events: none;
      }
    }
    .info {
      position: absolute;
      right: 0.75rem;
      bottom: 0.625rem;
      i {
        font-size: 0.875rem;
      }
      &:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        padding: 0.5rem;
        white-space: pre-wrap;
        left: calc(100% + 1.25rem);
        top: -0.9375rem;
        width: clamp(10.5rem, -3.868rem + 82.105vw, 15.375rem);
        background-color: #373b4a;
        color: #fff;
        border-radius: 0.375rem;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}

.how-check,
.explanation {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  &__title {
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.125rem;
  }
  &__content {
    color: #a8abba;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    .row-content,
    p {
      width: 100%;
    }
    .row-content {
      display: flex;
      flex-wrap: wrap;
      gap: 0 0.375rem;
      overflow: hidden;

      div {
        white-space: nowrap;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

@media (max-width: 993px) {
  .round-info {
    &__content {
      .info {
        &:hover::after {
          inset: auto -0.75rem 2.375rem auto;
        }
      }
    }
  }
}

@media (max-width: 525px) {
  :deep(.modal-body) {
    width: calc(100% - 2.5rem);
  }
  :deep(.modal-container) {
    align-items: start;
  }
}
</style>
