<script setup>
const props = defineProps({
  user: Object,
})
</script>
<template>
  <v-container>
    <v-row justify="start">
      <v-breadcrumbs :items="link">
        <template #divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-row>
    <v-divider></v-divider>
    <!-- <div class="mt-4">
      <h2>災害ごとの通知基準</h2>
    </div> -->
    <div class="mt-8">
      <v-row>
        <v-col cols="12" xl="7">
          <v-card variant="outlined">
            <div class="d-flex flex-row">
              <v-tabs v-model="tab" color="primary" direction="direction">
                <v-tab value="one">地震</v-tab>
                <v-tab value="two">気象警報</v-tab>
                <v-tab value="three">手動発報</v-tab>
              </v-tabs>

              <v-card-text>
                <v-window v-model="tab">
                  <v-window-item value="one">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" md="4">
                          <div class="text-start">安否確認実施基準</div>
                          <div class="mt-3">
                            <v-select
                              v-model="earthquake.selected.standard"
                              :items="earthquake.choices.standard"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                          </div>
                        </v-col>
                        <v-col cols="12" md="4">
                          <div class="text-start">安否確認タイミング</div>
                          <div class="mt-3">
                            <v-row>
                              <v-col cols="6" class="d-flex align-center">
                                <v-select
                                  v-model="earthquake.selected.hour"
                                  :items="earthquake.choices.hour"
                                  density="compact"
                                  variant="outlined"
                                ></v-select>
                                <p class="my-auto">時間</p>
                              </v-col>
                              <v-col cols="6" class="d-flex align-center">
                                <v-select
                                  v-model="earthquake.selected.minutes"
                                  :items="earthquake.choices.minutes"
                                  density="compact"
                                  variant="outlined"
                                ></v-select>
                                <div class="my-auto">分</div>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                        <v-col cols="12" md="2">
                          <div class="text-start">リマインド間隔</div>
                          <div class="mt-3 d-flex align-center">
                            <v-select
                              v-model="earthquake.selected.interval"
                              :items="earthquake.choices.interval"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                            <p class="my-auto">分</p>
                          </div>
                        </v-col>
                        <v-col cols="12" md="2">
                          <div class="text-start">リマインド回数(電話)</div>
                          <div class="mt-3 d-flex align-center">
                            <v-select
                              v-model="earthquake.selected.remind"
                              :items="earthquake.choices.remind"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                            <p class="my-auto">回</p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-window-item>

                  <v-window-item value="two">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-container fluid>
                            <v-checkbox v-model="weather.selected.alert" label="暴風雪特別警報" value="暴風雪特別警報" density="compact"></v-checkbox>
                            <v-checkbox v-model="weather.selected.alert" label="暴風特別警報" value="暴風特別警報" density="compact"></v-checkbox>
                            <v-checkbox v-model="weather.selected.alert" label="大雨特別警報" value="大雨特別警報" density="compact"></v-checkbox>
                            <v-checkbox v-model="weather.selected.alert" label="波浪特別警報" value="波浪特別警報" density="compact"></v-checkbox>
                            <v-checkbox v-model="weather.selected.alert" label="高潮特別警報" value="高潮特別警報" density="compact"></v-checkbox>
                            <v-checkbox v-model="weather.selected.alert" label="大雪特別警報" value="大雪特別警報" density="compact"></v-checkbox>
                          </v-container>
                        </v-col>
                        <v-col cols="12" md="4">
                          <div class="text-start">安否確認タイミング</div>
                          <div class="mt-3">
                            <v-row>
                              <v-col cols="6" class="d-flex align-center">
                                <v-select
                                  v-model="weather.selected.hour"
                                  :items="weather.choices.hour"
                                  density="compact"
                                  variant="outlined"
                                ></v-select>
                                <div class="my-auto">時間</div>
                              </v-col>
                              <v-col cols="6" class="d-flex align-center">
                                <v-select
                                  v-model="weather.selected.minutes"
                                  :items="weather.choices.minutes"
                                  density="compact"
                                  variant="outlined"
                                ></v-select>
                                <div class="my-auto">分</div>
                              </v-col>
                            </v-row>
                          </div>
                        </v-col>
                        <v-col cols="12" md="2">
                          <div class="text-start">リマインド間隔</div>
                          <div class="mt-3 d-flex align-center">
                            <v-select
                              v-model="weather.selected.interval"
                              :items="weather.choices.interval"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                            <div class="my-auto">分</div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="2">
                          <div class="text-start">リマインド回数(電話)</div>
                          <div class="mt-3 d-flex align-center">
                            <v-select
                              v-model="weather.selected.remind"
                              :items="weather.choices.remind"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                            <div class="my-auto">回</div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-window-item>
                  <v-window-item value="three">
                    <v-container fluid>
                      <v-row>
                        <v-col cols="12" md="5" offset="1">
                          <div class="text-start">リマインド間隔</div>
                          <div class="mt-3 d-flex align-center">
                            <v-select
                              v-model="earthquake.selected.interval"
                              :items="earthquake.choices.interval"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                            <p class="my-auto">分</p>
                          </div>
                        </v-col>
                        <v-col cols="12" md="5" offset="1">
                          <div class="text-start">リマインド回数(電話)</div>
                          <div class="mt-3 d-flex align-center">
                            <v-select
                              v-model="earthquake.selected.remind"
                              :items="earthquake.choices.remind"
                              density="compact"
                              variant="outlined"
                            ></v-select>
                            <p class="my-auto">回</p>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-window-item>
                </v-window>
              </v-card-text>
            </div>
          </v-card>
          <div class="mt-8">
            <v-row justify="end">
              <v-btn color="orange" @click="saveData()"> 保存 </v-btn>
              <v-dialog v-model="dialog" width="auto">
                <v-card>
                  <v-card-text>
                    <p>地震</p>
                    <p style="text-indent: 1rem">安否確認実施基準：{{ earthquake.selected.standard }}</p>
                    <p style="text-indent: 1rem">安否確認タイミング:{{ earthquake.selected.timing }}分</p>
                    <p style="text-indent: 1rem">リマインド間隔:{{ earthquake.selected.interval }}分</p>
                    <p style="text-indent: 1rem">リマインド回数:{{ earthquake.selected.remind }}回</p>
                    <p>気象警報</p>
                    <p style="text-indent: 1rem">選択した気象警報:{{ weather.selected.alert }}</p>
                    <p style="text-indent: 1rem">安否確認タイミング:{{ weather.selected.timing }}分</p>
                    <p style="text-indent: 1rem">リマインド間隔:{{ weather.selected.interval }}分</p>
                    <p style="text-indent: 1rem">リマインド回数:{{ weather.selected.remind }}回</p>
                    <p>手動発報</p>
                    <p style="text-indent: 1rem">リマインド間隔:{{ manual.selected.interval }}分</p>
                    <p style="text-indent: 1rem">リマインド回数:{{ manual.selected.remind }}回</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="orange" @click="dialog = false">閉じる</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
    <div>
      {{ info }}
    </div>
  </v-container>
</template>

<script>
// import { Logger } from 'aws-amplify';
export default {
  data: () => ({
    tab: 'one',
    tab2: 'option-1',
    direction: 'vertical',
    link: [
      {
        title: '災害ごとの通知基準',
        disabled: false,
        // href: 'disaster_list',
      },
    ],
    earthquake: {
      choices: {
        standard: ['震度3', '震度4', '震度5弱', '震度5強', '震度6弱', '震度6強', '震度7'],
        hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        minutes: [0, 15, 30, 45],
        interval: [15, 30, 45, 60],
        remind: [1, 2, 3, 4, 5],
      },
      selected: {
        standard: null,
        timing: null,
        hour: null,
        minutes: null,
        interval: 30,
        remind: 5,
      },
    },
    weather: {
      choices: {
        hour: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        minutes: [0, 15, 30, 45],
        interval: [15, 30, 45, 60],
        remind: [1, 2, 3, 4, 5],
      },
      selected: {
        alert: [],
        timing: null,
        hour: null,
        minutes: null,
        interval: null,
        remind: null,
      },
    },
    manual: {
      choices: {
        interval: [15, 30, 45, 60],
        remind: [1, 2, 3, 4, 5],
      },
      selected: {
        interval: null,
        remind: null,
      },
    },
    dialog: false,
    info: null,
  }),
  mounted() {
    let alertRemindUrl = 'https://43pwwm4p4e.execute-api.ap-northeast-1.amazonaws.com/items'
    let get_token = this.get_token(this.$props.user.username)
    const config = {
      headers: {
        Authorization: get_token,
      },
    }
    this.axios
      .get(alertRemindUrl, config)
      .then((res) => {
        for (var item in res.data) {
          var disasterName = res.data[item]['disaster_name']
          switch (disasterName) {
            case '地震':
              this.convertIntensity(res.data[item]['disaster_level'])
              this.earthquake.selected.hour = this.calculateHour(res.data[item]['alert_interval'])
              this.earthquake.selected.minutes = this.calculateMiniutes(res.data[item]['alert_interval'])
              this.earthquake.selected.interval = res.data[item]['remind_interval']
              this.earthquake.selected.remind = res.data[item]['remind_num']
              break
            case '気象警報':
              this.weather.selected.alert = res.data[2]['disaster_level']
              this.weather.selected.hour = this.calculateHour(res.data[2]['alert_interval'])
              this.weather.selected.minutes = this.calculateMiniutes(res.data[2]['alert_interval'])
              this.weather.selected.interval = res.data[2]['remind_interval']
              this.weather.selected.remind = res.data[2]['remind_num']
              break
            case '手動':
              this.manual.selected.interval = res.data[4]['remind_interval']
              this.manual.selected.remind = res.data[4]['remind_num']
          }
        }
      })
      .catch((err) => console.log(err))
  },
  methods: {
    //保存時に実行する関数
    saveData() {
      this.hoursToMinutes()
      this.dialog = true
      var disasterName = '気象警報'
      var sendData = {
        alert_interval: this.weather.selected.timing,
        remind_interval: this.weather.selected.interval,
        remind_num: this.weather.selected.remind,
        disaster_lebel: this.weather.selected.alert,
      }
      this.callPutApi(disasterName, sendData)

      disasterName = '地震'
      sendData = {
        alert_interval: this.earthquake.selected.timing,
        remind_interval: this.earthquake.selected.interval,
        remind_num: this.earthquake.selected.remind,
        disaster_lebel: this.convertDisasterLevel(),
      }
      this.callPutApi(disasterName, sendData)

      disasterName = '手動'
      sendData = {
        remind_interval: this.earthquake.selected.interval,
        remind_num: this.earthquake.selected.remind,
      }
      this.callPutApi(disasterName, sendData)
    },
    // 時間＋分を分に変換
    hoursToMinutes() {
      this.earthquake.selected.timing = this.earthquake.selected.hour * 60 + this.earthquake.selected.minutes
      this.weather.selected.timing = this.weather.selected.hour * 60 + this.weather.selected.minutes
    },
    calculateHour(timing) {
      var hour = Math.floor(timing / 60)
      return hour
    },
    calculateMiniutes(timing) {
      var minutes = timing % 60
      return minutes
    },
    convertIntensity(disaster_level) {
      switch (disaster_level) {
        case 3:
          this.earthquake.selected.standard = '震度3'
          break
        case 4:
          this.earthquake.selected.standard = '震度4'
          break
        case 4.9:
          this.earthquake.selected.standard = '震度5弱'
          break
        case 5.1:
          this.earthquake.selected.standard = '震度5強'
          break
        case 5.9:
          this.earthquake.selected.standard = '震度6弱'
          break
        case 6.1:
          this.earthquake.selected.standard = '震度6強'
          break
        case 7:
          this.earthquake.selected.standard = '震度7'
          break
      }
    },
    convertDisasterLevel() {
      var disasterLevel
      switch (this.earthquake.selected.standard) {
        case '震度3':
          disasterLevel = 3
          break
        case '震度4':
          disasterLevel = 4
          break
        case '震度5弱':
          disasterLevel = 4.9
          break
        case '震度5強':
          disasterLevel = 5.1
          break
        case '震度6弱':
          disasterLevel = 5.9
          break
        case '震度6強':
          disasterLevel = 6.1
          break
        case '震度7':
          disasterLevel = 7
          break
      }
      return disasterLevel
    },
    callPutApi(disasterName, sendData) {
      let alertRemindUrl = 'https://43pwwm4p4e.execute-api.ap-northeast-1.amazonaws.com/items/'
      let get_token = this.get_token(this.$props.user.username)
      const config = {
        headers: {
          'content-type': 'text/plain',
          'Authorization': get_token,
        },
      }
      this.axios
        .put(alertRemindUrl + disasterName, sendData, config)
        .then((res) => {
          this.unit_details = res.data
        })
        .catch((err) => {
          console.log(err)
          alert('更新に失敗しました。')
        })
    },
  },
}
</script>
