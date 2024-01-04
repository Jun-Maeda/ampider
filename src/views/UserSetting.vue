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
            <p><b>郵便番号</b></p>
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
            <p><b>都道府県</b></p>
          </v-col>
          <v-col cols="8" sm="10">
            <v-autocomplete
              ref="country"
              v-model="pref"
              density="compact"
              :items="pref_lists"
              required
              style="max-width: 500px"
              :rules="select_rules"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" sm="2">
            <p><b>住所</b></p>
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
    pref_lists: [
      '北海道',
      '青森県',
      '岩手県',
      '宮城県',
      '秋田県',
      '山形県',
      '福島県',
      '茨城県',
      '栃木県',
      '群馬県',
      '埼玉県',
      '千葉県',
      '東京都',
      '神奈川県',
      '新潟県',
      '富山県',
      '石川県',
      '福井県',
      '山梨県',
      '長野県',
      '岐阜県',
      '静岡県',
      '愛知県',
      '三重県',
      '滋賀県',
      '京都府',
      '大阪府',
      '兵庫県',
      '奈良県',
      '和歌山県',
      '鳥取県',
      '島根県',
      '岡山県',
      '広島県',
      '山口県',
      '徳島県',
      '香川県',
      '愛媛県',
      '高知県',
      '福岡県',
      '佐賀県',
      '長崎県',
      '熊本県',
      '大分県',
      '宮崎県',
      '鹿児島県',
      '沖縄県',
    ],
    zipcode: null,
    pref: null,
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
    this.axios.get(url + this.zipcode).then((res) => {
      const addressData = res.data.results[0]
      this.zipcode = addressData['zipcode']
      this.pref = addressData['address1']
      this.pref_code = addressData['prefcode']
      const address1 = addressData['address2']
      const address2 = addressData['address3']
      this.address = address1 + address2
    })
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
      await this.axios
        .get(url + this.zipcode)
        .then((res) => {
          const addressData = res.data.results[0]
          this.zipcode = addressData['zipcode']
          this.pref = addressData['address1']
          this.pref_code = addressData['prefcode']
          const address1 = addressData['address2']
          const address2 = addressData['address3']
          this.address = address1 + address2
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
