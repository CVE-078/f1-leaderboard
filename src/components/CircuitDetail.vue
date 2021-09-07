<template>
  <div class="circuit-detail">
    <div
      class="circuit-detail__header"
      :style="{backgroundImage: `url(${require('@/assets/images/backgrounds/' + circuit.slug + '.jpg')})`}"
    >
      <div class="circuit-detail__content">
        <h2 class="circuit-detail__title">
          <img
            class="circuit-detail__image"
            :src="require(`@/assets/images/flags/` + circuit.code + `.png`)"
          />

          {{ circuit.location }}
        </h2>

        <p class="circuit-detail__track">{{ circuit.track }}</p>

        <p v-if="circuit.start && circuit.end" class="circuit-detail__date">
          {{ this.formatDate(circuit.start) }} -
          {{ this.formatDate(circuit.end) }}
        </p>
      </div>

      <div class="circuit-detail__circuitHolder">
        <img
          class="circuit-detail__circuit"
          :src="require(`@/assets/images/circuits/` + circuit.slug + `.png`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CircuitDetail",

  props: {
    circuit: { required: true, type: Object },
  },

  methods: {
    formatDate(date) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const dt = new Date(date);
      const dd = String(dt.getDate()).padStart(2, "0");
      const mm = monthNames[dt.getMonth()];
      const yyyy = dt.getFullYear();

      const formattedDate = dd + " " + mm + " " + yyyy;
      return formattedDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.circuit-detail {
  @apply md:mt-10 md:rounded-sm overflow-hidden;
  $circuitDetail: ".circuit-detail";

  #{$circuitDetail} {
    &__header {
      @apply py-2 px-8 sm:py-8 sm:px-8 shadow-lg flex flex-col sm:flex-row justify-between bg-cover bg-no-repeat bg-center relative;

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

    &__content {
      @apply mt-2;
    }

    &__title {
      @apply text-white text-xl sm:text-3xl font-bold flex origin-center;
    }

    &__image {
      @apply w-10 sm:w-14 max-h-7 sm:max-h-9 mr-3 object-cover;
    }

    &__track {
      @apply mt-2 text-white text-base sm:text-lg md:text-xl font-semibold;
    }

    &__date {
      @apply inline-flex items-center justify-center px-3 py-2 mt-2 text-xs sm:text-sm font-bold leading-none text-white bg-red-600 rounded-full;
    }

    &__circuitHolder {
      @apply flex justify-center md:justify-end;
    }

    &__circuit {
      @apply w-28 sm:w-40 h-28 sm:h-40 object-contain;
    }

    &__content,
    &__circuitHolder {
      position: relative;
      z-index: 3;
    }
  }
}
</style>
