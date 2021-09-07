<template>
  <div class="leaderboard">
    <div class="leaderboard__wrapper">

      <div v-if="results.length > 0">
        <div class="leaderboard__header">
          <span class="leaderboard__column">#</span>
          <span class="leaderboard__column">NAME</span>
          <span class="leaderboard__column">TIME</span>
          <span class="leaderboard__column">GAP</span>
          <span class="leaderboard__column">INTERVAL</span>
          <span class="leaderboard__column">INT</span>
          <span class="leaderboard__column">DATE</span>
        </div>

        <div
          class="leaderboard__item"
          v-for="(result, index) in results"
          :key="result.id"
          :data-position="index + 1"
        >
          <span class="leaderboard__column">{{ index + 1 }}</span>
          <span class="leaderboard__column">{{ getPlayer(result.playerId).name }}</span>
          <span class="leaderboard__column">{{ result.time }}</span>

          <span class="leaderboard__column">
            <span v-if="index === 0">-</span>

            <span v-else>
              {{ calculateTimeDifference(result.time, results[0].time) }}
            </span>
          </span>

          <span class="leaderboard__column">
            <span v-if="index === 0">-</span>

            <span v-else>
              {{ calculateTimeDifference(result.time, results[index - 1].time) }}
            </span>
          </span>

          <span class="leaderboard__column">{{ result.date }}</span>
        </div>
      </div>

      <div v-else>
        <div class="leaderboard__noResults">
          <span class="p-2">No track times found</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { db } from "@/db";

export default {
  name: "Leaderboard",

  props: {
    results: { required: true, type: Array },
  },

  data() {
    return {
      players: [],
    };
  },

  methods: {
    getPlayer(id) {
      return this.players.find((p) => p.id == id);
    },

    calculateTimeDifference(currentTime, baseTime) {
      const currentTimeFormatted = currentTime.replace(/[:.]/g,'');
      const baseTimeFormatted = baseTime.replace(/[:.]/g,'');

      let interval = currentTimeFormatted - baseTimeFormatted;

      interval = interval.toString().padStart(4, "0");
      interval = Array.prototype.reduce.call(
        interval.toString(),
        (acc, item, index) => {
          return (acc +=
            index && index === interval.toString().length - 3
              ? "." + item
              : item);
        },
        ""
      );

      if (interval.toString().length > 5) {
        interval =
          interval.substring(0, interval.length - 6) + ":" + interval.slice(-6);
      }

      return "+ " + interval;
    },
  },

  firebase: {
    players: db.ref("players"),
  },
};
</script>

<style lang="scss" scoped>
.leaderboard {
  @apply flex flex-col lg:flex-row lg:h-auto md:mt-10 md:rounded-sm overflow-hidden;
  $leaderboard: ".leaderboard";
  
  #{$leaderboard} {

    &__wrapper {
      @apply w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-lg block h-full px-4 sm:px-5 py-4 uppercase transition-all;
    }

    &__header {
       @apply flex font-bold;
       
       > #{$leaderboard}__column {
        &:nth-of-type(1) {
          @apply text-sm sm:text-base w-8 md:w-20 my-auto px-2 pb-2 transition-all;
        }

        &:nth-of-type(2) {
          @apply text-sm sm:text-base flex-grow md:w-1/2 lg:w-full my-auto px-1 sm:px-2 pb-2 transition-all;
        }

        &:nth-of-type(3) {
          @apply text-sm sm:text-base w-20 sm:w-1/4 my-auto px-1 sm:px-2 pb-2 transition-all;
        }

        &:nth-of-type(4) {
          @apply hidden md:block md:text-base md:w-1/4 my-auto md:px-2 pb-2 transition-all;
        }

        &:nth-of-type(5) {
          @apply hidden sm:block sm:text-base sm:w-1/4 my-auto sm:px-2 pb-2 transition-all;
        }

        &:nth-of-type(6) {
          @apply sm:hidden text-sm w-1/6 my-auto px-1 pb-2 transition-all;
        }

        &:nth-of-type(7) {
          @apply text-sm sm:text-base w-20 sm:w-1/4 my-auto px-1 sm:px-2 pb-2 transition-all;
        }
      }
    }

    &__item {
      @apply flex border-b border-gray-500 my-1;

      &[data-position="1"] {
        background: #c9b037;
        border-color: darken(#c9b037, 15%);
        @apply border-b-2 rounded-md;

        #{$leaderboard}__column {
          color: #fff;
        }
      }

      &[data-position="2"] {
        background: #b4b4b4;
        border-color: darken(#b4b4b4, 15%);
        @apply border-b-2 rounded-md;

        #{$leaderboard}__column {
          color: #fff;
        }
      }

      &[data-position="3"] {
        background: #ad8a56;
        border-color: darken(#ad8a56, 15%);
        @apply border-b-2 rounded-md;

        #{$leaderboard}__column {
          color: #fff;
        }
      }

      > #{$leaderboard}__column {
        &:nth-of-type(1) {
          @apply text-xs sm:text-sm md:text-base w-8 md:w-20 my-auto px-2 py-2 transition-all;
        }

        &:nth-of-type(2) {
          @apply text-xs sm:text-sm md:text-base flex-grow md:w-1/2 lg:w-full truncate my-auto px-1 sm:px-2 py-2 transition-all;
        }

        &:nth-of-type(3) {
          @apply text-xs sm:text-sm md:text-base w-20 sm:w-1/4 my-auto px-1 sm:px-2 py-2 transition-all;
        }

        &:nth-of-type(4) {
          @apply hidden md:block text-xs sm:text-sm md:text-base w-1/6 sm:w-1/4 my-auto px-1 sm:px-2 py-2 transition-all;
        }

        &:nth-of-type(5) {
          @apply text-xs sm:text-sm md:text-base w-1/6 sm:w-1/4 my-auto px-1 sm:px-2 py-2 transition-all;
        }

        &:nth-of-type(6) {
          @apply text-xs sm:text-sm md:text-base w-20 sm:w-1/4 my-auto px-1 sm:px-2 py-2 transition-all;
        }
      }
    }

    &__noResults {
      @apply flex font-bold text-lg justify-center;
    }

  }
}
</style>
