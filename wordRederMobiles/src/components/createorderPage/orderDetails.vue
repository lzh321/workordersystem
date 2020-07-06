<template>
  <div class="orderDetails">
    <customerInfo v-if="orderStatus == 7 ? false : true" :orderInfo="orderInfo" :orderStatus="orderStatus" ></customerInfo>
    <!-- 待派单 -->
    <sendOrders :orderStatus="orderStatus" v-if="orderStatus == 1"></sendOrders> 
    <!-- 待受理 -->
    <acceptance :orderStatus="orderStatus" v-if="orderStatus == 2"></acceptance>
    <!-- 待处理 -->
    <dispose :orderStatus="orderStatus" :orderInfo="orderInfo"  v-if="orderStatus == 3 || orderStatus == 4 || orderStatus == 5 || orderStatus == 9 || orderStatus == 10"></dispose>
    <!-- 待回访 -->
    <returnVisit :orderInfo="orderInfo" :orderStatus="orderStatus"  v-if="orderStatus == 7"></returnVisit>
    <!-- 已关单 -->
    <kuantan :orderInfo="orderInfo" :orderStatus="orderStatus"  v-if="orderStatus == 8"></kuantan>
    <!-- <div class="perch"></div>
    <div class="actionBtn">
      <ul>
        <li v-for="(item,index) in btnList" :key="index" >
          <button lay-submit :lay-filter="item.btnName" :disabled="isDisabled">
            <img src="../../assets/Images/operation_send-orders.png" alt />
            <span>{{item.btnName}}</span>
          </button>
        </li>
      </ul>
    </div> -->
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
      imgList: [{title: '派单', img: '../../assets/Images/operation_send-orders.png'}]
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
              var btn = str;
              for (var h = 0; h < btn.length; h++) {
                for (var k = h + 1; k < btn.length; k++) {
                  if (btn[h].btnCode == btn[k].btnCode) {
                    //第一个等同于第二个，splice方法删除第二个
                    btn.splice(k, 1);
                    k--;
                  }
                }
              }
              this.btnList = btn;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted(){
    layui.use(["form", "jquery"], function() {
      var form = layui.form;
      var $ = layui.jquery;
      form.on("submit(完成)", function(data) {
        console.log(data)
      })
    })
  },
  created(){
    this.orderStatus = this.$route.query.orderStatus
    this.orderInfoId = sessionStorage.getItem("orderInfoId")
    this.getOrderInfo()
    // this.getBtns()
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