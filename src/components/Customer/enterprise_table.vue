<template>
  <div>
    <div v-if= "this.isLoading === false" class = "loading">
      <img src = '../../assets/loading.gif'>
    </div>
    <div v-if="this.isLoading === true" id = 'enterprise_div'>
      <vue-good-table
        class = "my-table"
        @on-selected-rows-change="selectionChanged"
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true
        }"
        :select-options="{
          enabled: true,
          disableSelectInfo: true,
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
  name: 'enterpriseTable',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      selectList: [],
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
          label: '주소',
          field: 'address'
        },
        {
          label: '이번달 이용금액',
          field: 'month_price'
        },
        {
          label: '1회 금액제한',
          field: 'due_price'
        },
        {
          label: '계약 상태',
          field: 'status'
        }
      ],
      rows: []
    }
  },
  methods: {
    selectionChanged: function (params) {
      this.selectList = params.selectedRows
    }
  },
  beforeCreate () {
    axios.get('/api/sellers/enterprise', {
    }).then((res) => {
      for (var s of res.data.data) {
        this.rows.push({
          name: s.name,
          phone: s.phone,
          address: s.address,
          month_price: s.amountMonth,
          due_price: s.amountPerDay,
          status: s.approval
        })
      }
      this.isLoading = true
    })
  }
}
</script>
<style src = "./enterprise_table.css" scoped>
</style>
