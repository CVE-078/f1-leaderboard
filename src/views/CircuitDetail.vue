<template>
  <div>
    <CircuitDetail :circuit="currentCircuit" />
    <Leaderboard :results="filteredResults" />
  </div>
</template>

<script>
import { db } from "@/db";
import CircuitDetail from "@/components/CircuitDetail";
import Leaderboard from "@/components/Leaderboard";

export default {
  components: {
    CircuitDetail,
    Leaderboard,
  },

  data() {
    return {
      circuits: [],
      results: [],
    };
  },

  created() {
    this.slug = this.$route.params.slug;
  },

  computed: {
    filteredResults() {
      return this.results
        .filter((r) => r.trackId === this.currentCircuit.id)
        .sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));
    },

    currentCircuit() {
      return this.circuits.find((c) => c.slug == this.slug);
    },
  },

  firebase: {
    circuits: db.ref("circuits"),
    results: db.ref("results"),
  },
};
</script>
