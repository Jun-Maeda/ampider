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
    <div>
      <v-row>
        <v-col cols="12" xl="7">
          <v-card class="mx-auto">
            <v-toolbar color="primary"> </v-toolbar>
            <div class="d-flex flex-row">
              <v-tabs v-model="tab" direction="direction" color="primary">
                <v-tab value="option-1"> 地震 </v-tab>
                <v-tab value="option-2"> 気象警報 </v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item value="option-1">
                  <v-card flat>
                    <v-card-item>
                      <div style="max-width:100">
                        <v-row>
                          <v-col cols="4">
                            <div class="text-center">安否確認実施基準</div>
                          </v-col>
                          <v-col cols="4">
                            <div class="text-center">安否確認タイミング</div>
                          </v-col>
                          <v-col cols="2">
                            <div class="text-center">リマインド間隔</div>
                          </v-col>
                          <v-col cols="2">
                            <div class="text-center">リマインド回数(電話)</div>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card-item>
                  </v-card>
                </v-window-item>
                <v-window-item value="option-2">
                  <v-card flat>
                    <v-card-text>
                      <p>test4</p>
                      <p>test5</p>
                      <p>test6</p>
                      <p>test7</p>
                      <p class="mb-0">test8</p>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </v-card>
          <v-row justify="end">
            <v-col cols="3">
              <div class="text-center">安否確認実施基準</div>
            </v-col>
            <v-col cols="3">
              <div class="text-center">安否確認タイミング</div>
            </v-col>
            <v-col cols="2">
              <div class="text-center">リマインド間隔</div>
            </v-col>
            <v-col cols="2">
              <div class="text-center">リマインド回数(電話)</div>
            </v-col>
          </v-row>
          <v-card class="mx-auto" variant="outlined">
            <v-card-item>
              <v-row>
                <v-col cols="2">
                  <div class="text-center">地震</div>
                </v-col>
                <v-col cols="3" offset="3">
                  <v-row>
                    <v-col cols="6">
                      <v-select :items="hour" density="compact" variant="outlined"></v-select>
                    </v-col>
                    <!-- <v-col cols="1">
                      <div>時間</div>
                    </v-col> -->
                    <v-col cols="6">
                      <v-select :items="minutes" density="compact" variant="outlined"></v-select>
                    </v-col>
                    <!-- <v-col cols="1">
                      <div>分</div>
                    </v-col> -->
                  </v-row>
                </v-col>
                <v-col cols="2">
                  <v-select :items="interval" density="compact" variant="outlined"></v-select>
                </v-col>
                <v-col cols="2">
                  <v-select :items="remind" density="compact" variant="outlined"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3" offset="2">
                  <v-select :items="standard" density="compact" variant="outlined"></v-select>
                </v-col>
              </v-row>
            </v-card-item>
          </v-card>
          <v-row>
            <v-col cols="12" md="2">
              <p>気象警報を選択</p>
            </v-col>
            <v-col cols="12" md="6">
              <v-container fluid>
                <v-checkbox v-model="alert" label="暴風雪特別警報" value="blizzard" density="compact"></v-checkbox>
                <v-checkbox v-model="alert" label="暴風特別警報" value="storm" density="compact"></v-checkbox>
                <v-checkbox v-model="alert" label="大雨特別警報" value="heavyRain" density="compact"></v-checkbox>
                <v-checkbox v-model="alert" label="波浪特別警報" value="waves" density="compact"></v-checkbox>
                <v-checkbox v-model="alert" label="高潮特別警報" value="stormSurge" density="compact"></v-checkbox>
                <v-checkbox v-model="alert" label="大雪特別警報" value="heavySnow" density="compact"></v-checkbox>
              </v-container>
            </v-col>
          </v-row>
          <div class="mt-5">
            <v-row justify="end">
              <v-btn color="orange" @click="viewSelect"> 保存 </v-btn>
              <v-dialog v-model="dialog" width="auto">
                <v-card>
                  <v-card-item>
                    <p>安否確認実施基準：{{ viewSelect }}</p>
                    <p>警報種別：{{ alert }}</p>
                  </v-card-item>
                  <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">閉じる</v-btn>
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
    tab: 'option-1',
    direction: 'vertical',
    link: [
      {
        title: '通知設定',
        disabled: false,
        href: 'disaster_list',
      },
    ],
    // headers: [
    //   { title: '災害', key: 'type', sortable: false, align: 'center' },
    //   { title: '安否確認実施基準', key: 'standard', sortable: false, align: 'center' },
    //   {
    //     title: '安否確認タイミング',
    //     key: 'timing',
    //     sortable: false,
    //     align: 'center',
    //     children: [
    //       { title: '時間', key: 'hour', sortable: false, align: 'center' },
    //       { title: '分', key: 'minutes', sortable: false, align: 'center' },
    //     ],
    //   },
    //   { title: 'リマインド間隔', key: 'interval', sortable: false, align: 'center' },
    //   { title: 'リマインド回数', key: 'remind', sortable: false, align: 'center' },
    // ],
    standard: ['震度3', '震度4', '震度5弱', '震度5強', '震度6弱', '震度6強', '震度7'],
    hour: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
    minutes: ['0', '15', '30', '45'],
    interval: ['0', '15', '30', '45', '60'],
    remind: ['1', '2', '3', '4', '5'],

    // standard: [],
    // hour: [],
    // minutes: [],
    // interval: [],
    // remind: [],
    selected: [],
    // alert: [],

    dialog: false,
  }),
  mounted() {},
  methods: {
    viewSelect() {
      this.dialog = true
      console.log(this.selected)
      this.selected.forEach
    },
  },
}
</script>
