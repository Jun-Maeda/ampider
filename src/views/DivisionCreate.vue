<script setup>
import { useCompanyStore } from '@/stores/company_setting'
</script>
<template>
  <v-container>
    <h2>事業部追加</h2>
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field v-model="division" label="事業部名" required max-widgh="300px" :rules="rules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-autocomplete label="所属拠点" v-model="select_areas" :items="areas" style="max-width: 300px" :rules="select_rules" multiple>
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row justify="start">
          <v-col>
            <v-btn class="mr-2" @click="$router.push('/division_list')">戻る</v-btn>
            <v-btn variant="flat" color="primary" @click="validate">追加</v-btn>
          </v-col>
          <v-dialog v-model="dialog" persistent width="auto">
            <!-- <template v-slot:activator="{ props }">
                <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
              </template> -->
            <v-card>
              <v-card-title class="text-h5">以下の内容で作成してよろしいですか？</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 事業部名：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2">{{ division }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 所属拠点：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span v-for="select_area in select_areas" :key="select_area" class="mr-2">{{ select_area }}</span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false">キャンセル</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="createForm">追加</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: [(v) => !!v || 'この項目は必須です'],
    select_rules: [(v) => (v && v.length > 0) || '選択してください'],
    areas: [],
    select_areas: [],
    division: null,
    dialog: false,
    company_store: useCompanyStore(),
  }),
  mounted() {
    // 直接アクセスしたら会社一覧へリダイレクト
    if (this.company_store.area_data === null) {
      this.$router.push({
        name: 'company_list',
      })
    }
    // 拠点一覧から取得してくる
    this.areas = ['秋田', '富山', '山形', '東京']
    let my_area = this.company_store.area_data
    this.select_areas.push(my_area)
  },
  methods: {
    // 投稿ボタンを押したときのバリデーションチェック
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.dialog = true
      }
    },
    createForm() {
      this.dialog = false
      // ここに新規作成処理を記載

      // 事業部一覧へリダイレクト
      this.$router.replace({
        name: 'division_list',
      })

      let success = '事業部を追加しました。'
      alert(success)

      this.$refs.form.reset()
    },
  },
}
</script>
<style scoped>
.vue-textarea {
  white-space: break-spaces;
}
</style>
