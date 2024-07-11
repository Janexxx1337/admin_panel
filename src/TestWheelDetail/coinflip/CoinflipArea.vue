<template>
  <div class="coinflip-game-area" :class="game.host.side === 'ct' ? 'host-ct' : ''">
    <CoinflipPlayerCard
      class="host-side"
      :player="game.host"
      :is-faded="game.winner && game[game.winner].side === opponentSide"
      :opponent-side="opponentSide"
    />
    <div class="status-group d-flex">
      <div class="waiting d-flex" v-if="!game.opponent">
        <div class="waiting-animated">
          <div class="animated-circle"><div class="animated-circle-glow"></div></div>
        </div>
        <div class="vs">VS</div>
      </div>
      <div class="winner d-flex flex-column" v-if="game.winner">
        <div class="winner-side" :class="game[game.winner].side"></div>
        <div class="d-flex flex-column gap-1 align-items-center">
          <div class="winner-title currency">WINNER</div>
          <UiBalance :value="471.08" />
        </div>
      </div>
      <div class="result" v-if="game.result">
        <div class="progress-bar" v-if="!isTimerComplete">
          <ui-radial-progress
            :completed-steps="animatedResult"
            :diameter="large ? 6.25 : 4.375"
            :inner-stroke-width="0.1875"
            :inner-stroke-color="'#21232F'"
            :stroke-width="large ? 0.1875 : 0.125"
            :total-steps="30"
            :start-color="'#ED7753'"
            :stop-color="'#ED7753'"
            stroke-linecap="butt"
            :is-clockwise="false"
          >
            <div class="progress-bar-glow"></div>
            {{ animatedResult }}
          </ui-radial-progress>
        </div>
        <div class="timer-complete" :class="game.host.side" v-if="isTimerComplete"></div>
        <div class="vs">VS</div>
      </div>
    </div>
    <CoinflipPlayerCard
      class="opponent-side"
      :player="game.opponent"
      :is-faded="game.winner && game[game.winner].side === game.host.side"
      :opponent-side="opponentSide"
    />
  </div>
</template>

<script setup>
import UiRadialProgress from '../UI/UiRadialProgress.vue';
import UiBalance from '../UI/UiBalance.vue';
import CoinflipPlayerCard from './CoinflipPlayerCard.vue';

import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  game: Object,
});

import { useWindowWidth } from '../composables';

const {
  large
} = useWindowWidth();

const animatedResult = ref(30);
const isTimerComplete = ref(false);

const opponentSide = computed(() => {
  return props.game.host.side === 't' ? 'ct' : 't';
});

const animateResult = () => {
  const stepTime = 1000;
  const interval = setInterval(() => {
    if (animatedResult.value > 0) {
      animatedResult.value--;
    } else {
      clearInterval(interval);
      isTimerComplete.value = true;
    }
  }, stepTime);
};

onMounted(() => {
  animateResult();
});

</script>

<style lang="scss" scoped>
.coinflip-game {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-distance-24, 1.5rem);

  &-area {
    width: 100%;
    position: relative;
    height: 13rem;

    border-radius: var(--spacing-rounding-12, 0.75rem);
    overflow: hidden;
    background: var(--surface-surface-3, #21232f);
    display: flex;
    z-index: 2;

    .status-group {
      align-items: center;
      .waiting {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        &-animated {
          padding: 0.625rem;
          border-radius: 50%;
          background-color: #1a1c25;
          z-index: 2;
          .animated-circle {
            width: 6.25rem;
            height: 6.25rem;
            border-radius: 50%;
            position: relative;
            &-glow {
              width: 100%;
              height: 100%;
              background-image: url("/src/assets/img/svg/coinflip/game-wait-glow.svg");
              background-size: contain;
            }
            &::before {
              content: "";
              position: absolute;
              inset: -0.75rem;
              border-radius: 50%;
              animation: spin 1s linear infinite;
              background-image: url("/src/assets/img/svg/coinflip/game-timer.svg");
              background-repeat: no-repeat;
              background-size: cover;
              z-index: -1;
            }

            @keyframes spin {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(-360deg);
              }
            }
          }
        }
      }
      .vs {
        font-size: 1.125rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .winner {
        gap: 0.625rem;
        margin-top: 1.25rem;
        &-title {
          font-size: 1.125rem;
          font-style: normal;
          font-weight: 400;
          line-height: 1.125rem;
        }
        :deep(.balance) {
          font-size: 0.875rem;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
        &-side {
          width: 6.25rem;
          height: 6.25rem;
          margin: 0.625rem;
          &.t {
            background: url("/src/assets/img/svg/coinflip/t-coin.svg");
            background-size: contain;
          }
          &.ct {
            background: url("/src/assets/img/svg/coinflip/ct-coin.svg");
            background-size: contain;
          }
        }
      }
      .result {
        width: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        .progress-bar {
          padding: 0.625rem;
          background-color: #1a1c25;
          border-radius: 50%;
          font-size: 2rem;
          font-style: normal;
          font-weight: 600;
          position: relative;

          :deep(.vrp__wrapper) {
            z-index: 0;
          }

          &-glow {
            width: 100%;
            height: 100%;
            position: absolute;
            bottom: 0.1875rem;
            left: -0.1875rem;
            background-image: url("/src/assets/img/svg/coinflip/game-wait-glow.svg");
            z-index: -1;
          }
        }
        .timer-complete {
          width: 6.25rem;
          height: 6.25rem;
          margin: 0.625rem;
          &.t {
            background: url("/src/assets/img/svg/coinflip/t-side.svg");
            background-size: contain;
          }
          &.ct {
            background: url("/src/assets/img/svg/coinflip/ct-coin-ava.svg");
            background-size: contain;
          }
        }
      }
    }

    &.host-ct {
      :deep(.background-side) {
        transform: scaleX(-1);
      }
    }
  }
}

@media (max-width: 993px) {
  .coinflip-game {
    &-area {
      height: 10rem;
      .status-group {
        align-items: end;
        .waiting {
          align-self: center;
          &-animated {
            padding: 0.3125rem;
            .animated-circle {
              width: 4.375rem;
              height: 4.375rem;
              &::before {
                inset: -0.5rem;
              }
            }
          }
        }
        .vs {
          font-size: 1rem;
        }
        .winner {
          align-items: center;
          margin: 0 0 1rem;
          &-title {
            font-size: 0.875rem;
            font-style: normal;
            font-weight: 500;
            line-height: 0.875rem;
          }
          :deep(.balance) {
            font-size: 0.75rem;
          }
          &-side {
            width: 3.75rem;
            height: 3.75rem;
          }
        }
        .result {
          gap: 0.875rem;
          align-self: center;
          .progress-bar {
            font-size: 1.125rem;
            font-style: normal;
            font-weight: 600;
            padding: 0.3125rem;
          }
          .timer-complete {
            width: 4.375rem;
            height: 4.375rem;
            margin: 0.3125rem;
          }
        }
      }
    }
  }
}
</style>
