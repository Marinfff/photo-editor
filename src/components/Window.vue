<script>
    import fs from 'fs'
    const {dialog} = require('electron').remote;

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
            readFromTxt(path) {
                fs.readFile(path, "utf8", (error, data) => {
                    this.expression = data
                });
            },
            evaluate () {
                console.log(this.expression, eval(this.expression))
                this.result = eval(this.expression)
            }
        }
    };
</script>

<template>
    <div>
        <div>{{expression}} = {{result}}</div>
        <v-btn @click="readFromTxt(path)" color="blue">Read from text</v-btn>
        <v-btn @click="evaluate()" color="green">Eval</v-btn>
    </div>
</template>

<style scoped>

</style>
