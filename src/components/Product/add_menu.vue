<template>
    <div id="add_menu">
        <div id = "input_name" class = "input_div">
        메뉴 이름 : <input type = "text" v-model='menuName' class = "input_text"/><br/>
        </div>
        <div id = "input_price" class = "input_div">
        메뉴 가격 : <input type = "text" v-model='price' class = "input_text"/>원<br/>
        </div>
        <div id = "input_info" class = "input_div">
        메뉴 정보 : <input type = "text" v-model='info' class = "input_text"/><br/>
        </div>
        <div>
            <button v-on:click = "add_menu_function" id = "add_menu_submit"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      menuName: '',
      info: '',
      price: ''
    }
  },
  methods: {
    add_menu_function: async function () {
      await axios.post('/api/sellers/product/menu', {
        menuName: this.menuName,
        info: this.info,
        price: parseInt(this.price)
      }).then(() => {
        this.$emit('loadData')
        this.$emit('close')
      })
    }
  }
}
</script>
<style src = "./add_menu.css" scoped>
</style>
