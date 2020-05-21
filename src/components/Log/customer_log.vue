<template>
<div id = "log">
  <div v-if = "this.isLoading === false" class = "loading">
      <img src = '../../assets/loading.gif'>
  </div>
  <div v-if = "this.isLoading === true">
  <vue-good-table
      class = "my-table"
      :columns="columns"
      :rows="rows"
      styleClass="vgt-table striped"/>
  </div>
</div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import axios from 'axios'
export default {
  name: 'Log',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      isLoading: false,
      columns: [
        {
          label: '사용자 아이디',
          field: 'customerId'
        },
        {
          label: '사용 일자',
          field: 'eatenDate'
        },
        {
          label: '이용 메뉴',
          field: 'menu'
        },
        {
          label: '메뉴 가격',
          field: 'price'
        }
      ],
      rows: []
    }
  },
  beforeCreate () {
    axios.get('./api/sellers/accept', {}).then((res) => {
      for (let i = 0; i < res.data.customer.length; i++) {
        this.rows.push({
          customerId: res.data.customer[i].Customer.name,
          eatenDate: res.data.customer[i].eatenDate,
          menu: res.data.customer[i].Menu.menuName,
          price: res.data.customer[i].Menu.price
        })
      }
      this.isLoading = true
    })
  }
}
</script>
<style src = './customer_log.css' scoped>
</style>
