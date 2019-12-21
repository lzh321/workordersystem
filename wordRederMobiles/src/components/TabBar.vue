<template>
  <van-tabbar v-model="active" >
    <van-tabbar-item info="3" replace to="/wordOrder">
      <span>工单</span>
      <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
    </van-tabbar-item>
    <van-tabbar-item icon="search">创建</van-tabbar-item>
    <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: "https://img.yzcdn.cn/vant/user-active.png",
        inactive: "https://img.yzcdn.cn/vant/user-inactive.png"
      }
    };
  }
};
</script>

<style scoped>
</style>