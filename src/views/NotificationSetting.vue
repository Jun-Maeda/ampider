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
    <div class="mt-4">
      <h2>災害ごとの通知基準</h2>
    </div>
    <div class="mt-8">
      <v-row>
        <v-col cols="12" xl="7">
          <v-card variant="outlined">
            <div class="d-flex flex-row">
              <v-tabs v-model="tab" color="primary" direction="direction">
                <v-tab value="one">地震</v-tab>
                <v-tab value="two">気象警報</v-tab>
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
                                  @click="selecMinutes"
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
                </v-window>
              </v-card-text>
            </div>
          </v-card>
          <div class="mt-8">
            <v-row justify="end">
              <v-btn color="orange" @click="dialog = true"> 保存 </v-btn>
              <v-dialog v-model="dialog" width="auto">
                <v-card>
                  <v-card-text>
                    <p>地震</p>
                    <p style="text-indent: 1rem">安否確認実施基準：{{ earthquake.selected.standard }}</p>
                    <p style="text-indent: 1rem">安否確認タイミング:{{ earthquake.selected.hour }}時間{{ earthquake.selected.minutes }}分</p>
                    <p style="text-indent: 1rem">リマインド間隔:{{ earthquake.selected.interval }}分</p>
                    <p style="text-indent: 1rem">リマインド回数:{{ earthquake.selected.remind }}回</p>
                    <p>気象警報</p>
                    <p style="text-indent: 1rem">選択した気象警報:{{ weather.selected.alert }}</p>
                    <p style="text-indent: 1rem">安否確認タイミング:{{ weather.selected.hour }}時間{{ weather.selected.minutes }}分</p>
                    <p style="text-indent: 1rem">リマインド間隔:{{ weather.selected.interval }}分</p>
                    <p style="text-indent: 1rem">リマインド回数:{{ weather.selected.remind }}回</p>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    tab: 'one',
    tab2: 'option-1',
    direction: 'vertical',
    link: [
      {
        title: '通知設定',
        disabled: false,
        href: 'disaster_list',
      },
    ],
    earthquake: {
      choices: {
        standard: ['震度3', '震度4', '震度5弱', '震度5強', '震度6弱', '震度6強', '震度7'],
        hour: [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
        ],
        minutes: ['0', '15', '30', '45'],
        interval: ['15', '30', '45', '60'],
        remind: ['1', '2', '3', '4', '5'],
      },
      selected: {
        standard: '震度5弱',
        hour: '0',
        minutes: '15',
        interval: '30',
        remind: '5',
      },
    },
    weather: {
      choices: {
        hour: [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
        ],
        minutes: ['0', '15', '30', '45'],
        interval: ['15', '30', '45', '60'],
        remind: ['1', '2', '3', '4', '5'],
      },
      selected: {
        alert: [],
        hour: '0',
        minutes: '15',
        interval: '30',
        remind: '5',
      },
    },
    dialog: false,
  }),
  mounted() {},
  methods: {
    selecMinutes() {
      console.log(this.earthquake.selected.hour)
      if (this.earthquake.selected.hour === '0') {
        this.earthquake.choices.minutes = ['15', '30', '45']
      } else {
        this.earthquake.choices.minutes = ['0', '15', '30', '45']
      }
    },
  },
}
</script>
