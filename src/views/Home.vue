<script setup>
import { infoListStore } from '@/stores/info_list'
import { disasterListStore } from '@/stores/disaster_list'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  user: Object,
})
</script>
<template>
  <v-container>
    <div class="mt-4">
      <v-row justify="start">
        <v-breadcrumbs :items="bread_link">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
      </v-row>
    </div>
    <v-divider></v-divider>
    <!-- <h2>HOME</h2> -->
    <div class="mt-8">
      <h6>お知らせ</h6>
      <v-card color="black" variant="outlined">
        <v-card-title>{{ info.title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text> {{ info.text }}</v-card-text>
      </v-card>
      <div class="mt-8">
        <v-row justify="end">
          <v-btn :to="link.infoList" color="primary" variant="text">お知らせ一覧へ→</v-btn>
        </v-row>
      </div>
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto" :height="bkPoint.cardHeight" :variant="elevated">
              <v-card-item>
                <apexchart type="pie" :height="bkPoint.chartHeight" :options="pie_chart.options" :series="pie_chart.series"></apexchart>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto" :height="bkPoint.cardHeight" :variant="elevated">
              <v-card-item>
                <apexchart type="bar" :height="bkPoint.chartHeight" :options="bar_chart.options" :series="bar_chart.series"></apexchart>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="mx-auto" :height="bkPoint.cardHeight" :variant="elevated">
              <v-card-item>
                <!-- <apexchart type="bar" :height="bkPoint.chartHeight" :options="family_bar_chart.options" :series="family_bar_chart.series"></apexchart>
                 -->
                <v-data-table-virtual :headers="family_headers" :items="families">
                  <template v-slot:no-data> 該当するものがありません。 </template>
                </v-data-table-virtual>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="mt-8">
      <v-row justify="start">
        <h6>最新安否確認</h6>
        <v-col cols="12" xl="10">
          <v-data-table-virtual :headers="headers" :items="disaster" density="compact" @click:row="clickItem" items-per-page-text="表示行数">
        <template v-slot:[`item.type`]="{ value }">
          <v-chip variant="flat" :color="getColor(value)">
            <p class="my-auto">{{ format(value) }}</p>
          </v-chip>
        </template>
        <template v-slot:[`item.datetime`]="{ value }">
          {{ date_format(value) }}
        </template>
        <template v-slot:[`item.area`]="{ item }">
          <p v-if="item.disaster_name == '地震'">
            <ul style="list-style: none;" class="pa-0">
              <li v-for="(area,key) in earthquake_areas(item.max_eq_scale)" :key="key"> {{ area }}</li>
            </ul>
          </p>
          <p v-if="item.disaster_name == '気象'">
            {{ item.prefecture }}
          </p>
        </template>
        <template v-slot:[`item.lebel`]="{ item }">
          <p v-if="item.disaster_name == '地震'">
            <ul style="list-style: none;" class="pa-0">
              【最大震度】
              <li v-for="(lebel,key) in item.max_eq_scale" :key="key">{{ key }}: {{ lebel }}</li>
            </ul>
          </p>
          <p v-if="item.disaster_name == '気象'">
            <ul style="list-style: none;" class="pa-0">
              <li v-for="(lebel,key) in item.alert" :key="key">{{ lebel }}</li>
            </ul>
          </p>
        </template>
        <!-- <template v-slot:[`item.title`]="{ item }">
          <p>【{{ item.type }}】{{ item.date }} {{ item.location }} {{ item.Level }}</p>
        </template> -->
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
          該当するものがありません。
        </template>
      </v-data-table-virtual>
          <v-dialog v-model="modal" max-width="500px" @input="modal = false">
            <v-card>
              <v-card-text class="text-center">{{ modalDetail }}</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="closeModal" color="blue-darken-1" variant="text">閉じる</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </div>
    <div class="mt-8">
      <v-row justify="end">
        <v-btn :to="link.oldDisaster" color="primary" variant="text">過去の災害一覧へ→</v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import { computed } from "vue";
import { useDisplay } from 'vuetify'

import VueApexCharts from 'vue3-apexcharts'
// import admin from '@/components/Admin.vue'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  // components : {
  //   admin
  // },
  data: () => ({
    bread_link: [
      {
        title: 'HOME',
        disabled: false,
      },
    ],
    link: {
      infoList: 'info_list',
      oldDisaster: 'disaster_list',
    },
    new_disaster: {},
    answer_rate: [50, 10],
    pie_chart: {
      options: {
        labels: ['回答', '未回答'],
        title: {
          text: '回答率',
          align: 'left',
        },
        legend: {
          position: 'bottom',
          offsetY: 0,
          markers: {
            radius: 4,
          },
        },
      },
      series: this.answer_rate,
    },
    safety:[5, 3, 1],
    bar_chart: {
      options: {
        labels: ['安全', '軽傷', '重症'],
        title: {
          text: '安否',
          align: 'left',
        },
      },
      series: [
        {
          name: '人数',
          data: this.safety,
        },
      ],
    },
    family_bar_chart: {
      options: {
        labels: ['安全', '軽傷', '重症'],
        title: {
          text: '家族情報',
          align: 'left',
        },
      },
      series: [
        {
          name: '人数',
          data: [5, 3, 1],
        },
      ],
      families: [],
    },
    rules: {
      required: (value) => !!value || 'この項目は必須です',
    },
    modal: false,
    modalDetail: '',
    // return: {
    //   dialog: true,
    // },
    info: {},
    headers: [
      { title: '日時', align: 'start', width: '15%', key: 'datetime' ,minWidth: '200' },
      { title: '場所', align: 'start', width: '15%', key: 'area', minWidth: '100' },
      { title: '災害種別', align: 'start', width: '15%', key: 'disaster_name', minWidth: '150' },
      { title: 'レベル', align: 'start', width: '15%', key: 'lebel', minWidth: '150' },
      { title: 'タイトル', align: 'start', width: '40%', key: 'title', minWidth: '200' },
    ],
    family_headers: [
      { title: '家族名', align: 'left', sortable: false, width: '40%', key: 'name' },
      { title: '安否結果', align: 'left', sortable: false, width: '40%', key: 'result' },
    ],
    disaster: [],
    info_list_store: infoListStore(),
    disaster_list_store: disasterListStore(),
  }),

  computed: {
    bkPoint: function () {
      const { name } = useDisplay()
      var bkpoint = name.value
      console.log(bkpoint)
      const point = { chartHeight: '', cardHeight: '', textLength: '', btnWidth: '' }
      switch (bkpoint) {
        case 'xl':
          point.chartHeight = 400
          point.textLength = 150
          point.cardHeight = 500
          point.btnWidth = 'width: 100px'
          break
        case 'lg':
          point.chartHeight = 400
          point.textLength = 90
          point.cardHeight = 500
          point.btnWidth = 'width: 80px'
          break
        case 'md':
          point.chartHeight = 275
          point.textLength = 70
          point.cardHeight = 400
          point.btnWidth = 'width: 80px'
          break
        case 'sm':
          point.chartHeight = 250
          point.textLength = 45
          point.cardHeight = 350
          point.btnWidth = 'width: 50px'
          break
        case 'xs':
          point.chartHeight = 250
          point.textLength = 25
          point.cardHeight = 300
          point.btnWidth = 'width: 50px'
          break
        default:
          break
      }
      return point
    },
  },
  created() {
    this.initialize()
    // 一番新しい安否確認を取得
    this.new_disaster = this.disaster[0]
    this.get_answers()
  },
  methods: {
    async initialize() {
      // 家族情報の取得
      this.families = [
        { name: '家族1', result: '安全' },
        { name: '家族2', result: '安全' },
        { name: '家族3', result: '安全' },
      ]
      let login_user = this.$props.user.username
      let get_token = this.get_token(login_user)
      const config = {
      headers: {
        Authorization: get_token,
      },}
      // お知らせ一覧が空の場合は取得する
      if (this.info_list_store.info_list.length == 0) {
        
        let info_list_url = 'https://ci4nqe3h81.execute-api.ap-northeast-1.amazonaws.com/user/' + login_user
        await this.axios
          .get(info_list_url, config)
          .then((res) => {
            this.info_list_store.info_list = res.data
          })
          .catch((err) => {
            alert('データはありません')
            console.log(err)
          })
      }
      this.info = {
        title: this.info_list_store.info_list[0].information_title,
        text: this.format(this.info_list_store.info_list[0].information_body),
      }

      // let disaster_list = this.disaster_list_store.disaster_list
      // disaster_listが空の場合は取得する
      // if (disaster_list.length == 0) {
      //   let disaster_list_url = 'https://14wv539nsk.execute-api.ap-northeast-1.amazonaws.com'
      //   let get_token = this.get_token(this.$props.user.username)
      //   const config = {
      //   headers: {
      //     'Authorization': get_token,
      //   },}
      //   await this.axios
      //     .get(disaster_list_url, config)
      //     .then((res) => {
      //       this.disaster_list_store.disaster_list = res.data
      //     })
      //     .catch((err) => {
      //       alert('このデータはありません')
      //       console.log(err)
      //     })
      // }
      // this.disaster = this.disaster_list_store.disaster_list.slice(0,5)
      let disaster_list_url = 'https://14wv539nsk.execute-api.ap-northeast-1.amazonaws.com/check'
      await this.axios
        .get(disaster_list_url, config)
        .then((res) => {
          this.disaster = res.data.slice(0,5)
        })
        .catch((err) => {
          alert('このデータはありません')
          console.log(err)
        })
    },
    itemProps(item) {
      if (item === '') {
        return ''
      } else {
        return {
          title: item.name,
          subtitle: item.id,
          value: item.id,
        }
      }
    },
    testMethod() {
      alert('test')
    },
    format(text) {
      var clamp = '...'
      var length = this.bkPoint.textLength

      if (text.length <= length) return text
      return text.substring(0, length) + clamp
    },
    getColor(value) {
      if (value === '') {
        return 'white'
      } else if (value === '注意報') {
        return 'yellow-lighten-1'
      } else {
        return 'red-lighten-1'
      }
    },
    openModal(detail) {
      this.modal = true
      this.modalDetail = detail
    },
    closeModal() {
      this.modal = false
    },
    earthquake_areas(areas) {
      let result = Object.keys(areas)
      return result
    },
    date_format(date){
      let get_date = date.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1/$2/$3 $4:$5')
      return get_date
    },
    async get_answers() {
      let login_user = this.$props.user.username
      let get_token = this.get_token(login_user)
      const config = {
        headers: {
          Authorization: get_token,
        },
      }
      let answer_url = 'https://lphg04ny69.execute-api.ap-northeast-1.amazonaws.com/' + this.new_disaster.title + '?user=' + login_user
      await this.axios
        .get(answer_url, config)
        .then((res) => {
          let result = res.data
          this.answer_rate = result.answer_rate
          this.safety = result.safety
        })
        .catch((err) => {
          alert('データはありません')
          console.log(err)
        })
    },

  },
}
</script>
