<script setup>
import { useDraftStore } from '@/stores/draft'
</script>
<template>
  <v-container>
    <h2>下書き一覧</h2>
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

    <v-data-table :headers="headers" :items="drafts" :search="search">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px"> </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5 text-center mt-2">削除してよろしいですか？</v-card-title>
            <p class="text-center">タイトル：{{ editedItem.title }}</p>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: 'No.',
        key: 'no',
        // width: '100',
      },
      { title: 'タイトル', key: 'title', width: '300', minWidth: '200' },
      { title: '更新日', key: 'date', width: '200', minWidth: '150' },
      { title: '本文', key: 'text', width: '400', minWidth: '200' },
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
      this.drafts = [
        {
          no: 5,
          title: '地震が発生したので気を付けて！ ',
          date: '2023/12/14 15:00',
          text: '地震が発生したので気を付けて！地震が発生したので気を付けて！地震が発生したので気を付けて！地震が発生したので気を付けて！地震が発生したので気を付けて！',
        },
        {
          no: 4,
          title: '火山が噴火したから気を付けてね',
          date: '2023/12/14 16:00',
          text: '火山が噴火したから気を付けてね火山が噴火したから気を付けてね火山が噴火したから気を付けてね火山が噴火したから気を付けてね',
        },
        {
          no: 3,
          title: '大雨だからひどいよ',
          date: '2023/12/14 17:00',
          text: '大雨だからひどいよ大雨だからひどいよ大雨だからひどいよ大雨だからひどいよ大雨だからひどいよ',
        },
        {
          no: 2,
          title: '風が強いよ！',
          date: '2023/12/14 18:00',
          text: '風が強いよ！風が強いよ！風が強いよ！風が強いよ！風が強いよ！風が強いよ！風が強いよ！',
        },
        {
          no: 1,
          title: '災害が発生しました',
          date: '2023/12/14 19:00',
          text: '災害が発生しました',
        },
      ]
    },

    editItem(item) {
      this.draft_store.draft_data = item
      this.$router.push({
        name: 'info_create',
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
