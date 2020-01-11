<script>
import Window from './components/Window.vue';
import WindowBar from './components/WindowBar.vue';

export default {
  name: 'App',
  components: {
    Window,
    WindowBar,
  },
  beforeMount() {
    this.$vuetify.theme.dark = true
  }
};
</script>

<template>
  <v-app class="application--toolbar">
    <WindowBar />
    <v-card class="top-indent">
      <v-card-text>
        <Window />
      </v-card-text>
    </v-card>
  </v-app>
</template>

<style scoped>
  .top-indent {
    position: fixed;
    height: 100vh;
    padding-top: 25px;
    width: 100%;
    overflow-y: auto;
  }
</style>
