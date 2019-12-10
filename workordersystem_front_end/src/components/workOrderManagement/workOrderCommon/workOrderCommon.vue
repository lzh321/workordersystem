<template>
  <div class="workOrderCreate">
    <form action class="layui-form layui-form-pane">
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
        <div class="layui-form-item">
          <label class="layui-form-label">客户名称</label>
          <div class="layui-input-block">
            <input type="text" name="customerName" class="layui-input" disabled>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">合同ID</label>
          <div class="layui-input-block">
            <input type="text" name="agreenmentId" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备投放点</label>
          <div class="layui-input-block">
            <input type="text" name="networkId" class="layui-input" disabled>
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
            <input type="text" name="contactName" class="layui-input" disabled/>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系电话</label>
          <div class="layui-input-block">
            <input type="text" name="contactPhone" class="layui-input" disabled/>
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
            <input type="text" name="orderSource" class="layui-input" disabled/>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">工单类型</label>
          <div class="layui-input-block">
            <input type="text" name="orderType" class="layui-input" disabled/>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">紧急程度</label>
          <div class="layui-input-block">
            <input type="text" name="orderUrgency" class="layui-input" disabled/>
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
              disabled
            />
            <i></i>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备型号</label>
          <div class="layui-input-block">
            <input type="text" name="modelId" class="layui-input" disabled/>
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
            <textarea name="problemDescription" placeholder="请输入内容" class="layui-textarea" disabled></textarea>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">附件</label>
          <div id="affix">
            <div class="uploadImg">
              <img src="" alt="">

            </div>
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
      imgUrl: ""
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
    layui.use(["form", "upload", "laydate"], function() {
      var form = layui.form;
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
        elem: "#uploadPhoto", //绑定元素
        url: "../../assets/images/", //上传接口
        auto: false, //选择文件后不自动上传
        bindAction: "#upload", //指向一个按钮触发上传
        size:2024,
        multiple: true,
        choose: function(obj) {
          //将每次选择的文件追加到文件队列
          var files = obj.pushFile();

          //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
          obj.preview(function(index, file, result) {
            // console.log(index); //得到文件索引
            // console.log(file); //得到文件对象
            // console.log(result); //得到文件base64编码，比如图片
            var affix = document.getElementById("affix");
            var btn = document.getElementById("btn");
            var uploadImg = document.createElement("div");
            var img = document.createElement("img");
            img.src = result;
            img.style = "width:100%;height:100%";
            uploadImg.appendChild(img);
            uploadImg.style =
              "display:inline-block;width:200px;height:200px;float:left;margin-right:10px";
            affix.insertBefore(uploadImg, btn);
            // _this.imgUrl = result
            //obj.resetFile(index, file, '123.jpg'); //重命名文件名，layui 2.3.0 开始新增

            //这里还可以做一些 append 文件列表 DOM 的操作

            //obj.upload(index, file); //对上传失败的单个文件重新上传，一般在某个事件中使用
            //delete files[index]; //删除列表中对应的文件，一般在某个事件中使用
          });
        },
        // before: function(obj) {
        //   //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
        //   layer.load(); //上传loading
        // },
        done: function(res) {
          //上传完毕回调
        },
        error: function() {
          //请求异常回调
        }
      });
    });
  },
  created() {
    this.send();
  },
  updated() {
    setTimeout(function() {
      layui.use(["form"], function() {
        layui.form.render();
      });
    }, 10);
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
  border: 1px solid red;

}
.uploadImg img {
  width: 100%;
  height: 100%;
}
</style>