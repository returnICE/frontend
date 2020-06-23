<template>
    <div id = "main">
        <div id = "top">
          <img src='../assets/login_page/logoEnt.png' class="logo"/>
          <a href = "../" v-on:click = "logout" id = "logout">로그아웃</a>
        </div>
        <div id = "side" style="z-index: 1000;">
            <button v-on:click = "sideclick('customer')" class = "side_btn" id = "btn_customer"></button>
            <button v-on:click = "sideclick('data')" class = "side_btn" id = "btn_data"></button>
            <button v-on:click = "sideclick('campain')" class = "side_btn" id = "btn_campain"></button>
        </div>
        <div class = "comp">
            <div v-if = "mode == 'customer'">
                <customer></customer>
            </div>
             <div v-if = "mode == 'data'">
                <Search></Search>
            </div>
            <!--<div v-if = "mode == 'campain'">
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
            </div> -->
        </div>
    </div>
</template>
<script>
import Customer from '../components/Enterprise/customer.vue'
import Search from '../components/Enterprise/search.vue'
// import Campain from '../components/campain.vue'
// import Data from '../components/Data/data.vue'
// import Product from '../components/Product/product.vue'
// import Log from '../components/Log/log.vue'
// import Manage from '../components/Manage/manage.vue'

export default {
  components: {
    Customer,
    Search
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
      customerBtn.style.backgroundImage = 'url(' + require('../assets/enterprise/member_btn.png') + ')'
      dataBtn.style.backgroundImage = 'url(' + require('../assets/enterprise/findseller_btn.png') + ')'
      campainBtn.style.backgroundImage = 'url(' + require('../assets/enterprise/contract_btn.png') + ')'
      this.mode = message
      if (this.mode === 'customer') {
        customerBtn.style.backgroundImage = 'url(' + require('../assets/enterprise/member_cbtn.png') + ')'
      }
      if (this.mode === 'data') {
        dataBtn.style.backgroundImage = 'url(' + require('../assets/enterprise/findseller_cbtn.png') + ')'
      }
      if (this.mode === 'campain') {
        campainBtn.style.backgroundImage = 'url(' + require('../assets/enterprise/contract_cbtn.png') + ')'
      }
    }
  }
}
</script>
<style scoped>
#top{
    background : url('../assets/enterprise/tab_background.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    width : 100%;
    height : 90px;
    position: fixed;
    z-index: 1;
}
#main{
    width : 100%;
    height : 100%;
}
#side{
    background : url('../assets/enterprise/virtical_background.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    position : fixed;
    margin-top: 90px;
    width : 180px;
    height : 100%;
}
.side_btn{
    width : 100%;
    height : 70px;
    border : none;
    cursor : pointer;
    outline : 0;
}
#btn_customer{
    background : url('../assets/enterprise/member_cbtn.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
#btn_data{
    background : url('../assets/enterprise/findseller_btn.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
#btn_campain{
    background : url('../assets/enterprise/contract_btn.png');
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
}
.comp{
    /* display : inline-block; */
    position: relative;
    top: 90px;
    margin-left: 200px;
    margin-right: 20px;
    z-index: 0;
}

.text-baemin{
    font-family: bamin;
    src: url('../assets/font/BMHANNAPro.ttf')format('truetype');
}
.logo{
    float:left;
    margin-top : -65px;
}
</style>
