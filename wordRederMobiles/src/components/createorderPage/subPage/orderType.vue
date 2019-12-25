<template>
  <div>
    <ul>
      <li v-for="item in orderType" :key="item.id" @click="selectBank(item)">
        <img src alt />
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "orderType",
  data() {
    return {
      orderType: [
        {
          id: 0,
          name: "设备报障"
        },
        {
          id: 1,
          name: "差错账"
        },
        {
          id: 2,
          name: "钞空/存满"
        },
        {
          id: 3,
          name: "吞卡"
        },
        {
          id: 4,
          name: "通讯中断"
        },
        {
          id: 5,
          name: "卡钞"
        },
        {
          id: 6,
          name: "PM"
        },
        {
          id: 7,
          name: "软硬件升级"
        },
        {
          id: 8,
          name: "咨询"
        },
        {
          id: 9,
          name: "设备确认"
        },
        {
          id: 10,
          name: "其他"
        },
      ]
    };
  },
  methods: {
    selectBank(data) {
      console.log(data);
      sessionStorage.setItem("orderType", JSON.stringify(data));
      this.$router.go(-1);
    }
  }
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
}
ul li img {
  width: 14px;
  height: 14px;
  border: 1px solid red;
  margin-right: 5px;
}
</style>