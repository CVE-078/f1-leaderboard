<template>
  <div class="players">
    <ul class="players__list">
      <li
        v-for="player in sortedPlayers"
        :key="player.id"
        class="players__item"
      >
        <PlayerItem :player="player" />
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from "@/db";
import PlayerItem from "@/components/PlayerItem";

export default {
  name: "Players",
  components: {
    PlayerItem,
  },

  data() {
    return {
      players: [],
    };
  },

  computed: {
    sortedPlayers() {
      return [...this.players].sort((a, b) => (a.name > b.name ? 1 : -1));
    },
  },

  firebase: {
    players: db.ref("players"),
  },
};
</script>

<style lang="scss" scoped>
.players {
  $players: ".players";

  #{$players} {

    &__list {
      @apply grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-10 px-6;
    }

    &__item {
      @apply w-full bg-white dark:bg-gray-600 hover:shadow-lg transition-all rounded-md border border-gray-300 dark:border-gray-800 cursor-pointer;
    }
    
  }
}
</style>
