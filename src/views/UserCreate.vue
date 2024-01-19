<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  user: Object,
})
</script>
<template>
  <v-progress-circular
    v-show="progress"
    indeterminate
    color="deep-orange lighten-2"
    :size="70"
    :width="7"
    style="position: fixed; top: 45%; left: 45%; z-index: 10"
  >
  </v-progress-circular>
  <v-container>
    <h2>連絡先情報</h2>
    <div class="mt-8">
      <v-form class="mt-8" ref="form">
        <h4>社員情報</h4>
        <v-row class="mt-3">
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>社員番号</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-text-field v-model="employee_number" density="compact" required style="max-width: 500px" :rules="[all_rules.required]" />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>名前</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-text-field v-model="user_name" density="compact" required style="max-width: 500px" :rules="[all_rules.required]" />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="mt-3">
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>メールアドレス</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3"
            ><v-text-field v-model="email" density="compact" required style="max-width: 500px" :rules="[all_rules.required, all_rules.email]" />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>会社</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select
              v-model="company"
              :items="companies"
              item-title="name"
              item-value="name"
              style="max-width: 500px"
              :rules="[all_rules.select]"
              density="compact"
              @click="choiceCompany"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider v-if="company"></v-divider>
        <v-row v-if="company">
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>拠点</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select v-model="area" :items="areas" style="max-width: 500px" :rules="[all_rules.select]" density="compact" @click="choiceArea">
            </v-select>
          </v-col>
        </v-row>
        <v-divider v-if="area"></v-divider>
        <v-row v-if="area">
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>事業部</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select v-model="division" :items="divisions" style="max-width: 500px" density="compact" @click="choiceDivision"></v-select>
          </v-col>
        </v-row>
        <v-divider v-if="division"></v-divider>
        <v-row v-if="division">
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>所属</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select v-model="organization" :items="organizations" style="max-width: 500px" density="compact" @click="choiceOrganization"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0"><b>役職</b></p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select
              v-model="job_title"
              :items="job_titles"
              item-title="name"
              item-value="code"
              style="max-width: 500px"
              :rules="[all_rules.select]"
              density="compact"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="my-3" justify="end">
          <v-btn class="mr-2" @click="$router.push('/employee_list')">戻る</v-btn>
          <v-btn class="" color="primary" @click="validate">作成</v-btn>
        </v-row>
        <v-dialog v-model="dialog" persistent width="auto">
          <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
          <v-card>
            <v-card-title class="text-h5">以下の内容でユーザー追加してよろしいですか？</v-card-title>
            <v-card-text>
              <v-row>
                <v-col class="mr-auto" cols="3"> 社員番号：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ employee_number }}</span>
                </v-col>
                <v-col class="mr-auto" cols="3"> 名前：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ user_name }}</span>
                </v-col>
                <v-col class="mr-auto" cols="3"> メールアドレス：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ email }}</span>
                </v-col>
                <v-col class="mr-auto" cols="3"> 会社：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ company }}</span>
                </v-col>
                <v-col class="mr-auto" cols="3"> 拠点：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ area }}</span></v-col
                >
                <v-col class="mr-auto" cols="3"> 事業部：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ division }}</span>
                </v-col>
                <v-col class="mr-auto" cols="3"> 所属：</v-col>
                <v-col class="mr-auto" cols="9"
                  ><span class="mr-2">{{ organization }}</span>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green-darken-1" variant="text" @click="dialog = false">キャンセル</v-btn>
              <v-btn color="green-darken-1" variant="text" @click="createForm">作成</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    all_rules: {
      required: (value) => !!value || '入力してください',
      email: (value) => /.+@.+/.test(value) || 'メールアドレスの形式が正しくありません',
      phone: (value) =>
        // eslint-disable-next-line no-useless-escape
        /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/.test(value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi, '')) || '電話番号の形式が正しくありません',
      max: (value) => (value && value.length <= 100) || '100文字以下で入力してください',
      select: (value) => (value && value.length > 0) || '選択してください',
      zipcode: (value) => /^\d{7}$/.test(value) || 'ハイフンを除く半角数字7桁で郵便番号を入力してください',
    },
    login_user: null,
    user_name: null,
    employee_number: null,
    companies: [],
    company: null,
    areas: [],
    area: null,
    divisions: [],
    division: null,
    organizations: [],
    organization: null,
    job_titles: [],
    job_title: null,
    email: null,
    dialog: false,
  }),
  mounted() {
    this.companies = [
      {
        name: 'PAD',
        company_num: '1234567',
        mail: 'test_test@test.jp',
        adding_flg: false,
      },
      {
        name: 'PHS',
        company_num: '1234568',
        mail: 'test_test@test.jp',
        adding_flg: false,
      },
      {
        name: '(株)プレミア・アンピダー',
        company_num: 'add_1234567',
        mail: 'test_test@test.jp',
        adding_flg: true,
      },
    ]
    this.job_titles = [
      {
        code: 'MG-1',
        name: 'マネージャー',
      },
      {
        code: 'SV-1',
        name: 'SV',
      },
      {
        code: 'A-1',
        name: 'オペレーター',
      },
    ]
  },
  methods: {
    // 作成ボタンを押したときのバリデーションチェック
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.dialog = true
      }
    },
    createForm() {
      this.dialog = false
      // ここに新規作成処理を記載

      // 従業員一覧へリダイレクト
      this.$router.replace({
        name: 'employee_list',
      })

      let success = '従業員を作成しました。'
      alert(success)

      this.$refs.form.reset()
    },
    choiceCompany() {
      this.organizations = []
      this.areas = []
      this.divisions = []
      this.organization = null
      this.area = null
      this.division = null
    },
    choiceArea() {
      this.organizations = []
      this.divisions = []
      this.organization = null
      this.division = null
      this.areas = [this.company]
    },
    choiceDivision() {
      this.organizations = []
      this.organization = null
      this.divisions = [this.area]
    },
    choiceOrganization() {
      this.organizations = [this.division]
    },
  },
}
</script>
