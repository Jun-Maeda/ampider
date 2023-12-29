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
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>社員番号</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ employee_number }} </v-col>
        <!-- {{ login_user }} -->
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>名前</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ user_name }} </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="4" sm="2">
          <p><b>苗字</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ family_name }} </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="2">
          <p><b>名前</b></p>
        </v-col>
        <v-col cols="8" sm="10"> {{ given_name }} </v-col>
      </v-row> -->
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
        <v-row>
          <v-col cols="4" sm="2">
            <p><b>メールアドレス</b></p>
          </v-col>
          <v-col cols="8" sm="10"><v-text-field v-model="email" density="compact" required style="max-width: 500px" :rules="rules" /> </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="2">
            <p><b>電話番号</b></p>
          </v-col>
          <v-col cols="8" sm="10"><v-text-field v-model="load" density="compact" required style="max-width: 500px" :rules="rules" /> </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="2">
            <p><b>住所①</b></p>
          </v-col>
          <v-col cols="8" sm="10">
            <v-row>
              <v-col cols="7" sm="3" class="pr-0">
                <v-text-field v-model="zipcode" prefix="〒" density="compact" required style="max-width: 250px" :rules="rules"></v-text-field>
              </v-col>
              <v-col cols="5" sm="9" class="mt-1">
                <v-btn @click="searchAddressInfo">自動入力</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="2">
            <p><b>住所①</b></p>
          </v-col>
          <v-col cols="8" sm="10"><v-text-field v-model="address" density="compact" required style="max-width: 500px" :rules="rules" /> </v-col>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
let url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode='
export default {
  data: () => ({
    rules: [(v) => !!v || 'この項目は必須です'],
    select_rules: [(v) => (v && v.length > 0) || '選択してください'],
    login_user: null,
    user_name: null,
    family_name: null,
    given_name: null,
    employee_number: null,
    company: null,
    area: null,
    division: null,
    organization: null,
    email: null,
    training_flg: false,
    dialog: false,
    phone: null,
    zipcode: null,
    address: null,
    pref_code: null,
    progress: false,
  }),
  mounted() {
    this.login_user = this.$props.user
    const user_datas = this.login_user.signInUserSession.idToken.payload
    this.user_name = user_datas.name
    this.family_name = user_datas.family_name
    this.given_name = user_datas.given_name
    this.employee_number = this.login_user.username
    this.email = user_datas.email

    // 以下はdynamodbから取得するデータに差し替え
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
    async searchAddressInfo() {
      this.progress = true
      this.axios
        .get(url + this.zipcode)
        .then((res) => {
          const addressData = res.data.results[0]
          this.zipcode = addressData['zipcode']
          const todofuken = addressData['address1']
          const address1 = addressData['address2']
          const address2 = addressData['address3']
          this.pref_code = addressData['prefcode']
          this.address = todofuken + address1 + address2
        })
        .catch(({ data }) => {
          alert('郵便番号情報が不正です。\n再度入力してください。')
          console.log(data.message)
        })

      this.progress = false
    },
  },
}
</script>
