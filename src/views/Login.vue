<template>
  <div class="login">
    <div id = "login_bg">
      <img src = "../assets/login_page/logo.png" id = "logo"/>
      <div id = "login_container" align = "left">
        <div class = "id_container">
        ID <input id = "textbox_id" v-model = "ID" placeholder="ID" autocomplete="on"/>
        </div>
        <div class = "pw_container">
        PW <input id = "textbox_pw" v-model = "PW" placeholder="PW"/>
        </div>
        <img src = "../assets/login_page/btn_login.png" id = "btn_login"/>
        <img src = "../assets/login_page/btn_signup.png" id = "btn_signup"/>
      </div>
    </div>
  </div>
</template>
<style src = "./login.css" scoped>
</style>
