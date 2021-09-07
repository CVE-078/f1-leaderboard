<template>
  <div div class="player-results">
    <h1 class="text-gray-800 dark:text-gray-200 text-3xl font-semibold mt-6 mb-4 text-center transition-all" >
      {{ player.name }}
    </h1>

    <div
      v-if="circuitSortedResults.length > 0 && !this.loadingResults"
      class="player-results__wrapper flex flex-col items-center justify-center pt-10 px-6"
    >
      <div class="player-results__list grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 w-full">
        <div
          v-for="result in circuitSortedResults"
          :key="result.id"
          class="player-results__item relative sm:max-w-md shadow hover:shadow-xl transition-all mt-4 sm:mt-8 mb-10 bg-cover bg-center"
          :style="{ backgroundImage: `url(${require('@/assets/images/backgrounds/' + getCircuit(result.trackId).slug + '.jpg')})` }"
        >
          <CircuitItem
            class="player-results__link py-24 px-8 cursor-pointer"
            :circuit="getCircuit(result.trackId)"
          />

          <span
            class="player-results__time flex w-full bg-white dark:bg-gray-200 border border-gray-800 rounded-b-md justify-center font-semibold py-2 transition-all"
          >
            {{ result.time }}
          </span>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        class="w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white hadow-lg block h-full px-4 sm:px-5 py-4 uppercase transition-all"
      >
        <div class="flex font-bold text-lg justify-center">
          <span class="p-2" v-if="this.loadingResults">
            <i class="fas fa-spinner"></i>
          </span>

          <span class="p-2" v-else>No track times found</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db";

export default {
  name: "PlayerDetail",

  props: {
    player: { required: true, type: Object },
  },

  data() {
    return {
      playerId: "",
      loadingResults: true,
      results: [],
    };
  },

  created() {
    this.playerId = this.player.id;

    this.getPlayerResults();

    setTimeout(() => {
      if (this.circuitSortedResults.length > 0) {
        this.loadingResults = false;
      }
    }, 3000);
  },

  methods: {
    getPlayerResults() {
      db.ref("results")
        .orderByChild("playerId")
        .equalTo(this.playerId)
        .once("value")
        .then((res) => {
          res.forEach((data) => {
            data = data.val();

            this.results.push(data);
          });
        });
    },
  },

  computed: {
    getCircuit(trackId) {
      return [...this.circuits].find((c) => c.id === trackId);
    },

    circuitSortedResults() {
      return [...this.results].sort((a, b) => (a.trackId > b.trackId ? 1 : -1));
    },
  },

  firebase: {
    circuits: db.ref("circuits"),
    players: db.ref("players"),
  },
};
</script>

<style lang="scss" scoped>
.player-results {
  $player: ".player-results";

  #{$player} {
    &__item {
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
    }

    &__time {
      position: relative;
      z-index: 2;
      margin-top: -6px;
    }
  }
}
</style>
