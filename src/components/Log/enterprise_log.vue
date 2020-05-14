<template>
<div id = "log">
  <vue-good-table
      class = "my-table"
      :columns="columns"
      :rows="rows"
      styleClass="vgt-table striped"/>
</div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
// import axios from 'axios'
export default {
  name: 'Log',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      columns: [
        {
          label: '기업 이름',
          field: 'enterpriseId'
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

  },
  methods: {

  }
}
</script>
<style src = './enterprise_log.css' scoped>
</style>
