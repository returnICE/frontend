<template>
    <div class = "addcampain">
        <div class="form_input">
        제목 : <input type='text' v-model="title" class = "textbox"/><br/><br/>
        내용 : <input type='text' v-model="body" class = "textbox"/><br/><br/>
        </div>
        <div class="form_input">
        날짜 : <datetime class = "input_date" type="datetime" v-model="dateTime" use12-hour></datetime>
        </div><br/>
        <div>
          <label class="col-1" for="signup_name">대상자 : </label>
          <b-form-select v-on:change="selectChange" v-model="targetOp" class="mb-3 col-4" required>
            <b-form-select-option value="all">전체</b-form-select-option>
            <b-form-select-option value="birth">생일자</b-form-select-option>
            <b-form-select-option value="subscribe">구독자</b-form-select-option>
            <b-form-select-option value="enterprise">기업이용자</b-form-select-option>
          </b-form-select>
        </div>
        <div>
            <vue-good-table
            class = "my-table"
            :columns="columns"
            :rows="rows"
            max-height="250px"
            :fixed-header="true"
            styleClass="vgt-table striped"/>
        </div><br/>
        <button v-on:click="addClickEvent">추가</button>
    </div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import axios from 'axios'
export default {
  name: 'add_campain',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      title: '',
      body: '',
      customer: [],
      enterprise: [],
      targetOp: '',
      dateTime: '',
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
        }
      ],
      rows: []
    }
  },
  beforeCreate: function () {
    axios.get('/api/sellers/customer', {
    }).then((res) => {
      for (var s of res.data.data) {
        this.currentId += 1
        var dic = {
          customerId: s.customerId,
          name: s.name,
          phone: s.phone,
          birth: s.birth
        }
        this.customer.push(dic)
      }
    })
    axios.get('/api/sellers/enterprise/customer', {
    }).then((res) => {
      for (var s of res.data.data) {
        var dic = {
          customerId: s.customerId,
          name: s.name,
          phone: s.phone,
          birth: s.birth
        }
        this.enterprise.push(dic)
      }
    })
  },
  methods: {
    selectChange: function () {
      this.rows = []
      if (this.targetOp === 'all') {
        this.rows = this.customer
        this.rows = this.rows.concat(this.enterprise)
      } else if (this.targetOp === 'birth') {
        var date = new Date()
        for (var i of this.customer) {
          var tempDate = new Date(i.birth)
          if (tempDate.getMonth() === date.getMonth()) {
            this.rows.push(i)
          }
        }
      } else if (this.targetOp === 'subscribe') {
        this.rows = this.customer
      } else if (this.targetOp === 'enterprise') {
        this.rows = this.enterprise
      }
    },
    addClickEvent: function () {
      var data = {
        title: this.title,
        body: this.body,
        transmitDate: this.dateTime,
        targetOp: this.targetOp,
        sellername: '아대돈부리',
        target: []
      }
      for (var i of this.rows) {
        data.target.push(i.customerId)
      }
      axios.post('/api/sellers/campaign', data).then(
        (res) => {
          this.$emit('readData')
          this.$emit('close')
        }
      )
    }
  }
}
</script>
<style src = "./addCampain.css" scoped>
</style>
