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
    <!-- <h2>ユーザー追加</h2> -->
    <div class="mt-8">
      <v-expansion-panels class="mb-3">
        <v-expansion-panel title="ファイルアップロード">
          <v-expansion-panel-text>
            <v-row justify="end" class="mt-3">
              <v-btn v-on:click="downloadCSV()" variant="text" class="pt-0"><v-icon> mdi-download </v-icon>フォーマットダウンロード</v-btn>
            </v-row>
            <v-form ref="file_form" class="mt-3">
              <v-row>
                <v-col cols="12" class="py-0 py-sm-3">
                  <v-file-input
                    v-model="import_file"
                    label="csvファイルを選択してください"
                    density="compact"
                    :rules="[all_rules.select, all_rules.file_rule]"
                    @change="fileChange"
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-divider></v-divider>

              <v-row class="my-3 pr-2" justify="end">
                <v-btn class="" color="primary" @click="file_validate">作成</v-btn>
              </v-row>

              <v-dialog v-model="file_dialog" persistent style="max-width: 800px">
                <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
                <v-card>
                  <v-card-title class="text-h5">以下のユーザーを追加します</v-card-title>
                  <v-card-text>
                    <v-data-table-virtual :headers="headers" :items="file_users"></v-data-table-virtual>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="file_dialog = false">キャンセル</v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="createForm">作成</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-form>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-expansion-panels>
        <v-expansion-panel title="フォーム入力">
          <v-expansion-panel-text>
            <v-form ref="form" class="mt-8">
              <v-row class="mt-3">
                <v-col cols="12" sm="2" class="py-0 py-sm-3">
                  <p class="ma-sm-0"><b>社員番号*</b></p>
                </v-col>
                <v-col cols="12" sm="10" class="py-0 py-sm-3">
                  <v-text-field v-model="employee_number" density="compact" required style="max-width: 500px" :rules="[all_rules.required]" />
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="2" class="py-0 py-sm-3">
                  <p class="ma-sm-0"><b>名前*</b></p>
                </v-col>
                <v-col cols="12" sm="10" class="py-0 py-sm-3">
                  <v-text-field v-model="user_name" density="compact" required style="max-width: 500px" :rules="[all_rules.required]" />
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-3">
                <v-col cols="12" sm="2" class="py-0 py-sm-3">
                  <p class="ma-sm-0"><b>メールアドレス*</b></p>
                </v-col>
                <v-col cols="12" sm="10" class="py-0 py-sm-3"
                  ><v-text-field v-model="email" density="compact" required style="max-width: 500px" :rules="[all_rules.required, all_rules.email]" />
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="2" class="py-0 py-sm-3">
                  <p class="ma-sm-0"><b>会社*</b></p>
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
                  <p class="ma-sm-0"><b>拠点*</b></p>
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
                  <v-select
                    v-model="organization"
                    :items="organizations"
                    style="max-width: 500px"
                    density="compact"
                    @click="choiceOrganization"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-divider></v-divider>
                <v-col cols="12" sm="2" class="py-0 py-sm-3">
                  <p class="ma-sm-0"><b>役職</b></p>
                </v-col>
                <v-col cols="12" sm="10" class="py-0 py-sm-3">
                  <v-select v-model="job_title" :items="job_titles" style="max-width: 500px" :rules="[all_rules.select]" density="compact"></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="my-3 pr-2" justify="end">
                <v-btn class="" color="primary" @click="validate">作成</v-btn>
              </v-row>
              <v-dialog v-model="dialog" persistent style="max-width: 800px">
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
                      <v-col class="mr-auto" cols="3"> メール：</v-col>
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
                      <v-col class="mr-auto" cols="3"> 役職：</v-col>
                      <v-col class="mr-auto" cols="9"
                        ><span class="mr-2">{{ job_title }}</span>
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
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-row class="my-3 pr-1" justify="end">
        <v-btn class="mr-2" @click="$router.push('/employee_list')">戻る</v-btn>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Encoding from 'encoding-japanese'
export default {
  data: () => ({
    link: [
      {
        title: '従業員一覧',
        disabled: false,
        href: 'employee_list',
      },
      {
        title: 'ユーザー追加',
        disabled: true,
      },
    ],
    all_rules: {
      required: (value) => !!value || '入力してください',
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/.test(value) || 'メールアドレスの形式が正しくありません',
      phone: (value) =>
        // eslint-disable-next-line no-useless-escape
        /^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/.test(value.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi, '')) || '電話番号の形式が正しくありません',
      max: (value) => (value && value.length <= 100) || '100文字以下で入力してください',
      select: (value) => (value && value.length > 0) || '選択してください',
      zipcode: (value) => /^\d{7}$/.test(value) || 'ハイフンを除く半角数字7桁で郵便番号を入力してください',
      file_rule: (value) => (value && /^.*\.(csv)$/.test(value[0].name)) || 'この拡張子は変換できません。CSVファイルを選択してください ',
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
    file_dialog: false,
    file_users: [],
    headers: [
      { title: '社員番号', key: 'employee_num', width: '200', minWidth: '150' },
      { title: '名前', key: 'name', width: '300', minWidth: '100' },
      { title: 'メールアドレス', key: 'mail', width: '400', minWidth: '200' },
      { title: '会社', key: 'company', width: '400', minWidth: '200' },
      { title: '拠点', key: 'area', width: '400', minWidth: '200' },
      { title: '事業部', key: 'division', width: '400', minWidth: '200' },
      { title: '所属', key: 'organization', width: '400', minWidth: '200' },
      { title: '役職', key: 'job_title', width: '400', minWidth: '200' },
    ],
    csv_headers: [],
    import_file: null,
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
    this.job_titles = ['MG-1', 'SV-1', 'A-1']
  },
  methods: {
    // 作成ボタンを押したときのバリデーションチェック
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.dialog = true
      }
    },
    fileChange(e) {
      this.file_users = []
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsText(file, 'Shift_JIS')

      const loadFunc = () => {
        const lines_contents = reader.result.split('\n')
        let lines = lines_contents.filter(function (s) {
          return s !== ''
        })
        console.log(lines)

        for (let line in lines) {
          const workerData = lines[line].split(',')
          console.log(workerData.length)
          if (workerData.length == 1) {
            alert('不正なCSVファイルです。コンマ区切りのCSVに変換してください。')
            this.import_file = null
            return workerData
          } else if (line == 0) {
            this.csv_headers = line
          } else if (!workerData[1] || !workerData[2] || !workerData[3] || !workerData[7]) {
            alert('必須項目に未入力の登録があります。ファイルを再度確認してください。')
            this.import_file = null
            return workerData
          } else {
            const worker = {
              employee_num: workerData[0],
              name: workerData[1],
              mail: workerData[2],
              company: workerData[3],
              area: workerData[4],
              division: workerData[5],
              organization: workerData[6],
              job_title: workerData[7],
            }
            this.file_users.push(worker)
          }
        }
      }

      reader.onload = loadFunc

      reader.readAsBinaryString(file)
      console.log(this.file_users)
    },
    async file_validate() {
      const { valid } = await this.$refs.file_form.validate()

      if (valid) {
        this.file_dialog = true
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
    downloadCSV() {
      // var csv = '\ufeff' + '社員番号*,名前*, メールアドレス*, 会社*, 拠点,事業部, 所属,役職*\n'
      // let bom = new Uint8Array([0xef, 0xbb, 0xbf])
      // let blob = new Blob([bom, csv], { type: 'text/csv;charset=utf-8' })
      // let link = document.createElement('a')

      // link.href = window.URL.createObjectURL(blob)
      // link.download = 'user_format.csv'
      // link.click()

      // SHIFT-JISにエンコード
      const csvData = [['社員番号*,名前*, メールアドレス*, 会社*, 拠点,事業部, 所属,役職*']].map((row) => row.join(',')).join('\r\n')
      const sjisData = Encoding.convert(csvData, { to: 'SJIS', from: 'UNICODE', type: 'arraybuffer' })

      // 先にUint16ArrayからUint8Arrayに変換する
      const uint8Array = new Uint8Array(sjisData)
      // Blobでデータを作成
      const blob = new Blob([uint8Array], { type: 'text/csv;charset=shift-jis;' })

      // ダウンロードリンクを作成
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'export.csv'
      link.click()
    },
  },
}
</script>
