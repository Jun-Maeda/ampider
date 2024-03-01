<script setup>
import { useDraftStore } from '@/stores/draft'
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
    <!-- <h2>下書き一覧</h2> -->
    <v-row justify="end" class="my-4">
      <v-text-field
        v-model="search"
        label="検索"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        class="v-col-sm-10 v-col-md-4 pa-0"
      ></v-text-field>
    </v-row>

    <v-data-table :headers="headers" :items="drafts" :search="search" items-per-page-text="表示行数">
      <template v-slot:[`item.information_body`]="{ item }">
        {{ item.information_body.slice(0, 12) }}
        <span v-if="item.information_body.length > 10">...</span>
      </template>
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px"> </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center mt-2">削除してよろしいですか？</v-card-title>
            <p class="text-center">タイトル：{{ editedItem.information_title }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">削除</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot:[`item.text`]="{ item }">
        {{ item.text.slice(0, 12) }}
        <span v-if="item.text.length > 10">...</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <!-- <v-btn color="primary" @click="initialize"> Reset </v-btn> -->
        該当するものがありません。
      </template>
    </v-data-table>
    <v-btn v-on:click="$router.push('/info_list')" variant="text" class="pt-0"><v-icon> mdi-arrow-left-thick </v-icon>お知らせ一覧へ</v-btn>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    link: [
      {
        title: '下書き一覧',
        disabled: false,
      },
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'No.',
        key: 'no',
        width: '100',
      },
      { title: 'タイトル', key: 'information_title', width: '300', minWidth: '200' },
      { title: '更新日', key: 'information_date', width: '200', minWidth: '150' },
      { title: '本文', key: 'information_body', width: '400', minWidth: '200' },
      { title: '', key: 'actions', sortable: false, width: '100', minWidth: '100' },
    ],
    drafts: [],
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
      let login_user = this.$props.user.username
      let draft_list_url = 'https://ci4nqe3h81.execute-api.ap-northeast-1.amazonaws.com/draft/' + login_user
      this.axios
        .get(draft_list_url)
        .then((res) => {
          console.log(res)
          this.drafts = res.data
        })
        .catch((err) => {
          alert('データはありません')
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
      let delete_url = 'https://ci4nqe3h81.execute-api.ap-northeast-1.amazonaws.com/items/' + this.editedItem['information-id']
      this.axios
        .delete(delete_url)
        .then((res) => {
          this.unit_details = res.data
          this.$router.go({ path: this.$router.currentRoute.path, force: true })
          alert('削除しました。')
        })
        .catch((err) => {
          alert('削除に失敗しました。')
          console.log(err)
        })
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
