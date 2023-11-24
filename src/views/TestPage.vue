<template>
  <v-container>
    <v-row>
      <v-col cols="7" class="">
        <v-text-field class="mb-3" label="名前" hide-details="auto" :rules="[rules.required]" />

        <v-text-field class="mb-3" label="パスワード" type="input" hint="パスワードを入力してください" />
        <v-file-input multiple show-size counter label="ファイルを選択してください" />
        <v-select :items="['items', 'items2', 'items3', 'items4']" label="選択してください" required></v-select>

        <v-autocomplete
          :items="[
            { id: 1, name: 'user1' },
            { id: 2, name: 'user2' },
            { id: 3, name: 'user3' },
          ]"
          label="検索して選択してください"
          required
          v-model="autocomp"
          :item-props="itemProps"
        ></v-autocomplete>
        <v-text-field label="日付と時間" type="datetime-local" />
        <v-text-field label="日付" type="date" />

        <v-text-field label="時間" type="time" />
      </v-col>
      <v-col cols="7" class="text-right">
        <v-btn type="submit" class="mt-2">送信</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    rules: {
      required: (value) => !!value || 'この項目は必須です',
    },
    dialog: false,
    autocomp: '',
  }),
  methods: {
    itemProps(item) {
      if (item === '') {
        return ''
      } else {
        return {
          title: item.name,
          subtitle: item.id,
          value: item.id,
        }
      }
    },
  },
}
</script>
