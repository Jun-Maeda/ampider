<template>
    <v-container>
        <p>お知らせ作成ページ</p>
      
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
  