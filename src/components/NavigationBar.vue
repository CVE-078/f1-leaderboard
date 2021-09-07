<template>
  <nav class="navigation">
    <div class="navigation__container">
      <div class="navigation__inner">
        <div class="navigation__section navigation__section--left">
          <div class="block w-full">
            <div class="flex space-x-2 sm:space-x-4">

              <router-link 
                to="/circuits" 
                class="navigation__item"
              >
                Circuits
              </router-link>

              <router-link 
                to="/players" 
                class="navigation__item"
              >
                Players
              </router-link>

              <router-link
                v-if="this.circuit"
                :to="{ name: 'CircuitDetail', params: { slug: circuit.slug } }"
                class="navigation__item"
              >
                <img
                  class="navigation__flag"
                  :src="require(`@/assets/images/flags/` + circuit.code + `.png`)"
                />
                <span v-if="upcoming === true">Upcoming</span>
                <span v-if="current === true">Current</span>
              </router-link>

            </div>
          </div>
        </div>

        <div class="navigation__section navigation__section--right">
          <div class="block">
            <div class="flex space-x-4">

              <button
                @click="toggleDarkMode()"
                class="navigation__toggleDarkMode"
                :class="[this.isDarkMode ? `text-white` : `text-gray-800`]"
              >
                <i
                  :class="[this.isDarkMode ? `fas fa-sun` : `fas fa-moon`]"
                ></i>
              </button>

              <button
                @click="$refs.modalName.openModal()"
                class="navigation__openModal navigation__openModal--desktop"
              >
                <i class="fas fa-plus"></i>
              </button>

            </div>
          </div>
        </div>

        <button
          @click="$refs.modalName.openModal()"
          class="navigation__openModal navigation__openModal--mobile"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>

    <LeaderboardModal ref="modalName"></LeaderboardModal>
  </nav>
</template>

<style lang="scss" scoped>
html.dark {
  .router-link-active {
    @apply bg-gray-600 text-gray-200;
  }
}

.router-link-active {
  @apply bg-gray-100;
}

.navigation {
  @apply fixed w-full top-0 left-0 bg-white dark:bg-gray-800 shadow-md z-50 transition-all ease-in-out;
  $navigation: ".navigation";

  #{$navigation} {
    &__container {
      @apply max-w-7xl mx-auto py-4 px-6 lg:px-8;
    }

    &__inner {
      @apply relative flex items-center justify-between;
    }

    &__section {
      @apply flex items-stretch;

      &#{$navigation}__section {
        &--left {
          @apply flex-1 justify-start mr-6;
        }

        &--right {
          @apply sm:flex-1 justify-end;
        }
      }
    }

    &__item {
      @apply flex flex-auto sm:flex-none justify-center items-center bg-transparent text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-all ease-in-out text-gray-800 dark:text-gray-200 dark:hover:text-gray-200 px-2 sm:px-5 py-2 rounded-md text-sm sm:text-base font-medium;
    }

    &__flag {
      @apply w-8 max-h-5 mr-3 object-cover;
    }

    &__toggleDarkMode {
      @apply bg-transparent transition-all ease-in-out sm:px-5 rounded-md text-xl font-medium outline-none;
    }

    &__openModal {
      @apply bg-green-700 hover:bg-green-800 transition-all ease-in-out text-white px-5 focus:outline-none;

      &#{$navigation}__openModal {
        &--desktop {
          @apply hidden sm:block py-2 rounded-md text-sm font-medium;
        }

        &--mobile {
          @apply block sm:hidden py-3 text-lg fixed left-0 bottom-0 w-full;
        }
      }
    }
  }
}
</style>

<script>
import { db } from "@/db";
import LeaderboardModal from "@/components/LeaderboardModal";

export default {
  name: "NavigationBar",

  props: {
    isDarkMode: { required: true, type: Boolean },
  },

  data() {
    return {
      circuit: {},
      circuits: [],
      upcoming: false,
      current: false,
    };
  },

  components: {
    LeaderboardModal,
  },

  created() {
    this.getNextCircuit();
  },

  methods: {
    toggleDarkMode() {
      let htmlClasses = document.querySelector("html").classList;

      if (localStorage.theme == "dark") {
        htmlClasses.remove("dark");
        localStorage.theme = "light";
        this.$emit("update-darkmode", false);
      } else {
        htmlClasses.add("dark");
        localStorage.theme = "dark";
        this.$emit("update-darkmode", true);
      }
    },

    async getNextCircuit() {
      let closestCircuit = {};

      const circuitsRef = db.ref("circuits");

      const snapshot = await circuitsRef.once("value");

      snapshot.forEach((c) => {
        c = c.val();

        if (c.priority < 99) {
          let now = new Date();
          const startDate = new Date(c.start);
          const endDate = new Date(c.end);

          // now.setDate(now.getDate() + 10);

          const startDateDiff = Math.floor(
            (startDate - now) / (1000 * 60 * 60 * 24)
          );

          const endDateDiff = Math.floor(
            (endDate - now) / (1000 * 60 * 60 * 24)
          );

          if (endDateDiff > 0) {
            if (startDateDiff <= 0 && endDateDiff >= 0) {
              // Current circuit
              this.current = true;
              this.upcoming = false;
              closestCircuit = c;

              return true;
            } else if (startDateDiff >= 0 && endDateDiff >= 0) {
              // Upcoming circuit

              if (Object.keys(closestCircuit).length === 0) {
                this.upcoming = true;
                this.current = false;
                closestCircuit = c;
              } else {
                let closestStartDateDiff = Math.floor(
                  (new Date(closestCircuit.start) - now) / (1000 * 60 * 60 * 24)
                );

                if (closestStartDateDiff > startDateDiff) {
                  this.upcoming = true;
                  this.current = false;
                  closestCircuit = c;
                }
              }
            }
          }
        }
      });

      this.circuit = closestCircuit;
    },
  },
};
</script>
