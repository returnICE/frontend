<template>
  <div>
    <div v-if= "this.isLoading === false" class = "loading">
      <img src = '../../assets/loading.gif'>
    </div>
    <div v-if= "this.isLoading === true" id = 'customer_div'>
      <vue-good-table
        class = "my-table"
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true
        }"
        styleClass="vgt-table striped"/>
    </div>
  </div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import axios from 'axios'
export default {
  name: 'customerTable',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      selectList: [],
      currentId: 0,
      isLoading: false,
      columns: [
        {
          label: '이름',
          field: 'name'
        },
        {
          label: '전화번호',
          field: 'phone'
        },
        {
          label: '생년월일',
          field: 'birth'
        },
        {
          label: '구독 서비스',
          field: 'service'
        },
        {
          label: '남은 횟수',
          field: 'due_count'
        },
        {
          label: '유효기간',
          field: 'due_date'
        },
        {
          label: '해지 여부',
          field: 'cancel'
        }
      ],
      rows: []
    }
  },
  beforeCreate () {
    axios.get('/api/sellers/customer', {
    }).then((res) => {
      for (var s of res.data.data) {
        this.currentId += 1
        var dic = {
          id: this.currentId,
          name: s.name,
          phone: s.phone,
          birth: s.birth,
          service: s.subName,
          due_count: s.limitTimes - s.usedTimes,
          due_date: s.endDate,
          cancel: s.autopay === 0 ? 'O' : 'X'
        }
        this.rows.push(dic)
      }
      this.isLoading = true
    })
  }
}
</script>
<style src = "./customer_table.css" scoped>
</style>
