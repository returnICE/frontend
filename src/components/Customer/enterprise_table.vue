<template>
  <div>
    <div v-if= "this.isLoading === false" class = "loading">
      <img src = '../../assets/loading.gif'>
    </div>
    <div v-if="this.isLoading === true" id = 'enterprise_div'>
      <vue-good-table
        class = "my-table"
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true
        }"
        styleClass="vgt-table striped">
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action' && props.formattedRow['status'] == '신청'">
            <button v-on:click = "acceptEvent(props.row.enterpriseId)" class = "accept_btn">승인</button>
            <button v-on:click = "denyEvent(props.row.enterpriseId)" class = "deny_btn">거부</button>
          </span>
          <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
        </template>
      </vue-good-table>
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
          label: '저번달 이용금액',
          field: 'month_price'
        },
        {
          label: '1회 금액제한',
          field: 'due_price'
        },
        {
          label: '계약 상태',
          field: 'status'
        },
        {
          label: '승인 / 거부',
          field: 'action'
        }
      ],
      rows: []
    }
  },
  methods: {
    acceptEvent: function (enterpriseId) {
      axios.put('api/sellers/enterprise/accept', {
        enterpriseId: enterpriseId
      }).then((res) => {
        this.Loading()
      })
    },
    denyEvent: function (enterpriseId) {
      axios.put('api/sellers/enterprise/deny', {
        enterpriseId: enterpriseId
      }).then((res) => {
        this.Loading()
      })
    },
    Loading: function () {
      this.rows = []
      this.isLoading = false
      axios.get('/api/sellers/enterprise', {
      }).then((res) => {
        for (var s of res.data.data) {
          var approve = s.approval === 1 ? '승인' : s.approval === 0 ? '신청' : '거부'
          this.rows.push({
            enterpriseId: s.enterpriseId,
            name: s.name,
            phone: s.phone,
            address: s.address,
            month_price: s.amountMonth,
            due_price: s.amountPerDay,
            status: approve
          })
        }
        this.isLoading = true
      })
    }
  },
  beforeCreate () {
    axios.get('/api/sellers/enterprise', {
    }).then((res) => {
      for (var s of res.data.data) {
        var approve = s.approval === 1 ? '승인' : s.approval === 0 ? '신청' : '거부'
        var address = s.address
        if (address.length > 20) {
          address = '...' + address.slice(address.length - 20, address.length)
        }
        this.rows.push({
          enterpriseId: s.enterpriseId,
          name: s.name,
          phone: s.phone,
          address: address,
          month_price: s.amountMonth,
          due_price: s.amountPerDay,
          status: approve
        })
        console.log(s.amountMonth)
      }
      this.isLoading = true
    })
  }
}
</script>
<style src = "./enterprise_table.css" scoped>
</style>
