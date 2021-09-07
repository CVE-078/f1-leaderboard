<template>
  <router-link
    class="circuit-item"
    :to="{ name: 'CircuitDetail', params: { slug: circuit.slug } }"
  >
    <span class="circuit-item__imageHolder sm:w-18 sm:h-18">
      <img
        class="circuit-item__image sm:w-18 sm:h-18"
        :src="require(`@/assets/images/flags/` + circuit.code + `.png`)"
      />
    </span>

    <div class="circuit-item__text">
      <h2 class="circuit-item__location">{{ circuit.location }}</h2>
      <p class="circuit-item__track">{{ circuit.track }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CircuitItem",

  props: {
    circuit: { required: true, type: Object },
  },
};
</script>

<style lang="scss" scoped>
.circuit-item {
  $circuitItem: ".circuit-item";

  #{$circuitItem} {
    &__imageHolder {
      @apply w-16 h-16 absolute -top-8 sm:-top-8 right-6;
    }

    &__image {
      @apply w-16 h-16 object-cover rounded-full border-2 border-gray-800;
    }

    &__text {
      @apply mt-2 absolute bottom-4 left-0 px-8 w-full;
    }

    &__location {
      @apply text-white text-xl font-semibold;
    }

    &__track {
      @apply mb-2 text-white;
    }
  }
}
</style>