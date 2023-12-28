<script setup>
import { useDraftStore } from '@/stores/draft'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  user: Object,
})
</script>
<template>
  <v-container>
    <h2>連絡先情報</h2>
    <div class="mt-8">
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>社員番号</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ employee_number }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>名前</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ user_name }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>会社</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ company }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>拠点</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ area }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>部署</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ division }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>組織</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ organization }} </v-col>
      </v-row>
      <v-form class="mt-5" ref="form">
        <!-- <v-row>
          <v-col class="py-0" cols="12" lg="6">
            <b>社員番号</b>
            <v-text-field readonly v-model="employee_number" max-widgh="300px" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12" lg="6"> <v-text-field readonly v-model="user_name" label="名前" max-widgh="300px" /> </v-col
        ></v-row>
        <v-row>
          <v-col class="py-0" cols="12" lg="6">
            <v-text-field readonly v-model="employee_number" label="会社名" max-widgh="300px" />
          </v-col>
        </v-row> -->
      </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: [(v) => !!v || 'この項目は必須です'],
    select_rules: [(v) => (v && v.length > 0) || '選択してください'],
    user_name: null,
    employee_number: null,
    company: null,
    area: null,
    division: null,
    organization: null,
    training_flg: false,
    dialog: false,
    draft_store: useDraftStore(),
  }),
  mounted() {
    this.user_name = this.$props.user.username
    // this.user_name = props.user.username
    this.employee_number = '123456'
    this.company = 'PI'
    this.area = '横手BPO'
    this.division = 'プロパティ事業部'
    this.organization = '横手ルームサポート'
  },
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
