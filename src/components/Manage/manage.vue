<template>
<div id = "manage">
  <div v-if = "this.isLoading === false" class = "loading">
    <img src = '../../assets/loading.gif'>
  </div>
  <div class="col-12 row" v-if = "this.isLoading === true">
    <div class="col-6">매장이름 : {{name}}<br/>
    주소 : {{address}}<br/>
    전화번호 : {{phone}}<br/>
    매장정보 : {{info}}<br/>
    기업계약여부 : {{contractable}}<br/></div>
    <div class="col-3 mt-3 text-center">
      <div>
        매장 사진
      </div>
      <div style="position: fixed" >
        <img style="width:250px; position: fixed; " src="../../assets/manage_page/pixel.jpg" alt="" srcset="">

        <div style="position: fixed; width: 227px; overflow:hidden; margin-left: 12px; margin-top: 95px; height: 100px; filter: brightness(0.7);" >
          <img style="margin-top: -25%;" :src="imgURL" alt="" srcset="">
        </div>
        <div style="position: fixed; overflow:hidden; margin-left: 12px; margin-top: 95px; height: 100px; color:white" >
          {{name}}
        </div>
        </div>
    </div>
  </div>
    <button v-if="isLoading" class="btn btn-custom" v-on:click = "revicePage">매장 정보 수정하기</button>
    <div>
      <modals-container/>
    </div>
</div>
</template>
<script>
import axios from 'axios'
import revice from './revice.vue'
export default {
  name: 'Manage',
  data: function () {
    return {
      isLoading: false,
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
      this.isLoading = true
    })
  },
  methods: {
    revicePage: function () {
      this.$modal.show(revice, {
        propInfo: this.info,
        propImgURL: this.imgURL,
        propContractable: this.contractable,
        modal: this.$modal
      }, {
        name: 'revice',
        width: '500px',
        height: '550px',
        draggable: false
      })
    }
  }
}
</script>
<style src = "./manage.css" scoped>
</style>
