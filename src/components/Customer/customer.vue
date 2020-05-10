<template>
<div id = "product">
  <div id = "menu_bar">
    <button v-on:click = "menu_bar_onclick('customer')" id = 'customer_tab'></button>
    <button v-on:click = "menu_bar_onclick('enterprise')" id = 'enterprise_tab'></button>
  </div>
  <div v-if = "this.mode === 'customer'">
    <customerTable></customerTable>
  </div>
  <div v-if = "this.mode === 'enterprise'">
    <enterpriseTable v-bind:menu_data="total_data.data"></enterpriseTable>
  </div>
  <!--
  <div v-if = "this.mode == 'menu'" id = 'menu_div'>
    <button class = "append_btn"></button>
    <button class = "delete_btn"></button>
  </div>
  -->
</div>
</template>
<script>
import customerTable from './customer_table.vue'
import enterpriseTable from './enterprise_table.vue'

export default {
  name: 'Customer',
  components: {
    customerTable,
    enterpriseTable
  },
  data: function () {
    return {
      mode: 'customer',
      total_data: []
    }
  },
  methods: {
    menu_bar_onclick: function (message) {
      this.$http.get('/api/sellers/product', {
        headers: {
          'x-access-token': document.cookie
        }
      }).then(
        (res) => {
          this.total_data = res // 개발중
        }
      )
      this.mode = message
    }
  }
}
</script>
<style src = "./customer.css" scoped>
</style>
