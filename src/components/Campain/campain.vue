<template>
<div id = "campain">
  <div>
    <h1>
      캠페인<br/>
    </h1>
    <button v-on:click = "createCampain">추가</button>
    <button v-on:click = "deleteCampain">삭제</button>
  </div>
  <div>
    <modals-container/>
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
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table'
import addCampain from './addCampain.vue'
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
          field: 'info'
        },
        {
          label: '대상자',
          field: 'target'
        },
        {
          label: '일시',
          field: 'date'
        }
      ],
      rows: []
    }
  },
  methods: {
    selectionChanged () {
      console.log('change')
    },
    deleteCampain () {
      console.log('delete')
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
      console.log('create')
    }
  }
}
</script>
<style src = "./campain.css" scoped>
</style>
