<template>
    <div class="tabBar">
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item,index) in icon" :key="index" replace :to="item.path">
        <span>{{item.name}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item>
    </van-tabbar> -->
    <ul>
      <li v-for="(item,index) in icon" :key="index" @click="tab(item.name)">
        <router-link :to="item.path" tag="div">
          <img class="activeImg" :src="isSelect == item.name ? item.active : item.inactive " :alt="item.name" />
          <span :class="isSelect == item.name ? 'active' : '' ">{{item.name}}</span>
        </router-link>
      </li>
    </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      isSelect: "工单",
      icon: [
        {
          name: "工单",
          active: require("../assets/Images/home_selected.png"),
          inactive: require("../assets/Images/home_default.png"),
          path: "/wordOrder?type=wordOrder"
        },
        {
          name: "协同",
          active: require("../assets/Images/synergy_in.png"),
          inactive: require("../assets/Images/synergy_grey.png"),
          path: "/synergyManagement?type=synergyManagement"
        },

        {
          name: "我的",
          active: require("../assets/Images/my_selected.png"),
          inactive: require("../assets/Images/my_default.png"),
          path: "/myCenter"
        }
      ]
    };
  },
  methods: {
    tab(name) {
      this.isSelect = name
      localStorage.setItem('isSelect', this.isSelect)
    }
  },
  mounted() {
    this.isSelect = localStorage.getItem('isSelect')
  },
  created(){
    this.isSelect = "工单"
  }
};
</script>

<style scoped>
.tabBar{
  height: 50px ;
}
.tabBar > ul {
  display: flex;
  align-items: center;
  height: 100%;
  background: #fff;
  /* box-shadow: 0px -2px 7px 0px #eee; */
}
.tabBar > ul > li {
  height: 100%;
  flex: 1;
  text-align: center;
}
.tabBar > ul > li > div {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tabBar > ul > li > div img {
  display: inline-block;
  width: 16px;
}
.tabBar > ul > li:nth-child(2) > div img {
  display: inline-block;
  width: 20px;
}
span {
  color: #a6a6ab;
  font-size: 14px;
}
.active {
  color: #2f6cff;
}
</style>