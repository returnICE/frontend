<template>
<div id = "campain">
  <h1>
      캠페인<br/>
  </h1>
  <div v-if = "this.isLoading === false" class = "loading">
    <img src = '../../assets/loading.gif'>
  </div>
  <div v-if = "this.isLoading === true">
    <div class = "top_div">
      <button id = "append_btn" v-on:click = "createCampain"></button>
      <button id = "delete_btn" v-on:click = "deleteCampain"></button>
    </div>
    <div>
      <modals-container v-on:readData="readData"/>
    </div>
    <div>
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
</div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import addCampain from './addCampain.vue'
import axios from 'axios'
export default {
  name: 'Campain',
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
          label: '제목',
          field: 'title'
        },
        {
          label: '내용',
          field: 'body'
        },
        {
          label: '대상자',
          field: 'targetOp'
        },
        {
          label: '일시',
          field: 'transmitDate'
        }
      ],
      rows: []
    }
  },
  methods: {
    selectionChanged (params) {
      console.log(params)
      this.selectList = params.selectedRows
    },
    async deleteCampain () {
      console.log('aa')
      for (var i of this.selectList) {
        await axios.delete('api/sellers/campaign/' + i.campaignId, {
        }).then((res) => {
          console.log('success')
          this.readData()
        })
      }
    },
    createCampain () {
      this.$modal.show(addCampain, {
        modal: this.$modal
      }, {
        name: 'add_campain',
        width: '1000px',
        height: '550px',
        draggable: false
      })
    },
    readData () {
      this.rows = []
      axios.get('/api/sellers/campaign', {
      }).then((res) => {
        for (var s of res.data.data) {
          var dic = {
            campaignId: s.campaignId,
            transmitDate: s.transmitDate,
            body: s.body,
            targetOp: s.targetOp,
            title: s.title
          }
          this.rows.push(dic)
        }
      })
    }
  },
  beforeCreate: function () {
    axios.get('/api/sellers/campaign', {
    }).then((res) => {
      for (var s of res.data.data) {
        var dic = {
          campaignId: s.campaignId,
          transmitDate: s.transmitDate,
          body: s.body,
          targetOp: s.targetOp,
          title: s.title
        }
        this.rows.push(dic)
      }
      this.isLoading = true
    })
  }
}
</script>
<style src = "./campain.css" scoped>
</style>
