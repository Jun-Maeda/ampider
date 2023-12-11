<template>
  <v-container>
    <h2>お知らせ作成</h2>
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col class="mr-auto" cols="12" lg="6">
            <v-text-field v-model="title" label="タイトル*" required max-widgh="300px" :rules="rules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select label="会社*" :items="companies" :rules="rules" v-model="company" @click="choiceCompany" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select label="拠点" :items="areas" v-model="area" @click="choiceArea" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select label="組織" :items="organizations" v-model="organization" @click="choiceOrganization" />
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
          <v-btn class="mr-3" variant="flat" color="primary" @click="validate">下書き</v-btn>
          <v-btn variant="flat" color="primary" @click="validate">投稿</v-btn>

          <v-dialog v-model="dialog" persistent width="auto">
            <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
            <v-card>
              <v-card-title class="text-h5">以下の内容で投稿してよろしいですか？</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="mr-auto" cols="12" lg="6"> タイトル：{{ title }} </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="6"> 会社：{{ company }} </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="6"> 拠点：{{ area }} </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" lg="6"> 組織：{{ organization }} </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12"> 本文：{{ body_text }} </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-row>
                      <v-col cols="12"> 通知：{{ notice_flg }} </v-col>
                      <v-col cols="12"> 訓練：{{ training_flg }} </v-col>
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
    title: '',
    companies: ['全社', 'PI', 'PCS', 'PAD'],
    company: '',
    areas: ['test'],
    area: '',
    organizations: ['test2'],
    organization: '',
    body_text: '',
    notice_flg: false,
    training_flg: false,
    dialog: false,
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.dialog = true
        
      }
    },
    createForm(){
      let success =
          'お知らせを作成しました。\nタイトル:' + this.title
        alert(success)
        this.$refs.form.reset()
        this.dialog = false
    },
    choiceCompany() {
      this.organization = ''
      this.area = ''
      this.organizations = []
      this.areas = []
    },
    choiceArea() {
      this.organizations = []
      this.areas = ['秋田', '山形', '富山', '東京', this.company]
    },
    choiceOrganization() {
      this.organizations = ['PI', 'PCS', 'PAD', this.area]
    },
  },
}
</script>
