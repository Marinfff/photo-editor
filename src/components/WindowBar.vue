<script>
import {ipcRenderer} from 'electron';

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
    class="top"
    color="purple"
    fixed
    flat
    height="30"
  >
    <v-icon color="white">mdi-store</v-icon>
    <span class="white--text pl-2">Photostore</span>
    <div class="flex-grow-1"></div>
    <v-icon color="white" class="icon pr-1" small @click="ipcRenderer.send('minimize')">mdi-window-minimize</v-icon>
    <v-icon color="white" class="icon pr-1" small @click="ipcRenderer.send('maximize')">mdi-window-maximize</v-icon>
    <v-icon color="white" class="icon" small @click="ipcRenderer.send('close')">mdi-window-close</v-icon>
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
