<script setup>
import { disasterListStore } from '@/stores/disaster_list'
import { disasterDetailStore } from '@/stores/disaster'
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
      { title: '日時', align: 'start', width: '15%', key: 'datetime' ,minWidth: '200' },
      { title: '場所', align: 'start', width: '15%', key: 'area', minWidth: '100' },
      { title: '災害種別', align: 'start', width: '15%', key: 'disaster_name', minWidth: '150' },
      { title: 'レベル', align: 'start', width: '15%', key: 'lebel', minWidth: '150' },
      { title: 'タイトル', align: 'start', width: '40%', key: 'title', minWidth: '200' },
    ],
    disaster: [],
    disaster_list_store: disasterListStore(),
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
  created() {
    this.initialize()
  },
  methods: {
    async initialize() {
      let disaster_list = this.disaster_list_store.disaster_list
      // disaster_listが空の場合は取得する
      if(disaster_list.length == 0){
        let disaster_list_url = 'https://14wv539nsk.execute-api.ap-northeast-1.amazonaws.com'
        let get_token = this.get_token(this.$props.user.username)
        const config = {
          headers: {
            Authorization: get_token,
          },
        }
        await this.axios
          .get(disaster_list_url, config)
          .then((res) =>{
            this.disaster_list_store.disaster_list = res.data
          })
          .catch((err) => {
            alert('このデータはありません')
            console.log(err)
          })
      }
      this.disaster = this.disaster_list_store.disaster_list
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
    earthquake_areas(areas) {
      let result = Object.keys(areas)
      return result
    },
    date_format(date){
      let get_date = date.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/, '$1/$2/$3 $4:$5')
      return get_date
    }
  },
}
</script>
