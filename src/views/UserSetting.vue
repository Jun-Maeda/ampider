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
    <!-- <h2>連絡先情報</h2> -->
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
        <h4>個人設定</h4>
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
            <b>所属拠点住所</b>
          </v-col>

          <v-col cols="12" sm="10" class="py-0 py-sm-3">{{ my_area }} </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" sm="2" class="py-0 py-sm-3">
            <b>追加住所</b>
          </v-col>

          <v-col cols="12" sm="10" class="py-0 py-sm-3">
            <v-select v-model="addresses" :items="my_pref_lists" multiple clearable chips style="max-width: 500px" density="compact"></v-select>
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
                      <v-container v-if="element.type === 1" class="px-0 pb-0 pt-1">
                        <v-autocomplete
                          label="国"
                          :items="international_num"
                          item-title="name"
                          item-value="code"
                          v-model="element.international_num"
                          density="compact"
                          hide-details=""
                          :rules="[all_rules.select]"
                        />
                      </v-container>
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
              <p class="ma-sm-0">連絡方法</p>
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

        <v-row class="my-3" justify="end">
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

const international_num = [
  { name: 'アイスランド', code: '354', english_name: 'Iceland' },
  { name: 'アイルランド', code: '353', english_name: 'Ireland' },
  { name: 'アゼルバイジャン', code: '994', english_name: 'Azerbaijan' },
  { name: 'アッセンション', code: '247', english_name: 'Ascension Island' },
  { name: 'アフガニスタン', code: '93', english_name: 'Afghanistan' },
  { name: 'アメリカ', code: '1', english_name: 'United States (USA)' },
  { name: 'アメリカンサモア', code: '1', english_name: 'American Samoa' },
  { name: 'アラブ首長国連邦', code: '971', english_name: 'United Arab Emirates (UAE)' },
  { name: 'アルジェリア', code: '213', english_name: 'Algeria' },
  { name: 'アルゼンティン', code: '54', english_name: 'Argentina' },
  { name: 'アルバ', code: '297', english_name: 'Aruba' },
  { name: 'アルバニア', code: '355', english_name: 'Albania' },
  { name: 'アルメニア', code: '374', english_name: 'Armenia' },
  { name: 'アンギラ', code: '1', english_name: 'Anguilla' },
  { name: 'アンゴラ', code: '244', english_name: 'Angola' },
  { name: 'アンティグアバーブーダ', code: '1', english_name: 'Antigua & Barbuda' },
  { name: 'アンドラ', code: '376', english_name: 'Andorra' },
  { name: 'イエメン', code: '967', english_name: 'Yemen' },
  { name: 'イギリス', code: '44', english_name: 'UK' },
  { name: 'イスラエル', code: '972', english_name: 'Israel' },
  { name: 'イタリア', code: '39', english_name: 'Italy' },
  { name: 'イラク', code: '964', english_name: 'Iraq' },
  { name: 'イラン', code: '98', english_name: 'Iran' },
  { name: 'インド', code: '91', english_name: 'India' },
  { name: 'インドネシア', code: '62', english_name: 'Indonesia' },
  { name: 'ウェーク島', code: '808', english_name: 'Wake Island' },
  { name: 'ウオリスフチュナ', code: '681', english_name: 'Wallis & Futuna' },
  { name: 'ウガンダ', code: '256', english_name: 'Uganda' },
  { name: 'ウクライナ', code: '380', english_name: 'Ukraine' },
  { name: 'ウズベキスタン', code: '998', english_name: 'Uzbekistan' },
  { name: 'ウルグアイ', code: '598', english_name: 'Uruguay' },
  { name: 'エクアドル', code: '593', english_name: 'Ecuador' },
  { name: 'エジプト', code: '20', english_name: 'Egypt' },
  { name: 'エストニア', code: '372', english_name: 'Estonia' },
  { name: 'エチオピア', code: '251', english_name: 'Ethiopia' },
  { name: 'エリトリア', code: '291', english_name: 'Eritrea' },
  { name: 'エルサルヴァドル', code: '503', english_name: 'El Salvador' },
  { name: 'オーストラリア', code: '61', english_name: 'Australia' },
  { name: 'オーストリア', code: '43', english_name: 'Austria' },
  { name: 'オマーン', code: '968', english_name: 'Oman' },
  { name: 'オランダ', code: '31', english_name: 'Netherlands' },
  { name: 'オランダ領アンティル', code: '599', english_name: 'Netherlands Antilles' },
  { name: 'ガーナ', code: '233', english_name: 'Ghana' },
  { name: 'ガイアナ', code: '592', english_name: 'Guyana' },
  { name: 'カザフスタン', code: '7', english_name: 'Kazakhstan' },
  { name: 'カタル', code: '974', english_name: 'Qatar' },
  { name: 'カナダ', code: '1', english_name: 'Canada' },
  { name: 'カボヴェルテ', code: '238', english_name: 'Cape Verde Islands' },
  { name: 'ガボン', code: '241', english_name: 'Gabon' },
  { name: 'カメルーン', code: '237', english_name: 'Cameroon' },
  { name: '韓国', code: '82', english_name: 'Korea, South' },
  { name: 'ガンビア', code: '220', english_name: 'Gambia' },
  { name: 'カンボジア', code: '855', english_name: 'Cambodia' },
  { name: '北朝鮮', code: '850', english_name: 'Korea, North' },
  { name: '北マリアナ諸島（サイパン、ロタ、ティニアン）', code: '1', english_name: 'Northern Mariana Islands (Saipan, Rota, Tinian)' },
  { name: 'ギニア', code: '224', english_name: 'Guinea' },
  { name: 'ギニアビサオ', code: '245', english_name: 'Guinea Bissau' },
  { name: 'キプロス', code: '357', english_name: 'Cyprus' },
  { name: 'キューバ', code: '53', english_name: 'Cuba' },
  { name: 'ギリシャ', code: '30', english_name: 'Greece' },
  { name: 'キリバス', code: '686', english_name: 'Kiribati' },
  { name: 'キルギス', code: '996', english_name: 'Kyrgyz Republic' },
  { name: 'グアテマラ', code: '502', english_name: 'Guatemala' },
  { name: 'グアデルーペ', code: '590', english_name: 'Guadeloupe' },
  { name: 'グアム', code: '1', english_name: 'Guam' },
  { name: 'クウェイト', code: '965', english_name: 'Kuwait' },
  { name: 'クック諸島', code: '682', english_name: 'Cook Islands' },
  { name: 'グリーンランド', code: '299', english_name: 'Greenland' },
  { name: 'クリスマス島', code: '61', english_name: 'Christmas Island' },
  { name: 'グルジア', code: '995', english_name: 'Georgia' },
  { name: 'グレナダ', code: '1', english_name: 'Grenada' },
  { name: 'クロアチア', code: '385', english_name: 'Croatia' },
  { name: 'ケイマン諸島', code: '1', english_name: 'Cayman Islands' },
  { name: 'ケニア', code: '254', english_name: 'Kenya' },
  { name: 'コートジボワール', code: '225', english_name: 'Ivory Coast' },
  { name: 'ココス諸島', code: '61', english_name: 'Cocos Keeling Islands' },
  { name: 'コスタリカ', code: '506', english_name: 'Costa Rica' },
  { name: 'コモロ', code: '269', english_name: 'Comoros' },
  { name: 'コロンビア', code: '57', english_name: 'Colombia' },
  { name: 'コンゴ', code: '242', english_name: 'Congo' },
  { name: 'コンゴー民主共和国（旧ザイール）', code: '243', english_name: 'Congo DPR (former Zaire)' },
  { name: 'サウジアラビア', code: '966', english_name: 'Saudi Arabia' },
  { name: 'サモア', code: '685', english_name: 'Samoa' },
  { name: 'サントメプリンシペ', code: '239', english_name: 'Sao Tome' },
  { name: 'ザンビア', code: '260', english_name: 'Zambia' },
  { name: 'サンピエールミクロン島', code: '508', english_name: 'St. Pierre & Miquelon' },
  { name: 'サンマリノ', code: '378', english_name: 'San Marino' },
  { name: 'シエラレオーネ', code: '232', english_name: 'Sierra Leone' },
  { name: 'ジブティ', code: '253', english_name: 'Djibouti' },
  { name: 'ジブラルタル', code: '350', english_name: 'Gibraltar' },
  { name: 'ジャマイカ', code: '1', english_name: 'Jamaica' },
  { name: 'シリア', code: '963', english_name: 'Syria' },
  { name: 'シンガポール', code: '65', english_name: 'Singapore' },
  { name: 'ジンバブエ', code: '263', english_name: 'Zimbabwe' },
  { name: 'スーダン', code: '249', english_name: 'Sudan' },
  { name: 'スイス', code: '41', english_name: 'Switzerland' },
  { name: 'スウェーデン', code: '46', english_name: 'Sweden' },
  { name: 'スペイン', code: '34', english_name: 'Spain' },
  { name: 'スリナム', code: '597', english_name: 'Suriname' },
  { name: 'スリランカ', code: '94', english_name: 'Sri Lanka' },
  { name: 'スロヴァキア', code: '421', english_name: 'Slovakia' },
  { name: 'スロヴェニア', code: '386', english_name: 'Slovenia' },
  { name: 'スワジランド', code: '268', english_name: 'Swaziland' },
  { name: 'セイシェル', code: '248', english_name: 'Seychelles' },
  { name: '赤道ギニア', code: '240', english_name: 'Equatorial Guinea' },
  { name: 'セネガル', code: '221', english_name: 'Senegal' },
  { name: 'セルビア', code: '381', english_name: 'Serbia' },
  { name: 'セントヴィンセントおよびグレナディーン諸島', code: '1', english_name: 'St. Vincent & Grenadines' },
  { name: 'セントキットス（セントクリストファー）ネイビズ', code: '1', english_name: 'St. Kitts (St. Christopher) & Nevis' },
  { name: 'セントヘレナ', code: '290', english_name: 'St. Helena' },
  { name: 'セントルシア', code: '1', english_name: 'St. Lucia' },
  { name: 'ソマリア', code: '252', english_name: 'Somalia' },
  { name: 'ソロモン諸島', code: '677', english_name: 'Solomon Islands' },
  { name: 'タークスカイコス諸島', code: '1', english_name: 'Turks & Caicos Islands' },
  { name: 'タイ', code: '66', english_name: 'Thailand' },
  { name: '台湾', code: '886', english_name: 'Taiwan' },
  { name: 'タジキスタン', code: '992', english_name: 'Tajikistan' },
  { name: 'タンザニア', code: '255', english_name: 'Tanzania' },
  { name: 'チェコ', code: '420', english_name: 'Czech Republic' },
  { name: 'チャド', code: '235', english_name: 'Chad' },
  { name: '中央アフリカ共和国', code: '236', english_name: 'Central African Republic' },
  { name: '中国', code: '86', english_name: 'China' },
  { name: 'チリ', code: '56', english_name: 'Chile' },
  { name: 'ツバル', code: '688', english_name: 'Tuvalu' },
  { name: 'ディエゴガルシア', code: '246', english_name: 'Diego Garcia' },
  { name: 'チュニジア', code: '216', english_name: 'Tunisia' },
  { name: 'デンマーク', code: '45', english_name: 'Denmark' },
  { name: 'トーゴー', code: '228', english_name: 'Togo' },
  { name: 'ドイツ', code: '49', english_name: 'Germany' },
  { name: 'トケラウ諸島', code: '690', english_name: 'Tokelau' },
  { name: 'ドミニカ', code: '1', english_name: 'Dominica' },
  { name: 'ドミニカ共和国', code: '1', english_name: 'Dominican Republic' },
  { name: 'トリスタンダクーニャ', code: '290', english_name: 'Tristan da Cunha' },
  { name: 'トリニダッドトバゴ', code: '1', english_name: 'Trinidad & Tobago' },
  { name: 'トルクメニスタン', code: '993', english_name: 'Turkmenistan' },
  { name: 'トルコ', code: '90', english_name: 'Turkey' },
  { name: 'トンガ', code: '676', english_name: 'Tonga' },
  { name: 'ナイジェリア', code: '234', english_name: 'Nigeria' },
  { name: 'ナウル', code: '674', english_name: 'Nauru' },
  { name: 'ナミビア', code: '264', english_name: 'Namibia' },
  { name: 'ニウェ', code: '683', english_name: 'Niue Island' },
  { name: 'ニカラグア', code: '505', english_name: 'Nicaragua' },
  { name: 'ニジェール', code: '227', english_name: 'Niger' },
  { name: '日本', code: '81', english_name: 'Japane' },
  { name: 'ニューカレドニア', code: '687', english_name: 'New Caledonia' },
  { name: 'ニュージーランド', code: '64', english_name: 'New Zealand' },
  { name: 'ネパール', code: '977', english_name: 'Nepal' },
  { name: 'ノーフォーク島', code: '672', english_name: 'Norfolk Island' },
  { name: 'ノルウェー', code: '47', english_name: 'Norway' },
  { name: 'バージン諸島（英領）', code: '1', english_name: 'British Virgin Islands' },
  { name: 'バージン諸島（米領）', code: '1', english_name: 'US Virgin Islands' },
  { name: 'ハイティ', code: '509', english_name: 'Haiti' },
  { name: 'パキスタン', code: '92', english_name: 'Pakistan' },
  { name: 'バチカン', code: '39, 379', english_name: 'Vatican City' },
  { name: 'パナマ', code: '507', english_name: 'Panama' },
  { name: 'バヌアツ', code: '678', english_name: 'Vanuatu' },
  { name: 'バハマ', code: '1', english_name: 'Bahamas' },
  { name: 'バハレーン', code: '973', english_name: 'Bahrain' },
  { name: 'パプアニューギニア', code: '675', english_name: 'Papua New Guinea' },
  { name: 'バミューダ', code: '1', english_name: 'Bermuda' },
  { name: 'パラオ', code: '680', english_name: 'Palau' },
  { name: 'パラグアイ', code: '595', english_name: 'Paraguay' },
  { name: 'バルバドス', code: '1', english_name: 'Barbados' },
  { name: 'パレスチナ', code: '970', english_name: 'Palestine' },
  { name: 'ハンガリー', code: '36', english_name: 'Hungary' },
  { name: 'バングラディッシュ', code: '880', english_name: 'Bangladesh' },
  { name: '東ティモール', code: '670', english_name: 'East Timor' },
  { name: 'ブータン', code: '975', english_name: 'Bhutan' },
  { name: 'フィージー', code: '679', english_name: 'Fiji Islands' },
  { name: 'フィリピン', code: '63', english_name: 'Philippines' },
  { name: 'フィンランド', code: '358', english_name: 'Finland' },
  { name: 'フェアロ諸島', code: '298', english_name: 'Faroe Islands' },
  { name: 'プエルトルコ', code: '1', english_name: 'Puerto Rico' },
  { name: 'フォークランド諸島', code: '500', english_name: 'Falkland Islands (Malvinas)' },
  { name: 'ブラジル', code: '55', english_name: 'Brazil' },
  { name: 'フランス', code: '33', english_name: 'France' },
  { name: 'フランス領アンティル（グアドループ島）', code: '590', english_name: 'French Antilles (Guadeloupe, St. Barthelemy, St. Martin)' },
  { name: 'フランス領ギアナ', code: '594', english_name: 'French Guiana' },
  { name: 'フランス領ポリネシア', code: '689', english_name: 'French Polynesia' },
  { name: 'ブルガリア', code: '359', english_name: 'Bulgaria' },
  { name: 'ブルキナファソ', code: '226', english_name: 'Burkina Faso' },
  { name: 'ブルネイ', code: '673', english_name: 'Brunei' },
  { name: 'ブルンジ', code: '257', english_name: 'Burundi' },
  { name: 'ベトナム', code: '84', english_name: 'Vietnam' },
  { name: 'ベナン', code: '229', english_name: 'Benin' },
  { name: 'ベネズエラ', code: '58', english_name: 'Venezuela' },
  { name: 'ベラルーシ', code: '375', english_name: 'Belarus' },
  { name: 'ベリーズ', code: '501', english_name: 'Belize' },
  { name: 'ペルー', code: '51', english_name: 'Peru' },
  { name: 'ベルギー', code: '32', english_name: 'Belgium' },
  { name: 'ポーランド', code: '48', english_name: 'Poland' },
  { name: 'ボスニアヘルツェゴヴィナ', code: '387', english_name: 'Bosnia-Herzegovina' },
  { name: 'ボツワナ', code: '267', english_name: 'Botswana' },
  { name: 'ボリヴィア', code: '591', english_name: 'Bolivia' },
  { name: 'ポルトガル', code: '351', english_name: 'Portugal' },
  { name: '香港', code: '852', english_name: 'Hong Kong' },
  { name: 'ホンデュラス', code: '504', english_name: 'Honduras' },
  { name: 'マーシャル諸島', code: '692', english_name: 'Marshall Islands' },
  { name: 'マカオ', code: '853', english_name: 'Macao' },
  { name: 'マケドニア', code: '389', english_name: 'Macedonia' },
  { name: 'マダガスカル', code: '261', english_name: 'Madagascar' },
  { name: 'マヨット', code: '269', english_name: 'Mayotte' },
  { name: 'マラウイ', code: '265', english_name: 'Malawi' },
  { name: 'マリ', code: '223', english_name: 'Mali' },
  { name: 'マルタ', code: '356', english_name: 'Malta' },
  { name: 'マルチニーク島', code: '596', english_name: 'Martinique' },
  { name: 'マレーシア', code: '60', english_name: 'Malaysia' },
  { name: 'ミクロネシア連邦', code: '691', english_name: 'Micronesia' },
  { name: '南アフリカ', code: '27', english_name: 'South Africa' },
  { name: 'ミャンマー', code: '95', english_name: 'Myanmar' },
  { name: 'メキシコ', code: '52', english_name: 'Mexico' },
  { name: 'モーリシャス', code: '230', english_name: 'Mauritius' },
  { name: 'モーリタニア', code: '222', english_name: 'Mauritania' },
  { name: 'モザンビーク', code: '258', english_name: 'Mozambique' },
  { name: 'モナコ', code: '377', english_name: 'Monaco' },
  { name: 'モルディブ', code: '960', english_name: 'Maldives' },
  { name: 'モルドヴァ', code: '373', english_name: 'Moldova' },
  { name: 'モロッコ', code: '212', english_name: 'Morocco' },
  { name: 'モンゴル', code: '976', english_name: 'Mongolia' },
  { name: 'モンテネグロ', code: '382', english_name: 'Montenegro' },
  { name: 'モントセルラット', code: '1', english_name: 'Montserrat' },
  { name: 'ヨルダン', code: '962', english_name: 'Jordan' },
  { name: 'ラオス', code: '856', english_name: 'Laos' },
  { name: 'ラトヴィア', code: '371', english_name: 'Latvia' },
  { name: 'リトアニア', code: '370', english_name: 'Lithuania' },
  { name: 'リビア', code: '218', english_name: 'Libya' },
  { name: 'リヒテンシュタイン', code: '423', english_name: 'Liechtenstein' },
  { name: 'リベリア', code: '231', english_name: 'Liberia' },
  { name: 'ルーマニア', code: '40', english_name: 'Romania' },
  { name: 'ルクセンブルグ', code: '352', english_name: 'Luxembourg' },
  { name: 'ルワンダ', code: '250', english_name: 'Rwanda' },
  { name: 'レソト', code: '266', english_name: 'Lesotho' },
  { name: 'レバノン', code: '961', english_name: 'Lebanon' },
  { name: 'レユニオン', code: '262', english_name: 'Reunion Island' },
  { name: 'ロシア', code: '7', english_name: 'Russia' },
]

export default {
  components: {
    draggable: draggable,
  },
  data: () => ({
    link: [
      {
        title: '連絡先情報',
        disabled: false,
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
    my_pref_lists: [],
    my_area: '',
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
    international_num: international_num,
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
    this.my_pref_lists = JSON.parse(JSON.stringify(all_prefs))
    this.pref_lists = JSON.parse(JSON.stringify(all_prefs))
    // ここで自分の拠点の都道府県を取得
    this.my_area = '山形県'
    // 都道府県があればその都道府県を選択から除外
    if (this.my_area.length > 0) {
      let index = this.my_pref_lists.indexOf(this.my_area)
      this.my_pref_lists.splice(index, 1)
    }

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
        international_num: '81',
      },
      {
        type: 1,
        content: '0120333906',
        international_num: '81',
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
      } else {
        alert('入力内容にエラーがあります。確認してください')
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
.list-group {
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
