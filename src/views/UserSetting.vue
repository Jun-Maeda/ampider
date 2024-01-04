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
          <v-col cols="12" sm="2">
            <p>
              <b>安否確認<br />通知先・優先順位</b>
            </p>
          </v-col>
          <v-col cols="12" sm="10">
            <v-row class="mb-4 mr-1" style="max-width: 510px" justify="end"
              ><v-btn @click="add" class="mr-2">追加</v-btn><v-btn @click="sort">リセット</v-btn></v-row
            >
            <draggable
              v-model="data"
              type="transition"
              item-key="id"
              tag="ul"
              class="list-group"
              handle=".handle"
              @start="dragging = true"
              @end="dragging = false"
              ghost-class="ghost"
              v-bind="dragOptions"
            >
              <template #item="{ element, index }">
                <li list-group-item style="max-width: 500px">
                  <v-row>
                    <v-col cols="3" class="my-auto">
                      <span class="handle" style="cursor: move">
                        <v-icon icon="mdi-menu"></v-icon>
                      </span>
                      <span class="mx-2"
                        ><b>{{ index + 1 }}</b></span
                      >
                    </v-col>
                    <v-col cols="7">
                      <v-select
                        label="種類"
                        :items="send_type"
                        item-title="name"
                        item-value="id"
                        v-model="element.type"
                        density="compact"
                        hide-details=""
                      />
                      <v-text-field v-model="element.content" :label="getType(element.type).label" density="compact" hide-details="" class="mt-1" />
                    </v-col>
                    <v-col cols="2" class="my-auto pa-0 mx-0">
                      <v-btn v-on:click="del(index)" variant="text" color="red"><v-icon icon="mdi-close"></v-icon></v-btn>
                    </v-col>
                  </v-row>
                </li>
              </template>
            </draggable>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
let url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode='
export default {
  components: {
    draggable: draggable,
  },
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
    dragging: false,
    send_type: [
      {
        id: 0,
        name: 'メール',
        type: 'email',
        label: 'メールアドレス',
      },
      {
        id: 1,
        name: '電話番号',
        type: 'phone',
        label: '電話番号',
      },
    ],
    data: [
      {
        type: 0,
        content: 'jun126m@prestigein.com',
      },
      {
        type: 1,
        content: '0120444444',
      },
      {
        type: 1,
        content: '012033906',
      },
    ],
  }),
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
  },
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

    // this.axios.get(url + this.zipcode).then((res) => {
    //   const addressData = res.data.results[0]
    //   this.zipcode = addressData['zipcode']
    //   this.pref = addressData['address1']
    //   this.pref_code = addressData['prefcode']
    //   const address1 = addressData['address2']
    //   const address2 = addressData['address3']
    //   this.address = address1 + address2
    // })
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
    add() {
      console.log(this.data.length)
      if (this.data.length > 4) {
        alert('5件以上追加できません')
      } else {
        this.data.push({
          type: 0,
          content: '',
        })
      }
    },
    del(index) {
      this.data.splice(index, 1)
    },
    sort() {
      this.data = this.data.sort((a, b) => a.id - b.id)
    },
    getType(type_id) {
      let type = this.send_type.find(function (value) {
        return value.id == type_id
      })
      return type
    },
  },
}
</script>
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  border: solid #555353 0.5px;
  background-color: rgb(248, 242, 224);
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0%;
}

.list-group {
  min-height: 20px;
}
</style>
