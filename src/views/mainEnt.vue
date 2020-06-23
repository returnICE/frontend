<template>
  <div id="main" class="text-baemin">
    <div id="top">
      <a href="/MainEnt"><img src="../assets/login_page/logoEnt.png"  class="logo" /></a>
    </div>
    <div id="side" style="z-index: 1000;">
      <button @click="mode='customer'" :class="{'btn-clicked':mode=='customer'}" class="side_btn btn-border" id="btn_customer">사원 관리</button>
      <button @click="mode='data'" :class="{'btn-clicked':mode=='data'}" class="side_btn btn-border" id="btn_data">음식점 찾기</button>
      <button @click="mode='log'" :class="{'btn-clicked':mode=='log'}" class="side_btn btn-border" id="btn_log">정산 관리</button>
    </div>
    <div class="comp">
      <div v-if="mode == 'customer'">
        <customer></customer>
      </div>
      <div v-if="mode == 'data'">
        <Search></Search>
      </div>
      <div v-if="mode == 'log'">
        <Log></Log>
      </div>
    </div>
  </div>
</template>
<script>
import Customer from '../components/Enterprise/customer.vue'
import Search from '../components/Enterprise/search.vue'
import Log from '../components/Enterprise/log.vue'
// import Data from '../components/Data/data.vue'
// import Product from '../components/Product/product.vue'
// import Log from '../components/Log/log.vue'
// import Manage from '../components/Manage/manage.vue'

export default {
  components: {
    Customer,
    Search,
    Log
  },
  data: function () {
    return {
      mode: 'customer'
    }
  }
  // methods: {
  //   sideclick: function (message) {
  //     var logBtn = document.getElementById('btn_log')
  //     var customerBtn = document.getElementById('btn_customer')
  //     var dataBtn = document.getElementById('btn_data')
  //     customerBtn.style.backgroundColor = '#F2F2F2'
  //     customerBtn.style.color = '#2E3559'
  //     dataBtn.style.backgroundColor = '#F2F2F2'
  //     dataBtn.style.color = '#2E3559'
  //     logBtn.style.backgroundColor = '#F2F2F2'
  //     logBtn.style.color = '#2E3559'
  //     this.mode = message
  //     if (this.mode === 'customer') {
  //       customerBtn.style.backgroundColor = '#2E3559'
  //       customerBtn.style.color = '#FFF'
  //       customerBtn.style.borderLeft = '2em solid #DAD4DF'
  //     }
  //     if (this.mode === 'data') {
  //       dataBtn.class
  //     }
  //     if (this.mode === 'log') {
  //       logBtn.style.backgroundColor = '#2E3559'
  //       logBtn.style.color = '#FFF'
  //       logBtn.style.borderLeft = '2em solid #DAD4DF'
  //     }
  //   }
  // }
}
</script>
<style scoped>
#top {
  width: 100%;
  height: 90px;
  background: #ededef;
  position: fixed;
  box-shadow: 0px 5px 5px #ddd;
  z-index: 1;
}
#main {
  /* width: 100%; */
  background: #f5f6f8;
  height: 100%;
}
#side {
  background: #f2f2f2;
  position: fixed;
  box-shadow: 3px 0px 5px #ddd;
  margin-top: 90px;
  width: 180px;
  height: 100%;
  font-size: 1.2em;
}
.side_btn {
  width: 100%;
  height: 70px;
  border: none;
  cursor: pointer;
  outline: 0;
}
.comp {
  /* display : inline-block; */
  /* position: relative; */
  padding-top: 90px;
  margin-left: 180px;
  height: 100%;
  /* min-height: 100%; */
  /* margin-top: 90px; */
  overflow: auto;
  z-index: 0;
}
/* #btn_customer{
  background-color: #2E3559;
  color: #FFF;
  border-left: 2em solid #DAD4DF;
} */
.btn-not-clicked{
  background-color: #F2F2F2;
  color: #2E3559;
  border-left: none;
}
.btn-clicked{
  background-color: #2E3559;
  color: #FFF;
  border-left: 2em solid #DAD4DF;
}
.text-baemin {
  font-family: bamin;
  src: url("../assets/font/BMHANNAPro.ttf") format("truetype");
}
.logo {
  float: left;
  margin-top: -65px;
}
</style>
