<template>
  <v-container>
    <h2>会社情報追加</h2>
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col cols="12" lg="6">
            <v-select label="会社*" :items="companies" :rules="select_rules" v-model="select_company" @click="choiceCompany" />
            <v-autocomplete label="会社*" v-model="select_company" :items="companies" :rules="select_rules"> </v-autocomplete> </v-col
        ></v-row>
        <v-row>
          <v-col v-if="select_company" cols="12" lg="6">
            <v-select label="拠点" :items="areas" v-model="select_area" @click="choiceArea" />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="select_area" cols="12" lg="6">
            <v-select label="部署" :items="divisions" v-model="select_division" @click="choiceDivision" />
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="select_division" cols="12" lg="6">
            <v-select label="組織" :items="organizations" v-model="select_organization" @click="choiceOrganization" />
          </v-col>
        </v-row>

        <v-row justify="start">
          <v-btn variant="flat" color="primary" @click="validate">追加</v-btn>

          <v-dialog v-model="dialog" persistent width="auto">
            <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
            <v-card>
              <v-card-title class="text-h5">以下の内容で投稿してよろしいですか？</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 会社：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2">{{ select_company }}</span>
                  </v-col>
                  <v-col class="mr-auto" cols="3"> 拠点：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2">{{ select_area }}</span></v-col
                  >
                  <v-col class="mr-auto" cols="3"> 部署：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2">{{ select_division }}</span>
                  </v-col>
                  <v-col class="mr-auto" cols="3"> 組織：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2">{{ select_organization }}</span>
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
    companies: ['全社', 'PI', 'PCS', 'PAD'],
    select_company: null,
    areas: [],
    select_area: null,
    divisions: [],
    select_division: null,
    organizations: [],
    select_organization: null,
    dialog: false,
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
    createForm() {
      this.dialog = false
      // ここに新規作成処理を記載

      // お知らせ一覧へリダイレクト
      //   this.$router.replace({
      //     name: 'info_list',
      //   })

      let success = '会社情報を追加しました。'
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
    },
    choiceArea() {
      this.organizations = []
      this.divisions = []
      this.select_organizations = []
      this.select_divisions = []
      this.areas = this.select_company
    },
    choiceDivision() {
      this.organizations = []
      this.select_organizations = []
      this.divisions = this.select_area
    },
    choiceOrganization() {
      this.organizations = this.select_division
    },
  },
}
</script>
<style scoped>
.vue-textarea {
  white-space: break-spaces;
}
</style>
