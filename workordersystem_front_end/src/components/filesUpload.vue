<template>
  <div class="filesUpload">
    <!-- <img :src="imgSrc" alt=""> -->
    <ul class="imgVessel">
      <li v-for="(itme,index) in imgSrc" :key="index">
        <img :src="itme.src" alt="">
        <button class="remove" @click="remove(index)">×</button>
      </li>
    </ul>
    <div class="files">
      <span>添加</span>
      <input ref="imgurl" type="file" name="" id=""  @change="upload_photo" /> 
    </div>
  </div>
</template>

<script>
  export default {
    name: 'filesUpload',
    data() {
      return {
        imgSrc: []
      }
    },
    methods: {
      upload_photo: function(){
        var url = this.$refs.imgurl
        console.log(url.files)
        if(url.files.length >0){
          var src = require('../assets/images/' + url.files[0].name)
          this.imgSrc.push({src:src})
        }
      },
      remove:function(index){
        this.imgSrc.splice(index, 1)
      }
    }
  }
</script>

<style scoped>
.filesUpload{
  display: flex;
  margin-bottom: 10px;
}
  img{
    display: inline-block;
    width: 100px;
    height: 80px;
    border: 1px solid red
  }
  .files{
    height: 30px;
    position: relative;
    text-align: center;
    width: 50px;
    border: 1px solid red;
    line-height: 30px;
  }
  input[type="file"]{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
  .imgVessel{
    display: flex;
  }
  .imgVessel li{
    position: relative;
    margin-right: 15px;
  }
  .remove{
    display: inline-block;
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    position: absolute;
    top: 0px;
    right: 0px;
    background: #ccc;
    font-size: 15px;
    border: none;
  }
</style>