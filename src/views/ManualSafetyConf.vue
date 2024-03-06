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
    <!-- <h2>手動安否確認</h2> -->
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col class="mr-auto" cols="12" lg="6">
            <v-text-field v-model="title" label="タイトル*" required max-widgh="300px" :rules="rules" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-select
              label="会社*"
              :items="companies"
              item-title="company_name"
              item-value="company_name"
              :rules="select_rules"
              v-model="select_companys"
              @click="choiceCompany"
              multiple
            />
          </v-col>

          <v-col v-if="select_companys.length > 0" cols="12" lg="6">
            <v-select label="拠点" :items="areas" v-model="select_areas" @click="choiceArea" multiple />
          </v-col>

          <v-col v-if="select_areas.length > 0" cols="12" lg="6">
            <v-select label="事業部" :items="divisions" v-model="select_divisions" @click="choiceDivision" multiple />
          </v-col>

          <v-col v-if="select_divisions.length > 0" cols="12" lg="6">
            <v-select label="所属" :items="organizations" v-model="select_organizations" @click="choiceOrganization" multiple />
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
              <v-checkbox v-model="training_flg" label="訓練" color="info" hide-details></v-checkbox>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-btn color="primary" @click="validate">確認</v-btn>

          <v-dialog v-model="dialog" persistent style="max-width: 800px">
            <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
            <v-card>
              <v-card-title class="text-h5">以下の内容で安否確認をしてよろしいですか？</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="mr-auto" cols="3">タイトル：</v-col>
                  <v-col v-if="training_flg" class="mr-auto" cols="9">【訓練】{{ title }}</v-col>
                  <v-col v-else class="mr-auto" cols="9">【安否確認】{{ title }}</v-col>
                  <v-col class="mr-auto" cols="3"> 会社：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="company in select_companys" :key="company">{{ company }}</span>
                  </v-col>
                  <v-col class="mr-auto" cols="3"> 拠点：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="area in select_areas" :key="area">{{ area }}</span></v-col
                  >
                  <v-col class="mr-auto" cols="3"> 事業部：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="division in select_divisions" :key="division">{{ division }}</span>
                  </v-col>
                  <v-col class="mr-auto" cols="3"> 所属：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2" v-for="organization in select_organizations" :key="organization">{{ organization }}</span>
                  </v-col>

                  <v-col class="mr-auto" cols="3"> 本文：</v-col>
                  <v-col class="mr-auto vue-textarea" cols="9"> {{ body_text }} </v-col>
                  <v-col class="mr-auto" cols="3"> 種別：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span v-if="training_flg">訓練</span>
                    <span v-else>安否確認</span>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green-darken-1" variant="text" @click="dialog = false">キャンセル</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="createForm">実行</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import { format } from 'date-fns'
export default {
  data: () => ({
    link: [
      {
        title: '手動安否確認',
        disabled: false,
      },
    ],
    rules: [(v) => !!v || 'この項目は必須です'],
    select_rules: [(v) => (v && v.length > 0) || '選択してください'],
    title: '',
    companies: [],
    select_companys: [],
    areas: [],
    select_areas: [],
    divisions: [],
    select_divisions: [],
    organizations: [],
    select_organizations: [],
    body_text: '',
    training_flg: true,
    dialog: false,
    date_time: '',
  }),
  watch: {
    // 全社が含まれている場合は全社のみにする
    select_companys() {
      if (this.select_companys.includes('全社')) {
        this.select_companys = ['全社']
      }
    },
  },
  mounted() {},
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
      if (this.training_flg) {
        this.title = '【訓練】' + this.title
      } else {
        this.title = '【安否確認】' + this.title
      }

      // 現在の日時をdate_timeに保存
      let now = new Date()
      let year = format(now, 'yyyy')
      let month = format(now, 'MM')
      let date = format(now, 'dd')
      let hour = format(now, 'HH')
      let min = format(now, 'mm')
      let sec = format(now, 'ss')
      this.date_time = year + month + date + 'T' + hour + min + sec + 'Z'

      // ここに新規作成処理を記載
      let post_data = {
        disaster_name: '手動',
        datetime: this.date_time,
        description: this.body_text,
        kunren: this.training_flg,
        remind: 0,
        title: this.title,
        ttl_day: now.setFullYear(now.getFullYear() + 5),
      }

      console.log(post_data)

      // ページ更新
      this.$router.go({ path: this.$router.currentRoute.path, force: true })

      let success = '安否確認を開始しました。\nタイトル:' + this.title
      alert(success)

      this.$refs.form.reset()
    },
    choiceCompany() {
      this.organizations = []
      this.areas = []
      this.divisions = []
      this.select_organizations = []
      this.select_areas = []
      this.select_divisions = []
      let company_list_url = 'https://6m84bxbhlg.execute-api.ap-northeast-1.amazonaws.com/'
      this.axios
        .get(company_list_url)
        .then((res) => {
          this.companies = res.data
          // 全社を追加
          this.companies.unshift({
            auto_setting: true,
            company_name: '全社',
          })
        })
        .catch((err) => {
          alert('このデータはありません')
          console.log(err)
        })
    },
    getCompanyAreas(name) {
      if (name == 'PI/PCS/PGS') {
        name = 'PIPCSPGS'
      }
      let get_area_url = 'https://6m84bxbhlg.execute-api.ap-northeast-1.amazonaws.com/' + name
      this.axios
        .get(get_area_url)
        .then((res) => {
          this.areas = this.areas.concat(res.data)
          this.areas = this.areas.filter((element, index) => this.areas.indexOf(element) === index)
        })
        .catch((err) => {
          alert('エラー')
          console.log(err)
        })
    },
    getAreaDivision(name) {
      let get_division_url = 'https://k4sxxt1oo3.execute-api.ap-northeast-1.amazonaws.com/' + name
      this.axios
        .get(get_division_url)
        .then((res) => {
          this.divisions = this.divisions.concat(res.data)
          this.divisions = this.divisions.filter((element, index) => this.divisions.indexOf(element) === index)
        })
        .catch((err) => {
          alert('エラー')
          console.log(err)
        })
    },
    getDivisionOrg(name) {
      let get_org_url = 'https://o9chfpwo3j.execute-api.ap-northeast-1.amazonaws.com/' + name
      this.axios
        .get(get_org_url)
        .then((res) => {
          this.organizations = this.organizations.concat(res.data)
          this.organizations = this.organizations.filter((element, index) => this.organizations.indexOf(element) === index)
        })
        .catch((err) => {
          alert('エラー')
          console.log(err)
        })
    },
    choiceArea() {
      this.organizations = []
      this.divisions = []
      this.select_organizations = []
      this.select_divisions = []
      this.areas = []
      for (let i in this.select_companys) {
        this.getCompanyAreas(this.select_companys[i])
      }
    },
    choiceDivision() {
      this.organizations = []
      this.select_organizations = []
      this.divisions = []
      for (let i in this.select_areas) {
        this.getAreaDivision(this.select_areas[i])
      }
    },
    choiceOrganization() {
      for (let i in this.select_divisions) {
        this.getDivisionOrg(this.select_divisions[i])
      }
    },
  },
}
</script>
<style scoped>
.vue-textarea {
  white-space: break-spaces;
}
</style>
