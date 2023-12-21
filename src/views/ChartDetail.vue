<script setup>
import { ja } from 'date-fns/locale'
</script>
<template>
  <v-container>
    <h2>集計</h2>
    <div class="mt-8">
      <v-row class="mt-5">
        <v-col cols="12" sm="4" class="pt-0">
          <v-select label="災害選択" :items="select_disasters" density="compact"></v-select>
        </v-col>
        <v-col cols="12" md="4" class="pt-0">
          <VueDatePicker v-model="dates" range multi-calendars :enable-time-picker="false" :format-locale="ja" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <apexchart type="pie" height="400" :options="pie_chart.options" :series="pie_chart.series"></apexchart>
        </v-col>
        <v-spacer cols="1" />
        <v-col cols="12" sm="4">
          <apexchart type="bar" height="400" :options="bar_chart.options" :series="bar_chart.series"></apexchart>
        </v-col>
        <v-col cols="12" sm="4">
          <apexchart type="bar" height="400" :options="bar_chart.options" :series="bar_chart.series"></apexchart>
        </v-col>
      </v-row>
    </div>

    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="safeties"> </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useDisplay } from 'vuetify'

import VueApexCharts from 'vue3-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    user: Object,
  },
  data: () => ({
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
    select_disasters: [
      { id: '1', title: '山形県地震' },
      { id: '1', title: '山形県大雨' },
      { id: '1', title: '山形県暴風' },
      { id: '1', title: '山形県洪水' },
    ],
    start_date: '',
    end_date: '',
    dates: [],
    headers: [
      { title: 'No.', sortable: false, key: 'no' },
      { title: '氏名', key: 'name' },
      { title: '社員番号', key: 'employee_number' },
      { title: '安否', key: 'safety' },
      { title: '回答時刻', key: 'answer_time' },
      { title: '出社可否', key: 'attendance_state' },
      { title: '家族の安否', key: 'family_safety' },
      { title: '家屋の状態', key: 'house_state' },
      { title: 'ステップ', key: 'step' },
      { title: '特記事項', key: 'notice' },
    ],
    safeties: [
      {
        no: '1',
        name: '山田 太郎',
        employee_number: '11111111',
        safety: '安全',
        answer_time: '2023/12/21 1:11',
        attendance_state: '出社済み',
        family_safety: '全員無事',
        house_state: '無事',
        step: { times: 1, reply: true },
        notice: 'とくになし',
      },
      {
        no: 2,
        name: '山田 太郎',
        employee_number: '11111111',
        safety: '安全',
        answer_time: '2023/12/21 1:11',
        attendance_state: '出社済み',
        family_safety: '全員無事',
        house_state: '無事',
        step: { times: 1, reply: true },
        notice: 'とくになし',
      },
      {
        no: 3,
        name: '山田 太郎',
        employee_number: '11111111',
        safety: '安全',
        answer_time: '2023/12/21 1:11',
        attendance_state: '出社済み',
        family_safety: '全員無事',
        house_state: '無事',
        step: { times: 1, reply: true },
        notice: 'とくになし',
      },
      {
        no: 4,
        name: '山田 太郎',
        employee_number: '11111111',
        safety: '安全',
        answer_time: '2023/12/21 1:11',
        attendance_state: '出社済み',
        family_safety: '全員無事',
        house_state: '無事',
        step: { times: 1, reply: true },
        notice: 'とくになし',
      },
    ],
  }),
  computed: {
    bkPoint: function () {
      const { name } = useDisplay()
      var bkpoint = name.value
      console.log(bkpoint)
      var textLength = 15
      switch (bkpoint) {
        case 'xl':
          textLength = 150
          break
        case 'lg':
          textLength = 90
          break
        case 'md':
          textLength = 70
          break
        case 'sm':
          textLength = 45
          break
        case 'xs':
          textLength = 25
          break
        default:
          break
      }
      return textLength
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
      var length = this.bkPoint
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
  },
}
</script>
