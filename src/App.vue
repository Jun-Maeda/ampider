<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <v-layout class="rounded rounded-md">
        <v-app-bar scroll-threshold="0">
          <v-app-bar-nav-icon v-on:click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Test Vue</v-toolbar-title>
          <div v-show="login">
            <v-btn icon="mdi-account-cog-outline" size="x-large" />
          </div>
          <div v-show="login">
            <!--        <v-btn prepend-icon="mdi-logout" variant="outlined">-->
            <!--          ログアウト-->
            <!--        </v-btn>-->
            <v-btn icon="mdi-logout" size="x-large" @click="signOut" />
          </div>
          <div v-show="!login">
            <!--        <v-btn prepend-icon="mdi-login" variant="outlined">-->
            <!--          ログイン-->
            <!--        </v-btn>-->
            <v-btn icon="mdi-login" size="x-large" />
          </div>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list>
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
          <router-view :username="user.username" />
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
    items: [
      { title: 'Home', to: '/', icon: 'mdi-home' },
      { title: 'chat', to: '/chat', icon: 'mdi-clock' },
      { title: 'admin', to: '/admin', icon: 'mdi-map-marker' },
      { title: 'test', to: '/test', icon: 'mdi-map-marker' },
    ],
    drawer: false,
    links: ['Home', 'About', 'Contact'],
  }),
}
</script>

<style>
@import '@/assets/base.css';
/* @import '@/assets/admin.css'; */
</style>
