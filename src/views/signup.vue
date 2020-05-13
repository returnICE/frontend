<template>
  <div id="signup_page">
    <div id="signup_container">
      <div class="input_container">
        <h1>회원가입</h1>
        <div class="form-group row">
          <label class="col-3" for="signup_id">ID</label>
          <input class="text_box col-9" type="text" v-model="user.sellerId" id="signup_id" />
        </div>
        <div class="form-group row">
          <label class="col-3" for="signup_pw">PW</label>
          <input class="text_box col-9" type="password" v-model="user.pw" id="signup_pw" />
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
          <input class="text_box col-9" type="text" v-model="user.name" id="signup_name" />
        </div>
        <div class="form-group row">
          <label class="col-3" for="signup_info">매장 소개</label>
          <input class="text_box col-9" type="text" v-model="user.info" id="signup_info" />
        </div>
        <div class="form-row">
          <label class="col-3" for="signup_name">전화번호</label>
          <div class="col row">
            <input
              type="text"
              v-model="firstphone"
              id="signup_phone_first"
              class="col form-control-sm form-control"
            />-
            <input
              type="text"
              v-model="secondphone"
              id="signup_phone_second"
              class="col form-control-sm form-control"
            />-
            <input
              type="text"
              v-model="thirdphone"
              id="signup_phone_third"
              class="col form-control-sm form-control"
            />
          </div>
        </div>
        <label for="signup_img">매장 사진</label>
        <vue-dropzone name="imgFile" ref="photoimage" id="dropzone" :options="dropzoneOptions"></vue-dropzone>기업 계약 여부 :
        <input
          type="radio"
          v-model="user.contractable"
          id="signup_contractable"
          name="contractable"
          value="true"
        />
        <label value="true" for="true">허용</label>
        <input
          type="radio"
          v-model="user.contractable"
          id="signup_contractable"
          name="contractable"
          value="false"
        />
        <label value="false" for="false">거부</label>
        주소 :
        <input
          type="text"
          id="signup_address_num"
          class="textbox_address"
          placeholder="우편번호"
          disabled
        />
        <button class="btn" v-on:click="address_function">주소찾기</button>

        <input
          v-model="user.address"
          type="text"
          id="signup_address"
          class="textbox_address"
          placeholder="주소"
          disabled
        />
        매장 종류 :
        <select v-model="user.type">
          <option disabled value>선택</option>
          <option value="bar">술집</option>
          <option value="dinner">음식점</option>
          <option value="cafe">카페</option>
        </select>

        <button v-on:click="signup" id="btn_signup" />
      </div>
    </div>
  </div>
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
        method:"post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      firstphone: "010",
      secondphone: "7007",
      thirdphone: "9444",
      pwcollect: "asdasd",
      lat: "",
      lon: "",
      user: {
        sellerId: "jeky222",
        pw: "asdasd",
        name: "이제찬",
        phone: "",
        address: "",
        lat: "",
        lon: "",
        info: "이제찬 매장임",
        imgURL: "",
        contractable: "",
        type: ""
      }
    };
  },
  methods: {
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
      geocoder.addressSearch(this.user.address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          this.user.lat = result[0].y;
          this.user.lon = result[0].x;
        }
      });
      if (
        !(
          this.user.sellerId == "" ||
          this.user.pw == "" ||
          this.user.name == "" ||
          this.firstphone == "" ||
          this.secondphone == "" ||
          this.thirdphone == "" ||
          this.user.contractable == "" ||
          this.user.type == ""
        )
      ) {
        console.log(this.user.sellerId);

        var data = new FormData();
        console.log(this.$refs.dropzone)
        var file = this.$refs.photoimage.files;
        data.append("imgFile", file);
        try {
          const resUpload = await this.$http.post("/api/upload", data);
          this.user.imgURL = resUpload.data.location;
          const res = await this.$http.post("/api/sellers", this.user);
          if (res.data.success == true) {
            console.log(res);
            alert(res.data.data.name, "님 환영합니다!");
            window.location.href = "/";
          } else {
            alert("error", res.data.err.errors[0].message);
            console.log(res);
          }
        } catch (error) {
          alert(error);
          console.log(error);
        }
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
