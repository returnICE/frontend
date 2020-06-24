<template>
  <div>
    <div v-if = "this.isLoading === false" class = "loading">
      <img src = '../../assets/loading.gif'>
    </div>
    <div v-if = "this.isLoading === true">
      <div id = 'sub_div'>
          <button v-on:click = "add_function" class = "append_btn"></button>
          <button v-on:click = "delete_function" class = "delete_btn" ></button>
      </div>
      <div>
        <modals-container id = "modal" v-on:read_product="read_product"/>
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
      isLoading: false,
      sub_data: [],
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
      for (let i = 0; i < res.data.subItem.length; i++) {
        var str = ''
        for (let j = 0; j < res.data.subItem[i].Menus.length - 1; j++) {
          str += res.data.subItem[i].Menus[j].menuName + ','
        }
        str += res.data.subItem[i].Menus[res.data.subItem[i].Menus.length - 1].menuName
        var term = res.data.subItem[i].term + '시간'
        if (res.data.subItem[i].term === 24 * 7) {
          term = '주'
        } else if (res.data.subItem[i].term === 24) {
          term = '일'
        } else if (res.data.subItem[i].term === 30 * 24) {
          term = '월'
        }
        this.rows.push({ id: i + 1, name: res.data.subItem[i].subName, price: res.data.subItem[i].price, count: res.data.subItem[i].limitTimes + '회 / ' + term, menu: str, info: res.data.subItem[i].info })
        this.sub_data.push({ id: i + 1, subItemId: res.data.subItem[i].subId })
      }
      this.isLoading = true
    })
  },
  methods: {
    selectionChanged: function (params) {
      this.selectList = params.selectedRows
    },
    delete_function: async function () {
      for (let i = 0; i < this.selectList.length; i++) {
        for (let j = 0; j < this.sub_data.length; j++) {
          if (this.sub_data[j].id === this.selectList[i].id) {
            await axios.delete(`/api/sellers/product/sub/${this.sub_data[j].subItemId}`, {})
              .then((res) => {
                this.read_product()
              })
          }
        }
      }
    },
    read_product: function () {
      this.rows = []
      axios.get('/api/sellers/product', {}).then((res) => {
        for (let i = 0; i < res.data.subItem.length; i++) {
          var str = ''
          for (let j = 0; j < res.data.subItem[i].Menus.length - 1; j++) {
            str += res.data.subItem[i].Menus[j].menuName + ','
          }
          str += res.data.subItem[i].Menus[res.data.subItem[i].Menus.length - 1].menuName
          var term = res.data.subItem[i].term + '시간'
          if (res.data.subItem[i].term === 24 * 7) {
            term = '주'
          } else if (res.data.subItem[i].term === 24) {
            term = '일'
          } else if (res.data.subItem[i].term === 30 * 24) {
            term = '월'
          }
          this.rows.push({ id: i + 1, name: res.data.subItem[i].subName, price: res.data.subItem[i].price, count: res.data.subItem[i].limitTimes + '회 / ' + term, menu: str, info: res.data.subItem[i].info })
          this.sub_data.push({ id: i + 1, subItemId: res.data.subItem[i].subId })
        }
      })
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
