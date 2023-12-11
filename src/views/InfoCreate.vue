<template>
  <v-container>
    <h2>お知らせ作成</h2>
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col class="mr-auto" cols="12" lg="6">
            <v-text-field v-model="title" label="タイトル" required max-widgh="300px" :rules="rules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select label="会社" :items="companies" :rules="rules" v-model="company" @click="choiceCompany" />
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
            <v-textarea label="本文" no-resize rows="8" v-model="body_text" :rules="rules"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-checkbox v-model="notice_flg" label="通知" color="info" hide-details></v-checkbox>
              <v-checkbox v-model="training_flg" label="避難訓練" color="info" hide-details></v-checkbox>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-btn variant="flat" color="primary" @click="validate">作成</v-btn>
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
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()
      if (valid) {
        let success =
          '以下の内容で作成しました。\nタイトル:' +
          this.title +
          '\n拠点:' +
          this.area +
          '\n内容:' +
          this.body_text +
          '\n共有:' +
          this.notice_flg +
          '\n訓練:' +
          this.training_flg
        alert(success)
        this.$refs.form.reset()
      }
    },
    choiceCompany(){
      this.organization = ""
      this.area = ""
      this.organizations = []
      this.areas = []
    }
    ,
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
