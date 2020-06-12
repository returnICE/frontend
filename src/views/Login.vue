<template>
  <div :class="{'login':!ent,'login-ent':ent}">
    <div id="login_bg">
      <div class="row justify-content-center">
          <div>
            <img v-if="!ent" src="../assets/login_page/logo.png" style="width:215px"  id="logo" />
            <img v-else src="../assets/login_page/logoEnt.png"  style="width:215px" id="logo" />
          </div>
        <div class="mt-4">
          <button class="d-flex btn rounded-pill my-2" @click="ent=!ent" v-bind:class="{ 'btn-custom': !ent}"> 음식점용</button>
          <button class="d-flex btn rounded-pill my-2" @click="ent=!ent" v-bind:class="{ 'btn-custom-ent': ent}"> 기업용</button>
        </div>
      </div>
      <div id="login_container">
        <div class="input_row">
          <input
            v-if="!ent"
            type="text"
            v-model="sellerId"
            id="textbox_id"
            placeholder="ID"
            autocomplete="on"
          />
          <input
            v-else
            type="text"
            v-model="enterpriseId"
            id="textbox_id"
            placeholder="ID"
            autocomplete="on"
          />
        </div>
        <div class="input_row">
          <input type="password" v-model="pw" id="textbox_pw" placeholder="PW" />
        </div>
          <div class="col-12 justify-content-center">
            <button v-if="!ent" v-on:click="login(sellerId,pw,'seller')" class="mt-4 btn  col-11 btn-custom rounded-pill">로그인</button>
          <button v-else v-on:click="login(enterpriseId,pw,'enterprise')" class="mt-4 btn  col-11 btn-custom-ent rounded-pill">로그인</button>
          <button v-on:click="ent?signUpEntertprise():signUp()" class="mt-2 btn col-11  rounded-pill" :class="{'btn-custom':!ent, 'btn-custom-ent':ent}">회원가입</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      sellerId: '',
      enterpriseId: '',
      pw: '',
      ent: false
    }
  },
  created () {
    if (this.$route.params.sellerId) {
      this.sellerId = this.$route.params.sellerId
    } else if (this.$route.params.enterpriseId) {
      this.ent = true
      this.enterpriseId = this.$route.params.enterpriseId
    }
  },
  methods: {
    signUp: function () {
      window.location.href = '/signUp'
    },
    signUpEntertprise: function () {
      window.location.href = '/signUpEnt'
    },
    login: function (id, pw, type) {
      this.$store
        .dispatch('LOGIN', { id, pw, type })
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
