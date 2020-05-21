<template>
  <div class="login">
    <div id="login_bg">
      <img src="../assets/login_page/logo.png" id="logo" />
      <div id="login_container">
        <div class="input_row">
          ID
          <input
            type="text"
            v-model="sellerId"
            id="textbox_id"
            placeholder="ID"
            autocomplete="on"
          />
        </div>
        <div class="input_row">
          PW
          <input type="password" v-model="pw" id="textbox_pw" placeholder="PW" />
        </div>
        <button v-on:click="login(sellerId,pw)" id="btn_login" />
        <button v-on:click="signUp" id="btn_signup"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      sellerId: '',
      pw: ''
    }
  },
  created () {
    if (this.$route.params.sellerId) { this.sellerId = this.$route.params.sellerId }
  },
  methods: {
    signUp: function () {
      window.location.href = '/signUp'
    },
    login: function (sellerId, pw) {
      this.$store
        .dispatch('LOGIN', { sellerId, pw })
        .then(() => {})
        .catch(({ message }) => {
          this.msg = message
        })
    }
  }
}
</script>
<style src = "./login.css" scoped>
</style>
