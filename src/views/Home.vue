<script setup>
import { infoListStore } from '@/stores/info_list'
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
      <v-row justify="center">
        <h6>災害速報</h6>
        <v-col cols="12" xl="10">
          <v-data-table-virtual
            :headers="headers"
            :items="disaster"
            :fixed-header="true"
            :hide-default-footer="false"
            disable-pagination
            item-key="name"
          >
            <template v-slot:[`item.baseName`]="{ value }">
              <div class="text-center mx-auto" style="width: 100px">
                {{ value }}
              </div>
            </template>
            <template v-slot:[`item.rainfall`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.flood`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.strongWind`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.earthquake`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.lightning`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.heavySnow`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.tsunami`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" :style="bkPoint.btnWidth">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
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
  props: {
    user: Object,
  },
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
      series: [50, 10],
    },
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
          data: [5, 3, 1],
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
      { title: '拠点名', align: 'center', sortable: false, width: '20%', key: 'baseName' },
      { title: '大雨', align: 'center', sortable: false, width: '10%', key: 'rainfall' },
      { title: '洪水', align: 'center', sortable: false, width: '10%', key: 'flood' },
      { title: '強風', align: 'center', sortable: false, width: '10%', key: 'strongWind' },
      { title: '地震', align: 'center', sortable: false, width: '10%', key: 'earthquake' },
      { title: '雷', align: 'center', sortable: false, width: '10%', key: 'lightning' },
      { title: '大雪', align: 'center', sortable: false, width: '10%', key: 'heavySnow' },
      { title: '津波', align: 'center', sortable: false, width: '10%', key: 'tsunami' },
    ],
    family_headers: [
      { title: '家族名', align: 'left', sortable: false, width: '40%', key: 'name' },
      { title: '安否結果', align: 'left', sortable: false, width: '40%', key: 'result' },
    ],
    disaster: [
      {
        baseName: '東京本社',
        rainfall: { alert: '注意報', detail: '災害が起きました。' },
        flood: { alert: '警報', detail: '災害が起きました。' },
        strongWind: { alert: '注意報', detail: '災害が起きました。' },
        earthquake: { alert: '震度5', detail: '災害が起きました。' },
        lightning: { alert: '警報', detail: '災害が起きました。' },
        heavySnow: { alert: '注意報', detail: '災害が起きました。' },
        tsunami: { alert: '警報', detail: '災害が起きました。' },
      },
      {
        baseName: '秋田BPO',
        rainfall: {
          alert: '注意報',
          detail:
            '【暴風雪と高波に関する気象警報・注意報】 秋田県では、気圧の傾きが大きくなっているため、西よりの強風が吹き、海上では、大しけとなっています。沿岸の海上では、８日昼前にかけて、高波に警戒してください。また、秋田県では、８日朝まで、強風に注意してください。',
        },
        flood: { alert: '警報', detail: 'test' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '横手キャンパス',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '注意報', detail: '123456789' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: 'にかほキャンパス',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '警報', detail: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '潟上ブランチ',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '注意報', detail: '`{+>}~&&$<>}_?*!$' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '山形BPO',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: {
          alert: '警報',
          detail: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '鶴岡ブランチ',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '富山BPO',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '魚沼テラス',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
      {
        baseName: '一関BPO',
        rainfall: { alert: '', detail: '' },
        flood: { alert: '', detail: '' },
        strongWind: { alert: '', detail: '' },
        earthquake: { alert: '', detail: '' },
        lightning: { alert: '', detail: '' },
        heavySnow: { alert: '', detail: '' },
        tsunami: { alert: '', detail: '' },
      },
    ],
    info_list_store: infoListStore(),
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
  },
  methods: {
    async initialize() {
      this.families = [
        { name: '家族1', result: '安全' },
        { name: '家族2', result: '安全' },
        { name: '家族3', result: '安全' },
      ]
      if (this.info_list_store.info_list.length == 0) {
        let login_user = this.$props.user.username
        let info_list_url = 'https://ci4nqe3h81.execute-api.ap-northeast-1.amazonaws.com/user/' + login_user
        await this.axios
          .get(info_list_url)
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
      console.log(text.length)
      return text

      // if (text.length <= length) return text
      // return text.substring(0, length) + clamp
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
  },
}
</script>
