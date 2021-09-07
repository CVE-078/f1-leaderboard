<template>
  <transition name="fade">
    <div
      class="fixed top-0 flex w-full h-full justify-center items-center"
      v-if="showModal"
    >
      <div
        class="fixed top-0 flex w-full h-full justify-center items-center bg-black bg-opacity-30 z-0 cursor-pointer"
        @click="closeModal()"
      />

      <div
        class="flex flex-col justify-center align-center w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-md border border-gray-300 shadow-xl z-10"
      >
        <div class="flex flex-row justify-between px-6 py-4 sm:p-6 bg-white border-b border-gray-200 rounded-tl-md rounded-tr-md">
          <h1 class="font-semibold text-gray-600">Add lap time</h1>

          <svg
            class="w-6 h-6 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            @click="closeModal()"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        <div class="flex flex-col px-6 py-3 sm:py-5 bg-gray-50">
          <form id="leaderbord-form">
            <div
              v-if="errors.length"
              class="flex flex-col sm:flex-row items-center mb-5 sm:space-x-5"
            >
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full text-sm sm:text-base"
              >
                <b>Please correct the following error(s):</b>

                <ul class="list-inside">
                  <li
                    class="list-disc"
                    v-for="(error, index) in errors"
                    :key="index"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row items-center mb-3 sm:mb-5 sm:space-x-5"
            >
              <div class="w-full">
                <p class="text-sm sm:text-base mb-1 sm:mb-2 font-semibold text-gray-700">Player</p>

                <select
                  type="text"
                  name="player"
                  id="player"
                  v-model="playerId"
                  class="text-sm sm:text-base w-full px-5 py-3 bg-white border border-gray-200 rounded-md shadow-sm appearance-none"
                  required
                >
                  <option value="">Choose a player</option>

                  <option
                    v-for="player in sortedPlayers"
                    :key="player.id"
                    :value="player.id"
                  >
                    {{ player.name }}
                  </option>
                </select>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row items-center mb-3 sm:mb-5 sm:space-x-5"
            >
              <div class="w-full">
                <p class="text-sm sm:text-base mb-1 sm:mb-2 font-semibold text-gray-700">Circuit</p>

                <select
                  type="text"
                  name="circuit"
                  id="circuit"
                  v-model="circuitId"
                  class="text-sm sm:text-base w-full px-5 py-3 bg-white border border-gray-200 rounded-md shadow-sm appearance-none"
                  required
                >
                  <option value="">Choose a circuit</option>

                  <option
                    v-for="circuit in sortedCircuits"
                    :key="circuit.id"
                    :value="circuit.id"
                  >
                    {{ circuit.location }} ({{ circuit.track }})
                  </option>
                </select>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row items-center mb-3 sm:mb-5 sm:space-x-5"
            >
              <div class="w-full">
                <p class="text-sm sm:text-base mb-1 sm:mb-2 font-semibold text-gray-700">Time</p>

                <div class="flex flex-row items-center sm:space-x-5">
                  <input
                    type="number"
                    name="minutes"
                    class="text-sm sm:text-base w-full px-5 py-3 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                    id="minutes"
                    min="0"
                    v-model="minutes"
                    required
                  />

                  <span class="px-2">:</span>

                  <input
                    type="number"
                    name="seconds"
                    class="text-sm sm:text-base w-full px-5 py-3 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                    id="seconds"
                    length="2"
                    min="0"
                    max="99"
                    v-model="formatSeconds"
                    required
                  />

                  <span class="px-2">.</span>

                  <input
                    type="number"
                    name="decimals"
                    class="text-sm sm:text-base w-full px-5 py-3 bg-white border border-gray-200 rounded shadow-sm appearance-none"
                    id="decimals"
                    length="3"
                    min="0"
                    max="999"
                    v-model="formatDecimals"
                    required
                  />
                </div>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row items-center mb-3 sm:mb-5 sm:space-x-5"
            >
              <div class="w-full">
                <p class="text-sm sm:text-base mb-1 sm:mb-2 font-semibold text-gray-700">Date</p>

                <input
                  type="date"
                  name="date"
                  id="date"
                  v-model="date"
                  class="text-sm sm:text-base w-full px-5 py-3 bg-white border border-gray-200 rounded-md shadow-sm appearance-none"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div
          class="flex flex-row items-center justify-between px-6 py-4 sm:p-6 bg-white border-t border-gray-200 rounded-bl-md rounded-br-md"
        >
          <p
            class="font-semibold text-gray-600 hover:text-gray-700 cursor-pointer"
            @click="closeModal()"
          >
            Cancel
          </p>

          <button
            type="submit"
            class="px-4 py-2 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none"
            @click.prevent="submitForm()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { db } from "@/db";

export default {
  name: "LeaderboardModal",

  data() {
    return {
      showModal: false,
      playerId: "",
      circuitId: "",
      minutes: "",
      seconds: "",
      decimals: "",
      date: new Date().toISOString().substr(0, 10),
      results: [],
      circuits: [],
      players: [],
      errors: [],
      recordUpdated: false,
      playerHasExistingTime: false,
    };
  },

  methods: {
    async submitForm() {
      this.errors = [];

      if (!this.playerId) {
        this.errors.push("Select a player");
      }

      if (!this.circuitId) {
        this.errors.push("Select a circuit");
      }

      if (!this.minutes || !this.seconds || !this.decimals) {
        this.errors.push("Fill in a correct lap time");
      }

      if (!this.date) {
        this.errors.push("Select a date");
      }

      if (!this.errors.length) {
        this.time = `${this.minutes}:${this.seconds}.${this.decimals}`;

        const resultsRef = db
          .ref("results")
          .orderByChild("playerId")
          .equalTo(this.playerId);

        const snapshot = await resultsRef.once("value");

        snapshot.forEach((childSnapshot) => {
          let data = childSnapshot.val();
          let key = childSnapshot.key;

          if (data.trackId == this.circuitId) {
            if (data.time > this.time) {
              db.ref("results/" + key).set({
                id: data.id,
                trackId: this.circuitId,
                playerId: this.playerId,
                time: this.time,
                date: this.formatDate(this.date),
              });

              this.recordUpdated = true;

              this.$toasted.show(
                `
                <p>
                  <b>Lap time updated!</b>

                  <span><b>Player:</b> ${this.getPlayerFromPlayerId.name}</span>
                  <span><b>Track: </b> ${this.getTrackFromTrackId.location} (${this.getTrackFromTrackId.track})</span>
                  <span><b>Time: </b> ${this.time}</span>
                </p>
                `,
                {
                  iconPack: "mdi",
                  icon: "mdi-update",
                  position: "bottom-right",
                  type: "info",
                  duration: 5000,
                  action: {
                    icon: "mdi-close-circle",
                    onClick: (e, toastObject) => {
                      toastObject.goAway(0);
                    },
                  },
                }
              );
            }

            this.playerHasExistingTime = true;
          }
        });

        if (!this.recordUpdated && !this.playerHasExistingTime) {
          db.ref("results").push({
            id: Math.round(Math.random() * 10000),
            trackId: this.circuitId,
            playerId: this.playerId,
            time: this.time,
            date: this.formatDate(this.date),
          });

          this.$toasted.show(
            `
              <p>
                <b>Lap time added!</b>
              
                <span><b>Player:</b> ${this.getPlayerFromPlayerId.name}</span>
                <span><b>Track: </b> ${this.getTrackFromTrackId.location} (${this.getTrackFromTrackId.track})</span>
                <span><b>Time: </b> ${this.time}</span>
              </p>
            `,
            {
              iconPack: "mdi",
              icon: "mdi-clock-time-five-outline",
              position: "bottom-right",
              type: "success",
              duration: 5000,
              action: {
                icon: "mdi-close-circle",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            }
          );
        }

        // Player has existing time for track but not faster
        if (!this.recordUpdated && this.playerHasExistingTime) {
          this.$toasted.show(
            `
              <p>
                <b>Too slow!</b>

                <span><b>Player:</b> ${this.getPlayerFromPlayerId.name}</span>
                <span><b>Track: </b> ${this.getTrackFromTrackId.location} (${this.getTrackFromTrackId.track})</span>
                <span><b>Time: </b> ${this.time}</span>
              </p>
            `,
            {
              iconPack: "mdi",
              icon: "mdi-snail",
              position: "bottom-right",
              type: "error",
              duration: 5000,
              action: {
                icon: "mdi-close-circle",
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            }
          );
        }

        this.playerId =
          this.circuitId =
          this.minutes =
          this.seconds =
          this.decimals =
          this.time =
            "";

        this.date = new Date().toISOString().substr(0, 10);

        this.recordUpdated = this.playerHasExistingTime = false;
        this.closeModal();

        return true;
      }
    },

    closeModal() {
      this.showModal = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },

    openModal() {
      this.showModal = true;
      document.querySelector("body").classList.add("overflow-hidden");
    },

    formatDate(date) {
      date = new Date(date);

      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = date.getFullYear();

      const formattedDate = dd + "/" + mm + "/" + yyyy;
      return formattedDate;
    },
  },

  computed: {
    sortedPlayers() {
      return [...this.players].sort((a, b) => (a.name > b.name ? 1 : -1));
    },

    sortedCircuits() {
      return [...this.circuits].sort((a, b) =>
        a.location > b.location ? 1 : -1
      );
    },

    getPlayerFromPlayerId() {
      return [...this.players].find((p) => p.id === this.playerId);
    },

    getTrackFromTrackId() {
      return [...this.circuits].find((c) => c.id === this.circuitId);
    },

    formatSeconds: {
      get: function () {
        return this.seconds;
      },
      set: function (newValue) {
        this.seconds = ("00" + parseInt(newValue)).slice(-2);
      },
    },

    formatDecimals: {
      get: function () {
        return this.decimals;
      },
      set: function (newValue) {
        this.decimals = ("000" + parseInt(newValue)).slice(-3);
      },
    },
  },

  updated() {
    if (typeof this.$route.params.slug !== "undefined") {
      [...this.circuits].find((c) => {
        if (c.slug == this.$route.params.slug) {
          this.circuitId = c.id;
          return true;
        }
      });

      [...this.players].find((p) => {
        if (p.slug == this.$route.params.slug) {
          this.playerId = p.id;
          return true;
        }
      });
    } else {
      // this.circuitId = "";
      // this.playerId = "";
    }
  },

  firebase: {
    circuits: db.ref("circuits"),
    results: db.ref("results"),
    players: db.ref("players"),
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

input[type="date"] {
  min-height: 52px;
}
</style>