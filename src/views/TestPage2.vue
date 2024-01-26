<template>
  <v-card>
    <div class="d-flex flex-row">
      <v-tabs v-model="tab" bg-color="primary" direction="direction">
        <v-tab value="one">カウント</v-tab>
        <v-tab value="two">スイッチ</v-tab>
        <v-tab value="three">テキストエリア</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="one">
            <v-container fluid> </v-container>
          </v-window-item>

          <v-window-item value="two">
            <v-container fluid> </v-container>
          </v-window-item>

          <v-window-item value="three">
            <v-container fluid> </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: null,
    message: '',
    timer: null,
    input: '',
    hello: '名前を入力してください',
  }),
  mounted() {
    this.timer = setInterval(() => {
      this.count++
      this.message = 'カウント:' + this.count
    }, 1000)
  },
  methods: {
    stopButton() {
      clearInterval(this.timer)
    },
    name_input() {
      this.hello = 'こんにちは' + this.input
    },
  },
  created() {
    this.count = 0
  },
}
</script>
