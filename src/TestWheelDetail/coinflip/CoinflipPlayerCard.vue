<template>
  <div class="side" :class="'side-' + playerSide" :style="{ opacity: isFaded ? 0.3 : 1 }">
    <div class="emblem" :class="{'emblem-left': playerSide === 't', 'emblem-right': playerSide === 'ct'}"></div>
    <div class="model"></div>
    <div class="background-side" ></div>
    <div class="player">
      <div class="player-avatar">
        <img :src="avatarUrl" alt="player" />
        <div class="player-coin" :class="{'coin-t': playerSide === 't', 'coin-ct': playerSide === 'ct'}" v-show="isCoinVisible"></div>
      </div>
      <div class="player-info d-flex flex-column gap-2">
        <div class="player-name">{{ playerName }}</div>
        <div class="player-side">{{ playerSideText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  player: Object,
  isFaded: Boolean,
  opponentSide: String
});

const avatarUrl = computed(() => {
  return props.player
    ? '/src/assets/img/users/' + props.player.avatar + '.png'
    : '/src/assets/img/svg/coinflip/' + props.opponentSide + '-coin-ava.svg';
});

const playerName = computed(() => {
  return props.player ? props.player.name : 'Waiting for player';
});

const playerSide = computed(() => {
  return props.player ? props.player.side : props.opponentSide;
});

const playerSideText = computed(() => {
  return playerSide.value === 't' ? 'Terrorists' : 'Counter-Terrorists';
});

const isCoinVisible = computed(() => {
  return !!props.player;
});
</script>

<style lang="scss" scoped>

.side-t {
  .background-side {
    position: absolute;
    background-image: url('/src/assets/img/svg/coinflip/t-glow.svg');
  }
  .player-coin {
    background-image: url('/src/assets/img/svg/coinflip/t-coin-small.svg');
  }
  .player-avatar::after {
    background-color: rgb(249 167 27 / 20%);
  }

  .emblem {
    width: 6.9268rem;
    height: 6.5447rem;
    background-image: url('/src/assets/img/svg/coinflip/t-emblem.svg');
    background-size: contain;
    position: absolute;
  }

  .model {
    background-image: url('/img/models/coinflip/t-model.png');
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    width: 10.625rem;
    height: 11.5625rem;
  }
}

.side-ct {
  .background-side {
    position: absolute;
    background-image: url('/src/assets/img/svg/coinflip/ct-glow.svg');
    background-position: right;
    background-repeat: no-repeat;
  }

  .player-coin {
    background-image: url('/src/assets/img/svg/coinflip/ct-coin-small.svg');
  }
  .player-avatar::after {
    background-color: rgb(31 158 254 / 20%);
  }

  .emblem {
    width: 6.3693rem;
    height: 6.5rem;
    background-image: url('/src/assets/img/svg/coinflip/ct-emblem.svg');
    background-size: contain;
    position: absolute;

    mix-blend-mode: luminosity;
  }

  .model {
    background-image: url('/src/assets/img/models/coinflip/ct-model.png');
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    width: 9.8125rem;
    height: 10.9375rem;
  }
}

.side {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .emblem {
    position: absolute;
    width: 6.9268rem;
    height: 6.5447rem;
    top: 1.25rem;
  }

  .background-side {
    width: 100%;
    height: 100%;
    z-index: -1;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
  }

  .player {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    width: 100%;
    max-width: 12.5rem;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    z-index: 2;
    overflow: hidden;

    &-avatar {
      position: relative;
      height: 5.3125rem;
      img {
        width: 5.3125rem;
        height: 5.3125rem;
        border-radius: 50%;
      }
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: calc(90%);
        height: calc(90%);
        border-radius: inherit;
        filter: blur(2.0625rem);
        will-change: filter;
      }
    }

    &-info {
      gap: 0.375rem;
    }

    &-coin {
      width: 1.875rem;
      height: 1.875rem;
      position: absolute;
      background-size: cover;
    }

    &-name {
      font-size: 1.125rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.125rem;
    }

    &-side {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      color: #A8ABBA;
    }
  }
  &.host-side {
    background-position: left bottom;
    justify-content: end;
    .model {
      left: 0;
      bottom: 0;
      background-position: left bottom;
    }
    .emblem {
      left: 1.875rem;
    }
    .player-coin {
      bottom: 0;
      right: 0;
    }
  }
  &.opponent-side {
    background-position: right bottom;
    justify-content: start;
    .model {
      right: 0;
      bottom: 0;
      background-position: right bottom;
    }
    .emblem {
      right: 1.875rem;
    }
    .player-coin {
      bottom: 0;
      left: 0;
    }
  }
}

@media (max-width: 993px) {
  .side {
    justify-content: center;
    .model,
    .emblem {
      display: none;
    }
    .player {
      &-avatar {
        height: 3.75rem;
        img {
          width: 3.75rem;
          height: 3.75rem;
        }
      }
      &-coin {
        width: 1.25rem;
        height: 1.25rem;
      }
      &-name {
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 0.875rem;
      }
      &-side {
        font-size: 0.75rem;
      }
    }
  }
}
</style>
