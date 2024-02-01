<script setup>
import { useUserEditStore } from '@/stores/user_edit'
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
    <!-- <h2>従業員一覧</h2> -->
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
          <v-btn color="primary" class="mt-3" @click="$router.push('user_create')">ユーザー追加</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-data-table :headers="headers" :items="employees" :search="search" hover items-per-page-text="表示行数">
        <!-- <v-data-table :headers="headers" :items="employees" :search="search" @click:row="clickItem" hover> -->
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5 text-center mt-2">削除してよろしいですか？</v-card-title>
              <p class="text-center">名前：{{ editedItem.name }}</p>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">削除</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.auto_setting`]="{ item }">
          <v-icon v-show="item.auto_setting" size="small" class="me-2"> mdi-checkbox-marked </v-icon>
          <v-icon v-show="!item.auto_setting" size="small"> mdi-checkbox-blank </v-icon>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon v-show="!item.auto_setting" size="small" class="me-2" @click.stop="editItem(item)"> mdi-pencil </v-icon>
          <v-icon v-show="!item.auto_setting" size="small" @click.stop="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data> 該当するものがありません。 </template>
      </v-data-table>
      <v-btn v-on:click="downloadCSV()" variant="text" class="pt-0"><v-icon> mdi-download </v-icon>CSVダウンロード</v-btn>
      <!-- <v-btn v-on:click="$router.push('/info_list')" variant="text" class="pt-0"><v-icon> mdi-arrow-left-thick </v-icon>お知らせ一覧へ</v-btn> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data: () => ({
    link: [
      {
        title: '従業員一覧',
        disabled: false,
      },
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: '名前', key: 'name', width: '300', minWidth: '100' },
      { title: '社員番号', key: 'employee_num', width: '200', minWidth: '150' },
      { title: 'メールアドレス', key: 'mail', width: '400', minWidth: '200' },
      { title: '自動追加', key: 'auto_setting', width: '100', minWidth: '200' },
      { title: '', key: 'actions', sortable: false, width: '100', minWidth: '100' },
    ],
    employees: [],
    editedItem: {},
    employee_store: null,
    user_edit_store: useUserEditStore(),
  }),

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
          auto_setting: true,
        },
        {
          name: 'テスト 次郎',
          employee_num: '1234568',
          mail: 'test_test@test.jp',
          auto_setting: true,
        },
        {
          name: '手動 追加',
          employee_num: '1234569',
          mail: 'test_test@test.jp',
          auto_setting: false,
        },
        {
          name: 'テスト 三郎',
          employee_num: '1234570',
          mail: 'test_test@test.jp',
          auto_setting: true,
        },
      ]
    },

    editItem(item) {
      this.user_edit_store.user_data = item
      this.$router.push({
        name: 'user_edit',
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
      // 一応詳細ページ見れた方が良い？
      this.employee_store.employee_data = row.item
      this.$router.push({
        name: 'user_setting',
      })
    },
    downloadCSV() {
      var csv = '\ufeff' + '名前,社員番号, メールアドレス, 自動追加フラグ\n'
      this.employees.forEach((el) => {
        var line = el['name'] + ',' + el['employee_num'] + ',' + el['mail'] + ',' + el['auto_setting'] + '\n'
        csv += line
      })
      let blob = new Blob([csv], { type: 'text/csv' })
      let link = document.createElement('a')
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var date = now.getDate()

      link.href = window.URL.createObjectURL(blob)
      link.download = 'employeelist_' + this.user.username + '_' + year + month + date + '_result.csv'
      link.click()
    },
  },
}
</script>
