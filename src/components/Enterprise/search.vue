<template>
  <div>
    <div v-if="this.isLoading === false" class="loading">
      <img src="../../assets/loading.gif" />
    </div>
    <div v-if="this.isLoading === true" id="customer_div">
      <vue-good-table
        class="my-table"
        :columns="columns"
        :rows="rows"
        :search-options="{
          enabled: true
        }"
        styleClass="vgt-table striped"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'cancel' && props.row.cancel=='O'"> O<b-button class="ml-3" variant="outline-secondary" v-on:click="remove(props.row)" >REMOVE</b-button></span>
          <span v-else-if="props.column.field == 'cancel' && props.row.cancel=='X'"> X<b-button class="ml-3" variant="outline-secondary" v-on:click="add(props.row)">Add</b-button></span>
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
          label: '승인 여부',
          field: 'cancel'
        },
        {
          label: '구독권 개수',
          field: 'totalSubs'
        }
      ],
      rows: []
    }
  },
  beforeCreate () {
    axios.post('/api/search/ent', { page: 0 }).then(res => {
      for (var s of res.data.sellerdata) {
        this.currentId += 1
        var dic = {
          meberId: s.sellerId,
          id: this.currentId,
          name: s.name,
          phone: s.phone,
          birth: s.type,
          totalSubs: s.totalSubs,
          cancel: s.approval === 1 ? 'O' : 'X'
        }
        this.rows.push(dic)
      }
      this.isLoading = true
    })
  },
  methods: {
    selectionChanged: function (params) {
      this.selectList = params.selectedRows
    },
    remove: function (params) {
      axios.delete(`/api/enterprises/member/${params.meberId}`).then(res => {
        console.log(res.data)
      })
    },
    add: function (params) {
      axios.put('/api/enterprises/member', { approval: 1, customerId: params.name }).then(res => {
        console.log(res.data.success)
        if (res.data.success) alert('추가되었습니다!')
      })
    }
  }
}
</script>
<style scoped>
#customer_tab {
  background: url("../../assets/customer_page/customer_tab.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 150px;
  height: 30px;
  border: none;
  outline: 0;
  cursor: pointer;
}
#enterprise_tab {
  background: url("../../assets/customer_page/enterprise_tab.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 150px;
  height: 30px;
  border: none;
  outline: 0;
  cursor: pointer;
}
#menu_bar {
  float: left;
  margin-top: 50px;
}
</style>
