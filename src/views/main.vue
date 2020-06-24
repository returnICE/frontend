<template>
    <div id = "main">
        <div id = "top">
          <img src='../assets/login_page/logo.png' class="logo"/>
          <button v-on:click = "logout" id = "logout"></button>
        </div>
        <div id = "side" style="z-index: 1000;">
            <button v-on:click = "sideclick('customer')" class = "side_btn" id = "btn_customer"></button>
            <button v-on:click = "sideclick('data')" class = "side_btn" id = "btn_data"></button>
            <button v-on:click = "sideclick('campain')" class = "side_btn" id = "btn_campain"></button>
            <button v-on:click = "sideclick('product')" class = "side_btn" id = "btn_product"></button>
            <button v-on:click = "sideclick('log')" class = "side_btn" id = "btn_log"></button>
            <button v-on:click = "sideclick('manage')" class = "side_btn" id = "btn_manage"></button>
        </div>
        <div id = "component">
            <div v-if = "mode == 'customer'">
                <customer></customer>
            </div>
            <div v-if = "mode == 'data'">
                <Data></Data>
            </div>
            <div v-if = "mode == 'campain'">
                <campain></campain>
            </div>
            <div v-if = "mode == 'product'">
                <product></product>
            </div>
            <div v-if = "mode == 'log'">
                <log></log>
            </div>
            <div v-if = "mode == 'manage'">
                <manage></manage>
            </div>
        </div>
    </div>
</template>
<script>
import Customer from '../components/Customer/customer.vue'
import Data from '../components/Data/data.vue'
import Product from '../components/Product/product.vue'
import Log from '../components/Log/log.vue'
import Manage from '../components/Manage/manage.vue'
import Campain from '../components/Campain/campain.vue'

export default {
  components: {
    Customer,
    Campain,
    Data,
    Product,
    Log,
    Manage
  },
  data: function () {
    return {
      mode: 'customer'
    }
  },
  methods: {
    logout: function () {
      this.$store
        .dispatch('LOGOUT', {})
        .then(() => {
          alert('로그아웃 되었습니다.')
        })
        .catch(({ message }) => {
          this.msg = message
        })
    },
    sideclick: function (message) {
      var customerBtn = document.getElementById('btn_customer')
      var dataBtn = document.getElementById('btn_data')
      var campainBtn = document.getElementById('btn_campain')
      var productBtn = document.getElementById('btn_product')
      var logBtn = document.getElementById('btn_log')
      var manageBtn = document.getElementById('btn_manage')
      customerBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_customer.png') + ')'
      dataBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_data.png') + ')'
      campainBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_campain.png') + ')'
      productBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_product.png') + ')'
      logBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_log.png') + ')'
      manageBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_manage.png') + ')'
      this.mode = message
      if (this.mode === 'customer') {
        customerBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_customer_select.png') + ')'
      }
      if (this.mode === 'data') {
        dataBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_data_select.png') + ')'
      }
      if (this.mode === 'campain') {
        campainBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_campain_select.png') + ')'
      }
      if (this.mode === 'product') {
        productBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_product_select.png') + ')'
      }
      if (this.mode === 'log') {
        logBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_log_select.png') + ')'
      }
      if (this.mode === 'manage') {
        manageBtn.style.backgroundImage = 'url(' + require('../assets/side_bar/btn_manage_select.png') + ')'
      }
    }
  }
}
</script>
<style src = "./main.css" scoped>
</style>
