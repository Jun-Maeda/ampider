<script setup>
import { infoListStore } from '@/stores/info_list'
import { infoDetailStore } from '@/stores/info'
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
    <!-- <h2>お知らせ一覧</h2> -->
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

    <v-data-table :headers="headers" :items="info_list_store.info_list" :search="search" @click:row="clickItem" hover items-per-page-text="表示行数">
      <!-- <template v-slot:top>
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
      </template> -->

      <template v-slot:[`item.information_body`]="{ item }">
        {{ item.information_body.slice(0, 12) }}
        <span v-if="item.information_body.length > 10">...</span>
      </template>
      <!-- <template v-slot:[`item.actions`]="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template> -->
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
    link: [
      {
        title: 'お知らせ一覧',
        disabled: false,
      },
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: 'タイトル', key: 'information_title', width: '300', minWidth: '200' },
      { title: '作成日', key: 'information_date', width: '200', minWidth: '150' },
      { title: '本文', key: 'information_body', width: '400', minWidth: '200' },
    ],
    editedItem: {},
    info_list_store: infoListStore(),
    info_store: infoDetailStore(),
    infos: [],
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  mounted() {
    this.initialize()
  },

  methods: {
    initialize() {
      if (this.info_list_store.info_list.length == 0) {
        let login_user = this.$props.user.username
        let get_token = this.get_token(login_user)
        const config = {
          headers: {
            Authorization: get_token,
          },
        }
        let info_list_url = 'https://ci4nqe3h81.execute-api.ap-northeast-1.amazonaws.com/user/' + login_user
        this.axios
          .get(info_list_url, config)
          .then((res) => {
            console.log(res.data)
            this.info_list_store.info_list = res.data
          })
          .catch((err) => {
            alert('データはありません')
            console.log(err)
          })
      }
      // let login_user = this.$props.user.username
      // let info_list_url = 'https://ci4nqe3h81.execute-api.ap-northeast-1.amazonaws.com/user/' + login_user
      // this.axios
      //   .get(info_list_url)
      //   .then((res) => {
      //     console.log(res)
      //     this.infos = res.data
      //   })
      //   .catch((err) => {
      //     alert('データはありません')
      //     console.log(err)
      //   })
    },
    clickItem(item, row) {
      this.info_store.info_data = row.item
      this.$router.push({
        name: 'info_detail',
      })
    },
  },
}
</script>
