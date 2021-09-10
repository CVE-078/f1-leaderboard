<template>
  <div class="circuits">
    <div
      v-if="activeCircuits.length > 0"
      class="circuits__wrapper"
    >
      <div class="circuits__list">
        <div
          v-for="circuit in activeCircuits"
          :key="circuit.id"
          class="circuits__item fade-in"
          :style="{ backgroundImage: `url(${require('@/assets/images/backgrounds/' + circuit.slug + '.jpg')})` }"
        >
          <CircuitItem
            class="circuits__link"
            :circuit="circuit"
          />
        </div>
      </div>
    </div>

    <div
      v-if="activeCircuits.length > 0"
      class="circuits__wrapper"
    >
      <h2 class="circuits__title">Inactive circuits</h2>

      <div class="circuits__list">
        <div
          v-for="circuit in inactiveCircuits"
          :key="circuit.id"
          class="circuits__item"
          :style="{ backgroundImage: `url(${require('@/assets/images/backgrounds/' + circuit.slug + '.jpg')})` }"
        >
          <CircuitItem
            class="circuits__link"
            :circuit="circuit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/db";
import CircuitItem from "@/components/CircuitItem";

export default {
  name: "Circuits",
  
  components: {
    CircuitItem,
  },

  data() {
    return {
      circuits: [],
    };
  },

  computed: {
    activeCircuits() {
      const filteredCircuits = [...this.circuits].filter(
        (circuit) => circuit.priority < 99
      );

      return filteredCircuits.sort(
        (a, b) =>
          a.priority - b.priority || a.location.localeCompare(b.location)
      );
    },

    inactiveCircuits() {
      const filteredCircuits = [...this.circuits].filter(
        (circuit) => circuit.priority == 99
      );

      return filteredCircuits.sort(
        (a, b) =>
          a.priority - b.priority || a.location.localeCompare(b.location)
      );
    },
  },

  firebase: {
    circuits: db.ref("circuits"),
  },
};
</script>

<style lang="scss" scoped>
.circuits {
  $circuits: ".circuits";

  #{$circuits} {

    &__wrapper {
      @apply flex flex-col items-center justify-center pt-10 sm:px-6;
    }

    &__title {
      @apply font-semibold text-3xl text-gray-800 dark:text-white my-10;
    }

    &__list {
      @apply grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full;
    }

    &__item {
      @apply relative sm:max-w-md bg-white shadow hover:shadow-xl transition-all duration-500 mt-4 sm:mt-8 cursor-pointer bg-cover bg-center transform scale-100 hover:scale-105;

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
      @apply py-16 md:py-24 px-8;
    }

  }
}
</style>
