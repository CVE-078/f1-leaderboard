<template>
  <div id="app" class="bg-gray-100 dark:bg-gray-900 transition-all overflow-hidden">
    <NavigationBar :isDarkMode="isDarkMode" @update-darkmode="updateDarkMode" />

    <transition name="fade" mode="out-in">
      <router-view
        :key="$route.fullPath"
        class="max-w-7xl mx-auto pt-16 pb-10 mb-20"
      />
    </transition>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";

export default {
  data() {
    return {
      isDarkMode: false,
    };
  },

  components: {
    NavigationBar,
  },

  methods: {
    updateDarkMode(value) {
      this.isDarkMode = value;
    },
  },

  mounted() {
    let localTheme = localStorage.getItem("theme");

    this.isDarkMode = localTheme === "dark" ? true : false;
  },
};
</script>

<style lang="scss">
html,
body {
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-thumb {
    background: #c2c2c2;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #b1b2b5;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
