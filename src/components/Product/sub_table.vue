<template>
  <div>
    <div id = 'sub_div'>
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
import addSub from './add_sub.vue'
import axios from 'axios'

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
      rows: []
    }
  },
  beforeCreate () {
    axios.get('/api/sellers/product', {
    }).then((res) => {
      console.log(res)
      for (let i = 0; i < res.data.subItem.length; i++) {
        var str = ''
        for (let j = 0; j < res.data.subItem[i].Menus.length; j++) {
          str += res.data.subItem[i].Menus[j].menuName + ','
        }
        this.rows.push({ id: i + 1, name: res.data.subItem[i].subName, price: res.data.subItem[i].price, count: res.data.subItem[i].limitTimes + '/' + res.data.subItem[i].term + '시간', menu: str, info: res.data.subItem[i].info })
        // this.menu_data.push({ id: i + 1, menuId: res.data.menu[i].menuId })
      }
    })
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
      this.$modal.show(addSub, {
        modal: this.$modal
      }, {
        name: 'addSub',
        width: '330px',
        height: '400px',
        draggable: false
      })
    }
  }
}
</script>
<style src = "./sub_table.css" scoped>
</style>
