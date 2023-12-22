<template>
  <v-container>
    <h2>HOME</h2>
    <div class="mt-8">
      <h6>お知らせ</h6>
      <v-card color="black" variant="outlined">
        <v-card-title>{{ title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text> {{ format(text) }}</v-card-text>
      </v-card>
      <div class="mt-8">
        <v-row justify="end">
          <v-btn :to="link.infoList" color="primary" variant="text">お知らせ一覧へ→</v-btn>
        </v-row>
      </div>
      <div class="mt-4">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto" :height="bkPoint.cardHeight" :variant="elevated">
              <v-card-item>
                <apexchart type="pie" :height="bkPoint.chartHeight" :options="pie_chart.options" :series="pie_chart.series"></apexchart>
              </v-card-item>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="mx-auto" :height="bkPoint.cardHeight" :variant="elevated">
              <v-card-item>
                <apexchart type="bar" :height="bkPoint.chartHeight" :options="bar_chart.options" :series="bar_chart.series"></apexchart>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="mt-8">
      <v-row justify="center">
        <h6>災害速報</h6>
        <v-col cols="12" md="10">
          <v-data-table-virtual
            :headers="headers"
            :items="disaster"
            :fixed-header="true"
            :hide-default-footer="false"
            disable-pagination
            item-key="name"
          >
            <template v-slot:[`item.rainfall`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.flood`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.strongWind`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.earthquake`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.lightning`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.heavySnow`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.tsunami`]="{ value }">
              <div class="text-center">
                <v-btn @click="openModal(value.detail)" v-if="value.alert" :color="getColor(value.alert)" variant="flat">
                  <span v-on="props" class="my-auto" style="width: 100px">
                    {{ value.alert }}
                  </span>
                </v-btn>
              </div>
            </template>
          </v-data-table-virtual>
          <v-dialog v-model="modal" max-width="500px">
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
        <v-btn color="primary" variant="text">過去の災害一覧へ→</v-btn>
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
    link: {
      infoList: 'info_list',
      oldDisaster: '',
    },
    pie_chart: {
      options: {
        labels: ['回答', '未回答'],
        title: {
          text: '回答率',
          align: 'left',
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
    rules: {
      required: (value) => !!value || 'この項目は必須です',
    },
    modal: false,
    modalDetail: '',
    // return: {
    //   dialog: true,
    // },
    title: 'test',
    date: '2023/12/07',
    text: 'ああああああああああいいいいいいいいいいううううううううううええええええええええおおおおおおおおおおかかかかかかかかかかききききききききききくくくくくくくくくくけけけけけけけけけけここここここここここああああああああああいいいいいいいいいいううううううううううええええええええええおおおおおおおおおおかかかかかかかかかかききききききききききくくくくくくくくくくけけけけけけけけけけここここここここここああああああああああいいいいいいいいいいううううううううううええええええええええおおおおおおおおおおかかかかかかかかかかききききききききききくくくくくくくくくくけけけけけけけけけけここここここここここ',
    headers: [
      { title: '拠点名', align: 'center', sortable: false, width: '200', key: 'baseName' },
      { title: '大雨', align: 'center', sortable: false, width: '100', key: 'rainfall' },
      { title: '洪水', align: 'center', sortable: false, width: '100', key: 'flood' },
      { title: '強風', align: 'center', sortable: false, width: '100', key: 'strongWind' },
      { title: '地震', align: 'center', sortable: false, width: '100', key: 'earthquake' },
      { title: '雷', align: 'center', sortable: false, width: '100', key: 'lightning' },
      { title: '大雪', align: 'center', sortable: false, width: '100', key: 'heavySnow' },
      { title: '津波', align: 'center', sortable: false, width: '100', key: 'tsunami' },
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
  }),
  computed: {
    bkPoint: function () {
      const { name } = useDisplay()
      var bkpoint = name.value
      console.log(bkpoint)
      const point = { chartHeight: '', cardHeight: '', textLength: '' }
      switch (bkpoint) {
        case 'xl':
          point.chartHeight = 400
          point.textLength = 150
          point.cardHeight = 500
          break
        case 'lg':
          point.chartHeight = 400
          point.textLength = 90
          point.cardHeight = 500
          break
        case 'md':
          point.chartHeight = 275
          point.textLength = 70
          point.cardHeight = 400
          break
        case 'sm':
          point.chartHeight = 250
          point.textLength = 45
          point.cardHeight = 350
          break
        case 'xs':
          point.chartHeight = 250
          point.textLength = 25
          point.cardHeight = 300
          break
        default:
          break
      }
      return point
    },
  },
  methods: {
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
      console.log(length)

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
  },
}
</script>
