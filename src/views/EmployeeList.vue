<script setup>
import { useDraftStore } from '@/stores/draft'
</script>
<template>
  <v-container>
    <h2>従業員一覧</h2>
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
          <v-btn color="primary" class="mt-3">ユーザー追加</v-btn>
        </v-row>
      </v-col>
    </v-row>

    <v-data-table :headers="headers" :items="employees" :search="search">
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
      { title: '社員番号', key: 'employee_num', width: '200', minWidth: '150' },
      { title: 'メールアドレス', key: 'mail', width: '400', minWidth: '200' },
    ],
    employees: [],
    editedItem: {},
    draft_store: useDraftStore(),
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
      this.employees = [
        {
          name: 'テスト 太郎',
          employee_num: '1234567',
          mail: 'test_test@test.jp',
        },
        {
          name: 'テスト 太郎',
          employee_num: '1234567',
          mail: 'test_test@test.jp',
        },
        {
          name: 'テスト 太郎',
          employee_num: '1234567',
          mail: 'test_test@test.jp',
        },
        {
          name: 'テスト 太郎',
          employee_num: '1234567',
          mail: 'test_test@test.jp',
        },
        {
          name: 'テスト 太郎',
          employee_num: '1234567',
          mail: 'test_test@test.jp',
        },
      ]
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
  },
}
</script>
