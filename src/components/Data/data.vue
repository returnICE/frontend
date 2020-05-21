<template>
<div id = "data">
  <h1> 통계 </h1>
  <revenue></revenue>
  <sub-num></sub-num>
  <menu-score></menu-score>
</div>
</template>
<script>
import Revenue from './revenue.vue'
import subNum from './subNum.vue'
import menuScore from './menuScore.vue'
export default {
  name: 'Data',
  components: {
    Revenue,
    subNum,
    menuScore
  }
}
</script>
