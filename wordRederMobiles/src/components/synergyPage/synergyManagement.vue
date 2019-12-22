<template>
  <div class="synergyManagement">
    <van-tabs
      v-model="active"
      swipeable
      color="#FFFFFF"
      title-active-color="#FFFFFF"
      title-inactive-color="#FFFFFF"
      background="#2F6CFF"
    >
      <van-tab v-for="(item, index) in tab" :key="index" :title="item.name">
        <ul class="list" v-if="active == 0">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <router-link tag="li" to="/synergyDispose?type=synergyDispose" v-for="items in 2" :key="items" :title="item.name">
                <div class="orderId">
                  <i>协同</i>
                  <span>单号：PM500115060058</span>
                </div>
                <div class="orderStatus">
                  <div>
                    <i></i>
                    <span>待受理</span>
                  </div>
                  <div>
                    <i></i>
                    <span>2019-10-26 15:32:45</span>
                  </div>
                </div>
                <div class="customerName orderContent">
                  <label for>客户名称：</label>
                  <span>民生银行</span>
                </div>
                <div class="DeliveryPoint orderContent">
                  <label for>投&nbsp;放&nbsp;点：</label>
                  <span>民生分行</span>
                </div>
                <div class="address orderContent">
                  <label for>地&emsp;&emsp;&nbsp;址：</label>
                  <span>民生银行</span>
                </div>
                <div class="urgency">
                  <img :src="items == 1 ? urgency.Urgent : urgency.ordinary" alt="">
                  <span>{{items == 1 ? '紧急' : '一般'}}</span>
                </div>
              </router-link>
          </van-list>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'synergyManagement',
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      tab: [{ name: "待办事项" }, { name: "历史记录" }],
      urgency: {
        Urgent: require("../../assets/Images/emergency.png"),
        ordinary: require("../../assets/Images/general.png")
      }
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    }
  }
}
</script>

<style scoped>
.synergyManagement {
  background: #f3f3f3;
  flex: 1;
}
.van-tabs {
  height: 100%;
}
.van-tabs__content{
  height: 100%;
}
.list {
  padding: 15px;
  height: 100%;
}
.list li {
  background: #ffffff;
  border-radius: 8px;
  padding: 15px 15px 5px;
  position: relative;
  margin-bottom: 10px;
}
.list li > div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.orderId i {
  background: url("../../assets/Images/synergy.png") no-repeat;
  background-size: 100%;
  width: 38px;
  height: 21px;
  text-align: center;
  line-height: 21px;
  color: #fff;
  margin-right: 10px;
  font-size: 12px;
}
.orderId span {
  font-size: 14px;
  color: #2f6cff;
}

.orderStatus {
  justify-content: space-between;
}
.orderStatus > div {
  display: flex;
  align-items: center;
}
.orderStatus > div:nth-child(1) i {
  width: 16px;
  height: 16px;
  background: url("../../assets/Images/operation_send-orders.png") no-repeat;
  background-size: 100%;
  margin-right: 5px;
}
.orderStatus > div:nth-child(1) span {
  color: #ff4c42;
  font-size: 11px;
}
.orderStatus > div:nth-child(2) i {
  width: 16px;
  height: 16px;
  background: url("../../assets/Images/time.png") no-repeat;
  background-size: 100%;
  margin-right: 5px;
}
.orderStatus > div:nth-child(2) span {
  color: #2f6cff;
  font-size: 11px;
}
.orderContent label {
  font-size: 11px;
  color: #999999;
  text-align-last: justify;
  width: 70px;
}
.orderContent span {
  font-size: 11px;
  color: #333333;
}
.orderContent span {
  width: 260px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.urgency{
  width: 41px;
  height: 41px;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
}
.urgency img{
  width: 100%;
  height: 100%;
}
.urgency span {
  transform: rotate(45deg);
  color: #ffffff;
  position: absolute;
  top: 6px;
  right: 1px;
  font-size: 10px;
}
</style>