<template>
  <router-link
    class="player-item"
    :to="{ name: 'PlayerDetail', params: { slug: player.slug } }"
  >
    <img
      class="player-item__avatar"
      :src="require(`@/assets/images/avatars/` + player.avatar)"
    />

    <div class="player-item__content">
      <h2 class="player-item__name">{{ player.name }}</h2>
      <span class="player-item__lapTimes">Lap times set: {{ this.results.length }}</span>
    </div>
  </router-link>
</template>

<script>
import { db } from "@/db";

export default {
  name: "PlayerItem",

  data() {
    return {
      playerId: "",
      playerLapCount: 0,
      results: [],
    };
  },

  props: {
    player: { required: true, type: Object },
  },

  created() {
    this.getPlayerResults();
  },

  methods: {
    async getPlayerResults() {
      const resultsRef = db
        .ref("results")
        .orderByChild("playerId")
        .equalTo(this.player.id);

      const snapshot = await resultsRef.once("value");

      snapshot.forEach((childSnapshot) => {
        childSnapshot = childSnapshot.val();
        this.results.push(childSnapshot);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.player-item {
  @apply flex flex-row items-center justify-start w-full py-3 px-5;
  $playerItem: '.player-item';

  #{$playerItem} {

    &__avatar {
      @apply w-12 h-12 object-cover rounded-full border border-gray-300 dark:border-gray-800 mr-5;
    }

    &__content {
      @apply flex flex-col;
    }

    &__name {
      @apply text-gray-800 dark:text-gray-200 text-base md:text-lg font-semibold transition-all;
    }

    &__lapTimes {
      @apply text-gray-800 dark:text-gray-200 text-xs sm:text-sm md:-mt-1 transition-all;
    }

  }
}
</style>