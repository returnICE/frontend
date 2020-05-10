<template>
<div id = "manage">
    매장이름 : {{name}}<br/>
    주소 : {{address}}<br/>
    전화번호 : {{phone}}<br/>
    매장정보 : {{info}}<br/>
    기업계약여부 : {{contractable}}<br/>
    매장 사진 : {{imgURL}}<br/>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Manage',
  data: function () {
    return {
      name: '',
      address: '',
      phone: '',
      info: '',
      contractable: '',
      imgURL: ''
    }
  },
  beforeCreate () {
    axios.get('/api/sellers/myinfo', {
    }).then((res) => {
      this.name = res.data.data.name
      this.address = res.data.data.address
      this.phone = res.data.data.phone
      this.info = res.data.data.info
      this.contractable = res.data.data.contractable === 0 ? 'false' : 'true'
      this.imgURL = res.data.data.imgURL
    })
  }
}
</script>
<style src = "./manage.css" scoped>
</style>
