<template>
  <authenticator>
    <!-- 追加 1 -->
    <template v-slot="{ user, signOut }">
      <main>
        <header>
          <h1>Ampider</h1>
          <nav class="nav">
            <ul class="list">
              <li>
                <router-link class="routerLink" to="/">Home</router-link>
              </li>
              <li>
                <router-link class="routerLink" to="/chat">掲示板</router-link>
              </li>
              <li>
                <router-link class="routerLink" to="/admin">管理画面</router-link>
              </li>
            </ul>
          </nav>
          <!-- 追加 2 -->
          <button @click="signOut" class="contact">Sign out</button>
        </header>
        <section>
          <!-- 追加 3 -->
          <v-container>
            <router-view :username="user.username" />
          </v-container>
        </section>
      </main>
      <!-- 追加 4 -->
      <div id="app">
        <upload v-model="picture" />
        <img :src="picture" />
      </div>
    </template>
  </authenticator>
</template>

<script>
import Upload from '@/views/Upload.vue'

export default {
  name: 'app',
  components: {
    Upload,
  },
  data() {
    return {
      picture: null,
    }
  },
}
</script>

<style>
@import '@/assets/base.css';
@import '@/assets/admin.css';
</style>
