<script setup>
import { useCompanyStore } from '@/stores/company_setting'
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
    <!-- <h2>【{{ company_store.company_data }}】拠点一覧</h2> -->
    <v-row class="mt-3">
      <v-col cols="8">
        <v-row justify="start" class="my-4">
          <v-text-field
            v-model="search"
            label="検索"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            class="v-col-sm-12 v-col-md-8 pa-0"
          ></v-text-field>
        </v-row>
      </v-col>
      <!-- <v-col cols="4">
        <v-row justify="end" class="my-4">
          <v-btn color="primary" class="mt-3" @click="$router.push('area_create')">拠点追加</v-btn>
        </v-row>
      </v-col> -->
    </v-row>

    <v-data-table :headers="headers" :items="areas" :search="search" @click:row="clickItem" hover items-per-page-text="表示行数">
      <!-- <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center mt-2">削除してよろしいですか？</v-card-title>
            <p class="text-center">拠点名：{{ editedItem.name }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">削除</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template> -->
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon size="small" @click.stop="deleteItem(item)"> mdi-delete </v-icon>
      </template> -->
      <template v-slot:no-data> 該当するものがありません。 </template>
    </v-data-table>
    <v-btn v-on:click="$router.push('/company_list')" variant="text" class="pt-0"><v-icon> mdi-arrow-left-thick </v-icon>会社一覧へ</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: '名前', key: 'name', width: '300', minWidth: '100' },
      // { title: '会社番号', key: 'employee_num', width: '200', minWidth: '150' },
      { title: '連絡先', key: 'mail', width: '400', minWidth: '200' },
      // { title: '', key: 'actions', sortable: false, width: '100', minWidth: '100' },
    ],
    areas: [],
    editedItem: {},
    company_store: useCompanyStore(),
    link: [
      {
        title: '会社一覧',
        disabled: false,
        href: 'company_list',
      },
      {
        title: '拠点一覧',
        disabled: true,
      },
    ],
  }),

  mounted() {
    // 会社選択していないで直接アクセスしたら会社一覧へリダイレクト
    if (this.company_store.company_data === null) {
      this.$router.push({
        name: 'company_list',
      })
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      let company_name = this.company_store.company_data

      // PIの場合スラッシュがあるとGETできないので修正
      if (company_name == 'PI/PCS/PGS') {
        company_name = 'PIPCSPGS'
      }
      // 取得した会社に紐づく拠点を所得する
      let get_area_url = 'https://6m84bxbhlg.execute-api.ap-northeast-1.amazonaws.com/' + company_name
      let get_token = this.get_token(this.$props.user.username)
      const config = {
        headers: {
          Authorization: get_token,
        },
      }
      this.axios
        .get(get_area_url, config)
        .then((res) => {
          let get_areas = res.data
          console.log(res.data)
          for (let area in get_areas) {
            this.areas.push({ name: get_areas[area] })
          }
        })
        .catch((err) => {
          alert('エラー')
          console.log(err)
        })
    },

    editItem(item) {
      this.draft_store.draft_data = item
      this.$router.push({
        name: 'info_draft_create',
      })
    },

    deleteItem(item) {
      this.editedItem = item
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.closeDelete()
      alert('削除しました。')
    },

    close() {
      this.dialog = false
    },

    closeDelete() {
      this.dialogDelete = false
    },
    clickItem(item, row) {
      this.company_store.area_data = row.item.name
      this.$router.push({
        name: 'division_list',
      })
    },
  },
}
</script>
