<template>
<div id="log_page">
  <div id = "menu_bar">
    <button v-on:click = "menu_bar_onclick('customer')" id = 'customer_log'></button>
    <button v-on:click = "menu_bar_onclick('enterprise')" id = 'enterprise_log'></button>
  </div>
  <div v-if = "this.mode === 'customer'">
    <customer-log></customer-log>
  </div>
  <div v-if = "this.mode === 'enterprise'">
    <enterprise-log></enterprise-log>
  </div>
</div>
</template>
<script>
import customerLog from './customer_log.vue'
import enterpriseLog from './enterprise_log.vue'
export default {
  components: {
    customerLog,
    enterpriseLog
  },
  data: function () {
    return {
      mode: 'customer'
    }
  },
  methods: {
    menu_bar_onclick: function (message) {
      this.mode = message
    }
  }
}
</script>
<style src="./log.css" scope>
</style>
