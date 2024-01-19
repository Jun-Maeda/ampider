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
      <h4>社員情報</h4>
      <v-row class="mt-3">
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>社員番号</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ employee_number }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>名前</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ user_name }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>会社</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ company }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>拠点</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ area }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>事業部</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ division }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>所属</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ organization }} </v-col>
      </v-row>
      <v-row>
        <v-divider></v-divider>
        <v-col cols="12" sm="2" class="py-0 py-sm-3">
          <p class="ma-sm-0"><b>役職</b></p>
        </v-col>
        <v-col cols="12" sm="10" class="py-0 py-sm-3"> {{ job_title }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-form class="mt-8" ref="form">
        <h4>個人設定情報</h4>
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
            <b>住所(都道府県)</b>
          </v-col>

          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select
              v-model="addresses"
              :items="pref_lists"
              multiple
              clearable
              chips
              :rules="[all_rules.select]"
              style="max-width: 500px"
              density="compact"
            ></v-select>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <!-- <div v-for="(item, index) in addresses" :key="index">
          <v-row>
            <v-col cols="12" class="py-0 py-sm-3">
              <v-row>
                <v-col class="ma-sm-0">
                  <b>住所{{ index + 1 }}</b>
                </v-col>
                <v-col>
                  <v-row justify="end" style="max-width: 500px">
                    <v-btn v-if="addresses.length > 1" @click="del_address(index)" variant="text" color="red" icon="mdi-close"></v-btn> </v-row
                ></v-col>
              </v-row>
            </v-col> -->

        <!-- <v-col cols="12" sm="2" class="py-0 py-sm-3">
              <p class="ma-sm-0">郵便番号</p>
            </v-col>
            <v-col cols="12" sm="10" class="py-0 py-sm-3">
              <v-row>
                <v-col cols="7" sm="3" class="pr-0">
                  <v-text-field
                    v-model="item.zipcode"
                    prefix="〒"
                    density="compact"
                    required
                    style="max-width: 250px"
                    :rules="[all_rules.required, all_rules.zipcode]"
                    placeholder="0130054"
                  ></v-text-field>
                </v-col>
                <v-col cols="5" sm="9" class="mt-1">
                  <v-btn @click="searchAddress(index)">自動入力</v-btn>
                </v-col>
              </v-row>
            </v-col> -->

        <!-- </v-row>
          <v-row>
            <v-col cols="12" sm="2" class="py-0 py-sm-3">
              <p class="ma-sm-0">都道府県</p>
            </v-col>
            <v-col cols="12" sm="10" class="py-0 py-sm-3">
              <v-autocomplete
                ref="country"
                v-model="item.pref"
                density="compact"
                :items="pref_lists"
                style="max-width: 500px"
                :rules="[all_rules.select]"
                multiple
                @click="check_pref(item.pref)"
              >
              </v-autocomplete>
            </v-col>
          </v-row> -->

        <!-- 3つまで住所追加可能 -->
        <!-- <v-btn @click="add_address()" v-if="addresses.length == index + 1" variant="text" icon="mdi-plus"></v-btn>
          <v-divider></v-divider>
        </div> -->

        <v-row>
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <p class="ma-sm-0">
              <b>安否確認<br />通知先・優先順位</b>
            </p>
          </v-col>
          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-row class="mt-1 mb-4 mr-1" style="max-width: 510px" justify="end"
              ><v-btn v-show="notifications.length < 5" @click="add" class="mr-2">追加</v-btn><v-btn @click="sort">リセット</v-btn></v-row
            >
            <draggable
              v-model="notifications"
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
                        class="mt-5"
                      />
                      <v-text-field
                        v-model="element.content"
                        :label="getType(element.type).label"
                        density="compact"
                        class="mt-1"
                        :rules="[all_rules.required, all_rules[getType(element.type).type]]"
                        :placeholder="getType(element.type).placeholder"
                      />
                    </v-col>
                    <v-col cols="2" class="my-auto pa-0 mx-0">
                      <v-btn v-if="notifications.length > 1" @click="del(index)" variant="text" color="red" icon="mdi-close"></v-btn>
                    </v-col>
                  </v-row>
                </li>
              </template>
            </draggable>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <h4 class="mt-5">家族情報</h4>
        <div v-for="(item, index) in family" :key="index">
          <v-row>
            <v-col cols="12" class="py-0 py-sm-3">
              <v-row>
                <v-col class="ma-sm-0">
                  <b>家族{{ index + 1 }}</b>
                </v-col>
                <v-col>
                  <v-row justify="end" style="max-width: 500px">
                    <v-btn @click="del_family(index)" variant="text" color="red" icon="mdi-close"></v-btn> </v-row
                ></v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2" class="py-0 py-sm-3">
              <p class="ma-sm-0">名前</p>
            </v-col>
            <v-col cols="12" sm="10" class="py-0 py-sm-3"
              ><v-text-field v-model="item.name" density="compact" required style="max-width: 500px" :rules="[all_rules.required]" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2" class="py-0 py-sm-3">
              <p class="ma-sm-0">住所(都道府県)</p>
            </v-col>

            <v-col cols="12" sm="10" class="py-0 py-sm-3">
              <v-select
                v-model="item.pref"
                :items="pref_lists"
                multiple
                clearable
                chips
                :rules="[all_rules.select]"
                style="max-width: 500px"
                density="compact"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2" class="py-0 py-sm-3">
              <p class="ma-sm-0">連絡種別</p>
            </v-col>
            <v-col cols="12" sm="10" class="py-0 py-sm-3">
              <v-select :items="send_type" item-title="name" item-value="id" v-model="item.type" density="compact" style="max-width: 500px" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="2" class="py-0 py-sm-3">
              <p class="ma-sm-0">連絡先</p>
            </v-col>
            <v-col cols="12" sm="10" class="py-0 py-sm-3"
              ><v-text-field
                v-model="item.content"
                density="compact"
                required
                style="max-width: 500px"
                :rules="[all_rules.required, all_rules[getType(item.type).type]]"
              />
            </v-col>
          </v-row>

          <v-divider></v-divider>
        </div>
        <!-- 3つまで家族追加可能 -->
        <v-btn v-if="family && family.length < 3" @click="add_family()" variant="text" icon="mdi-plus"></v-btn>

        <v-row class="my-3" justify="center">
          <v-btn class="" color="primary" @click="validate">更新</v-btn>
        </v-row>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
let url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode='
const all_prefs = [
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
]
export default {
  components: {
    draggable: draggable,
  },
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
    company: null,
    area: null,
    division: null,
    organization: null,
    job_title: null,
    email: null,
    pref_lists: [],
    addresses: [],
    zipcode: null,
    pref: null,
    address: null,
    pref_code: null,
    family: null,
    progress: false,
    dragging: false,
    send_type: [
      {
        id: 0,
        name: 'メール',
        type: 'email',
        label: 'メールアドレス',
        placeholder: 'sample@sample.com',
      },
      {
        id: 1,
        name: '電話番号',
        type: 'phone',
        label: '電話番号',
        placeholder: '09012345678',
      },
    ],
    notifications: [],
    reset_notifications: [],
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

    this.employee_number = this.login_user.username
    this.email = user_datas.email
    this.pref_lists = JSON.parse(JSON.stringify(all_prefs))

    // 以下はdynamodbから取得するデータに差し替え
    this.user_name = '笠木 静子'
    this.company = 'PI'
    this.area = '横手BPO'
    this.division = 'プロパティ事業部'
    this.organization = '横手ルームサポート'
    this.job_title = 'マネージャー'
    this.addresses = ['富山県', '秋田県']
    this.notifications = [
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
        content: '0120333906',
      },
    ]
    const reset_notifications_data = JSON.parse(JSON.stringify(this.notifications))
    this.reset_notifications = reset_notifications_data

    this.family = [
      {
        name: '正月餅太郎',
        type: 1,
        content: '0120333906',
        pref: '秋田県',
      },
      {
        name: '年越蕎麦次郎',
        type: 0,
        content: 'jun126m@prestigein.com',
        pref: '富山県',
      },
    ]
  },
  methods: {
    // 投稿ボタンを押したときのバリデーションチェック
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        alert('更新しました。')
      }
    },
    // 住所自動入力
    // async searchAddress(index) {
    //   this.progress = true
    //   await this.axios
    //     .get(url + this.addresses[index].zipcode)
    //     .then((res) => {
    //       const addressData = res.data.results[0]
    //       this.addresses[index].zipcode = addressData['zipcode']
    //       this.addresses[index].pref = addressData['address1']
    //       this.addresses[index].pref_code = addressData['prefcode']
    //       const address1 = addressData['address2']
    //       const address2 = addressData['address3']
    //       this.addresses[index].address = address1 + address2
    //       this.progress = false
    //     })
    //     .catch(({ data }) => {
    //       this.progress = false
    //       alert('郵便番号情報が不正です。\n再度入力してください。')
    //       console.log(data.message)
    //     })
    // },
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
          this.progress = false
        })
        .catch(({ data }) => {
          this.progress = false
          alert('郵便番号情報が不正です。\n再度入力してください。')
          console.log(data.message)
        })
    },
    add_address() {
      this.addresses.push({
        pref: null,
      })
    },
    del_address(index) {
      this.addresses.splice(index, 1)
    },
    add_family() {
      this.family.push({
        name: null,
        type: 1,
        content: null,
        pref: null,
      })
    },
    del_family(index) {
      this.family.splice(index, 1)
    },
    add() {
      console.log(this.notifications.length)
      if (this.notifications.length > 4) {
        alert('5件以上追加できません')
      } else {
        this.notifications.push({
          type: 0,
          content: '',
        })
      }
    },
    del(index) {
      if (this.notifications.length > 1) {
        this.notifications.splice(index, 1)
      } else {
        alert('削除できません。\n通知先は必ず1つ以上登録してください。')
      }
    },
    sort() {
      this.notifications = JSON.parse(JSON.stringify(this.reset_notifications))
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
  border: solid #ddcccc 0.5px;
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
