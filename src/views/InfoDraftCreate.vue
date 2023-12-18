<script setup>
import { useDraftStore } from '@/stores/draft'
</script>
<template>
  <v-container>
    <h2>下書き編集</h2>
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col class="mr-auto" cols="12" lg="6">
            <v-text-field v-model="title" label="タイトル*" required max-widgh="300px" :rules="rules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select label="会社*" :items="companies" :rules="select_rules" v-model="select_companys" @click="choiceCompany" multiple />
          </v-col>

          <v-col v-if="select_companys.length > 0" cols="12" lg="6">
            <v-select label="拠点" :items="areas" v-model="select_areas" @click="choiceArea" multiple />
          </v-col>

          <v-col v-if="select_areas.length > 0" cols="12" lg="6">
            <v-select label="部署" :items="divisions" v-model="select_divisions" @click="choiceDivision" multiple />
          </v-col>

          <v-col v-if="select_divisions.length > 0" cols="12" lg="6">
            <v-select label="組織" :items="organizations" v-model="select_organizations" @click="choiceOrganization" multiple />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea label="本文*" no-resize rows="8" v-model="body_text" :rules="rules"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-checkbox v-model="notice_flg" label="通知" color="info" hide-details></v-checkbox>
              <v-checkbox v-model="training_flg" label="訓練" color="info" hide-details></v-checkbox>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-btn class="mr-3" variant="flat" color="primary" @click="createDraft">下書き</v-btn>
          <v-btn variant="flat" color="primary" @click="validate">投稿</v-btn>

          <v-dialog v-model="dialog" persistent width="auto">
            <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
            <v-card>
              <v-card-title class="text-h5">以下の内容で投稿してよろしいですか？</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="mr-auto" cols="3">タイトル：</v-col>
                  <v-col class="mr-auto" cols="9">{{ title }}</v-col>
                </v-row>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 会社：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="company in select_companys" :key="company">{{ company }}</span>
                  </v-col>
                  <v-col class="mr-auto" cols="3"> 拠点：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="area in select_areas" :key="area">{{ area }}</span></v-col
                  >
                  <v-col class="mr-auto" cols="3"> 部署：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="division in select_divisions" :key="division">{{ division }}</span>
                  </v-col>
                  <v-col class="mr-auto" cols="3"> 組織：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="organization in select_organizations" :key="organization">{{ organization }}</span>
                  </v-col>
                </v-row>
                <v-row> </v-row>
                <v-row> </v-row>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 本文：</v-col>
                  <v-col class="mr-auto vue-textarea" cols="9"> {{ body_text }} </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12">
                        通知：
                        <span v-if="notice_flg">通知する</span>
                        <span v-else>通知しない</span>
                      </v-col>
                      <v-col cols="12">
                        種別：
                        <span v-if="training_flg">訓練</span>
                        <span v-else>お知らせ</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false">キャンセル</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="createForm">投稿</v-btn>
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
  mounted() {
    let draft_data = this.draft_store.draft_data

    this.title = draft_data.title
    this.body_text = draft_data.text
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

      // ここに上書き処理記載

      // お知らせ一覧へリダイレクト
      this.$router.replace({
        name: 'info_list',
      })

      let success = 'お知らせを作成しました。\nタイトル:' + this.title
      alert(success)
      // piniaのリセット
      this.draft_store.resetDraft()
      this.$refs.form.reset()
    },
    createDraft() {
      this.dialog = false

      // ここに下書き更新処理記載

      let success = '下書きを更新しました。\nタイトル:' + this.title

      // 下書き一覧へリダイレクト
      this.$router.replace({
        name: 'info_draft_list',
      })

      alert(success)
      // piniaのリセット
      this.draft_store.resetDraft()

      this.$refs.form.reset()
    },
    choiceCompany() {
      this.organizations = []
      this.areas = []
      this.divisions = []
      this.select_organizations = []
      this.select_areas = []
      this.select_divisions = []
    },
    choiceArea() {
      this.organizations = []
      this.divisions = []
      this.select_organizations = []
      this.select_divisions = []
      this.areas = this.select_companys
    },
    choiceDivision() {
      this.organizations = []
      this.select_organizations = []
      this.divisions = this.select_areas
    },
    choiceOrganization() {
      this.organizations = this.select_divisions
    },
  },
}
</script>
<style scoped>
.vue-textarea {
  white-space: break-spaces;
}
</style>
