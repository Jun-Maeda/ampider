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
    <!-- <h2>会社追加</h2> -->
    <div class="mt-8">
      <v-form class="mt-5" ref="form">
        <v-row>
          <v-col cols="12" lg="6">
            <v-text-field v-model="company" label="会社名" required style="max-width: 500px" :rules="rules" density="compact" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-autocomplete
              label="所属拠点"
              v-model="select_areas"
              :items="areas"
              style="max-width: 500px"
              :rules="select_rules"
              density="compact"
              multiple
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <v-row justify="end" style="max-width: 510px">
              <v-btn class="mr-2" @click="$router.push('/company_list')">戻る</v-btn>
              <v-btn color="primary" @click="validate">追加</v-btn>
            </v-row>
          </v-col>
          <v-dialog v-model="dialog" persistent width="auto">
            <!-- <template v-slot:activator="{ props }">
              <v-btn @click="validate" color="primary" v-bind="props" >作成</v-btn>
            </template> -->
            <v-card>
              <v-card-title class="text-h5">以下の内容で作成してよろしいですか？</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 会社名：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span class="mr-2">{{ company }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="mr-auto" cols="3"> 所属拠点：</v-col>
                  <v-col class="mr-auto" cols="9"
                    ><span v-for="select_area in select_areas" :key="select_area" class="mr-2">{{ select_area }}</span>
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
    company: null,
    areas: [],
    select_areas: [],
    dialog: false,
    link: [
      {
        title: '会社一覧',
        disabled: false,
        href: 'company_list',
      },
      {
        title: '会社追加',
        disabled: true,
      },
    ],
  }),
  mounted() {
     // ここですべての拠点を取得するためにPIの情報取得
     let get_area_url = 'https://6m84bxbhlg.execute-api.ap-northeast-1.amazonaws.com/' + 'PIPCSPGS'
      this.axios
        .get(get_area_url)
        .then((res) => {
          let get_areas = res.data
          console.log(res.data)
          for (let area in get_areas) {
            this.areas.push(get_areas[area])
          }
        })
        .catch((err) => {
          alert('エラー')
          console.log(err)
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
    createForm() {
      this.dialog = false
      // ここに新規作成処理を記載
      let send_data = {
        company_name: this.company,
        areas: this.select_areas,
      }
      let create_url = 'https://6m84bxbhlg.execute-api.ap-northeast-1.amazonaws.com'
      const config = {
        headers: {
          'Content-type': 'text/plain',
        },
      }

      this.axios
        .post(create_url, send_data, config)
        .then((res) => {
          this.unit_details = res.data
        })
        .catch((err) => {
          alert('作成に失敗しました。')
          console.log(err)
        })

      // 会社一覧へリダイレクト
      this.$router.replace({
        name: 'company_list',
      })

      let success = '会社情報を追加しました。'
      alert(success)

      this.$refs.form.reset()
    },
  },
}
</script>
<style scoped>
.vue-textarea {
  white-space: break-spaces;
}
</style>
