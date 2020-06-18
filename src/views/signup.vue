<template>
  <form id="signup_page" @submit.prevent="signup">
    <div id="signup_container">
      <div class="input_container">
        <h1>회원가입</h1>
        <div class="form-group row">
          <label class="col-3" for="signup_id">ID</label>
          <input class="text_box col-9" type="text" v-model="user.sellerId" id="signup_id" required />
        </div>
        <div class="form-group row">
          <label class="col-3" for="signup_pw">PW</label>
          <input class="text_box col-9" type="password" v-model="user.pw" id="signup_pw" required />
        </div>
        <div class="form-group row">
          <label class="col-3" for="signup_pw_accept">PW 확인</label>
          <input
            class="text_box col-9"
            type="password"
            v-model="pwcollect"
            id="signup_pw_accept"
            required
          />
        </div>
        <div v-if="user.pw != pwcollect && pwcollect != ''" class="password_collect">비밀번호가 다릅니다</div>
        <div class="form-group row">
          <label class="col-3" for="signup_name">매장 이름</label>
          <input class="text_box col-9" type="text" v-model="user.name" id="signup_name" required />
        </div>
        <div class="form-group row">
          <label class="col-3" for="signup_info">매장 소개</label>
          <input class="text_box col-9" type="text" v-model="user.info" id="signup_info" required />
        </div>
        <div class="form-row">
          <label class="col-3" for="signup_name">전화번호</label>
          <div class="col row">
            <input
              type="text"
              v-model="firstphone"
              id="signup_phone_first"
              class="col form-control-sm form-control"
              required
            />-
            <input
              type="text"
              v-model="secondphone"
              id="signup_phone_second"
              class="col form-control-sm form-control"
              required
            />-
            <input
              type="text"
              v-model="thirdphone"
              id="signup_phone_third"
              class="col form-control-sm form-control"
              required
            />
          </div>
        </div>
        <label for="signup_img">매장 사진</label>
        <vue-dropzone
          name="imgFile"
          ref="photoimage"
          id="dropzone"
          style="text-align:center"
          :options="dropzoneOptions"
          v-on:vdropzone-success="imageUpload"
        ></vue-dropzone>
        <b-form-radio-group
          id="radio-group-2"
          v-model="user.contractable"
          name="radio-sub-component"
          inline="true"
          required
        >
          <label for="radio-group-2" class="mr-2">기업 계약 여부</label>
          <b-form-radio name="some-radios" value="1">허용</b-form-radio>
          <b-form-radio name="some-radios" value="0">거부</b-form-radio>
        </b-form-radio-group>
        <div class="form-group row">
          <label class="col-3" for="signup_info">매장 주소</label>
          <div class="col-9">
            <input
              class="text_box col-12"
              type="text"
              id="signup_address_num"
              placeholder="우편번호"
              v-on:click="address_function"
              required
            />
            <input
              class="text_box col-12"
              type="text"
              id="signup_address"
              placeholder="주소"
              v-on:click="address_function"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-3" for="signup_name">매장 종류</label>
          <b-form-select v-model="user.type" class="mb-3 col-9" required>
            <b-form-select-option value="bar">술집</b-form-select-option>
            <b-form-select-option value="dinner">음식점</b-form-select-option>
            <b-form-select-option value="cafe" >카페</b-form-select-option>
          </b-form-select>
        </div>
        <button id="btn_signup" type="submit" />
      </div>
    </div>
  </form>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=32e70bb32e511a3745821af6316816f7&libraries=services"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function() {
    return {
      dropzoneOptions: {
        url: "http://localhost:3000/upload",
        method: "post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        // autoProcessQueue: false,
        uploadMultiple: false,
        maxFiles: 1,
        // resizeWidth: 500,
        resizeMethod:"crop",
        // resizeHeight: 100,
        thumbnailWidth: 227,
        thumbnailHeight: 100,
        init: function() {
          this.on("maxfilesexceeded", function(file) {
            this.removeAllFiles();
            this.addFile(file);
          });
        }
      },
      firstphone: "",
      secondphone: "",
      thirdphone: "",
      pwcollect: "",
      lat: "",
      lon: "",
      user: {
        sellerId: "",
        pw: "",
        name: "",
        phone: "",
        address: "",
        lat: "",
        lon: "",
        info: "",
        imgURL: {
          set: function(newValue) {}
        },
        contractable: "",
        type: ""
      }
    };
  },
  methods: {
    imageUpload: function(file, res) {
      console.log(res.location)
      this.user.imgURL = res.location;
    },
    address_function: function() {
      new daum.Postcode({
        oncomplete: function(data) {
          document.getElementById("signup_address").value = data.address;
          document.getElementById("signup_address_num").value = data.zonecode;
        }
      }).open();
    },
    signup: async function(event) {
      this.user.phone = this.firstphone + this.secondphone + this.thirdphone;
      this.user.address = document.getElementById("signup_address").value;
      var geocoder = new kakao.maps.services.Geocoder();
      await geocoder.addressSearch(this.user.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          this.user.lat = result[0].y;
          this.user.lon = result[0].x;
        }
        console.log(this.user.lat)
        console.log(this.user.lon)
      });
      console.log(this.user.imgURL);
      try {
        const res = await this.$http.post("/api/sellers", this.user);
        if (res.data.success == true) {
          console.log(res);
          alert(res.data.data.name + "님 환영합니다!");
          this.$router.push({
            name: "Login",
            params: { sellerId: this.user.sellerId }
          });
        } else {
          alert("error", res.data.err.errors[0].message);
          console.log(res);
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    onFileChange: function() {
      var file = document.getElementById("singup_image");
      this.user.imgURL = file.value;
    }
  }
};
</script>
<style src = "./signup.css" scoped>
</style>
