<template>
  <div class="synergyManage">
    <div class="synergySearch">
    <div class="search">
      <div class="SearchEntrance">
        <i></i>
      </div>
      <input placeholder="搜索" v-model="searchVal" />
    </div>
    <NavBar></NavBar>
  </div>
    <div class="tabs">
      <ul>
        <li
          v-for="(item,index) in tab"
          :key="index"
          :class="index == cutId ? 'active' : ''"
          @click="cut(index)"
        >{{item.name}}</li>
      </ul>
    </div>

    <div class="tabs_content">
      <ul class="list">
        <li
              to="/bill"
              v-for="(items,index) in NewItems"
              :key="index"
              @click="goOrderPage(items.coordinateState,items.id)"
            >
              <div class="orderId">
                <i>协同</i>
                <span>单号：{{items.id}}</span>
              </div>
              <div class="orderStatus">
                <div>
                  <img :src="items.coordinateState == 0 ? orderStatusImg.bill : items.coordinateState == 1 ? orderStatusImg.sendOrders : items.coordinateState == 2 ? orderStatusImg.acceptance: items.coordinateState == 3 ? orderStatusImg.dispose : ''" alt />
                  
                  <span>{{items.coordinateState == 0 ? '待受理' : items.coordinateState == 1 ? '处理中' : items.coordinateState == 2 ? '已完成' : items.coordinateState == 3 ? '已驳回' : ''}}</span>
                </div>
                <div>
                  <i></i>
                  <span>{{items.createTime}}</span>
                </div>
              </div>
              <div class="customerName orderContent">
                <label for>创建人：</label>
                <span>{{items.createrUserName}}</span>
              </div>
              <div class="DeliveryPoint orderContent">
                <label for>工单编号：</label>
                <span>{{items.orderId}}</span>
              </div>
              <div class="urgency">
                <img :src="items.orderUrgency == 1 ? urgency.Urgent : items.orderUrgency == 0 ? urgency.ordinary : ''" alt />
                <span>{{items.orderUrgency == 1 ? '紧急' : items.orderUrgency == 0 ? '一般' : ''}}</span>
              </div>
            </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: "wordOrder",
  data() {
    return {
      active: 0,
      cutId: 0,
      searchVal: '',
      list: [],
      listData: [],
      currentPage: 1,
      everyCount: 100,
      totalCount: "",
      loading: false,
      finished: false,
      tab: [{ name: "待办事项" }, { name: "协同列表" }],
      urgency: {
        Urgent: require("../../assets/Images/emergency.png"),
        ordinary: require("../../assets/Images/general.png")
      },
      orderStatusImg: {
        bill: require("../../assets/Images/operation_receipt.png"),
        sendOrders: require("../../assets/Images/operation_send-orders.png"),
        kuantan: require("../../assets/Images/operation_kuantan.png"),
        reject: require("../../assets/Images/operation_rejected.png"),
        acceptance: require("../../assets/Images/operation_To-accept-the.png"),
        dispose: require("../../assets/Images/dispose.png"),
        appointment: require("../../assets/Images/operation_order.png"),
        visit: require("../../assets/Images/pay-a-return-visit.png")
      }
    };
  },
  components: {
    NavBar
  },
  methods: {
    // chanage(active){
    //   console.log(active)
    //   if(active == 0){
    //     this.getOrderInfoList("/api/getCoordinatePlanList",this.currentPage, this.everyCount);
    //   }
    //   if(active == 1){
    //     this.getOrderInfoList("/api/getCoordinateInfoList",this.currentPage, this.everyCount);
    //   }
    // },
    cut(index) {
      this.cutId = index;
      if(index == 0){
        this.getOrderInfoList("/api/getCoordinatePlanList",this.currentPage, this.everyCount);
      }
      if(index == 1){
        this.getOrderInfoList("/api/getCoordinateInfoList",this.currentPage, this.everyCount);
      }
    },

    goOrderPage(coordinateState,id) {
      console.log(coordinateState,id);
      if (coordinateState == 0) {   //发单
        this.$router.push("/synergyDispose?coordinateState=" + coordinateState);
        sessionStorage.setItem("id",id)
      }
      if (coordinateState == 1) {   //派单
         this.$router.push("/synergyDispose?coordinateState=" + coordinateState);
         sessionStorage.setItem("id",id)
      }
      if (coordinateState == 2) {   //待受理
         this.$router.push("/synergyDispose?coordinateState=" + coordinateState);
         sessionStorage.setItem("id",id)
      }
      if (coordinateState == 3) {   //处理中
         this.$router.push("/synergyDispose?coordinateState=" + coordinateState);
         sessionStorage.setItem("id",id)
      }

    },
    getOrderInfoList(url,currentPage, everyCount) {
      var data = {
        userId: this.$store.state.userId,
        currentPage: currentPage,
        everyCount: everyCount
      };
      this.axios.post(url, data).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          this.totalCount = res.data.body.totalCount;
          this.list = res.data.body.coordinateList;
        }
      });
    }
  },
  created() {
    this.getOrderInfoList("/api/getCoordinatePlanList",this.currentPage, this.everyCount);
  },
  computed: {
    //设置计算属性
    NewItems() {
      var _this = this;

      var NewItems = [];

      this.list.map(function(item) {
        if (item.id.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }else if (item.createTime.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }else if (item.orderId.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }else if (item.createrUserName.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }else if (item.orderState.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }
      });

      return NewItems;
    }
  },
};
</script>

<style scoped>
.synergyManage {
  background: #f3f3f3;
  /* height: 100%; */
}
.van-tabs {
  height: 100%;
}
.van-tabs__content {
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
  background: url("../../assets/Images/work-order.png") no-repeat;
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
.orderStatus > div:nth-child(1) img {
  width: 16px;
  height: 16px;
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
.urgency {
  width: 41px;
  height: 41px;
  position: absolute;
  top: 0;
  right: 0;
  background-size: 100%;
  text-align: center;
}
.urgency img {
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



.synergySearch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background: #2f6cff;
  color: #ffffff;
  height: 50px;
}
.tabs ul {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #2f6cff;
}
.tabs ul li {
  flex: .4;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  color: #FFFFFF;
}

.tabs ul .active {
  color: #FFFFFF;
  font-size: 19px;
}
.SearchEntrance {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  position: absolute;
  color: #2f6cff;
  top: 7px;
  left: 5px;
  width: 50px;
}
.search {
  display: flex;
  flex: 1;
  position: relative;
}
.search input {
  flex: 1;
  height: 30px;
  border: none;
  border-radius: 30px;
  padding-left: 45px;
  color: #333333;
  font-size: 15px;
}
.search input::placeholder {
  color: #2f6cff;
}
.SearchEntrance::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../../assets/Images/personnel_search.png") no-repeat;
  background-size: 100%;
}
.filtrate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  width: 30px;
  margin-left: 10px;
}

.filtrate::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 17px;
  background: url("../../assets/Images/screening.png") no-repeat;
  background-size: 100%;
}
</style>