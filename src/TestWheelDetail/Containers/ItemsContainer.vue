<template>
  <div class="container-items ui-container w-100">
    <SteamItemMin class="item"
      v-for="item in [
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife',
        'consumer','industrial','milspec','restricted', 'classified', 'covert', 'knife'
      ]"
      :rarity="item"
      :icon-url="'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD'"
    />
  </div>
</template>

<script setup>
import SteamItemMin from '../SteamItemMin.vue';
</script>

<style lang="scss" scoped>
.container-items {
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  gap: 0.25rem;
}

.item {
  width: 100%;
}
</style>
