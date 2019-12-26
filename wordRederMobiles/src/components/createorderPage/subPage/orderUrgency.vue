<template>
  <div>
    <ul>
      <li v-for="item in orderUrgency" :key="item.id" @click="selectBank(item)">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "orderUrgency",
  data() {
    return {
      orderUrgency: [
        {
          id: 0,
          name: "一般"
        },
        {
          id: 1,
          name: "其他"
        }
      ]
    };
  },
  methods: {
    selectBank(data) {
      console.log(data);
      sessionStorage.setItem("orderUrgency", JSON.stringify(data));
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
  border-bottom: 1px solid #F3F3F3;
}
ul li img {
  width: 14px;
  height: 14px;
  border: 1px solid red;
  margin-right: 5px;
}
</style>