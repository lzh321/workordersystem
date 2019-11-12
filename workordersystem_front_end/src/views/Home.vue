<template>
  <div class="home">
    <header>
      <h1 class="logo">工单管理系统</h1>
      <ul class="header_nav">
        <li class="header_nav_item">
          <p>Admin</p>
          <ul class="userOperate">
            <li class="userOperate_item">修改密码</li>
            <li class="userOperate_item">基本信息</li>
          </ul>
        </li>
        <li class="header_nav_item">消息中心</li>
        <li class="header_nav_item">退出</li>
      </ul>
    </header>
    <Main></Main>
  </div>
</template>

<script>
import Main from '@/components/main'
export default {
  name: "HelloWorld",
  data() {
    return {
      isLogin: true
    };
  },
  components: {
    Main
  },
  created(){
    if(!sessionStorage.getItem('isLogin')){
      this.isLogin = false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
header {
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  width: 180px;
  height: 100%;
  background: #445eee;
  color: #fff;
  text-align: center;
  line-height: 60px;
  font-weight: 400;
  font-size: 20px;
}
.header_nav {
  display: flex;
  align-items: center;
  margin-right: 10px;
  height: 100%;
}
.header_nav_item {
  position: relative;
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 12px;
  overflow: hidden;
}
.header_nav_item .userOperate {
  position: absolute;
  bottom: -75px;
  width: 100%;
  z-index: 9999;
  background: #fff;
  box-shadow: 2px 2px 5px -2px #ccc;
  font-size: 12px;
  height: 80px;
  text-align: center;
}
.header_nav_item .userOperate .userOperate_item {
  height: 40px;
  line-height: 40px;
}
.header_nav_item:hover{
  overflow: initial;
}
.header_nav_item:hover .userOperate {
  overflow: initial;
  width: 100%;
  text-align: center;
  bottom: -80px;
  transition: .5s;
  /* opacity: 1; */
}


</style>
