<template>
    <div class="tabBar">
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in icon" :key="index" replace :to="item.path">
        <span>{{item.name}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item>
    </van-tabbar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      icon: [
        {
          name: "工单",
          active: require("../assets/Images/home_selected.png"),
          inactive: require("../assets/Images/home_default.png"),
          path: "/wordOrder"
        },
        {
          name: "协同",
          active: require("../assets/Images/synergy_in.png"),
          inactive: require("../assets/Images/synergy_grey.png"),
          path: "/synergyManagement"
        },

        {
          name: "我的",
          active: require("../assets/Images/my_selected.png"),
          inactive: require("../assets/Images/my_default.png"),
          path: "/myCenter"
        }
      ]
    };
  }
};
</script>

<style scoped>
.tabBar{
  height: 50px;
}
</style>