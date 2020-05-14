<template>
    <div>
        매장정보 : <input type="text" class="text_box"/><br/>
        기업계약여부 : <input type="text" class="text_box"/><br/>
        <form action="/api/upload" method="post" enctype="multipart/form-data" >
        매장 사진 :
        <input type="file" name="imgFile" multiple>
        <input type="submit" value="S3에 보내기">
        </form>
    </div>
</template>
<script>
export default {
  data: function () {
    return {
      info: '',
      contractable: '',
      img: ''
    }
  }
}
</script>
<style src='./revice.css' scoped>
</style>
