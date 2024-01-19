<script setup>
import { useCompanyStore } from '@/stores/company_setting'
</script>
<template>
  <v-container>
    <h2>会社一覧</h2>
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
      <v-col cols="4">
        <v-row justify="end" class="my-4">
          <v-btn color="primary" class="mt-3" @click="$router.push('company_create')">会社追加</v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="companies" :search="search" @click:row="clickItem" hover>
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center mt-2">削除してよろしいですか？</v-card-title>
            <p class="text-center">会社名：{{ editedItem.name }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">削除</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-show="item.adding_flg" size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon v-show="item.adding_flg" size="small" @click.stop="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data> 該当するものがありません。 </template>
    </v-data-table>
    <!-- <v-btn v-on:click="$router.push('/info_list')" variant="text" class="pt-0"><v-icon> mdi-arrow-left-thick </v-icon>お知らせ一覧へ</v-btn> -->
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
      // { title: '会社番号', key: 'company_num', width: '200', minWidth: '150' },
      { title: '連絡先', key: 'mail', width: '400', minWidth: '200' },
      { title: '', key: 'actions', sortable: false, width: '100', minWidth: '100' },
    ],
    companies: [],
    editedItem: {},
    company_store: useCompanyStore(),
  }),

  computed: {
    formTitle() {
      return 'お知らせ編集'
    },
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
      // OBICの事業部カラムに会社名が記載されているもののみ取得
      // 今はadding_flgで手動追加か判別
      this.companies = [
        {
          name: 'PAD',
          company_num: '1234567',
          mail: 'test_test@test.jp',
          adding_flg: false,
        },
        {
          name: 'PHS',
          company_num: '1234567',
          mail: 'test_test@test.jp',
          adding_flg: false,
        },
        {
          name: '(株)プレミア・アンピダー',
          company_num: 'add_1234567',
          mail: 'test_test@test.jp',
          adding_flg: true,
        },
      ]
      // PI関連は会社名の登録がOBICの事業部カラムにないのでここで作成してすべての拠点に紐づけ
      this.companies.unshift({
        name: 'PI・PCS・PGS',
        company_num: '1234567',
        mail: 'test_test@test.jp',
        adding_flg: false,
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
      this.company_store.company_data = row.item.name
      this.$router.push({
        name: 'area_list',
      })
    },
  },
}
</script>
