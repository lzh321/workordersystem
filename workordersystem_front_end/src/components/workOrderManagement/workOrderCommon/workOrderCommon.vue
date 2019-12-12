<template>
  <div class="workOrderCommon">
    <form action class="layui-form layui-form-pane">
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
        <div class="layui-form-item">
          <label class="layui-form-label">客户名称</label>
          <div class="layui-input-block">
            <input type="text" name="customerName" :value="workOrderInfo.customerName" class="layui-input" disabled />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">合同ID</label>
          <div class="layui-input-block">
            <input type="text" name="agreenmentId"  class="layui-input" disabled />
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
              <img :src="'require('+ workOrderInfo.orderPhoto +')'" alt />
            </div>
          </div>
        </div>

        <!-- 待派单组件 -->
        <waitSendOrders v-if="orderState == 1 ? true : false"></waitSendOrders>
      </div>
      <inProcess v-if="orderState == 3 ? true : false"></inProcess>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="bill" v-if="orderState == 0 ? true : false">发单</button>
          <button class="layui-btn" lay-submit lay-filter="sendOrders" v-if="orderState == 1 ? true : false">派单</button>
          <button class="layui-btn" lay-submit lay-filter="acceptance" v-if="orderState == 2 ? true : false">受理</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="reassignment" v-if="orderState == 2 ? true : false">改派</button>
          <button class="layui-btn" lay-submit lay-filter="finish" v-if="orderState == 3 ? true : false">完成</button>
          <button class="layui-btn" lay-submit lay-filter="start" v-if="orderState == 3 ? true : false">出发</button>
          <button class="layui-btn" lay-submit lay-filter="arrive" v-if="orderState == 3 ? true : false">到达</button>
          <button class="layui-btn" lay-submit lay-filter="begin" v-if="orderState == 3 ? true : false">开始</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="reservation" v-if="orderState == 3 ? true : false">预约上门</button>
          <button class="layui-btn layui-btn-primary" lay-submit lay-filter="reservation" v-if="orderState == 3 ? true : false">更改预约</button>
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
      orderState: sessionStorage.getItem("orderState"),
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      workOrderInfo: {},
      userList: []
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
    send(){
      var data={
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      }
      this.$axios.post('/api/getOrderInfo',data).then(res=>{
        console.log(res)
        this.workOrderInfo = res.data.body
      })
    }
  },
  mounted() {
    var _this = this;
    layui.use(["form", "upload", "laydate", "jquery" ], function() {
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

      // 完成
      form.on("submit(finish)", function(data) {
        console.log(data.field);
        return false;
      });
      // 发单
      form.on("submit(bill)", function(data) {
        console.log(data.field);
        return false;
      });

      // 派单
      form.on("submit(sendOrders)", function(data) {
        console.log(data.field);
        return false;
      });
      // 受理
      form.on("submit(acceptance)", function(data) {
        console.log(data.field);
        return false;
      });
      // 改派
      form.on("submit(reassignment)", function(data) {
        console.log(data.field);
        layer.open({
          type: 1,
          title: "填写改派说明",
          area: ['600px', '400px'],
          fixed: false, //不固定
          maxmin: true,
          content: `
                      <div style="padding:10px" class="layui-form-item layui-form-text">
                        <textarea name="reassignment" placeholder="请输入改派说明" id="reassignment" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                      </div>
                    `,
          btn:["确定","取消"],
          success:function(){
            form.render()
          },
          yes: function(index, layero){
            var reassignment = $('#reassignment').val()
            console.log(data.filed);
            return false
          },
          btnAlign: "c"
        });
        return false;
      });
      // 出发
      form.on("submit(start)", function(data) {
        console.log(data.field);
        return false;
      });

      // 到达
      form.on("submit(arrive)", function(data) {
        console.log(data.field);
        return false;
      });
      // 开始
      form.on("submit(begin)", function(data) {
        console.log(data.field);
        return false;
      });
      // 预约上门
      form.on("submit(reservation)", function(data) {
        console.log(data.field);
        layer.open({
          type: 1,
          title: "预约上门时间",
          area: ["600px", "400px"],
          fixed: false,
          maxmin : true,
          content:`<form class="layui-form layui-form-pane">
                    <div style="padding:10px" class="layui-form-item">
                      <label class="layui-form-label">选择时间</label>
                      <div class="layui-input-block">
                        <input type="text" id="reservation" name="reservation" class="layui-input" />
                      </div>
                    </div>
                  </form>`,
          success: function(){
            form.render()
            laydate.render({
              // 维保开始时间
              elem: "#reservation",
              type: "datetime",
              closeStop: "#reservation",
              trigger: 'click'
            });
          },
          btn:['确定','取消'],
          btnAlign: 'c',
          yes: function(){
            var reservation = $("#reservation").val()
            console.log(reservation)
          }
        })
        return false;
      });

      // 发起协同
      form.on("submit(synergy)", function(data) {
        console.log(data.field);
        layer.open({
          type: 1,
          title: "发起协同作业",
          area: ['600px', '400px'],
          fixed: false, //不固定
          maxmin: true,
          content: `<form class="layui-form layui-form-pane">
                      <ul style="padding: 10px">
                        <li class="layui-form-item layui-form-text">
                          <label class="layui-form-label">协同内容：</label>
                          <div class="layui-input-block">
                          <textarea name="synergyContent" placeholder="请输入驳回说明" id="synergyContent" row="50" class="layui-textarea"></textarea>
                          </div>
                        </li>
                        <li class="layui-form-item">
                          <label class="layui-form-label">紧急程度：</label>
                          <div class="layui-input-block">
                            <select name="degree" id="degree">
                              <option value>请选择紧急程度</option>
                              <option value="0">一般</option>
                              <option value="1">紧急</option>
                            </select>
                          </div>
                        </li>
                        <li class="layui-form-item">
                          <label class="layui-form-label">指派给</label>
                          <div class="layui-input-block">
                            <select name="acceptUserId" id="acceptUserId">
                              <option value>请选择指派人</option>
                            </select>
                          </div>
                        </li>
                      </ul>
                      </form>
                    `,
          btn:["确定","取消"],
          success: function(){
            
            _this.$axios.post('/api/getUserList',_this.$store.state.userId).then(res=>{
              console.log(res)
              var userList = res.data.body.userList
              for(var i = 0; i < userList.length; i++){
                console.log(userList[i].userName)
                $("#acceptUserId").append('<option value="'+ userList[i].userId +'">'+ userList[i].userName +'</option>')
              }
                console.log($("#acceptUserId"))
                form.render()
            })
            
          },
          yes: function(index, layero){
            var synergyContent = $('#synergyContent').val()
            var degree = $('#degree option:selected').val()
            var acceptUserId = $('#acceptUserId option:selected').val()
            console.log(data.field,synergyContent,acceptUserId,degree);
            return false
          },
          btnAlign: "c"
        });
        return false;
      });

      // 驳回
      form.on("submit(reject)", function(data) {
        console.log(data.field);
        layer.open({
          type: 1,
          title: "是否驳回此工单？",
          area: ['600px', '400px'],
          fixed: false, //不固定
          maxmin: true,
          content: `
                      <div style="padding:10px" class="layui-form-item layui-form-text">
                        <textarea name="reject" placeholder="请输入驳回说明" id="reject" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                      </div>
                    `,
          btn:["确定","取消"],
          success:function(){
            form.render()
          },
          yes: function(index, layero){
            var reject = $('#reject').val()
            console.log(data.filed,reject);
            return false
          },
          btnAlign: "c"
        });
        return false;
      });

      // 关单
      form.on("submit(Kuantan)", function(data) {
        console.log(data.field);
        layer.open({
          type: 1,
          title: "是否关闭此工单？",
          area: ['600px', '400px'],
          fixed: false, //不固定
          maxmin: true,
          content: `<div style="padding:10px" class="layui-form-item layui-form-text">
                      <textarea name="Kuantan" placeholder="请输入关单说明" id="Kuantan" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                    </div>
                    `,
          btn:["确定","取消"],
          success:function(){
            form.render()
          },
          yes: function(index, layero){
            var aaa = $('#Kuantan').val()
            console.log(data.field,index,layero,aaa);
            return false
          },
          btnAlign: "c"
        });
        return false;
      });
    });
  },
  created() {
    this.send()
  },
  updated() {
    setTimeout(function() {
      layui.use(["form"], function() {
        layui.form.render();
      });
    }, 10);
  },
  
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