<template>
  <v-container>
    <v-list lines="three">
      <v-list-item v-for="file in files" :key="file.title" :title="file.title" :subtitle="file.subtitle" :to="file.link">
        
        <template v-slot:prepend>
          <v-avatar :color="file.color">
            <v-icon color="white">{{ file.icon }}</v-icon>
          </v-avatar>
        </template>
        <template v-slot:title="{ title }">
          <b v-html="title"></b><p><small>2023/12/01</small></p>
        </template>

        <!-- <template v-slot:append>
          <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn>
        </template> -->
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
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
    files: [
      {
        color: 'blue',
        icon: 'mdi-clipboard-text',
        subtitle: '安否確認のテストです。安否確認フォームを入力して回答してください',
        title: '安否確認テスト',
        link: 'info_Detail',
      },
      {
        color: 'amber',
        icon: 'mdi-gesture-tap-button',
        subtitle: 'あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ',
        title: '安否確認テスト',
      },
    ],
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
    testMethod(){
      alert('test')
    }
  },
}
</script>
