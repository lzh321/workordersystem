<template>
  <!-- 协同 -->
  <div class="synergyInfo">
    <div class="info">
      <h2>协同作业</h2>
    </div>
    <ul>
      <li v-for="(item,index) in synergyList" :key="index">
        <div>
          <label for>
            <span>指派给</span>：
          </label>
          <span>{{item.responsibleName}}</span>
        </div>

        <div>
          <label for>
            <span>紧急程度</span>：
          </label>
          <span>{{item.orderUrgency == 0 ? '一般' : item.orderUrgency == 1 ? '紧急' : ''}}</span>
        </div>

        <div>
          <label for>
            <span>状态</span>：
          </label>
          <span>{{item.coordinateState == 0 ? '待受理' : item.coordinateState == 1 ? '处理中' : item.coordinateState == 2 ? '已完成' : item.coordinateState == 3 ? '已驳回' : ''}}</span>
        </div>

        <div>
          <label for>
            <span>编号</span>：
          </label>
          <span>{{item.id}}</span>
        </div>
        <div class="synergyContent">
          <label for>
            <span>协同内容</span>：
          </label>
          <span>{{item.content}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "synergyInfo",
  data() {
    return {
      orderInfoId: "",
      synergyList: []
    };
  },
  methods: {
    getSynergy() {
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      };
      this.axios.post("/api/getOrderCoordinateList", data).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          this.synergyList = res.data.body.coordinateList;
        }
      });
    }
  },
  created() {
    this.orderInfoId = sessionStorage.getItem("orderInfoId");
    this.getSynergy();
  }
};
</script>

<style scoped>
.sunergy {
  /* padding: 0 15px; */
}
.info {
  justify-content: space-between;
}
.info h2::before {
  content: "|";
  font-size: 14px;
  color: #333333;
  margin-right: 2px;
}
h2 {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.sunergy ul li {
  padding: 15px 0;
  /* border-top: 1px solid #F3F3F3; */
}
li div {
  display: flex;
  /* justify-content: space-between; */
  padding: 5px 0;
  font-size: 14px;
  color: #666666;
}
.sunergy ul li > div div:nth-child(1) {
  flex: 0.7;
  display: flex;
  align-items: center;
}
.sunergy ul li > div div:nth-child(2) {
  flex: 1;
  display: flex;
  align-items: center;
}
label {
  display: flex;
  /* align-items: center; */
  color: #999999;
}
label span {
  display: inline-block;
  width: 60px;
  text-align-last: justify;
}
</style>