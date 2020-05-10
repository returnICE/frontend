<template>
  <div>
    <div  id = 'enterprise_div'>
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
  name: 'enterpriseTable',
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
      rows: [
        {
          id: 1,
          name: 'A기업',
          phone: '01011112222',
          address: '서울',
          month_price: '123123',
          due_price: '7000',
          status: '승인'
        },
        {
          id: 2,
          name: 'wefe기업',
          phone: '01011112222',
          address: '서울',
          month_price: '123123',
          due_price: '7000',
          status: '승인'
        },
        {
          id: 3,
          name: 'zxccv기업',
          phone: '01011112222',
          address: '서울',
          month_price: '123123',
          due_price: '7000',
          status: '승인'
        },
        {
          id: 4,
          name: 'D기업',
          phone: '01011112222',
          address: '서울',
          month_price: '123123',
          due_price: '7000',
          status: '대기'
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
<style src = "./enterprise_table.css" scoped>
</style>
