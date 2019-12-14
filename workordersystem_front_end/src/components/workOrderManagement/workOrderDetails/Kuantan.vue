<template>
  <div class="Kuantan">
    <form action class="layui-form layui-form-pane">
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
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
              :value="workOrderInfo.orderSource == 0 ? '电话' : '其他'"
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
              :value="workOrderInfo.orderStateName"
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
            <input type="text" name :value="workOrderInfo.modelType" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">存货编码</label>
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
              placeholder="请输入内容"
              class="layui-textarea"
              disabled
            ></textarea>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">附件</label>
          <div id="affix">
            <div class="uploadImg">
            </div>
          </div>
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
              :value="workOrderInfo.deviceNumber"
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
              :value="workOrderInfo.deviceNumber"
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
              :value="workOrderInfo.problemDescription"
              placeholder="请输入内容"
              class="layui-textarea"
              disabled
            ></textarea>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>
<script>
import reservation from "./reservation";
import synergy from "./synergy";
import processingRecord from "./processingRecord";
export default {
  name: "Kuantan",
  data() {
    return {
      workOrderInfo: {}
    }
  },
  components:{
    reservation,
    synergy,
    processingRecord
  },
  methods:{
    workValuation(){
      var orderInfoId = sessionStorage.getItem("orderInfoId") ? sessionStorage.getItem("orderInfoId") : '';
      if(orderInfoId){
        var data = {
          userId: this.$store.state.userId,
          orderInfoId: orderInfoId
        };
        this.$axios.post("/api/getOrderInfo", data).then(res => {
          console.log(res);
          this.workOrderInfo = res.data.body;
          this.$(".uploadImg").html('<img style="width:100px;height:100px" src=" http://192.168.1.245/'+ res.data.body.orderPhoto.split(',')[0] +'" alt />')
        });
      }
    }
  },
  created(){
    this.workValuation()
  },
  mounted(){
    layui.use("form",function(){
      layui.form.render()
    })
  }
};
</script>
<style scoped>
.Kuantan{
  padding: 15px 15px 0;
}
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>