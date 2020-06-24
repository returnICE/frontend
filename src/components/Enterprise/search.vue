<template>
  <div id="search-wrap">
   <div v-if="this.isLoading === false" class="loading">
      <b-spinner class="my-5" style="width: 10rem; height: 10rem; border: 1em solid currentColor; border-right-color: transparent;" label="Large Spinner"></b-spinner>
      <h2>로딩 중 ...</h2>
      <h5>Let Eat, Go</h5>
    </div>
    <div v-else id="customer_div" class="shadow rounded border">
      <vue-good-table
        :pagination-options="{
          enabled: true,
        }"
        :search-options="{
          enabled: true
        }"
        :totalRows="1000"
        :rows="rows"
        :columns="columns"
        @on-row-click="onRowClick"
        styleClass="vgt-table condensed text-baemin"
      >
      </vue-good-table>
    </div>
    <div>
      <modals-container/>
    </div>
  </div>
</template>
<script>
import detail from './detail.vue'
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import axios from 'axios'
export default {
  name: 'customerTable',
  components: {
    VueGoodTable
  },
  // computed: {
  //   rows: function () {
  //     return this.row_data
  //   }
  // },
  data: function () {
    return {
      isLoading: false,
      rows: [],
      totalRecords: 0,
      serverParams: {
        columnFilters: {
        },
        sort: {
          field: '',
          type: ''
        },
        page: 0,
        perPage: 5
      },
      selectList: [],
      currentId: 0,
      columns: [
        { field: 'name', label: '이름', width: '100px' },
        { field: 'address', label: '주소', width: '100px', tdClass: 'tdClassFunc' },
        { field: 'type', label: '타입', width: '100px' },
        { field: 'totalSubs', label: '구독자 수', type: 'number', width: '100px' }
      ]
    }
  },

  mounted () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      axios.post('/api/search/ent', { data: this.serverParams }).then(res => {
        this.rows = res.data.sellerdata
        for (var i = 0; i < this.rows.length; i++) {
          if (this.rows[i].type === 'dinner') {
            this.rows[i].type = '식당'
          } else if (this.rows[i].type === 'bar') {
            this.rows[i].type = '술집'
          } else if (this.rows[i].type === 'cafe') {
            this.rows[i].type = '카페'
          }
        }
        this.isLoading = true
      })
    },
    onColumnFilter (params) {
      this.updateParams(params)
      this.loadItems()
    },
    selectionChanged: function (params) {
      this.selectList = params.selectedRows
    },
    onRowClick: function (params) {
      this.$modal.show(detail, {
        seller: params.row,
        modal: this.$modal
      }, {
        name: 'detail',
        width: '500px',
        height: '550px',
        draggable: false
      })
    },
    tdClassFunc (row) {
      if (row.field > 50) {
        return 'red-class'
      }
      return 'blue-class'
    }
  }
}
</script>
<style>
#search-wrap {
  width: 100%;
  padding: 20px 50px;
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
.text-overflow{
  text-overflow:ellipsis;
  overflow:hidden;
  white-space:nowrap;
  width:560px;
  max-height:24px;
}
.font-xsmall{
  font-size: small !important;
}
.red-class{
  color:red;
}
.blue-class{
  color:blue;
}
</style>
