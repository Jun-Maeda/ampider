<script setup>
import { disasterDetailStore } from '@/stores/disaster'
</script>
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
    <!-- <div class="mt-4">
      <h2>過去の災害詳細</h2>
    </div> -->
    <div class="mt-8">
      <p class="text-h5">{{ disaster_detail.title }}</p>
      <v-card class="my-auto" color="#EEEEEE" variant="flat" min-height="400">
        <v-card-item>
          <p class="text-subtitle-1">詳細</p>
          <p class="text-body-1">{{ disaster_detail.description }}</p>
        </v-card-item>
      </v-card>
    </div>
    <v-row justify="end" class="mt-5">
      <v-btn class="mr-2" @click="$router.back()">戻る</v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    link: [
      {
        title: '過去の災害一覧',
        disabled: false,
        href: 'disaster_list',
      },
      {
        title: '過去の災害詳細',
        disabled: true,
        href: 'disaster_detail',
      },
    ],
    disaster_detail: {},
    dialogDelete: false,
    disaster_store: disasterDetailStore(),
  }),
  mounted() {
    let disaster_data = this.disaster_store.disaster_data
    console.log(disaster_data)

    // ストアにデータが入っていなければ一覧にリダイレクト
    if (disaster_data === null) {
      // 災害一覧へリダイレクト
      this.$router.replace({
        name: 'disaster_list',
      })
    } else {
      this.disaster_detail = disaster_data
    }
  },
  methods: {},
}
</script>
