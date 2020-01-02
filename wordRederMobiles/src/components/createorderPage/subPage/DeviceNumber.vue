<template>
  <div>
    <ul>
      <li v-for="item in DeviceNumber" :key="item.deviceId" @click="select(item)">
        <span>{{item.deviceNumber}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DeviceNumber",
  data() {
    return {
      DeviceNumber: []
    };
  },
  methods: {
    select(data) {
      console.log(data);
      sessionStorage.setItem("DeviceNumber", JSON.stringify(data));
      this.$router.go(-1);
    },
    getNetworkList() {
      var data = JSON.parse(sessionStorage.getItem("modelType"))
      console.log(data)
      this.DeviceNumber = data.deviceNumberList
    }
  },

  created() {
    this.getNetworkList();
  },
  // activated() {
  //   this.getNetworkList();
  // }
};
</script>

<style scoped>
div {
  padding: 0 15px;
}
ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #F3F3F3;
}
ul li img {
  width: 14px;
  height: 14px;
  border: 1px solid red;
  margin-right: 5px;
}
</style>