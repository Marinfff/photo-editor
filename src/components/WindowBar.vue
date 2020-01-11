<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'WindowHeader',
  data() {
    return {
      ipcRenderer,
    };
  },
};
</script>

<template>
  <v-system-bar
    fixed
    class="top"
    color="grey darken-4"
    height="30"
    flat
  >
    <v-icon>mdi-database</v-icon>
    <span class="pl-2">App</span>
    <div class="flex-grow-1"></div>
    <v-icon small class="icon pr-1" @click="ipcRenderer.send('minimize')">mdi-window-minimize</v-icon>
    <v-icon small class="icon pr-1" @click="ipcRenderer.send('maximize')">mdi-window-maximize</v-icon>
    <v-icon small class="icon" @click="ipcRenderer.send('close')">mdi-window-close</v-icon>
  </v-system-bar>
</template>

<style scoped>
  .top {
    -webkit-app-region: drag;
  }
  .icon {
    -webkit-app-region: no-drag;
  }
</style>
