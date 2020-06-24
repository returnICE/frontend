<template>
    <div id = "add_sub">
        <div id = "input_name" class = "input_div">
        구독권 이름 : <input type = "text" v-model='subName' class = "input_text"/><br/>
        </div>
        <div id = "input_price" class = "input_div">
        구독권 가격 : <input type = "text" v-model='price' class = "input_text"/>원 / 월<br/>
        </div>
        <div id = "input_info" class = "input_div">
        제공횟수 : <input type = "text" v-model='num' class = "input_text"/> /
        <select v-model="term">
            <option value='월'>월</option>
            <option value='주'>주</option>
            <option value='일'>일</option>
        </select><br/><br/>
        구독권 안내 : <input type="text" v-model='info' class = "input_text"/>
        </div><br/>
        제공메뉴 :
        <div id = "check">
          <div v-for="menu_name in menus" v-bind:key="menu_name">
            <input type="checkbox" v-on:change="checkbox_change_event(menu_name)"/>{{menu_name}}<br/>
          </div>
        </div>
        <div>
            <button v-on:click = "add_sub_function" id = "add_sub_submit"/>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      menus: [],
      menu_data: [],
      subName: '',
      num: '',
      info: '',
      price: '',
      term: '',
      selectedmenus: []
    }
  },
  created () {
    axios.get('api/sellers/product', {})
      .then((res) => {
        this.menu_data = res.data.menu
        for (let i = 0; i < res.data.menu.length; i++) {
          this.menus.push(res.data.menu[i].menuName)
        }
      })
  },
  methods: {
    checkbox_change_event (menuName) {
      const idx = this.selectedmenus.indexOf(menuName)
      if (idx > -1) {
        this.selectedmenus.splice(idx, 1)
      } else {
        this.selectedmenus.push(menuName)
      }
    },
    add_sub_function () {
      var menuList = []
      for (let j = 0; j < this.selectedmenus.length; j++) {
        for (let i = 0; i < this.menu_data.length; i++) {
          if (this.menu_data[i].menuName === this.selectedmenus[j]) {
            menuList.push(this.menu_data[i].menuId)
          }
        }
      }
      var termNum = 0
      if (this.term === '월') {
        termNum = 30 * 24
      } else if (this.term === '주') {
        termNum = 7 * 24
      } else if (this.term === '일') {
        termNum = 24
      }
      if (menuList.length === 0) {
        alert('선택된 메뉴가 없습니다')
        return
      }
      axios.post('/api/sellers/product/sub', {
        subName: this.subName,
        info: this.info,
        price: parseInt(this.price),
        limitTimes: parseInt(this.num),
        term: termNum,
        menuId: menuList
      }).then((res) => {
        this.$emit('read_product')
        this.$emit('close')
      })
    }
  }
}
</script>
<style src = './add_sub.css' scoped>
</style>
