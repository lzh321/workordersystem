<template>
  <div class="workOrderCommon">
    <form action class="layui-form layui-form-pane">
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
        <div class="layui-form-item">
          <label class="layui-form-label">客户名称</label>
          <div class="layui-input-block">
            <input type="text" name="customerName" class="layui-input" disabled />
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
            <input type="text" name="networkId" class="layui-input" disabled />
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
              value=""
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系人</label>
          <div class="layui-input-block">
            <input type="text" name="contactName" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系电话</label>
          <div class="layui-input-block">
            <input type="text" name="contactPhone" class="layui-input" disabled />
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
            <input type="text" name="orderSource" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">工单类型</label>
          <div class="layui-input-block">
            <input type="text" name="orderType" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">紧急程度</label>
          <div class="layui-input-block">
            <input type="text" name="orderUrgency" class="layui-input" disabled />
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
            <input type="text" name="modelId" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">存货编码</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="deviceNumber"
              value=""
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
              <img src alt />
            </div>
          </div>
        </div>

        <!-- 待派单组件 -->
        <waitSendOrders v-if="orderState == 1 ? true : false"></waitSendOrders>
      </div>
      <inProcess></inProcess>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="finish" v-if="orderState == 3 ? true : false">完成</button>
          <button class="layui-btn" lay-submit lay-filter="bill" v-if="orderState == 0 ? true : false">发单</button>
          <button class="layui-btn" lay-submit lay-filter="sendOrders" v-if="orderState == 1 ? true : false">派单</button>
          <button class="layui-btn" lay-submit lay-filter="acceptance" v-if="orderState == 2 ? true : false">受理</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="reassignment" v-if="orderState == 2 ? true : false">改派</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="reservation" v-if="orderState == 3 ? true : false">预约</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="synergy" v-if="orderState == 3 ? true : false">发起协同</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="reject" v-if="orderState == 7 || 1 ? true : false">驳回</button>
          <button type="reset" class="layui-btn layui-btn-primary" lay-submit lay-filter="Kuantan" >关单</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import waitSendOrders from '../workOrderDetails/waitSendOrders'
import inProcess from '../workOrderDetails/inProcess'
export default {
  name: "workOrderCommon",
  data() {
    return {
      orderState: ''
    };
  },
  components:{
    waitSendOrders,
    inProcess
  },
  methods: {
    cancel() {
      this.$router.push("/workOrderManagement?type=workOrderManagement");
    },
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

      //监听提交
      form.on("submit(bill)", function(data) {
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
    });
  },
  created() {
    this.orderState = sessionStorage.getItem("orderState")
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
  width: 100px;
  height: 100px;
  border: 1px solid red;
}
.uploadImg img {
  width: 100%;
  height: 100%;
}
</style>