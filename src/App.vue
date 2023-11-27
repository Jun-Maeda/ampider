<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <v-layout class="rounded rounded-md">
        <v-app-bar scroll-threshold="0">
          <v-app-bar-nav-icon v-on:click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Ampider</v-toolbar-title>
          <div v-show="login">
            <v-btn icon="mdi-account-cog-outline" size="x-large" />
          </div>
          <div v-show="login">
            <v-btn icon="mdi-logout" size="x-large" @click="signOut" />
          </div>
          <div v-show="!login">
            <v-btn icon="mdi-login" size="x-large" />
          </div>
        </v-app-bar>

        <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
    >
      <v-list>
        <!-- ホーム -->
        <v-list-item
              value="Home"
              color="primary"
              rounded="xl"
              to="/"
              prepend-icon="mdi-home"
              title="Home"
        ></v-list-item>

        <!-- ユーザー設定 -->
        <v-list-group value="user_settings">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="ユーザー設定"
                prepend-icon="mdi-phone-outgoing"
            >
            </v-list-item>
          </template>
          <v-list-item
              v-for="(user_setting, i) in user_settings"
              v-bind="props"
              :key="i"
              :value="user_setting"
              color="primary"
              rounded="xl"
              :to="user_setting.to"
              :prepend-icon="user_setting.icon"
              :title="user_setting.title"
          >
          </v-list-item>
        </v-list-group>

        <!-- 管理 -->
        <v-list-group value="admin_menus">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="管理"
                prepend-icon="mdi-image-filter-hdr"
            >
            </v-list-item>
          </template>
          <v-list-item
              v-for="(admin_menu, i) in admin_menus"
              v-bind="props"
              :key="i"
              :value="admin_menu"
              color="primary"
              rounded="xl"
              :to="admin_menu.to"
              :prepend-icon="admin_menu.icon"
              :title="admin_menu.title"
          >
          </v-list-item>
        </v-list-group>

        <v-list-item-group>
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              color="primary"
              rounded="xl"
              :to="item.to"
              :prepend-icon="item.icon"
              :title="item.title"
          >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
        <v-main>
          <router-view :user="user" />
        </v-main>
        <v-footer class="bg-grey-lighten-1" app>
          <v-row justify="center" no-gutters>
            <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2 v-col-3 v-col-md-1" rounded="xl">
              {{ link }}
            </v-btn>
            <v-col class="text-center mt-4" cols="12"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong> </v-col>
          </v-row>
        </v-footer>
      </v-layout>
    </template>
  </authenticator>
</template>

<script>
export default {
  data: () => ({
    login: true,
    user_settings: [
      { title: '連絡先情報', to: '', icon: 'mdi-clock' },
      { title: 'テスト', to: '/test', icon: 'mdi-map-marker' },
    ],
    admin_menus: [
      { title: '安否確認結果', to: '/admin', icon: 'mdi-clock' },
      { title: '災害新規作成', to: '', icon: 'mdi-map-marker' },
    ],
    items: [{ title: 'chat', to: '/chat', icon: 'mdi-clock' }],
    drawer: false,
    links: ['Home', 'About', 'Contact'],
  }),
}
</script>

<style>
@import '@/assets/base.css';
/* @import '@/assets/admin.css'; */
</style>
