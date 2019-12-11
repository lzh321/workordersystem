<template>
  <div class="workOrderCreate">
    <form action class="layui-form layui-form-pane">
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
        <div class="layui-form-item">
          <label class="layui-form-label">客户名称</label>
          <div class="layui-input-block">
            <select name="customerName" lay-verify="required">
              <option value>请选择一个客户</option>
              <option
                v-for="(item) in customerNameList"
                :key="item.customerId"
                :value="item.customerId"
              >{{item.customerName}}</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">合同ID</label>
          <div class="layui-input-block">
            <input type="text" name="agreenmentId" class="layui-input" />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备投放点</label>
          <div class="layui-input-block">
            <select name="networkId" lay-filter="seleNetworkName" lay-verify="required">
              <option value>请选择一个投放点</option>
              <option
                v-for="(item) in networkList"
                :key="item.id"
                :value="item.id"
              >{{item.networName}}</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">投放点地址</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="networAddress"
              autocomplete="off"
              class="layui-input"
              :value="networAddress"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系人</label>
          <div class="layui-input-block">
            <input type="text" name="contactName" class="layui-input" />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系电话</label>
          <div class="layui-input-block">
            <input type="text" name="contactPhone" class="layui-input" />
          </div>
        </div>

        <!-- </div> -->
      </div>

      <div class="faultMessage">
        <h2>故障信息</h2>
        <!-- <div class="faultMessage_content information"> -->
        <div class="layui-form-item">
          <label class="layui-form-label">工单来源</label>
          <div class="layui-input-block">
            <select name="orderSource">
              <option value>选择工单来源</option>
              <option value="0">电话</option>
              <option value="1">其他</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">工单类型</label>
          <div class="layui-input-block">
            <select name="orderType">
              <option value>请选择工单类型</option>
              <option value="0">设备保障</option>
              <option value="1">差错账</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">紧急程度</label>
          <div class="layui-input-block">
            <select name="orderUrgency">
              <option value>请选择紧急程度</option>
              <option value="0">一般</option>
              <option value="1">紧急</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">报障时间</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="reportedBarrierTime"
              class="layui-input"
              id="reportedBarrierTime"
            />
            <i></i>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备型号</label>
          <div class="layui-input-block">
            <select name="modelId" lay-filter="seleModelType" lay-verify="required">
              <option value>请选择设备型号</option>
              <option
                v-for="(item) in deviceInfoList"
                :key="item.deviceId"
                :value="item.modelId"
              >{{item.modelType}}</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">存货编码</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="deviceNumber"
              :value="deviceNumber"
              class="layui-input"
              disabled
            />
          </div>
        </div>
        <!-- </div> -->
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">问题描述</label>
          <div class="layui-input-block">
            <textarea name="problemDescription" placeholder="请输入内容" class="layui-textarea"></textarea>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">附件</label>
          <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
          <div class="layui-upload">
          <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
            预览
              <div class="layui-upload-list" id="imgBox"></div>
              <input type="hidden" name="orderImg">
            </blockquote>
          </div>
        </div>

        <div class="layui-form-item">
          
          <label class="layui-form-label">指派给</label>
          <div class="layui-input-block">
            <select name="acceptUserId">
              <option value>亲选择指派人</option>
              <option value></option>
            </select>
          </div>
        </div>

        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">备注</label>
          <div class="layui-input-block">
            <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
          </div>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="workOrderCreate" id="workOrderCreate">发单</button>
          <button type="reset" class="layui-btn layui-btn-primary">关单</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "workOrderCreate",
  data() {
    return {
      customerNameList: [],
      networkList: [],
      deviceInfoList: [],
      userList: [],
      networAddress: "",
      deviceNumber: "",
      imgData: ""
    };
  },
  methods: {
    cancel() {
      this.$router.push("/workOrderManagement?type=workOrderManagement");
    },
    send() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getDeviceInfoList", userId).then(res => {
        // 设备型号
        // console.log(res)
        this.deviceInfoList = res.data.body.deviceInfoList;
      });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {
        // 客户名称
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post("/api/getNetworkList", userId).then(res => {
        // 设备投放地点
        // console.log(res)
        this.networkList = res.data.body.networkList;
      });
      this.$axios.post("/api/getUserList", userId).then(res => {
        // 员工列表
        // console.log(res)
        // this.userList = res.data.body.networkList
      });
    }
  },
  mounted() {
    var _this = this;
    layui.use(["form", "upload", "laydate","jquery"], function() {
      var form = layui.form;
      var $ = layui.jquery
      var upload = layui.upload;
      var laydate = layui.laydate;
      form.render();
      laydate.render({
        // 维保开始时间
        elem: "#reportedBarrierTime",
        type: "datetime",
        closeStop: "#reportedBarrierTime"
      });
      // select监听
      form.on("select(seleNetworkName)", function(data) {
        for (var i = 0; i < _this.networkList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.networkList[i].id) {
            _this.networAddress = _this.networkList[i].networAddress;
          }
        }
        if (data.value == "") {
          _this.networAddress = "";
        }
      });

      form.on("select(seleModelType)", function(data) {
        for (var i = 0; i < _this.deviceInfoList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.deviceInfoList[i].modelId) {
            _this.deviceNumber = _this.deviceInfoList[i].deviceNumber;
          }
        }
        if (data.value == "") {
          _this.deviceNumber = "";
        }
      });

      //监听提交
      form.on("submit(workOrderCreate)", function(data) {
        console.log(data.field);
        var alterId = sessionStorage.getItem("alterId")
          ? sessionStorage.getItem("alterId")
          : "";
        data.field.userId = _this.$store.state.userId;
        if (alterId === null || alterId === "" || alterId === undefined) {
          _this.$axios.post("/api/addOrderInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push(
                  "/workOrderManagement?type=workOrderManagement"
                );
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        } else {
          _this.$axios.post("/api/alterUserInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push(
                  "/workOrderManagement?type=workOrderManagement"
                );
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
        return false;
      });

      //上传图片
      upload.render({
        elem: "#uploadImage",
        url: "/api/uploadImagesInfo",
        method: "post",
        multiple: true,   //是否多文件上传
        accept: "images",  // 规定上传文件类型 ，images/file/video/audio
        auto: true,  // 是否自动上传
        field: 'image',   // 设定文件域字段
        choose: function(obj) {
          var files = obj.pushFile();
          obj.preview(function(index, file, result) { 
            var imgBox = document.getElementById("imgBox");
            var imgUrl = document.getElementById("imgUrl")
            var img = document.createElement("img");
            img.src = result;
            img.className = "layui-upload-img";
            img.alt = file.name;
            img.style = "width:100px;height:100px";
            imgBox.appendChild(img);
          });
        },
        before: function(obj) {
          //预读本地文件示例，不支持ie8
          
        },
        done: function(res) {
          //上传完毕
          console.log(res)
          $("input[name='orderImg']").val(res.body.url)
        }
      });

      

    });
  },
  created() {
    this.send();
  },
  updated() {
    // setTimeout(function() {
      layui.use(["form"], function() {
        layui.form.render();
      });
    // }, 10);
  }
};
</script>

<style scoped>
.workOrderCreate {
  padding: 20px 15px 0;
}
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
.uploadImg {
  display: inline-block;
  width: 200px;
  height: 200px;
}
.uploadImg img {
  width: 100%;
  height: 100%;
}
</style>