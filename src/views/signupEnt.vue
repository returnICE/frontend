<template>
  <form id="signup_page_ent" @submit.prevent="signup">
    <div id="signup_container">
      <div class="input_container">
        <h1 >회원가입</h1>
        <div class="form-group row mt-5">
          <label class="col-3" for="signup_id">ID</label>
          <input class="text_box col-9" type="text" v-model="user.enterpriseId" id="signup_id" required />
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
          <label class="col-3" for="signup_name">기업 이름</label>
          <input class="text_box col-9" type="text" v-model="user.name" id="signup_name" required />
        </div>
        <div class="form-row mt-4">
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
        <div class="form-group row mb-5 mt-3">
          <label class="col-3" for="signup_info">기업 주소</label>
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
        <button class=" btn btn-block my-5 btn-custom-ent rounded-pill" type="submit" >가입하기</button>
      </div>
    </div>
  </form>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=32e70bb32e511a3745821af6316816f7&libraries=services"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
export default {
  data: function() {
    return {
      firstphone: "",
      secondphone: "",
      thirdphone: "",
      pwcollect: "",
      lat: "",
      lon: "",
      user: {
        enterpriseId: "",
        pw: "",
        name: "",
        phone: "",
        address: "",
        lat: "",
        lon: "",
        amountPerDay: "",
        amountPerMonth: "",
        resetDate: "",
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
      });
      try {
        if(this.pwcollect!=this.user.pw){
          alert('비밀번호가 다릅니다.')
        }
        else{
          var date = new Date()
          date.setMonth(date.getMonth() + 1)
          this.user.resetDate = date
        const res = await this.$http.post("/api/enterprises", this.user);
        if (res.data.success == true) {
          console.log(res);
          alert(res.data.data.name + "님 환영합니다!");
          this.$router.push({
            name: "Login",
            params: { enterpriseId: this.user.enterpriseId }
          });
        } else {
          alert("error", res.data.err.errors[0].message);
          console.log(res);
        }}
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
