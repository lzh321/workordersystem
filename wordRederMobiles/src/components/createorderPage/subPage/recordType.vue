<template>
  <div>
    <ul>
      <li v-for="item in record" :key="item.recordName" @click="selectBank(item)">
        <span>{{item.recordName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "recordType",
  data() {
    return {
      recordList: [],
      record: [
        {
          recordType: 0,
          recordName: "硬件",
        },
        {
          recordType: 1,
          recordName: "软件",
          
        },
        {
          recordType: 2,
          recordName: "辅助",
         
        },
        {
          recordType: 3,
          recordName: "其他",
    
        }
      ]
    };
  },
  methods: {
    selectBank(data) {
      console.log(data);
      sessionStorage.setItem("recordType", JSON.stringify(data));
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