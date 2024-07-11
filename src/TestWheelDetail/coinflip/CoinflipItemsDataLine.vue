<template>
  <div class="data-line">
    <div class="data-line__info">
      <div class="d-flex gap-2 align-items-center">
        <div class="avatar">
          <img :src="avatarUrl" alt="player" />
        </div>
        <div class="name">{{ playerName }}</div>
      </div>
    </div>
    <div class="data-line__group d-flex gap-3">
      <div class="chance" :class="playerSideClass" v-if="player">
        Chance<span>50%</span>
      </div>
      <div class="amount" v-if="player">
        Total
        <div class="amount-value"><span class="currency">$</span>234.54</div>
      </div>
      <div class="bet" v-else>
        <span class="currency">$</span>230.45 - <span class="currency">$</span>240.43
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  player: Object,
  host: Object,
});

const opponentSide = computed(() => {
  return props.host.side === 't' ? 'ct' : 't';
});

const avatarUrl = computed(() => {
  return props.player
    ? '/src/assets/img/users/' + props.player.avatar + '.png'
    : '/src/assets/img/svg/coinflip/' + opponentSide.value + '-coin-ava.svg';
});

const playerName = computed(() => {
  return props.player ? props.player.name : 'Waiting for player';
});

const playerSideClass = computed(() => {
  return props.player ? props.player.side : '';
});
</script>

<style lang="scss" scoped>
.data-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;

  &__info {
    display: flex;
    align-items: center;

    .avatar {
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
    }

    .name {
      color: var(--text-text-secondary, #a8abba);
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      max-width: 6.25rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &__group {
    flex-grow: 1;
    width: auto;
    justify-content: space-between;
    .chance {
      display: flex;
      gap: 0.5rem;
      color: #a8abba;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 300;
      line-height: 0.875rem;
      span {
        font-weight: 500;
      }
      &.t {
        span {
          color: #ffc728;
        }
      }
      &.ct {
        span {
          color: #1f9efe;
        }
      }
    }
    .amount {
      display: flex;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 300;
      line-height: 0.875rem;
      color: #a8abba;
      gap: 0.5rem;
      &-value {
        font-weight: 500;
        color: #fcfcfd;
      }
    }
    .bet {
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 500;
      line-height: 0.875rem;
      margin-left: auto;
    }
  }
}
</style>
