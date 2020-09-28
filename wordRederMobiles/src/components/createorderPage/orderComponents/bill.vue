<template>
  <div class="bill">
    <form action id="createData">
      <div class="info">
        <h2>客户信息</h2>
        <i>为必填项</i>
      </div>
      <div class>
        <label for>
          <span>工单状态</span>：
        </label>
        <input type="text" :value="orderInfo.orderStateName" disabled />
      </div>
      <div class>
        <label for>
          <span>工单编号</span>：
        </label>
        <input type="text" :value="orderInfoId" disabled />
      </div>
      <div @click="selectCustomer">
        <label for>
          <span>客户名称</span>：
        </label>
        <input
          name="customerName"
          :value="bankList.customerId ? bankList.customerId : orderInfo.customerId"
          type="hidden"
        />
        <input
          type="text"
          :value="bankList.customerName ? bankList.customerName : orderInfo.customerName"
          placeholder="请选择客户名称"
        />
        <span>可选</span>
      </div>
      <div @click="selectNetwork(bankList.customerId ? bankList.customerId : orderInfo.customerId)">
        <label for>
          <span>设备投放点</span>：
        </label>
        <div v-if="networkList">
          <input name="networkId" :value="networkList.id" type="hidden" />
          <input type="text" :value="networkList.networName" placeholder="请选择设备投放点" />
        </div>
        <div v-else>
          <input name="networkId" :value="orderInfo.networkId" type="hidden" />
          <input type="text" :value="orderInfo.networName" placeholder="请选择设备投放点" />
        </div>

        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>投放点地址</span>：
        </label>
        <input v-if="networkList" type="text" :value="networkList.networAddress" disabled />
        <input v-else type="text" :value="orderInfo.networAddress" disabled />
      </div>
      <div>
        <label for>
          <span>联系人</span>：
        </label>
        <input
          v-model="contactName"
          @keyup="setContactName"
          type="text"
          name="contactName"
        />
      </div>
      <div>
        <label for>
          <span>联系电话</span>：
        </label>
        <input
          v-model="contactPhone"
          @keyup="setContactPhone"
          type="text"
          name="contactPhone"
        />
      </div>
      <div class="agreenmentId">
        <label for>
          <span>合同</span>：
        </label>
        <input
          v-model="agreenmentId"
          @keyup="setAgreenmentId"
          type="text"
          name="agreenmentId"
        />
      </div>
      <div>
        <h2>故障信息</h2>
      </div>
      <router-link to="/orderSource" tag="div">
        <label for>
          <span>工单来源</span>：
        </label>
        <div v-if="orderSource">
          <input type="text" :value="orderSource.name" />
          <input name="orderSource" :value="orderSource.name" type="hidden" />
        </div>
        <div v-else>
          <input type="text" :value="orderInfo.orderSource" />
          <input name="orderSource" :value="orderInfo.orderSource" type="hidden" />
        </div>

        
        <span>可选</span>
      </router-link>
      <router-link tag="div" to="/orderType">
        <label for>
          <span>工单类型</span>：
        </label>
        <div v-if="orderType">
          <input type="text" :value="orderType.name" />
          <input name="orderType" :value="orderType.name" type="hidden" />
        </div>
        <div v-else>
          <input type="text" :value="orderInfo.orderType" />
          <input name="orderType" :value="orderInfo.orderType" type="hidden" />
        </div>
        
        <span>可选</span>
      </router-link>
      <div>
        <label for>
          <span>紧急程度</span>：
        </label>
        
        <input
          type="radio"
          name="orderUrgency"
          value="1"
          :checked="orderUrgency == 1 ? true : false"
          v-model="orderUrgency"
          @change="setVal(orderUrgency)"
        />紧急
        <input
          type="radio"
          name="orderUrgency"
          value="0"
          v-model="orderUrgency"
          @change="setVal(orderUrgency)"
          :checked="orderUrgency == 0 ? true : false"
        />一般
      </div>
      <div>
        <label for>
          <span>报障时间</span>：
        </label>
        <input v-if="reportTime" type="text" v-model="reportTime" id="reportTime" name="reportTime" />
        <input v-else type="text" :value="orderInfo.reportTime" id="reportTime" name="reportTime" />
        <span>可选</span>
      </div>
      <div @click="selectmodelType(networkList ? networkList.id : orderInfo.networkId)" tag="div">
        <label for>
          <span>设备型号</span>：
        </label>
        <div v-if="modelType">
          <input
          type="text"
          :value="modelType.modelType "
          placeholder="请选择设备型号"
          />
          <input
            name="modelId"
            :value="modelType.modelId"
            type="hidden"
          />
        </div>
        <div v-else>
          <input
          type="text"
          :value=" orderInfo.modelType"
          placeholder="请选择设备型号"
          />
          <input
            name="modelId"
            :value="orderInfo.modelId "
            type="hidden"
          />
        </div>
        
        <span>可选</span>
      </div>
      <div @click="selectDeviceNumber(networkList ? networkList.id : orderInfo.networkId)">
        <label for>
          <span>设备序列号</span>：
        </label>
        <div v-if="DeviceNumber">
          <input
            type="text"
            :value="DeviceNumber.deviceNumber"
            placeholder="请选择设备序列号"
          />
          <input
            name="deviceNumber"
            :value="DeviceNumber.deviceNumber"
            type="hidden"
          />
        </div>
        <div v-else>
          <input
            type="text"
            :value="orderInfo.deviceNumber"
            placeholder="请选择设备序列号"
          />
          <input
            name="deviceNumber"
            :value="orderInfo.deviceNumber"
            type="hidden"
          />
        </div>
        
        <span>可选</span>
      </div>
      <div class="problem">
        <label for>
          <span>问题描述</span>：
        </label>
        <textarea
          v-model="problemDescription"
          @keyup="setProblemDescription"
          name="problemDescription"
          cols="30"
          rows="10"
        ></textarea>
      </div>

      <div v-if="orderStatus == 7 ? false : true" class="affix layui-form-item">
        <div>
          <label for>
            <span>附件</span>：
          </label>
          <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
        </div>
        <div class="layui-upload">
          <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;padding: 4px">
            预览
            <viewer class="layui-upload-list" style="display:flex;flex-wrap:wrap" :images="imgDataArray">
              <div v-for="(item,index) in imgDataArray" :key="index" style="flex: none;width:100px;height:100px;margin-right:10px;margin-bottom:10px;display:inline-block;">
                <img
                class="layui-upload-img"
                style="width:100%;height:100%"
                :src="DomainName+ item "
                :layer-src="DomainName+ item"
                alt
                />
                <a href="javascript:;" @click="delImg(item,index)" class="delImg">X</a>
              </div>
            </viewer>
            <input type="hidden" name="orderImg" :value="imgData" />
          </blockquote>
        </div>
      </div>

      <router-link v-if="orderStatus == 7 ? false : true" to="/userList" tag="div">
        <label for>
          <span>指派给</span>：
        </label>
        <!-- <div class="seleUser" v-if="orderInfo.userId ? true : false">
          <input type="hidden" name="acceptUserId" :value="orderInfo.userId" />
          <input type="text" :value="orderInfo.singlePerson" />
        </div>-->
        <div class="seleUser">
          <input
            type="hidden"
            name="acceptUserId"
            :value="userList.userId ? userList.userId : orderInfo.singlePersonId"
          />
          <input
            type="text"
            :value="userList.userName ? userList.userName : orderInfo.singlePerson"
          />
        </div>

        <span>可选</span>
      </router-link>
      <div v-if="orderStatus == 7 ? false : true" class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" cols="30" rows="10"></textarea>
      </div>
      <div v-if="orderStatus == 7 ? false : true" class="Log">
        <orderLog></orderLog>
      </div>
    </form>
    <div class="perchs"></div>
    <div v-if="orderStatus == 7 ? false : true" class="actionBtn">
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
import orderLog from "../orderComponents/orderLog";
export default {
  name: "bill",
  data() {
    return {
      fileList: [],
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      orderInfo: {},
      bankList: {},
      networkList: null,
      orderSource: null,
      orderType: null,
      modelType: null,
      userList: {},
      imgData: "",
      imgDataArray: [],
      DeviceNumber: null,
      isDisabled: false,
      DomainName: this.$store.state.url,
      contactName: "",
      contactPhone: "",
      agreenmentId: "",
      reportTime: sessionStorage.getItem("reportTime") ? sessionStorage.getItem("reportTime") : "",
      problemDescription: "",
      orderUrgency: "",
      orderStatus: "",
      imgList: [
        {title: '发单', img: require('../../../assets/Images/operation_receipt.png')},
        {title: '返回', img: require('../../../assets/Images/operation_cancel.png')},
        {title: '关单', img: require('../../../assets/Images/operation_kuantan.png')},
      ],
      btnList: [],
    };
  },
  components: {
    orderLog
  },
  mounted() {
    this.send();
    var _this = this;
    layui.use(["form","jquery","laydate", "upload"], function() {
      var laydate = layui.laydate;
      var form = layui.form;
      var $ = layui.jquery;
      var upload = layui.upload;
      //执行一个laydate实例
      laydate.render({
        elem: "#reportTime", //指定元素
        type: "datetime",
        closeStop: "#reportTime",
        trigger: "click",
        done: function(value){
          console.log(value)
          sessionStorage.setItem("reportTime",value)
        }
      });
      form.on("submit(发单)", function(data) {
        _this.bill()
      })
      form.on("submit(关单)", function(data) {
        _this.kuantan()
      })
      form.on("submit(返回)", function(data) {
        _this.cancel()
      })

      //上传图片
      upload.render({
        elem: "#uploadImage",
        url: "/api/uploadImagesInfo",
        // bindAction: "#uploadImage",
        method: "post",
        multiple: false, //是否多文件上传
        accept: "images", // 规定上传文件类型 ，images/file/video/audio
        auto: true, // 是否自动上传
        size: 4096,
        field: "file", // 设定文件域字段
        choose: function(obj) {
          obj.preview(function(index, file, result) {
            console.log(index, file);
            // obj.resetFile(index, file, _this.orderInfoId + '-' + index); //重命名文件名
          });
          this.data = { orderInfoId: _this.orderInfoId, soreId: 1 };
        },
        before: function(obj) {
          //预读本地文件示例，不支持ie8
        },
        // allDone:function(obj){
        //   console.log(obj.total); //得到总文件数
        //   console.log(obj.successful); //请求成功的文件数
        //   console.log(obj.aborted); //请求失败的文件数
        // },
        done: function(res) {
          //上传完毕
          console.log(res);
          if (res.retCode == 0) {
            layer.msg(res.retMsg, { icon: 1 });
          } else {
            layer.msg(res.retMsg, { icon: 2 });
          }
          _this.imgDataArray.push(res.body.url.split(",")[0]);
          _this.imgData = _this.imgDataArray.join(",");
          console.log(_this.imgData);
          // _this.$("input[name='orderImg']").val(res.body.url);
        }
      });
    });
  },
  methods: {
    delImg(item, index) {
      // 删除附件图片
      this.imgDataArray.splice(index, 1);
      this.imgData = this.imgDataArray.join(",");
      this.axios
        .post("/api/deleImagesInfo", {
          userId: this.$store.state.userId,
          url: item
        })
        .then(res => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
      this.axios.post("/api/alter", {userId: this.$store.state.userId,orderInfoId:this.orderInfoId,orderPhoto: this.imgData}).then(res => {
        console.log(res);
      });
    },
    selectCustomer() {
      this.$router.push("/selectBank");
      sessionStorage.setItem("networkdata",JSON.stringify({}));
      sessionStorage.setItem("modelType",JSON.stringify({}));
      sessionStorage.setItem("DeviceNumber",JSON.stringify({}));
    },

    selectNetwork(customerId) {
      this.$router.push("/network?customerId=" + customerId);
      sessionStorage.setItem("modelType",JSON.stringify({}));
      sessionStorage.setItem("DeviceNumber",JSON.stringify({}));
    },
    selectmodelType(networkId) {
      this.$router.push("/modelType?networkId=" + networkId);
    },
    selectDeviceNumber(networkId) {
      this.$router.push("/DeviceNumber?networkId=" + networkId);
    },
    
    setContactName() {
      console.log(this.contactName);
      sessionStorage.setItem("contactName", this.contactName);
    },
    setContactPhone() {
      console.log(this.contactPhone);
      sessionStorage.setItem("contactPhone", this.contactPhone);
    },
    setAgreenmentId() {
      console.log(this.agreenmentId);
      sessionStorage.setItem("agreenmentId", this.agreenmentId);
    },
    setProblemDescription() {
      console.log(this.problemDescription);
      sessionStorage.setItem("problemDescription", this.problemDescription);
      this.reportTime = sessionStorage.getItem("reportTime") ? sessionStorage.getItem("reportTime") : ""
    },
    setVal(orderUrgency){
      console.log(orderUrgency)
      sessionStorage.setItem("orderUrgency",orderUrgency)
    },
    send() {
      var bankList = sessionStorage.getItem("bankList");
      var networkList = sessionStorage.getItem("networkdata");
      var orderSource = sessionStorage.getItem("orderSource");
      var orderType = sessionStorage.getItem("orderType");
      var modelType = sessionStorage.getItem("modelType");
      var userList = sessionStorage.getItem("userList");
      var DeviceNumber = sessionStorage.getItem("DeviceNumber");
      console.log(bankList);
      if (bankList) {
        //客户名称
        this.bankList = JSON.parse(bankList);
        this.orderInfo.networName = ""
      }
      if (networkList) {
        //投放点
        this.networkList = JSON.parse(networkList);
      }
      if (orderSource) {
        //工单来源
        this.orderSource = JSON.parse(orderSource);
      }
      if (orderType) {
        //工单类型
        this.orderType = JSON.parse(orderType);
      }
      if (modelType) {
        //设备类型
        this.modelType = JSON.parse(modelType);
      }
      if (userList) {
        //用户列表
        this.userList = JSON.parse(userList);
      }
      if (DeviceNumber) {
        //存货编号列表
        this.DeviceNumber = JSON.parse(DeviceNumber);
      }
    },
    getOrderInfo() {
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      };
      this.axios.post("/api/getOrderInfo", data).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          this.orderInfo = res.data.body;
          this.imgData = res.data.body.orderPhoto;
          for (var i = 0; i < res.data.body.orderPhoto.split(",").length; i++) {
            if (res.data.body.orderPhoto.split(",")[i] !== "") {
              this.imgDataArray.push(res.data.body.orderPhoto.split(",")[i]);
            }
          }
          this.contactName = sessionStorage.getItem("contactName") ? sessionStorage.getItem("contactName") : res.data.body.contactName
          this.contactPhone = sessionStorage.getItem("contactPhone") ? sessionStorage.getItem("contactPhone") : res.data.body.contactPhone
          this.agreenmentId = sessionStorage.getItem("agreenmentId") ? sessionStorage.getItem("agreenmentId") : res.data.body.agreenmentId
          this.problemDescription = sessionStorage.getItem("problemDescription") ? sessionStorage.getItem("problemDescription") : res.data.body.problemDescription
          this.orderUrgency = sessionStorage.getItem("orderUrgency") ? sessionStorage.getItem("orderUrgency") : res.data.body.orderUrgency
        }
      });
    },
    getBtns() {
      console.log(this.orderStatus)
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
                if (this.orderStatus == 0 ) {
                  //待发单
                    // 编辑 关单 发单 派单 受理 驳回  改派 预约 协同 更改预约 出发  到达  开始 完成
                    if(item.btnName == '发单' || item.btnName == '返回' || item.btnName == '关单'){
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
    bill() {
      // 发单
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 0;
      console.log(createData);
      this.isDisabled = true;
      this.axios.post("/api/alterOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder?type=wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false;
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    cancel() {
      //取消
      this.$router.push("/wordOrder?type=wordOrder");
      sessionStorage.clear();
    },
    kuantan() {
      // 关单
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 1;
      console.log(createData);
      // this.isDisabled = true;
      var _this = this;
      layer.confirm(
        "是否确认关闭当前工单？",
        { icon: 3, title: "提示" },
        function(index) {
          //向服务端发送关单指令
          _this.axios.post("/api/alterOrderInfo", createData).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              sessionStorage.clear();
              setTimeout(() => {
                _this.$router.push("/wordOrder?type=wordOrder");
              }, 3000);
            } else {
              setTimeout(() => {
                _this.isDisabled = false;
              }, 2000);
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
      );
    }
  },
  created() {
    this.orderStatus = this.$route.query.orderStatus
    this.getOrderInfo();
    this.send();
    this.getBtns()
    
  },
  updated(){
    layui.use(["laydate"],function(){
      layui.laydate.render()
    })
  }
};
</script>

<style scoped>
.bill {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  /* height: 100%; */
}
form {
  padding: 0px;
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
form > div {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
}
form > div div{
  flex: 1;
}
h2 {
  font-size: 16px;
  font-weight: 600;
}
.bill div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 13px;
}
.bill div > span::after {
  content: "";
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url("../../../assets/Images/choose.png") no-repeat;
  background-size: 100%;
  margin-left: 5px;
}
label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
label::before {
  content: "*";
  color: red;
  display: inline-block;
  margin-right: 3px;
}
label span {
  width: 80px;
  font-size: 16px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: none;
  height: 35px;
  padding-left: 4px;
  font-size: 16px;
  color: #666666;
  background: #ffffff;
}
input[type="radio"] {
  margin: 0 5px;
}

.info {
  justify-content: space-between;
}
.info i {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #999999;
}
.info i::before {
  content: "*";
  color: red;
  display: inline-block;
}

.bill .affix {
  align-items: baseline;
  flex-direction: column;
}
.bill .affix div {
  border: none;
}
.bill .remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.bill .problem {
  align-items: baseline;
  flex-direction: column;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  color: #666666;
  font-size: 15px;
  padding: 5px;
}

.actionBtn {
  padding: 0;

  position: fixed;
  width: 100%;
  bottom: 0;
}
.perchs {
  padding: 10px 0;
  height: 60px;
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
.actionBtn ul li:nth-child(1) button {
  color: #7ca6f7;
  font-size: 14px;
}
.actionBtn ul li:nth-child(2) button {
  color: #f8a32c;
  font-size: 14px;
}
.actionBtn ul li:nth-child(3) button {
  color: #999999;
  font-size: 14px;
}
.deviceNumber label::before {
  content: "";
}
.affix label::before {
  content: "";
}
.remakeInfo label::before {
  content: "";
}
.seleUser {
  flex: 1;
}
.seleUser input {
  width: 100%;
}

.affix div {
  display: flex;
}
.uploadImg {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  padding: 0;
}
.layui-upload {
  width: 100%;
  padding: 0;
}
.layui-elem-quote {
  width: 100%;
}
.layui-btn {
  height: 35px;
  line-height: 35px;
}
#billImgBox {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.delImg {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #c2c2c2;
  position: absolute;
  text-align: center;
  right: 2px;
  top: 0px;
}
.agreenmentId label::before {
  content: "";
}

</style>