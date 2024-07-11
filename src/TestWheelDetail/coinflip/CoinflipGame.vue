<template>
  <div class="game">
    <coinflip-inventory
      :currentGame="currentGame"
      :is-mobile-inventory-shown="isMobileInventoryShown"
      @change-mobile-inventory-shown="changeMobileInventoryShown"
    >
      <template v-slot:actions-btn>
        <coinflip-inventory-btn-create
          v-if="large || isMobileInventoryShown"
          :currentGame="currentGame"
          :is-mobile-inventory-shown="isMobileInventoryShown"
          @change-mobile-inventory-shown="changeMobileInventoryShown"
        />
      </template>
    </coinflip-inventory>

    <div class="card w-100">
      <!-- <card-header btn-back>
        <template #title-name>Game</template>
        <template #title-sub>#{{ gameId }}</template>

        <template #actions>
          <div class="group d-flex gap-1" v-if="!showVerifyAndProbablyFair">
            <div class="hash">
              Hash <span>{{ hash }}</span>
            </div>
            <div class="btn-probably btn-gray" @click="showModalVerify = true"><i class="icon icon-shield"></i>PROBABLY FAIR</div>
          </div>
        </template>
      </card-header> -->
      <div class="card-header">
        <div class="button btn-gray" @click="defaultActionBack">
          <div class="icon icon-left"></div>
        </div>

        <div class="title">
          <div class="title-name title-card">Game</div>
          <div class="title-sub">#{{ gameId }}</div>
        </div>

        <div class="m-auto"></div>

        <div class="actions d-flex">
          <div class="group d-flex gap-1" v-if="!showVerifyAndProbablyFair">
            <div class="hash">
              Hash <span>{{ hash }}</span>
            </div>
            <div class="btn-probably btn-gray" @click="showModalVerify = true"><i class="icon icon-shield"></i>PROBABLY FAIR</div>
          </div>
        </div>
      </div>

      <div class="coinflip-game">
        <div class="d-flex flex-column gap-3">
          <InfoGameVerify :current-game="currentGame" :infoGame="infoGame" v-if="showVerifyAndProbablyFair" />
          <coinflip-area :game="currentGame" />
        </div>

        <coinflip-inventory-btn-create
          v-if="!large && !isMobileInventoryShown"
          :currentGame="currentGame"
          :is-on-join-page="isOnJoinPage"
          :is-mobile-inventory-shown="isMobileInventoryShown"
          @change-mobile-inventory-shown="changeMobileInventoryShown"
        />

        <div class="winner-row" v-if="currentGame.winner">
          <div class="ticket">
            Winner ticket: <span class="value">12045</span>
          </div>
          <div class="game-value">
            Game value: <span class="value">0.0121825098919446025061384655404</span>
          </div>
        </div>

        <div class="coinflip-game-bank">
          <div class="title">User bank</div>
          <coinflip-items-area :game="currentGame" />
        </div>
      </div>
      <modal-verify-probably-fair class="w-100" :item="currentGame" v-if="showModalVerify" @close="showModalVerify = false" />
    </div>
  </div>
</template>

<script setup>
import CoinflipInventory from './Inventory/CoinflipInventory.vue';
import CoinflipInventoryBtnCreate from './Inventory/CoinflipInventoryBtnCreate.vue';
import CoinflipArea from './CoinflipArea.vue';
import CoinflipItemsArea from './CoinflipItemsArea.vue';
import { dataCoinflip } from '../state/coinflip/dataLobby.js';
import ModalVerifyProbablyFair from '../ModalVerifyProbablyFair.vue';
import InfoGameVerify from '../InfoGameVerify.vue';

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useWindowWidth } from '../composables';

const { large } = useWindowWidth();
const route = useRoute();

const gameId = ref(+route.params.gameId);
const hash = ref('cd1883b05b2a8ddb6ae57685556be31d');
const showModalVerify = ref(false);
const isMobileInventoryShown = ref(false);

const infoGame = ref([
  {
    label: 'Hash game MD5',
    value: 'cd1883b05b2a8ddb6ae57685556be31d',
  },
  {
    label: 'Game value',
    value: '2.0414194940911323539750271580308',
  },
]);

const currentGame = computed(() => {
  return dataCoinflip.lobbyItems.find((item) => item.gameId === gameId.value);
});

const showVerifyAndProbablyFair = computed(() => {
  return route.name === 'coinflip-history-game';
});

const changeMobileInventoryShown = (state) => {
  isMobileInventoryShown.value = state;
};
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

:deep(.title-sub) {
  font-size: 1.125rem;
}
:deep(.actions) {
  gap: 0.25rem;
  .btn-probably {
    gap: 0.5rem;
    color: #09E48D;
  }
  .hash {
    display: flex;
    gap: 0.25rem;
    width: 10.625rem;
    padding: 0.625rem 1.125rem;
    border-radius: 0.375rem;
    background-color: #21232f;
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 300;
    line-height: 0.75rem;
    align-items: end;
    color: #a8abba;
    span {
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #fcfcfd;
    }
  }
}
.coinflip-game {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &__info {
    background-color: #21232f;
    border-radius: 0.375rem;
    align-items: center;
    .info-btn {
      flex: 1;
    }
    .info-value {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 20;
      &__item {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: 0.75rem;

        .label {
          color: #a8abba;
          width: 6.25rem;
          font-weight: 300;
        }
        span {
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }

  .winner-row {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 0.25rem;
    column-gap: 1.25rem;
    width: 100%;
    padding: var(--spacing-distance-4, 0.25rem) var(--spacing-distance-12, 0.75rem);
    border-radius: var(--spacing-rounding-6, 0.375rem);
    background: var(--surface-surface-3, #21232F);

    .ticket,
    .game-value {
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 300;
      line-height: 0.75rem;
      color: #A8ABBA;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;

      .value {
        color: #fcfcfd;
      }
    }
  }

  &-bank {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-distance-16, 1rem);
  }
}

.title-wrapper {
  display: flex;
  gap: var(--spacing-distance-16, 1rem);
  align-items: center;
  justify-content: center;

  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.title {
  display: flex;
  gap: var(--spacing-distance-4, 0.25rem);
  align-items: baseline;

  font-style: normal;
  font-weight: 400;
  line-height: normal;

  color: var(--text-text-primary, #fcfcfd);
  font-size: 1.5rem;
}

.menu {
  &-item {
    color: var(--text-text-secondary, #a8abba);

    font-size: 0.9375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;

    display: flex;
    align-items: center;
    gap: var(--spacing-distance-4, 0.25rem);

    &-text {
      color: var(--text-text-secondary, #a8abba);

      font-size: 0.9375rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
}

@media (max-width: 993px) {
  .card {
    padding: var(--spacing-distance-20, 1.25rem) var(--spacing-distance-16, 1rem);
  }
  :deep(.card-header) {
    flex-wrap: wrap;
    .actions {
      width: 100%;
      .group {
        width: 100%;
        flex-wrap: wrap-reverse;
        .btn-gray,
        .hash {
          width: 100%;
        }
      }
    }
  }

  .coinflip-game {
    &__info {
      .info-value {
        gap: 1rem;
      }
    }
  }
}
</style>
