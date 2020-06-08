<template>
  <div>
    <div v-if="this.isLoading === false" class="loading">
      <img src="../../assets/loading.gif" />
    </div>
    <div v-if="this.isLoading === true" id="customer_div">
      <vue-good-table
        class="my-table"
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
        styleClass="vgt-table striped"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'cancel' && props.row.cancel=='O'"> O<b-button class="ml-3" variant="outline-secondary">REMOVE</b-button></span>
          <span v-else-if="props.column.field == 'cancel' && props.row.cancel=='X'"> X<b-button class="ml-3" variant="outline-secondary">Add</b-button></span>
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
        }
      ],
      rows: []
    }
  },
  beforeCreate () {
    axios.get('/api/enterprises/member', {}).then(res => {
      console.log(res.data.data)
      for (var s of res.data.data) {
        this.currentId += 1
        var dic = {
          id: this.currentId,
          name: s.Customer.customerId,
          phone: s.Customer.phone,
          birth: s.Customer.birth,
          cancel: s.approval === 1 ? 'O' : 'X'
        }
        this.rows.push(dic)
      }
      this.rows.push({ id: 'asd', name: 'mname', phone: '91920405555', birth: '2020-20-01', cancel: 'O' })
      this.isLoading = true
    })
  },
  methods: {
    selectionChanged: function (params) {
      this.selectList = params.selectedRows
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
