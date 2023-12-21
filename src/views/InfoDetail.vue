<script setup>
import { infoDetailStore } from '@/stores/info'
</script>
<template>
  <v-container>
    <v-row class="pt-5">
      <v-col cols="12" sm="4" class="py-0">
        <v-text-field label="タイトル" readonly v-model="info_detail.title"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3" class="py-0">
        <v-text-field label="日時" readonly v-model="info_detail.datetime"></v-text-field>
      </v-col>
      <v-col cols="12" class="py-0">
        <v-textarea label="本文" readonly no-resize rows="5" :model-value="info_detail.body_text"></v-textarea>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn class="mr-2" @click="$router.back()">戻る</v-btn>
      <v-btn color="red" class="mr-3" @click="deleteItem">削除</v-btn>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 text-center mt-2">削除してよろしいですか？</v-card-title>
        <p class="text-center">タイトル：{{ info_detail.title }}</p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDelete">キャンセル</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm()">削除</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    // info_detail: {
    //   title: '一部水没している地域について',
    //   datetime: '2023/12/21 11:38',
    //   body_text:
    //     '一部水没している地域について一部水没している地域について一部水没している地域について\n一部水没している地域について一部水没している地域について',
    // },
    info_detail: {},
    dialogDelete: false,
    info_store: infoDetailStore(),
  }),
  mounted() {
    let info_data = this.info_store.info_data
    console.log(info_data)

    // ストアにデータが入っていなければ一覧にリダイレクト
    if (info_data === null) {
      // お知らせ一覧へリダイレクト
      this.$router.replace({
        name: 'info_list',
      })
    } else {
      this.info_detail = info_data
    }
  },
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        let success =
          '以下の内容で作成しました。\nタイトル:' + this.title + '\n拠点:' + this.area + '\n内容:' + this.body_text + '\n共有:' + this.notice
        alert(success)
        this.$refs.form.reset()
      }
    },
    deleteItem() {
      this.dialogDelete = true
    },
    close() {
      this.dialog = false
    },
    closeDelete() {
      this.dialogDelete = false
    },
    deleteItemConfirm() {
      this.info_store.resetInfo()
      this.closeDelete()
      alert('削除しました。')
      // お知らせ一覧へリダイレクト
      this.$router.replace({
        name: 'info_list',
      })
    },
  },
}
</script>
