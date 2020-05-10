<template>
  <div>
    <div  id = 'sub_div'>
        <button class = "append_btn"></button>
        <button v-on:click = "delete_function" class = "delete_btn" ></button>
    </div>
    <vue-good-table
      class = "my-table"
      @on-selected-rows-change="selectionChanged"
      :columns="columns"
      :rows="rows"
      :select-options="{
        enabled: true,
        disableSelectInfo: true,
      }"
      styleClass="vgt-table striped"/>
  </div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
export default {
  name: 'subTable',
  components: {
    VueGoodTable
  },
  data: function () {
    return {
      selectList: [],
      columns: [
        {
          label: '구독권 이름',
          field: 'name'
        },
        {
          label: '가격/월',
          field: 'price'
        },
        {
          label: '제공횟수',
          field: 'count'
        },
        {
          label: '메뉴',
          field: 'menu'
        },
        {
          label: '구독 정보',
          field: 'info'
        }
      ],
      rows: [
        { id: 1, name: 'A서비스', price: '39,000원/월', count: '15회/월', menu: '매운알밥', info: '샘플 정보' },
        { id: 2, name: 'B서비스', price: '21,000원/월', count: '7회/주', menu: '짜장알밥', info: '샘플정보' },
        { id: 3, name: 'C서비스', price: '50,000원/월', count: '1회/일', menu: '카레알밥', info: '샘플정보' },
        { id: 4, name: 'D서비스', price: '30,000원/월', count: '5회/3일', menu: '크립알밥', info: '샘플정보' }
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
<style src = "./sub_table.css" scoped>
</style>
