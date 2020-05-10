<template>
  <div>
    <div id = 'menu_div'>
        <button v-on:click = "add_function" class = "append_btn"></button>
        <button v-on:click = "delete_function" class = "delete_btn" ></button>
    </div>
    <div>
      <modals-container/>
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
import addMenu from './add_menu.vue'
import axios from 'axios'

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
  beforeCreate () {
    console.log(axios.defaults.headers.common['x-access-token'])
    axios.get('/api/sellers/product', {
    }).then((res) => {
      console.log(res)
    })
  },
  mounted () {
    this.add_function()
  },
  methods: {
    selectionChanged: function (params) {
      console.log(params.selectedRows)
      this.selectList = params.selectedRows
    },
    delete_function: function () {
      console.log('delete')
    },
    add_function: function () {
      this.$modal.show(addMenu, {
        modal: this.$modal
      }, {
        name: 'add_menu',
        width: '330px',
        height: '250px',
        draggable: false
      })
    }
  }
}
</script>
<style src = "./menu_table.css" scoped>
</style>
