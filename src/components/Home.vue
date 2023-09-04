<template>
  <div class="home">
    <h1>
      Welcome to Ampder , {{ username }} !
    </h1>
    <img src="../images/Ampider_logo.jpg">
  </div>
</template>

<script>
export default {
  props: {
    username: String,
  },
};
</script>
