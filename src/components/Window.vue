<script>
    import fs from 'fs'
    import {ipcRenderer } from 'electron'

    export default {
        name: 'Window',
        data () {
            return {
                expression: '',
                result: '',
                path: './src/files/test.txt'
            }
        },
        methods: {
            getFilePath() {
                this.path = ipcRenderer.sendSync('getPath','path', 10);
                this.readFromTxt(this.path.filePaths[0])
            },
            readFromTxt(path) {
                fs.readFile(path, "utf8", (error, data) => {
                    this.expression = data
                });
            },
            evaluate () {
                this.result = eval(this.expression)
            }
        }
    };
</script>

<template>
    <div class="pos_center">
        <div class="title mb-5">{{expression}} {{result ? '=' : ''}} {{result}}</div>
        <v-btn @click="getFilePath()" color="blue">Read from text</v-btn>
        <v-btn class="ml-2" @click="evaluate()" color="green">Eval</v-btn>
    </div>
</template>

<style scoped>
    .pos_center {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        left: 50%;
        transform: translateX(-50%);
    }
</style>

