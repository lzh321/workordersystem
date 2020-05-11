<template>
  <!-- 关单详情 -->
  <div class="Kuantan">
    <form action class="layui-form layui-form-pane">
      <progressBar></progressBar>
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
        <div class="layui-form-item">
          <label class="layui-form-label">工单状态</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.orderStateName"
              class="layui-input"
              disabled
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">工单编号</label>
          <div class="layui-input-block">
            <input type="text" name :value="orderInfoId" class="layui-input" disabled />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">客户名称</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.customerName"
              class="layui-input"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">合同ID</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.agreenmentId"
              class="layui-input"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备投放点</label>
          <div class="layui-input-block">
            <input type="text" name :value="workOrderInfo.networName" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">投放点地址</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              autocomplete="off"
              class="layui-input"
              :value="workOrderInfo.networAddress"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系人</label>
          <div class="layui-input-block">
            <input type="text" name :value="workOrderInfo.contactName" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">联系电话</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.contactPhone"
              class="layui-input"
              disabled
            />
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
            <input
              type="text"
              name
              :value="workOrderInfo.orderSource"
              class="layui-input"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">工单类型</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.orderType"
              class="layui-input"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">紧急程度</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.orderUrgency == 0 ? '一般' : '紧急'"
              class="layui-input"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">报障时间</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              class="layui-input"
              id="reportedBarrierTime"
              :value="workOrderInfo.reportTime"
              disabled
            />
            <i></i>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备型号</label>
          <div class="layui-input-block">
            <input type="text" name :value="workOrderInfo.modelType + '（'+workOrderInfo.modelName +'）'" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备序列号</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.deviceNumber"
              class="layui-input"
              disabled
            />
          </div>
        </div>
        <!-- </div> -->
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">问题描述</label>
          <div class="layui-input-block">
            <textarea
              name
              :value="workOrderInfo.problemDescription"
              placeholder
              class="layui-textarea"
              disabled
            ></textarea>
          </div>
        </div>

        <div class="affix layui-form-item">
          <label class="layui-form-label">附件</label>
        </div>
        <div class="layui-upload">
          <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
            附件
            <div class="layui-upload-list" id="imgBox">
              <img
                v-for="(item,index) in imgDataArray"
                :key="index"
                class="layui-upload-img"
                style="width:100px;height:100px;margin-right:10px"
                :src="DomainName+ item "
                @click="previewImg()"
                :layer-src="DomainName+ item"
                alt
              />
            </div>
          </blockquote>
        </div>
      </div>

      <div>
        <!-- 故障处理记录 -->
        <processingRecord :workOrderInfo="workOrderInfo"></processingRecord>
      </div>

      <div>
        <!-- 协同作业 -->
        <synergy></synergy>
      </div>

      <div>
        <!-- 回访记录 -->
        <h2>回访记录</h2>
        <div class="layui-form-item">
          <label class="layui-form-label">问题是否已解决</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.isFinish == 0 ? '已解决' : (workOrderInfo.isFinish == 1 ? '未解决' : '')"
              class="layui-input"
              disabled
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">满意度情况</label>
          <div class="layui-input-block">
            <input
              type="text"
              name
              :value="workOrderInfo.satisfiedState == 0 ? '满意' : (workOrderInfo.satisfiedState == 1 ? '基本满意' : (workOrderInfo.satisfiedState == 2 ? '不满意' : ''))"
              class="layui-input"
              disabled
            />
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">意见/建议</label>
          <div class="layui-input-block">
            <textarea
              name
              :value="workOrderInfo.adviseContent"
              placeholder
              class="layui-textarea"
              disabled
            ></textarea>
          </div>
        </div>
      </div>
      <div  class="layui-input-block">
        <button
            type="button"
            class="layui-btn"
            @click="goBack"
          >返回</button>
      </div>
      <workOrderLog></workOrderLog>
    </form>
  </div>
</template>
<script>
// import reservation from "./reservation";
import synergy from "./synergy";
import processingRecord from "./processingRecord";
import progressBar from "../../progressBar";
import workOrderLog from "../workOrderDetails/workOrderLog";
export default {
  name: "Kuantan",
  data() {
    return {
      workOrderInfo: {},
      orderInfoId: localStorage.getItem("orderInfoId"),
      imgDataArray: [],
      DomainName: this.$store.state.url
    };
  },
  components: {
    // reservation,
    synergy,
    processingRecord,
    progressBar,
    workOrderLog
  },
  methods: {
    previewImg(){  // 图片预览
      layer.photos({
        photos: "#imgBox"
        ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
      });
    },
    workValuation() {
      var orderInfoId = localStorage.getItem("orderInfoId")
        ? localStorage.getItem("orderInfoId")
        : "";
      if (orderInfoId) {
        var data = {
          userId: this.$store.state.userId,
          orderInfoId: orderInfoId
        };
        this.$axios.post("/api/getOrderInfo", data).then(res => {
          console.log(res);
          this.workOrderInfo = res.data.body;

          for (var i = 0; i < res.data.body.orderPhoto.split(",").length; i++) {
            if (res.data.body.orderPhoto.split(",")[i] !== "") {
              this.imgDataArray.push(res.data.body.orderPhoto.split(",")[i]);
            }
          }
        });
      }
    },
    goBack(){
      this.$router.push({path: "/workOrderManagement?type=workOrderManagement"})
    }
  },
  created() {
    this.workValuation();
  },
  mounted() {
    layui.use("form", function() {
      layui.form.render();
    });
  }
};
</script>
<style scoped>
.Kuantan {
  padding: 15px 15px 0;
}
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
.layui-form-label {
  width: 130px;
}
.layui-input-block {
  margin-left: 130px;
}
</style>