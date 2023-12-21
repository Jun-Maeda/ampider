<script setup>
import { infoDetailStore } from '@/stores/info'
</script>
<template>
  <v-container>
    <h2>お知らせ一覧</h2>
    <div class="mt-8">
      <v-list lines="three">
        <v-list-item v-for="file in files" :key="file.title" :title="file.title" :subtitle="file.body_text" @click="editItem(file)">
          <template v-slot:prepend>
            <v-avatar :color="file.color">
              <v-icon color="white">{{ file.icon }}</v-icon>
            </v-avatar>
          </template>
          <template v-slot:title="{ title }">
            <b v-html="title"></b>
            <p><small>2023/12/01</small></p>
          </template>
          <v-divider></v-divider>
        </v-list-item>
      </v-list>
      <div class="text-center" v-show="totalis">
        <v-pagination active-color="orange" v-model="page" :length="5" rounded="circle"></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: [(v) => !!v || 'この項目は必須です'],
    title: '',
    areas: ['秋田', '山形', '富山', '東京'],
    area: '',
    body_text: '',
    notice: false,
    headers: [
      {
        title: 'Dessert (100g serving)',
        align: 'start',
        sortable: false,
        key: 'name',
      },
      { title: 'Calories', key: 'calories' },
      { title: 'Fat (g)', key: 'fat' },
      { title: 'Carbs (g)', key: 'carbs' },
      { title: 'Protein (g)', key: 'protein' },
      { title: 'Iron (%)', key: 'iron' },
    ],
    files: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        body_text: '安否確認のテストです。安否確認フォームを入力して回答してください',
        title: '安否確認テスト',
        link: 'info_Detail',
        datetime: '2023/12/21 12:00',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        body_text:
          'あああああああああああああああああああああああああ\nああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
        title: '安否確認テスト',
        datetime: '2023/12/21 13:00',
      },
    ],
    totalis: false,
    total: 100,
    info_store: infoDetailStore(),
  }),
  mounted() {
    if (this.total < 10) {
      this.totalis = false
    } else {
      this.totalis = true
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
    async totalCheak() {
      if (this.total < 10) {
        this.totalis = false
      } else {
        this.totalis = true
      }
    },
    editItem(item) {
      this.info_store.info_data = item
      this.$router.push({
        name: 'info_detail',
      })
    },
  },
}
</script>
