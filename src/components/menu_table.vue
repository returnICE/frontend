<template>
  <div>
    <div id = 'menu_div'>
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
  name: 'menuTable',
  components: {
    VueGoodTable
  },
  props: ['menu_data'],
  data: function () {
    return {
      selectList: [],
      columns: [
        {
          label: '메뉴 이름',
          field: 'name'
        },
        {
          label: '가격',
          field: 'price'
        },
        {
          label: '메뉴정보',
          field: 'info'
        },
        {
          label: '평균 평점',
          field: 'score'
        }
      ],
      rows: [
        { id: 1, name: '짜장알밥', price: '7,000', info: '샘플데이터', score: '4.6' }
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
<style src = "./menu_table.css" scoped>
</style>
