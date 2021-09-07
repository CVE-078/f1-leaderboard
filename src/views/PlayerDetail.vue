<template>
  <div class="player-results">
    <h1 class="player-results__name">{{ player.name }}</h1>

    <div
      v-if="circuitSortedResults.length > 0 && !this.loadingResults"
      class="player-results__wrapper"
    >
      <div class="player-results__list">
        <div
          v-for="result in circuitSortedResults"
          :key="result.id"
          class="player-results__item"
          :style="{ backgroundImage: `url(${require('@/assets/images/backgrounds/' + getCircuit(result.trackId).slug + '.jpg')})` }"
        >
          <CircuitItem
            class="player-results__link"
            :circuit="getCircuit(result.trackId)"
          />

          <router-link :to="{ name: 'CircuitDetail', params: { slug: getCircuit(result.trackId).slug } }">
            <span class="player-results__time">
              {{ result.time }}
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="player-results__loading">
        <div class="player-results__loadingInner">

          <span class="p-2" v-if="this.loadingResults">
            <i class="fas fa-spinner fa-pulse fa-3x"></i>
          </span>

          <span class="p-2" v-else>No track times found</span>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db";
import CircuitItem from "@/components/CircuitItem";

export default {
  name: "PlayerDetail",

  components: {
    CircuitItem,
  },

  data() {
    return {
      slug: "",
      playerId: "",
      loadingResults: true,
      results: [],
      circuits: [],
      players: [],
      player: {},
    };
  },

  created() {
    this.slug = this.$route.params.slug;

    this.getCurrentPlayer();

    setTimeout(() => {
      this.getPlayerResults();
    }, 500);

    setTimeout(() => {
      if (this.circuits.length > 0) {
        this.loadingResults = false;
      }
    }, 2000);
  },

  methods: {
    getCircuit(trackId) {
      return [...this.circuits].find((c) => c.id === trackId);
    },

    async getPlayerResults() {
      const resultsRef = db
        .ref("results")
        .orderByChild("playerId")
        .equalTo(this.playerId);

      const snapshot = await resultsRef.once("value");

      snapshot.forEach((childSnapshot) => {
        childSnapshot = childSnapshot.val();

        this.results.push(childSnapshot);

        this.loadingResults = false;
      });
    },

    async getCurrentPlayer() {
      const playersRef = db
        .ref("players")
        .orderByChild("slug")
        .equalTo(this.slug);

      const snapshot = await playersRef.once("value");

      snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        data = JSON.parse(JSON.stringify(data));

        this.playerId = data.id;
        this.player = data;
      });
    },
  },

  computed: {
    circuitSortedResults() {
      return [...this.results].sort((a, b) => (a.trackId > b.trackId ? 1 : -1));
    },
  },

  firebase: {
    circuits: db.ref("circuits"),
  },
};
</script>

<style lang="scss" scoped>
.player-results {
  $player: ".player-results";

  #{$player} {

    &__name {
      @apply text-gray-800 dark:text-gray-200 text-3xl font-semibold mt-6 mb-4 text-center transition-all;
    }

    &__wrapper {
      @apply flex flex-col items-center justify-center pt-4 px-6;
    }

    &__list {
      @apply grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full transition-all;
    }

    &__item {
      @apply relative sm:max-w-md shadow hover:shadow-xl transition-all mt-4 sm:mt-8 bg-cover bg-center h-36 md:h-40;

      &::before {
        content: "";
        background-color: #000;
        opacity: 0.35;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 0;
      }
    }

    &__link {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 2;
      @apply py-12 px-8 cursor-pointer;
    }

    &__time {
      z-index: 2;
      @apply absolute left-0 top-3 bg-green-700 text-white rounded-br justify-center font-semibold text-sm md:text-base py-2 px-8 transition-all;
    }

    &__loading {
      @apply w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-lg block h-full px-4 sm:px-5 py-4 uppercase transition-all;
    }

    &__loadingInner {
      @apply flex font-bold text-lg justify-center;
    }
  }
}
</style>
