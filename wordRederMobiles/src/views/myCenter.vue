<template>
  <div class="myCenter">
    <div class="userInfo">
      <div class="userInfo_content">
        <img src="../assets/Images/head-portrait.png" alt />
        <p class="userName">
          
          <span>曾帅</span>
        </p>
        <p class="userSex">
          <img src="../assets/Images/male.png" alt />
          <span>男</span></p>
        <p class="company">票联金融服务有限公司</p>
        <p class="Department">开发测试中心</p>
        <p class="job">工程师</p>
      </div>
      <div class="userInfo_Phone">
        <div>
          <img src="../assets/Images/number.png" alt="">
          <span>138-0231-0316</span>
        </div>
        <div>
          <img src="../assets/Images/email.png" alt="">
          <span>117232651215@qq.com</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myCenter"
};
</script>

<style scoped>
.myCenter {
  flex: 1;
  background: #2f6cff;
  padding: 100px 25px 80px;
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