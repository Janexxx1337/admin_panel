<template>
  <div class="game">
    <wheel-inventory />

    <div class="card w-100">
      <div class="card-header">
        <div class="button btn-gray" @click="defaultActionBack">
          <div class="icon icon-left"></div>
        </div>

        <div class="title">
          <div class="title-name title-card">Game</div>
          <div class="title-sub">#{{ gameId }}</div>
        </div>
      </div>

      <div class="history-game">
        <div class="history-game__wrapper">
          <div class="info-game">
            <div class="group">
              <div class="bank group-item">
                <div class="label">Bank</div>
                <div class="value"><span class="currency">$</span>{{currentGame.bank}}</div>
              </div>
              <div class="items group-item">
                <div class="label">Items</div>
                <div class="value">{{currentGame.allItems.length}}</div>
              </div>
              <div class="players group-item">
                <div class="label">Players</div>
                <div class="value">{{currentGame.allPlayers}}</div>
              </div>
              <div class="winner group-item">
                <div class="label">Winner</div>
                <div class="value" :style="{color: dataWheel.colors[currentGame.winner]}">{{[2, 3, 5, 50][colorIndex]}}X</div>
              </div>
              <div class="your-bet group-item" v-if="currentUserObjectInGame">
                <div class="label">Your bet</div>
                <div class="value"><span class="currency">$</span>{{currentUserObjectInGame.bet}}</div>
              </div>
              <div class="your-result group-item" v-if="currentUserObjectInGame">
                <div class="label">Your result</div>
                <div class="value"><span class="currency">$</span>{{currentUserObjectInGame.bet}}</div>
              </div>
            </div>
            <InfoGameVerify :current-game="currentGame" :infoGame="infoGame" />
          </div>
        </div>

        <!-- <div class="history-game__bets">
          <div class="bets-title title-card">Bets</div>
          <div class="bets__container ui-container">
            <wheel-section
              :section-index="index"
              :bank="currentGame[section + 'Bank']"
              :players="currentGame[section + 'Side']"
              :state="currentGame.winner ? currentGame.winner === section ? 'winner' : 'loser' : ''"
              v-for="(section, index) in colors" />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>

import WheelInventory from './Inventory/WheelInventory.vue';
import { dataWheel } from '../state/wheel/dataWheel.js';
import { dataUser } from '../state/user/dataUser.js';
// import WheelSection from '@/components/Games/Wheel/Game/WheelSection.vue';
import InfoGameVerify from '../InfoGameVerify.vue';
import { ref, computed } from 'vue';

import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();

const gameId = ref(+route.params.gameId);

const router = useRouter();

const defaultActionBack = () => {
  router.back();
};

const infoGame = ref([
  {
    label: 'Winner ticket',
    value: '#12545',
  },
  {
    label: 'Game number',
    value: '0.920205630691072758602334464415',
  },
  {
    label: 'Hash game MD5',
    value: '917b949a594d03bfcbb3475cd7909595',
  },
]);

const currentGame = computed(() => {
  return dataWheel.historyItems.find((item) => item.gameId === gameId.value);
});

const colors = ref(['blue', 'yellow', 'red', 'green']);

const colorIndex = computed(() => {
  const colorKeys = Object.keys(dataWheel.colors);
  return colorKeys.indexOf(currentGame.value.winner);
});

const currentUserObjectInGame = computed(() => {
  const sides = ['blueSide', 'yellowSide', 'redSide', 'greenSide'];

  for (let side of sides) {
    const player = currentGame.value[side].find(player => player.name === dataUser.currentUser.name);

    if (player) {
      return player;
    }
  }
  return null;
});

</script>

<style lang="scss" scoped>
.game {
  display: flex;
  gap: 0.75rem;
  justify-content: center;

  .disabled {
    opacity: 0.3;
  }

  :deep(.inventory-group-slot) {
    gap: 0.75rem;
  }

  .click-close-inventory {
    position: fixed;
    background: transparent;
    z-index: 10;
    left: 0;
    display: none;
    top: 100%;
  }

  .btn-close-inventory {
    display: none;
    font-size: 0.875rem;
    color: #a8abba;
  }

  .mobile-wrapper {
    gap: 0.75rem;
  }
}

.card {
  display: flex;

  padding: var(--spacing-distance-20, 1.25rem);
  flex-direction: column;
  /* align-items: flex-start; */
  gap: var(--spacing-distance-16, 1rem);

  border-radius: var(--spacing-rounding-12, 0.75rem);
  background: var(--surface-surface-2, #1A1C25);

  &-header {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 1rem;
    border: 0;

    .button {
      display: flex;
      width: 2.125rem;
      height: 2.125rem;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-distance-8, 0.5rem);
      align-self: stretch;
      .icon {
        font-size: 0.875rem;
      }
    }

    .title {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;

      &-sub {
        color: var(--text-text-caption, #606373);
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
}

.history-game {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__bets {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .bets-title {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      span {
        font-size: 1.3125rem;
        font-style: normal;
        font-weight: 400;
        color: #606373;
      }
    }
    .bets__container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.375rem;
      :deep(.wheel-section-body .body-container) {
        height: 29.25rem;
      }
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .info-game {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;

      .group {
        display: flex;
        gap: 0.5rem;
        flex-grow: 1;
        flex-wrap: wrap;

        &-item {
          display: flex;
          padding: 1rem;
          border-radius: 0.375rem;
          background-color: #21232F;
          min-height: 5.25rem;
          height: max-content;
          flex-grow: 1;
          flex-direction: column;
          gap: 0.5rem;

          .label {
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 300;
            line-height: 0.875rem;
            color: #A8ABBA;
          }

          .value {
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            color: #fff;
          }
        }
      }
    }
  }
}

@media (max-width: 993px) {
  .card {
    padding: var(--spacing-distance-20, 1.25rem) var(--spacing-distance-16, 1rem);
  }

  .history-game {
    &__wrapper {
      .info-game {
        flex-direction: column;
        .group {
          &-item {
            padding: 0.75rem;
            min-height: auto;
            flex-grow: 0;
            gap: 0.25rem;
            .label {
              font-size: 0.75rem;
              line-height: 0.75rem;
            }
            .value {
              font-size: 1.125rem;
              line-height: 1.125rem;
            }
          }
        }
      }
    }

    &__bets {
      .bets__container {
        flex-direction: column;
        :deep(.wheel-section-body .body-container) {
          height: auto;
          max-height: 24.5rem;
        }
      }
    }
  }
}
</style>
