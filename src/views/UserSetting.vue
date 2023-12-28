<script setup>
import { useDraftStore } from '@/stores/draft'
</script>
<template>
  <v-container>
    <h2>連絡先情報</h2>
    <div class="mt-8">
      <v-form class="mt-5" ref="form"> </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: [(v) => !!v || 'この項目は必須です'],
    select_rules: [(v) => (v && v.length > 0) || '選択してください'],
    title: '',
    companies: ['全社', 'PI', 'PCS', 'PAD'],
    select_companys: [],
    areas: [],
    select_areas: [],
    divisions: [],
    select_divisions: [],
    organizations: [],
    select_organizations: [],
    body_text: '',
    notice_flg: false,
    training_flg: false,
    dialog: false,
    draft_store: useDraftStore(),
  }),
  mounted() {},
  methods: {
    // 投稿ボタンを押したときのバリデーションチェック
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.dialog = true
      }
    },
  },
}
</script>
