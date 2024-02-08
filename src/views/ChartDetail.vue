<script setup>
import { ja } from 'date-fns/locale'
</script>
<template>
  <v-container>
    <div class="mt-4">
      <v-row justify="start">
        <v-breadcrumbs :items="link">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
      </v-row>
    </div>
    <v-divider></v-divider>
    <!-- <h2>集計</h2> -->
    <div class="mt-8">
      <v-row class="mt-5">
        <v-col cols="12" md="4" class="pt-0">
          <VueDatePicker v-model="dates" range multi-calendars :enable-time-picker="false" :format-locale="ja" />
        </v-col>
        <v-col cols="12" sm="4" class="pt-0">
          <v-select v-model="choice_disaster" label="災害選択" :items="select_disasters" density="compact" item-title="title"></v-select>
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
          <apexchart type="bar" height="400" :options="attendance_chart.options" :series="attendance_chart.series"></apexchart>
        </v-col>
      </v-row>
    </div>

    <v-row justify="end">
      <v-col cols="12" class="pb-0">
        <v-data-table :headers="headers" :items="safeties" class="fixed-column" items-per-page-text="表示行数"> </v-data-table>
      </v-col>
      <v-btn v-on:click="downloadCSV" variant="text" class="pt-0"><v-icon> mdi-download </v-icon>CSVダウンロード</v-btn>
    </v-row>
    <!-- ステップ増やすときはこれをテーブルの中にいれてあげてね。
                <template v-slot:[`item.step`]="{ item }">
            <span v-for="step in stepIcons(item.step.times, item.step.reply)" v-bind:key="step">
              <v-icon color="orange">{{ step_icons[step] }}</v-icon>
            </span>
          </template> -->
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
    link: [
      {
        title: '集計',
        disabled: false,
      },
    ],
    step_icons: ['mdi-circle-medium', 'mdi-radiobox-blank', 'mdi-radiobox-marked'],
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
        labels: ['安全', '軽傷', '重症', '未回答'],
        title: {
          text: '従業員安否状況',
          align: 'left',
        },
      },
      series: [
        {
          name: '人数',
          data: [5, 3, 1, 1],
        },
      ],
    },
    attendance_chart: {
      options: {
        labels: ['出社済み', '出社可能', '出社不可', '休日', '未回答'],
        title: {
          text: '出社可否',
          align: 'left',
        },
      },
      series: [
        {
          name: '人数',
          data: [5, 3, 1, 1, 3],
        },
      ],
    },
    select_disasters: [
      { id: '1', title: '山形県地震' },
      { id: '1', title: '山形県大雨' },
      { id: '1', title: '山形県暴風' },
      { id: '1', title: '山形県洪水' },
    ],
    choice_disaster: '',
    start_date: '',
    end_date: '',
    dates: [],
    headers: [
      // { title: 'No.', sortable: false, key: 'no' },
      { title: '氏名', key: 'name', minWidth: '120' },
      { title: '社員番号', key: 'employee_number', minWidth: '100' },
      { title: '安否', key: 'safety', minWidth: '120' },
      { title: '回答時刻', key: 'answer_time', minWidth: '180' },
      { title: '出社可否', key: 'attendance_state', minWidth: '150' },
      { title: '家族の安否', key: 'family_safety', minWidth: '120' },
      { title: '家屋の状態', key: 'house_state', minWidth: '130' },
      // { title: 'ステップ', key: 'step', sortable: false, minWidth: '180' },
      { title: '特記事項', key: 'notice', minWidth: '200' },
    ],
    safeties: [
      {
        no: 1,
        name: '山田 太郎',
        employee_number: '11111111',
        safety: '安全',
        answer_time: '2023/12/21 1:11',
        attendance_state: '出社済み',
        family_safety: '全員無事',
        house_state: '無事',
        step: { times: 2, reply: true },
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
        step: { times: 3, reply: true },
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
      {
        no: 5,
        name: '山田 太郎',
        employee_number: '11111111',
        safety: '',
        answer_time: '',
        attendance_state: '',
        family_safety: '',
        house_state: '',
        step: { times: 2, reply: false },
        notice: '',
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
  watch: {
    dates: function (newVal) {
      console.log('日付がかわりました')
      console.log(newVal)
    },
    choice_disaster: function (newVal) {
      console.log('災害情報がかわりました')
      console.log(newVal)
    },
  },
  mounted() {},
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
    downloadCSV() {
      var csv = '\ufeff' + 'No.,名前,社員番号, 安否, 回答時刻,出社可否, 家族の安否, 家屋の状態, ステップ回数, 返答, 特記事項\n'
      this.safeties.forEach((el) => {
        var line =
          el['no'] +
          ',' +
          el['name'] +
          ',' +
          el['employee_number'] +
          ',' +
          el['safety'] +
          ',' +
          el['answer_time'] +
          ',' +
          el['attendance_state'] +
          ',' +
          el['family_safety'] +
          ',' +
          el['house_state'] +
          ',' +
          el['step']['times'] +
          ',' +
          el['step']['reply'] +
          ',' +
          el['notice'] +
          '\n'
        csv += line
      })
      let blob = new Blob([csv], { type: 'text/csv' })
      let link = document.createElement('a')
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()

      link.href = window.URL.createObjectURL(blob)
      link.download = this.choice_disaster + '_' + this.user.username + '_' + year + month + date + '_result.csv'
      link.click()
    },
    stepIcons(times, reply) {
      // 0が未送信、1が送信済み,2が回答済み
      let steps = [0, 0, 0, 0, 0]
      let reply_result = 2
      if (reply === false) {
        reply_result = 1
      }
      for (var i in steps) {
        let send_times = Number(i) + 1
        console.log(send_times)
        if (send_times === times) {
          steps[i] = reply_result
          break
        } else {
          steps[i] = 1
        }
      }
      return steps
    },
  },
}
</script>
<style scoped>
.fixed-column ::v-deep td,
th {
  min-width: 100px;
}

.fixed-column ::v-deep th:nth-child(1) {
  position: sticky;
  left: 0;
  z-index: 2;
  background-color: white;
  max-width: 100px;
  word-break: break-all;
}

.fixed-column ::v-deep td:nth-child(1) {
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: white;
  max-width: 100px;
  word-break: break-all;
}
/* 
.fixed-column ::v-deep th:nth-child(2) {
  position: sticky;
  left: 100px;
  z-index: 2;
  background-color: white;
  max-width: 100px;
  word-break: break-all;
}

.fixed-column ::v-deep td:nth-child(2) {
  position: sticky;
  left: 100px;
  z-index: 1;
  background-color: white;
  max-width: 100px;
  word-break: break-all;
} */
</style>
