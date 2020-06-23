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
import axios from 'axios'
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
          field: 'name'
        },
        {
          label: '사용 일자',
          field: 'eatenDate'
        },
        {
          label: '이용 메뉴',
          field: 'menuName'
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
    axios.get('/api/sellers/enterprise/log', {}).then((res) => {
      this.rows = res.data.result
      for (var s of this.rows) {
        console.log(s)
        s.eatenDate = s.eatenDate.substring(0, 10) + ' ' + s.eatenDate.substring(11, 19)
      }
    })
  },
  methods: {

  }
}
</script>
<style src = './enterprise_log.css' scoped>
</style>
