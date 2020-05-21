<template>
  <div class="col-12 h-100 text-baemin">
    <h3 class="row mx-2 mt-2 justify-content-between">
      <div class>매장 정보 변경</div>
      <button class="btn" @click="modifySellerInfo">저장</button>
    </h3>
    <div class="form-group form-row mt-5">
      <label class="col-3" for="signup_info">매장 소개</label>
      <textarea class="col-9 form-control" type="text" v-model="info" id="signup_info" required></textarea>
    </div>
    <b-form-radio-group
      id="radio-group-2"
      v-model="contractable"
      name="radio-sub-component"
      inline="true"
      class="form-row"
      required
    >
      <label for="radio-group-2" class="mr-2 col-3">기업 계약 여부</label>
      <div class="col-9 row justify-content-center">
        <b-form-radio name="some-radios" value="true">허용</b-form-radio>
        <b-form-radio name="some-radios" value="false">거부</b-form-radio>
      </div>
    </b-form-radio-group>
    <div>매장사진</div>
    <vue-dropzone
      name="imgFile"
      ref="photoimage"
      id="dropzone"
      :options="dropzoneOptions"
      v-on:vdropzone-success="imageUpload"
    ></vue-dropzone>
  </div>
</template>
<script>
import axios from 'axios'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  props: ['propInfo', 'propImgURL', 'propContractable'],
  data: function () {
    return {
      dropzoneOptions: {
        url: 'http://localhost:3000/upload',
        method: 'post',
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        uploadMultiple: false,
        maxFiles: 1,
        init: function () {
          this.on('maxfilesexceeded', function (file) {
            this.removeAllFiles()
            this.addFile(file)
          })
        },
        imgURL: '',
        info: '',
        contractable: ''
      }
    }
  },
  created () {
    this.imgURL = this.propImgURL
    this.info = this.propInfo
    this.contractable = this.propContractable
  },
  methods: {
    imageUpload: function (file, res) {
      this.imgURL = res.location
    },
    modifySellerInfo: function () {
      console.log(this.propInfo)
      axios.put('api/sellers/myinfo', { info: this.info, imgURL: this.imgURL, contractable: this.contractable }).then(res => {
        console.log(res)
        alert(res)
      })
    }
  }
}
</script>
<style src='./revice.css' scoped>
</style>
