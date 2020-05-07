<template>
<div id = 'signup_page'>
  <div id = 'signup_container'>
    <div class = "input_container">
    <br/>
    <h1>회원가입</h1>
        ID : <input type="text" v-model="user.sellerId" id="signup_id" class = "text_box"/><br/>
        PW : <input type="password" v-model="user.pw" id="signup_pw" class = "text_box"/><br/>
        PW 확인: <input type="password" v-model="pwcollect" id="signup_pw_accept" class = "text_box"/><br/>
        <div v-if = "user.pw != pwcollect && pwcollect != ''" class = "password_collect">비밀번호가 다릅니다</div>
        매장 이름: <input type="text" v-model="user.name" id="signup_name" class = "text_box"/><br/>
        매장 전화번호 :
        <input type = "text" v-model="firstphone" id="signup_phone_first" class = "input_phone"/>-
        <input type = "text" v-model="secondphone" id="signup_phone_second" class = "input_phone"/>-
        <input type = "text" v-model="thirdphone" id="signup_phone_third" class = "input_phone"/><br/>
        매장 소개 : <input type = "text_box" v-model="user.info" id = "signup_info" class = "text_box"/><br/><br/>
        매장 사진 : <br/><br/>
        <form action="/api/upload" method="post" enctype="multipart/form-data" >
        <input type="file" name="imgFile" multiple>
        <input type="submit" value="S3에 보내기">
        </form><br/><br/>
    <form>
        기업 계약 여부 :
        <input type="radio" v-model="user.contractable" id="signup_contractable" name="contractable" value="true"/>
        <label value="true" for = "true"> 허용 </label>
        <input type="radio" v-model="user.contractable" id="signup_contractable" name="contractable" value="false"/>
        <label value="false" for = "false"> 거부 </label><br/><br/>
    </form>
    주소 : <br/>
    <input type = "text" id = "signup_address_num" class = "textbox_address" placeholder="우편번호" disabled/>
    <button v-on:click = "address_function">주소찾기</button><br/><br/>
    <input v-model="user.address" type = "text" id = "signup_address" class = "textbox_address" placeholder="주소" disabled/><br/><br/>
    매장 종류 :
    <select v-model="user.type">
      <option disabled value="">선택</option>
      <option value="bar">술집</option>
      <option value="dinner">음식점</option>
      <option value="cafe">카페</option>
    </select>
    <br/><br/>
    <button v-on:click = "signup" id = "btn_signup"/>
    </div>
    </div>
</div>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=32e70bb32e511a3745821af6316816f7&libraries=services"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script>
export default {
  data: function(){
    return{
      firstphone : '',
      secondphone: '',
      thirdphone: '',
      pwcollect:'',
      lat : '',
      lon : '',
      user: {
        sellerId: '',
        pw: '',
        name:'',
        phone: '',
        address:'',
        lat:'',
        lon:'',
        info:'',
        imgURL:'',
        contractable:'',
        type:''
      }
    }
  },
  methods: {
    address_function: function () {
      new daum.Postcode ({
        oncomplete: function (data) {
          document.getElementById('signup_address').value = data.address
          document.getElementById('signup_address_num').value = data.zonecode
        }
      }).open()
    },
    signup : function(event){
      this.user.phone = this.firstphone + this.secondphone + this.thirdphone
      this.user.address = document.getElementById('signup_address').value
      var geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(this.user.address,(result,status) => {
        if(status === kakao.maps.services.Status.OK){
          this.user.lat = result[0].y
          this.user.lon = result[0].x
        }
      })
      if(!(this.user.sellerId == '' || this.user.pw == '' || this.user.name == '' || this.firstphone == '' || this.secondphone == '' || this.thirdphone == ''
          || this.user.contractable == '' || this.user.type == '')){
          console.log(this.user.sellerId)
          this.$http.post('/api/sellers',{
            sellerId : this.user.sellerId,
            pw : this.user.pw,
            name : this.user.name,
            phone : this.user.phone,
            address : this.user.address,
            lat : this.user.lat,
            lon : this.user.lon,
            info : this.user.info,
            type : this.user.type
          }).then((res) => {
            if(res.data.success == true){
              alert(res.data)
              window.location.href = '/'
            }
            if(res.data.success == false){
              alert(res.data)
            }
          }).catch(function(error){
            alert(error)
          })
      }
    },
    onFileChange : function(){
      var file = document.getElementById('singup_image')
      this.user.imgURL = file.value
    }
  }
}
</script>
<style src = "./signup.css" scoped>
</style>
