<template>
  <div class="myCenter">
    <div class="userInfo">
      <div class="userInfo_content">
        <img src="../assets/Images/head-portrait.png" alt />
        <p class="userName">
          
          <span>{{userInfo.userName}}</span>
        </p>
        <p class="userSex">
          <img :src="userInfo.userSex == 0 ? require('../assets/Images/male.png') :  require('../assets/Images/female.png')" alt />
          <span>{{userInfo.userSex == 0 ? '男': '女'}}</span></p>
        <p class="company">{{userInfo.companyName}}</p>
        <p class="Department">{{userInfo.deptName}}</p>
        <p class="job">{{userInfo.jobName}}</p>
      </div>
      <div class="userInfo_Phone">
        <div>
          <img src="../assets/Images/number.png" alt="">
          <span>{{userInfo.userPhone}}</span>
        </div>
        <div>
          <img src="../assets/Images/email.png" alt="">
          <span>{{userInfo.userMail}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myCenter",
  data() {
    return {
      userInfo:{}
    }
  },
  created(){
    this.axios.post("/api/getUserInfo",{userId: this.$store.state.userId}).then(res=>{
      console.log(res)
      if(res.data.retCode == '000000') {
        this.userInfo = res.data.body[0]
      }
    })
  }
};
</script>

<style scoped>
.myCenter {
  flex: 1;
  background: #2f6cff;
  padding: 80px 25px 80px;
}
.userInfo {
  background: #ffffff;
  border-radius: 5px;
  height: 100%;
}
.userInfo_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
}
.userInfo_content>img {
  width: 81px;
  height: 81px;
  position: absolute;
  top: -35px;
}
.userName span{
  font-size: 25px;
}
.userSex {
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.userSex span{
  font-size: 14px;
}
.userSex img{
  width: 14px;
  height: 14px;
  margin-right: 5px;
}
.userInfo_content p {
  font-size: 17px;
  color: #666666;
  margin: 6px 0;
}
.userInfo_Phone {
  padding: 50px 0;
}
.userInfo_Phone div{
  display: flex;
  align-items: center;
  padding: 15px 30px;
}
.userInfo_Phone div img{
  width: 14px;
  height: 17px;
  margin-right: 10px;
}
.userInfo_Phone div span{
  font-size: 17px;
  color: #333333;
}

</style>