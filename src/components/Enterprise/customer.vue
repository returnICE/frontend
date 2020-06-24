<template>
  <div id="customer-wrap">
    <div v-if="this.isLoading === false" class="loading">
      <b-spinner class="my-5" style="width: 10rem; height: 10rem; border: 1em solid currentColor; border-right-color: transparent;" label="Large Spinner"></b-spinner>
      <h2>로딩 중 ...</h2>
      <h5>Let Eat, Go</h5>
    </div>
    <div v-if="this.isLoading === true" id="customer_div" class="shadow rounded border">
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
          <span v-if="props.column.field == 'cancel' && props.row.cancel=='O'">
            <img src="../../assets/ok-icon.svg" style="width: 20px; margin-right: 5px;">
            <!-- <b-icon icon="emoji-smile" variant="warning"></b-icon> -->
            <button class="remove-btn" v-on:click="remove(props.row)">REMOVE</button>
          </span>
          <span v-else-if="props.column.field == 'cancel' && props.row.cancel=='X'">
            <img src="../../assets/no-icon.svg" style="width: 20px; margin-right: 5px;">
            <!-- <b-icon icon="emoji-frown" variant="warning"></b-icon> -->
            <button class="add-btn" v-on:click="add(props.row)">Add</button>
          </span>
        </template>
      </vue-good-table>
      <div> 기업 신청 코드: {{ enterpriseCode }}</div>
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
      rows: [],
      enterpriseCode: ''
    }
  },

  beforeCreate () {
    axios.get('/api/enterprises/member', {}).then(res => {
      for (var s of res.data.data) {
        this.currentId += 1
        var dic = {
          memberId: s.memberId,
          id: this.currentId,
          name: s.Customer.name,
          customerId: s.Customer.customerId,
          phone: s.Customer.phone,
          birth: s.Customer.birth,
          cancel: s.approval === 1 ? 'O' : 'X'
        }
        this.rows.push(dic)
      }
      this.enterpriseCode = res.data.enterpriseCode
      this.isLoading = true
    })
  },

  methods: {
    selectionChanged: function (params) {
      this.selectList = params.selectedRows
    },
    remove: function (params) {
      axios.delete(`/api/enterprises/member/${params.meberId}`).then(res => {
        res.data.success ? alert('처리되었습니다!') : alert('실패하였습니다!')
      })
    },
    add: function (params) {
      axios.put('/api/enterprises/member', { approval: 1, customerId: params.name }).then(res => {
        res.data.success ? alert('처리되었습니다!') : alert('실패하였습니다!')
      })
    }
  }
}
</script>

<style scoped>
#customer-wrap {
  width: 100%;
  padding: 20px 50px;
}

.remove-btn, .add-btn {
  border: none;
  color: #FFF;
  padding: 5px 8px;
  border-radius: 3px;
}

.remove-btn, .add-btn {
  background-color: #DAD4DF;
}
.add-btn {
  background-color: #9C6779;
}

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

.my-table {
  padding: 0;
  margin: 0;
}
</style>
