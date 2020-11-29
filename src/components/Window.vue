<script>
import reader from 'jimp/es';
import {ipcRenderer} from 'electron'
import Jimp from "jimp";

export default {
  name: 'Window',
  data() {
    return {
      reader,
      expression: '',
      imageInstance: '',
      image: "",
      path: '',
      loading: false
    }
  },
  methods: {
    getFilePath() {
      this.path = ipcRenderer.sendSync('getPath', 'path', 10);
      this.readImage(this.path.filePaths[0])
    },
    async printImage() {
      this.image = await this.imageInstance.getBase64Async('image/jpeg')
    },
    async readImage(path) {
      this.loading = true;
      try {
        this.imageInstance = await this.reader.read(path)
        await this.printImage();
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false;
      }
    },
    async invert() {
      this.imageInstance.invert();
      await this.printImage();
    },
    async color() {
      this.imageInstance.invert();
      await this.printImage();
    },
    async greyscale() {
      this.imageInstance.greyscale();
      await this.printImage();
    },
    async background() {
      this.imageInstance.greyscale();
      this.imageInstance.color([
        {apply: 'lighten', params: [75]}
      ])
      for (const {x, y} of this.imageInstance.scanIterator(
        0,
        0,
        this.imageInstance.bitmap.width,
        this.imageInstance.bitmap.height
      )) {
        if (this.imageInstance.getPixelColor(x, y) !== 4294967295) {
          this.imageInstance.setPixelColor(Jimp.rgbaToInt(0, 255, 0, 1), x, y)
        } else {
          this.imageInstance.setPixelColor(Jimp.rgbaToInt(0, 0, 255, 1), x, y)
        }
      }
      await this.printImage();
    },
    async createSvg() {
      const path = ipcRenderer.sendSync('getPath', 'path', 10);
      const sharp = require("sharp")

      await sharp(path.filePaths[0])
        .png()
        .toFile(path.filePaths[0].replace('.svg', '') + ".jpeg")
    },
    async saveFile() {
      const response = ipcRenderer.sendSync('setPath', 'path', 10);
      await this.imageInstance.writeAsync(response.filePath + ".jpeg");
    },
  }
};
</script>

<template>
  <div>
    <div v-if="loading" class="pos_center">
      <v-progress-circular
        :size="200"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else-if="path" class="align-center">
      <div class="mb-2 d-flex">
        <v-icon class="pr-2" @click="getFilePath()">mdi-upload</v-icon>
        <v-icon class="pr-2" @click="saveFile()">mdi-content-save</v-icon>
        <v-spacer></v-spacer>
        <v-icon class="pr-2" @click="invert()">mdi-invert-colors</v-icon>
        <v-icon class="pr-2" color="success" @click="background()">mdi-eyedropper-variant</v-icon>
        <v-icon class="pr-2" @click="greyscale()">mdi-invert-colors-off</v-icon>
      </div>
      <v-divider></v-divider>
      <div class="mt-2">
        <v-img :src="image" contain></v-img>
      </div>
    </div>
    <div v-else class="pos_center text-center d-flex">
      <div class="mr-10">
        <div>
          <v-icon color="purple" size="150" @click="getFilePath">mdi-image-plus</v-icon>
        </div>
        <div class="title">
          Click to select image for edit (jpeg)
        </div>
      </div>
      <v-spacer></v-spacer>
      <div class="ml-10">
        <div>
          <v-icon color="purple" size="150" @click="createSvg">mdi-folder-image</v-icon>
        </div>
        <div class="title">
          Click to select svg for convert in jpeg
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pos_center {
  position: fixed;
  top: 20%;
  transform: translateY(-50%);
  left: 50%;
  transform: translateX(-50%);
}
</style>

