<script setup>
import { ja } from 'date-fns/locale'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  user: Object,
})
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
          <v-select
            v-model="choice_disaster"
            label="災害選択"
            :items="select_disasters"
            density="compact"
            item-title="title"
            @click="get_disasters()"
          ></v-select>
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
        <v-data-table :headers="headers" :items="safety_answers" class="fixed-column" items-per-page-text="表示行数"> </v-data-table>
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
  data: () => ({
    answer_rate: [3, 1],
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
      series: [3, 1],
    },
    safety: [4, 0, 0],
    bar_chart: {
      options: {
        labels: ['安全', '軽傷', '重症'],
        title: {
          text: '従業員安否状況',
          align: 'left',
        },
      },
      series: [
        {
          name: '人数',
          data: [4, 0, 0],
        },
      ],
    },
    attendance: [2, 2, 0, 0, 0],
    attendance_chart: {
      options: {
        labels: ['不可', '概ね1時間以内', '概ね3時間以内', '出社済み', 'その他'],
        title: {
          text: '出社可否',
          align: 'left',
        },
      },
      series: [
        {
          name: '人数',
          data: [2, 2, 0, 0, 0],
        },
      ],
    },
    select_disasters: [],
    choice_disaster: {},
    start_date: '',
    end_date: '',
    dates: [],
    headers: [
      { title: '氏名', key: 'name', minWidth: '120' },
      { title: '社員番号', key: 'employee_no', minWidth: '100' },
      { title: '安否', key: 'safely', minWidth: '120' },
      { title: '出社状況', key: 'possible_work', minWidth: '150' },
      { title: '家族の安否', key: 'family_safely', minWidth: '120' },
      { title: '家屋の状態', key: 'home_status', minWidth: '130' },
      { title: '会社', key: 'company', minWidth: '100' },
      { title: '拠点', key: 'kyoten', minWidth: '100' },
      { title: '事業部', key: 'jigyou', minWidth: '100' },
      { title: '組織', key: 'syozoku', minWidth: '100' },
      // { title: 'No.', sortable: false, key: 'no' },
      // { title: '回答時刻', key: 'answer_time', minWidth: '180' },
      // { title: 'ステップ', key: 'step', sortable: false, minWidth: '180' },
      // { title: '特記事項', key: 'notice', minWidth: '200' },
    ],
    safety_answers: [],
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

      // employeeテーブルが復活したらアクティブ
      this.get_answers()
    },
  },
  created() {
    // 一番最近の安否確認を取得
    this.get_new_disaster()
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
    async get_new_disaster() {
      let login_user = this.$props.user.username
      let get_token = this.get_token(login_user)
      const config = {
        headers: {
          Authorization: get_token,
        },
      }
      let disaster_list_url = 'https://14wv539nsk.execute-api.ap-northeast-1.amazonaws.com/check'
      await this.axios
        .get(disaster_list_url, config)
        .then((res) => {
          this.choice_disaster = res.data[0]
        })
        .catch((err) => {
          alert('このデータはありません')
          console.log(err)
        })
    },
    async get_disasters() {
      let start_date =
        this.dates[0]
          .toISOString()
          .replace(/[-:.]/g, '')
          .replace(/(\d{8})T(\d{9})Z/, '$1') + 'T000000Z'
      let end_date =
        this.dates[1]
          .toISOString()
          .replace(/[-:.]/g, '')
          .replace(/(\d{8})T(\d{9})Z/, '$1') + 'T235959Z'

      let disaster_list_url = 'https://14wv539nsk.execute-api.ap-northeast-1.amazonaws.com/range?start_date=' + start_date + '&end_date=' + end_date
      let get_token = this.get_token(this.$props.user.username)
      const config = {
        headers: {
          Authorization: get_token,
        },
      }
      await this.axios
        .get(disaster_list_url, config)
        .then((res) => {
          this.select_disasters = res.data
        })
        .catch((err) => {
          alert('このデータはありません')
          console.log(err)
        })

      // 安否確認結果を取得
      // this.get_answers()
    },
    async get_answers() {
      let login_user = this.$props.user.username
      let get_token = this.get_token(login_user)
      const config = {
        headers: {
          Authorization: get_token,
        },
      }
      console.log('get_answers')
      let answer_url = 'https://lphg04ny69.execute-api.ap-northeast-1.amazonaws.com/' + this.choice_disaster.datetime + '?user=' + login_user
      await this.axios
        .get(answer_url, config)
        .then((res) => {
          let result = res.data
          this.answer_rate = result.answer_rate
          this.safety = result.safety
          this.attendance = result.attendance
          this.safety_answers = result.answers
        })
        .catch((err) => {
          alert('データはありません')
          console.log(err)
        })
      this.pie_chart = {
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
      }
      this.bar_chart = {
        options: {
          labels: ['安全', '軽傷', '重症'],
          title: {
            text: '従業員安否状況',
            align: 'left',
          },
        },
        series: [
          {
            name: '人数',
            data: this.safety,
          },
        ],
      }
      this.attendance_chart = {
        options: {
          labels: ['不可', '概ね1時間以内', '概ね3時間以内', '出社済み', 'その他'],
          title: {
            text: '出社可否',
            align: 'left',
          },
        },
        series: [
          {
            name: '人数',
            data: this.attendance,
          },
        ],
      }
    },
    downloadCSV() {
      var csv = '\ufeff' + 'No.,名前,社員番号, 安否, 回答時刻,出社可否, 家族の安否, 家屋の状態, ステップ回数, 返答, 特記事項\n'
      this.safety_answers.forEach((el) => {
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
      link.download = this.choice_disaster.title + '_' + this.user.username + '_' + year + month + date + '_result.csv'
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
