<template>
  <div>
    <div  id = 'customer_div'>
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
export default {
  name: 'customerTable',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      selectList: [],
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
          label: '성별',
          field: 'sex'
        },
        {
          label: '생년월일',
          field: 'birth'
        },
        {
          label: '나이',
          field: 'age'
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
          field: 'cancled'
        }
      ],
      rows: [
        {
          id: 1,
          name: '정성원',
          phone: '01011112222',
          sex: '남',
          birth: '1995-04-05',
          age: '26',
          service: 'A서비스',
          due_count: 3,
          due_date: '5/20',
          cancled: 'X'
        },
        {
          id: 2,
          name: '권인우',
          phone: '01033334444',
          sex: '남',
          birth: '1995-11-13',
          age: '26',
          service: 'A서비스',
          due_count: 3,
          due_date: '5/20',
          cancled: 'X'
        },
        {
          id: 3,
          name: '정성원',
          phone: '01011112222',
          sex: '남',
          birth: '1995-04-05',
          age: '26',
          service: 'A서비스',
          due_count: 3,
          due_date: '5/20',
          cancled: 'X'
        },
        {
          id: 4,
          name: '정성원',
          phone: '01011112222',
          sex: '남',
          birth: '1995-04-05',
          age: '26',
          service: 'A서비스',
          due_count: 3,
          due_date: '5/20',
          cancled: 'X'
        }
      ]
    }
  },
  methods: {
    selectionChanged: function (params) {
      console.log(params.selectedRows)
      this.selectList = params.selectedRows
    },
    delete_function: function () {
      console.log('delete')
    }
  }
}
</script>
<style src = "./customer_table.css" scoped>
</style>
