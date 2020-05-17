<template>
<div id = "product">
  <div id = "menu_bar">
    <button v-on:click = "menu_bar_onclick('sub')" id = 'sub_tab'></button>
    <button v-on:click = "menu_bar_onclick('menu')" id = 'menu_tab'></button>
  </div>
  <div v-if = "this.mode === 'sub'">
    <subTable></subTable>
  </div>
  <div v-if = "this.mode === 'menu'">
    <menuTable></menuTable>
  </div>
  <!--
  <div v-if = "this.mode == 'menu'" id = 'menu_div'>
    <button class = "append_btn"></button>
    <button class = "delete_btn"></button>
  </div>
  -->
</div>
</template>
<script>
import subTable from './sub_table.vue'
import menuTable from './menu_table.vue'

export default {
  name: 'Product',
  components: {
    subTable,
    menuTable
  },
  data: function () {
    return {
      mode: 'sub',
      total_data: []
    }
  },
  methods: {
    menu_bar_onclick: function (message) {
      this.mode = message
    }
  }
}
</script>
<style src = "./product.css" scoped>
</style>
