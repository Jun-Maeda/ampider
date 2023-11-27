<template>
  <v-container>
    <div class="home">
      <h1>Welcome to Ampder , {{ user.username }} !</h1>
      <img src="@/images/Ampider_logo.jpg" />
    </div>
  </v-container>
</template>

<script>
// import admin from '@/components/Admin.vue'
export default {
  // components : {
  //   admin
  // },
  props: {
    user: Object,
  },
}
</script>
