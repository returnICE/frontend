<template>
  <div class="login">
    <div id = "login_bg">
      <img src = "../assets/login_page/logo.png" id = "logo"/>
      <div id = "login_container">
        <div class = "input_row">
        ID
        <input type = "text" v-model="user.id" id = "textbox_id" placeholder="ID" autocomplete="on"/>
        </div>
        <div class = "input_row">
        PW
        <input type = "password" v-model="user.pw" id = "textbox_pw" placeholder="PW"/>
        </div>
        <button v-on:click = "login" id = "btn_login"/>
        <button v-on:click = "signUp" id="btn_signup"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      user: {
        id: '',
        pw: ''
      }
    }
  },
  methods: {
    signUp: function () {
      window.location.href = '/signUp'
    },
    login: function () {
      this.$http.post('/api/users/login', {
        user: this.user
      }).then(
        (res) => {
          alert(res.data.message)
        })
    }
  }
}
</script>
<style src = "./login.css" scoped>
</style>
