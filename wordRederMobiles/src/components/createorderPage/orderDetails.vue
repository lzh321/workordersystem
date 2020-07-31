<template>
  <div class="orderDetails">
    <customerInfo v-if="orderStatus == 7 ? false : true" :orderInfo="orderInfo" :orderStatus="orderStatus" ></customerInfo>
    <!-- 待派单 -->
    <sendOrders ref="send" :orderStatus="orderStatus" v-if="orderStatus == 1"></sendOrders> 
    <!-- 待受理 -->
    <acceptance ref="accepted" :orderStatus="orderStatus" v-if="orderStatus == 2"></acceptance>
    <!-- 待处理 -->
    <dispose ref="dispose" :orderStatus="orderStatus" :orderInfo="orderInfo"  v-if="orderStatus == 3 || orderStatus == 4 || orderStatus == 5 || orderStatus == 9 || orderStatus == 10"></dispose>
    <!-- 待回访 -->
    <returnVisit ref="callback" :orderInfo="orderInfo" :orderStatus="orderStatus"  v-if="orderStatus == 7"></returnVisit>
    <!-- 已关单 -->
    <kuantan :orderInfo="orderInfo" :orderStatus="orderStatus"  v-if="orderStatus == 8"></kuantan>
    <div class="perch"></div>
    <div class="actionBtn">
      <ul>
        <li v-for="(item,index) in btnList" :key="index">
          <button lay-submit :lay-filter="item.btnName" :disabled="isDisabled">
            <img v-for="(itemImg,index) in imgList" v-show="item.btnName == itemImg.title" :key="index" :src="itemImg.img" alt />
            <span>{{item.btnName}}</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import customerInfo from './orderComponents/customerInfo'
import sendOrders from './orderComponents/sendOrders'
import acceptance from './orderComponents/acceptance'
import dispose from './orderComponents/dispose'
import returnVisit from './orderComponents/returnVisit'
import kuantan from './orderComponents/kuantan'
export default {
  name: 'orderDetails',
  data() {
    return {
      orderStatus: '',
      orderInfoId: '',
      orderInfo: {},
      btnList: [],
      isDisabled: false,
      imgList: [
        {title: '派单', img: require('../../assets/Images/operation_send-orders.png')},
        {title: '发单', img: require('../../assets/Images/operation_receipt.png')},
        {title: '取消', img: require('../../assets/Images/operation_cancel.png')},
        {title: '受理', img: require('../../assets/Images/operation_To-accept-the.png')},
        {title: '改派', img: require('../../assets/Images/operation_To-send.png')},
        {title: '驳回', img: require('../../assets/Images/operation_rejected.png')},
        {title: '预约', img: require('../../assets/Images/operation_order.png')},
        {title: '更改预约', img: require('../../assets/Images/operation_order.png')},
        {title: '出发', img: require('../../assets/Images/operation_order.png')},
        {title: '到达', img: require('../../assets/Images/operation_order.png')},
        {title: '开始', img: require('../../assets/Images/operation_order.png')},
        {title: '协同', img: require('../../assets/Images/operation_synergy.png')},
        {title: '完成', img: require('../../assets/Images/operation_complete.png')},
        {title: '关单', img: require('../../assets/Images/operation_kuantan.png')},
      ]
    }
  },
  components:{
    customerInfo,
    sendOrders,
    acceptance,
    dispose,
    returnVisit,
    kuantan
  },
  methods:{
    getOrderInfo(){
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      }
      this.axios.post("/api/getOrderInfo",data).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          this.orderInfo = res.data.body
        }
      })
      
    },
    getBtns() {
      // console.log(this.$('.content_main a'))
      var userId = this.$store.state.userId;
      this.axios({
        method: "post",
        url: "/api/getAllRoleInfoByUserId",
        data: {
          userId: userId,
          seleUserId: userId
        }
      })
        .then(res => {
          console.log(res);
          // debugger
          if (res.data.body.roleBtnList.length > 0) {
            var arr = [];
            for (var i = 0; i < res.data.body.roleBtnList.length; i++) {
              if (res.data.body.roleBtnList[i].btnLimit) {
                arr.push(JSON.parse(res.data.body.roleBtnList[i].btnLimit));
              }
            }
            console.log(arr);
            var url = location.pathname + location.search;
            console.log(url);
            var str = [];
            for (var j = 0; j < arr.length; j++) {
              for (var z = 0; z < arr[j].length; z++) {
                if (arr[j][z].btns && arr[j][z].menuUrl == '/workOrderManagement?type=workOrderManagement' || arr[j][z].btns && arr[j][z].menuUrl == '/personOrder?type=personOrder') {
                  console.log(arr[j][z].btns);
                  str = arr[j][z].btns;
                }
              }
            }
            if (str.length == 0) {
              return
            } else {
              var btns = str;
              for (var h = 0; h < btns.length; h++) {
                for (var k = h + 1; k < btns.length; k++) {
                  if (btns[h].btnCode == btns[k].btnCode) {
                    //第一个等同于第二个，splice方法删除第二个
                    btns.splice(k, 1);
                    k--;
                  }
                }
              }
              btns.forEach((item)=>{
                // console.log(item)                   
                if(this.orderStatus == 1){
                  if(item.btnName == '派单' || item.btnName == '驳回' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
                if (this.orderStatus == 2) {
                  console.log("0000")
                  // 待受理
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                  if(item.btnName == '受理' || item.btnName == '改派' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
                if (this.orderStatus == 3) {
                  // 处理中
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
        
                  if(item.btnName == '完成' || item.btnName == '预约' || item.btnName == '协同' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                  
                }
                if (this.orderStatus == 4) {
                  // 已预约
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                  if(item.btnName == '出发' || item.btnName == '更改预约' || item.btnName == '协同' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
                if (this.orderStatus == 5) {
                  // 已出发
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                  if(item.btnName == '到达' || item.btnName == '协同' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
                if (this.orderStatus == 7) {
                  //待回访
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                  if(item.btnName == '驳回' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
                if (this.orderStatus == 8) {
                  //已关单
                  this.btnList = []
                  return
                }
                if (this.orderStatus == 9) {
                  // 已到达
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                  if(item.btnName == '开始' || item.btnName == '协同' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
                if (this.orderStatus == 10) {
                  // 完成
                  // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                  if(item.btnName == '协同' || item.btnName == '完成' || item.btnName == '关单'){
                    this.btnList.push(item)
                  }
                  return
                }
              })
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    
  },
  mounted(){
    var _this=this
    layui.use(["form", "jquery"], function() {
      var form = layui.form;
      var $ = layui.jquery;
      form.on("submit(派单)", function(data) {
        _this.$refs.send.sendOrder()
      })
      form.on("submit(驳回)", function(data) {
        if(_this.orderStatus == 1){
          _this.$refs.send.reject()
        }
        if(_this.orderStatus == 7){
          _this.$refs.callback.reject()
        }
      })
      form.on("submit(受理)", function(data) {
        _this.$refs.accepted.accept()
      })
      form.on("submit(改派)", function(data) {
        _this.$refs.accepted.reassignment()
      })
      form.on("submit(预约)", function(data) {

        _this.$refs.dispose.showPopup()
      })
      form.on("submit(协同)", function(data) {
        _this.$refs.dispose.synergy()
      })
      form.on("submit(出发)", function(data) {
        _this.$refs.dispose.start()
      })
      form.on("submit(更改预约)", function(data) {
        _this.$refs.dispose.showPopup()
      })
      form.on("submit(到达)", function(data) {
        _this.$refs.dispose.reach()
      })
      form.on("submit(开始)", function(data) {
        _this.$refs.dispose.begin()
      })
      form.on("submit(关单)", function(data) {
        if(_this.orderStatus == 1){
          _this.$refs.send.kuantan()
        }
        if(_this.orderStatus == 2){
          _this.$refs.accepted.kuantan()
        }
        if(_this.orderStatus == 3 || _this.orderStatus == 4 || _this.orderStatus == 5 || _this.orderStatus == 9 || _this.orderStatus == 10){
          _this.$refs.dispose.kuantan()
        }
        if(_this.orderStatus == 7){
          _this.$refs.callback.kuantan()
        }
      })
      form.on("submit(完成)", function(data) {
        _this.$refs.dispose.finish()
      })
    })
  },
  created(){
    this.orderStatus = this.$route.query.orderStatus
    this.orderInfoId = sessionStorage.getItem("orderInfoId")
    this.getOrderInfo()
    this.getBtns()
  },
  // beforeDestroy(){
  //   sessionStorage.clear()
  // }
}
</script>

<style>
.orderDetails{
  background: #FFFFFF;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.actionBtn {
  padding: 0;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 9999;
}
.perch{
  padding: 10px 0;
  margin-top: 20px;
  height: 50px;
}
.actionBtn ul {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f0f0f0;
}
.actionBtn ul li button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: #f0f0f0;
}
.actionBtn ul li button img {
  width: 21px;
  height: 21px;
}
.actionBtn ul li:nth-child(1) button{
  color: #7CA6F7;
  font-size:14px; 
}
.actionBtn ul li:nth-child(2) button{
  color: #F8A32C;
  font-size:14px; 
}
.actionBtn ul li:nth-child(3) button{
  color: #999999;
  font-size:14px; 
}

textarea {
  width: 100%;
  margin-top: 10px;
  background: #FFFFFF;
  border: 1px solid #F3F3F3;
  color: #666666;
  font-size: 13px;
  padding: 5px;
}
span{
  font-size: 13px;
}
.remakeInfo label::before{
  content: ''
}
form>div>input[type="text"]{
  border: none !important;
}
</style>