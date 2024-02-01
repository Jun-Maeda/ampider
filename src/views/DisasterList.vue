<script setup>
import { disasterDetailStore } from '@/stores/disaster'
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
    <!-- <h2>過去の災害一覧</h2> -->
    <v-row justify="end" class="mt-8">
      <v-text-field
        v-model="search"
        label="検索"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        class="v-col-sm-10 v-col-md-4 pa-0"
      ></v-text-field>
    </v-row>
    <div class="mt-8">
      <v-data-table :headers="headers" :items="disaster" :search="search" density="compact" @click:row="clickItem" items-per-page-text="表示行数">
        <template v-slot:[`item.type`]="{ value }">
          <v-chip variant="flat" :color="getColor(value)">
            <p class="my-auto">{{ format(value) }}</p>
          </v-chip>
        </template>
        <!-- <template v-slot:[`item.detail`]="{ value }">
          <p>{{ format(value) }}</p>
        </template> -->
        <template v-slot:[`item.title`]="{ item }">
          <p>【{{ item.type }}】{{ item.date }} {{ item.location }} {{ item.Level }}</p>
        </template>
        <template v-slot:no-data>
          <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
          該当するものがありません。
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import { useDisplay } from 'vuetify'
export default {
  data: () => ({
    link: [
      {
        title: '過去の災害一覧',
        disabled: false,
      },
    ],
    search: '',
    headers: [
      { title: '日時', align: 'start', width: '15%', key: 'date' },
      { title: '場所', align: 'start', width: '15%', key: 'location' },
      { title: '災害種別', align: 'start', width: '15%', key: 'type' },
      { title: 'レベル', align: 'start', width: '15%', key: 'Level' },
      { title: 'タイトル', align: 'start', width: '40%', key: 'title' },
    ],
    disaster: [
      {
        date: '2023/12/25 12:17',
        location: '秋田BPO',
        type: '大雪',
        Level: '注意報',
        detail:
          '【暴風雪と高波に関する気象警報・注意報】 秋田県では、気圧の傾きが大きくなっているため、西よりの強風が吹き、海上では、大しけとなっています。沿岸の海上では、８日昼前にかけて、高波に警戒してください。また、秋田県では、８日朝まで、強風に注意してください。',
      },
      {
        date: '2023/12/25 12:21',
        location: '山形BPO',
        type: '大雪',
        Level: '警報',
        detail: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
      },
      {
        date: '2023/12/26 10:15',
        location: '一関BPO',
        type: '大雪',
        Level: '警報',
        detail: 'TEST',
      },
      {
        date: '2023/12/27 10:16',
        location: '富山BPO',
        type: '地震',
        Level: '震度5',
        detail:
          '寿限無、寿限無、五劫のすりきれ、海砂利水魚、水行末・雲来末・風来末、食う寝るところに住むところ、やぶらこうじのぶらこうじ、パイポ・パイポ・パイポのシューリンガン、シューリンガンのグーリンダイ、グーリンダイのポンポコピーのポンポコナの、長久命の長助',
      },
      {
        date: '2023/12/26 10:28',
        location: '東京本社',
        type: '地震',
        Level: '震度5',
        detail: '',
      },
      {
        date: '2023/12/27 10:16',
        location: '東京本社',
        type: '地震',
        Level: '震度5',
        detail: 'あ￥。・＞９’%＠AⒶ©ℱL！‼《＋；～~≒',
      },
    ],
    disaster_store: disasterDetailStore(),
  }),
  computed: {
    bkPoint: function () {
      const { name } = useDisplay()
      var bkpoint = name.value
      console.log(bkpoint)
      const point = { chartHeight: '', cardHeight: '', textLength: '' }
      switch (bkpoint) {
        case 'xl':
          point.textLength = 50
          break
        case 'lg':
          point.textLength = 30
          break
        case 'md':
          point.textLength = 20
          break
        case 'sm':
          point.textLength = 10
          break
        case 'xs':
          point.textLength = 5
          break
        default:
          break
      }
      return point
    },
  },
  methods: {
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
      var color = ''
      switch (value) {
        case '大雪':
          color = 'blue-grey-lighten-2'
          break
        case '地震':
          color = 'deep-orange-darken-4'
          break
      }
      return color
    },
    clickItem(item, row) {
      this.disaster_store.disaster_data = row.item
      this.$router.push({
        name: 'disaster_detail',
      })
    },
  },
}
</script>
