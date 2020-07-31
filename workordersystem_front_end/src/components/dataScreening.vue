<template>
  <div class="data_screening">
    <div class="data_screening_top">
      <h2>数据筛选</h2>
    </div>
    <form action class="layui-form">
      <div class="data_screening_search">
        <div class="search_input" v-if=" type == 'workOrderManagement' || type == 'personOrder'">
          <p>
            <span for>工单编号</span>
            <input type="text" name="seleOrderInfoId" autocomplete="off" :value="serachData.seleOrderInfoId" placeholder />
          </p>
          <p>
            <span for>工单状态</span>
            <select name="seleorderState" id="seleorderState" class="">
              <option value="" :selected="serachData.seleorderState == '' ? true : false">全部</option>
              <option value="0" :selected="serachData.seleorderState === '0' ? true : false">待发单</option>
              <option value="1" :selected="serachData.seleorderState == 1 ? true : false">待派单</option>
              <option value="2" :selected="serachData.seleorderState == 2 ? true : false">待受理</option>
              <option value="3" :selected="serachData.seleorderState == 3 ? true : false">待处理</option>
              <option value="4" :selected="serachData.seleorderState == 4 ? true : false">已预约</option>
              <option value="5" :selected="serachData.seleorderState == 5 ? true : false">已出发</option>
              <option value="7" :selected="serachData.seleorderState == 6 ? true : false">待回访</option>
              <option value="8" :selected="serachData.seleorderState == 7 ? true : false">已关单</option>
              <option value="9" :selected="serachData.seleorderState == 8 ? true : false">已到达</option>
              <option value="10" :selected="serachData.seleorderState == 9 ? true : false">故障处理中</option>
            </select>
          </p>
          <p>
            <span for>创建时间</span>
            <input class="Times" type="text" autocomplete="off" name="seleBeginTime" id="startTime" :value="serachData.seleBeginTime" placeholder="开始时间" />-
            <input class="Times" type="text" autocomplete="off" name="seleEndTime" id="endTime" :value="serachData.seleEndTime" placeholder="结束时间" /> 
          </p>
          <p>
            <span for>创&nbsp;&nbsp;建&nbsp;&nbsp;人</span>
            <input type="text" name="userName" :value="serachData.userName" placeholder="创建人" />
          </p>
          <p>
            <span for>客户名称</span>
            <select name="customerName" lay-search>
              <option value="">全部</option>
              <option
                v-for="(item) in customerList"
                :key="item.customerId"
                :value="item.customerName"
                 :selected="serachData.customerName == item.customerName ? true : false"
              >{{item.customerName}}</option>
            </select>
          </p>
          <p class="Network">
            <span for>投&nbsp;&nbsp;放&nbsp;&nbsp;点</span>
            <input type="text" name="networName" autocomplete="off" :value="serachData.networName" class="layui-input" placeholder="请输入投放点名称"/>
          </p>
        </div>
        <div class="search_input" v-if="type == 'synergyManagement' || type == 'personSynergy'">
          <p>
            <span for>协同编号</span>
            <input type="text" name="seleID" autocomplete="off" value placeholder="协同编号" />
          </p>
          
          <p>
            <span for>协同状态</span>
            <select name="seleCoordinateState" class="">
              <option value>全部</option>
              <option value="0">待受理</option>
              <option value="1">处理中</option>
              <option value="2">已完成</option>
              <option value="3">已驳回</option>
            </select>
          </p>
          <p>
            <span for>创建时间</span>
            <input class="Times" type="text" autocomplete="off" name="seleBeginTime" id="startTime" placeholder="开始时间" />-
            <input class="Times" type="text" autocomplete="off" name="seleEndTime" id="endTime" placeholder="结束时间" /> 
          </p>
          <p>
            <span for>创&nbsp;&nbsp;建&nbsp;&nbsp;人</span>
            <input type="text" name="createrUserName" autocomplete="off" value placeholder="创建人" />
          </p>
        </div>
        <div class="search_input" v-if="type == 'staffManagement'">
          <p>
            <span for>输入查询</span>
            <input type="text" name="val" autocomplete="off" :value="serachData.val" placeholder="姓名/账号/手机"/>
          </p>

        </div>
        <div class="search_input" v-if="type == 'businessEnterprise'">
          <p>
            <span for>输入查询</span>
            <input type="text" name="orgName" autocomplete="off" :value="serachData.orgName" placeholder="请输入公司名称" />
          </p>
        </div>
        <div class="search_input" v-if=" type == 'NetworkList'">
          <p>
            <span for>客户名称</span>
            <select name="seleCustomerName" lay-verify="" lay-search>
              <option value>全部</option>
              <option
                v-for="(item) in customerList"
                :key="item.customerId"
                :value="item.customerName"
                :selected="serachData.seleCustomerName == item.customerName ? true :false"
              >{{item.customerName}}</option>
            </select>
          </p>
          <p class="Network">
            <span for>投放点</span>
            <input type="text" name="seleNetworkName" :value="serachData.seleNetworkName" autocomplete="off" class="layui-input" placeholder="请输入投放点名称"/>
          </p>
        </div>
        <div class="search_input" v-if="type == 'CustomerNameList'">
          <p>
            <span for>客户名称</span>
            <select name="seleCustomerName" lay-verify="" lay-search>
              <option value>全部</option>
              <option
                v-for="(item) in customerList"
                :key="item.customerId"
                :value="item.customerName"
                :selected="serachData.seleCustomerName == item.customerName ? true :false"
              >{{item.customerName}}</option>
            </select>
          </p>
        </div>
        <div class="search_input" v-if="type == 'messageModule' || type == 'messagePushList'">
          <p v-if="type == 'messagePushList'">
            <span for>接收手机</span>
            <input type="text" name="seleMobile" :value="serachData.seleMobile" autocomplete="off" placeholder="请输入接收手机"/>
          </p>
          <p>
            <span for>模板编号</span>
            <input type="text" name="seleId" :value="serachData.seleId" autocomplete="off" placeholder="请输入模板编号"/>
          </p>
          <p>
            <span for>模板名称</span>
            <input type="text" name="seleModelName" :value="serachData.seleModelName" autocomplete="off" placeholder="请输入模板名称"/>
          </p>
        </div>
        <div class="search_input" v-if=" type == 'equipmentList'">
          <p>
            <span>设备序列号</span>
            <input
              type="text"
              name="seleDeviceNumber"
              required
              lay-verify
              placeholder="请输入设备序列号"
              autocomplete="off"
              :value="serachData.seleDeviceNumber"
            />
          </p>
          <p>
            <span>存货名称</span>
            <input type="text" lay-verify autocomplete="off" :value="serachData.seleModelName" name="seleModelName" placeholder="请输入存货名称"/>
          </p>
          <p>
            <span for>客户名称</span>
            <select name="seleCustomerName" lay-verify="" lay-search>
              <option value>全部</option>
              <option
                v-for="(item) in customerList"
                :key="item.customerId"
                :value="item.customerName"
                :selected="serachData.seleCustomerName == item.customerName ? true :false"
              >{{item.customerName}}</option>
            </select>
          </p>
          <p>
            <span>设备型号</span>
            <select name="seleModelType">
              <option value>全部</option>
              <option
                v-for="(item) in DeviceModelType"
                :key="item.modelId"
                :value="item.modelType"
                :selected="serachData.seleModelType == item.modelType ? true :false"
              >{{item.modelType}}</option>
            </select>
          </p>
          <p>
            <span for>投&emsp;放&emsp;点</span>
            <input type="text" name="networkName" :value="serachData.networkName" autocomplete="off"  placeholder="请输入投放点名称"/>
          </p>
        </div>
        <div class="search_input" v-if="type == 'equipmentType'">
          <p>
            <span for>设备型号</span>
            <select name="seleModelType">
              <option value>全部</option>
              <option
                v-for="(item) in DeviceModelType"
                :key="item.modelId"
                :value="item.modelType"
                :selected="serachData.seleModelType == item.modelType ? true : false"
              >{{item.modelType}}</option>
            </select>
          </p>
          <p>
            <span for>存货名称</span>
            <input type="text" name="seleModelName" :value="serachData.seleModelName" autocomplete="off" placeholder="请输入存货名称"/>
          </p>
        </div>

        <div class="search_input" v-if=" type == 'menuManagement'">
          <p>
            <span for>菜单编号</span>
            <input type="text" name="seleMenuNo" :value="serachData.seleMenuNo" autocomplete="off" placeholder="请输入菜单编号"/>
          </p>
          <p>
            <span for>菜单名称</span>
            <input type="text" name="seleMenuName" :value="serachData.seleMenuName" autocomplete="off" placeholder="请输入菜单名称"/>
          </p>
        </div>

        <div class="search_input" v-if="type == 'roleManagement'">
          <p>
            <span for>角色名称</span>
            <input type="text" name="seleRoleName" :value="serachData.seleRoleName" autocomplete="off" placeholder="请输入角色名称"/>
          </p>
        </div>

        <div class="search_input" v-if="type == 'permissionsButton'">
          <p>
            <span for>按钮编码</span>
            <input type="text" name="seleBtnCode" :value="serachData.seleBtnCode" autocomplete="off" placeholder="请输入按钮编码"/>
          </p>
          <p>
            <span for>菜单名称</span>
            <input type="text" name="seleMenuName" :value="serachData.seleMenuName" autocomplete="off" placeholder="请输入菜单名称"/>
          </p>
        </div>

        <div class="layui-btn-container">
          <button
            type="button"
            class="layui-btn layui-btn-normal layui-btn-sm"
            lay-submit
            lay-filter="serach"
          >
            <i class="layui-icon">&#xe615;</i>查询
          </button>
          <button type="reset" class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe669;</i>重置
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "dataScreening",
  props: ["type"],
  data() {
    return {
      DeviceModelType: [],
      DeptList: [],
      JobList: [],
      customerList: [],
      serachData: {}
    };
  },
  methods: {
    
    send() {
      var userId = this.$store.state.userId;
      if(this.type == 'equipmentList' || this.type == 'equipmentType'){
        this.$axios.post("/api/getDeviceModelList", {userId: userId}).then(res => {
          // 设备型号
          console.log(res)
          this.DeviceModelType = res.data.body.devicemodelInfoList;
        });
      }
      this.$axios.post("/api/getCustomerNameList", {userId: userId}).then(res => {  // 客户名称
        this.customerList = res.data.body.customerNameList;
      });
      if(this.type == 'staffManagement' || this.type == 'businessEnterprise'){
        this.$axios.post('/api/getDeptList',{userId: userId}).then(res=>{  //部门列表
          // console.log(res)
          if(res.data.retCode == '000000'){
            this.DeptList = res.data.body.DeptNameList
          }
        })
        this.$axios.post('/api/getJobList',{userId: userId}).then(res=>{  //职务列表
          // console.log(res)
          if(res.data.retCode == '000000'){
            this.JobList = res.data.body.JobNameList
          }
        })
      }
    }
  },
  mounted() {
    
    layui.use(["laydate","form"], function(){
      var laydate = layui.laydate
      var form = layui.form
      

      laydate.render({
        // 创建时间
        elem: "#startTime",
        type: "datetime",
        closeStop: "#startTime",
        trigger: "click"
      });
      laydate.render({
        // 创建时间
        elem: "#endTime",
        type: "datetime",
        closeStop: "#endTime",
        trigger: "click"
      });
      form.render()
    })
  },
  created() {
    this.send()
    
  },
  updated() {
    layui.use("form", function() {
      layui.form.render();
    });
  }
};
</script>

<style scoped>
.data_screening_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 20px;
}
.data_screening_top h2 {
  font-size: 13px;
  font-weight: 600;
}

.data_screening_search {
  display: flex;
  align-items: center;
  padding: 0 0 0 30px;
}
.search_input {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  flex: 1;
}
.data_screening_search p {
  /* height: 20px; */
  margin-right: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.data_screening_search .search_input p span {
  font-size: 13px;
  margin-right: 10px;
}
.layui-btn-container{
  margin-bottom: 10px;
}
.data_screening_search p input {
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  /* width: 220px; */
  height: 38px;
  padding-left: 5px;
  color: #444;
}
.data_screening_search p input:hover {
  border: 1px solid #ccc;
}
/* .data_screening_search p select {
  width: 240px;
  height: 30px;
  border: 1px solid #ccc;
  padding-left: 5px;
  border-radius: 2px;
} */
.data_screening_search button {
  margin-bottom: 0;
}

.Times{
  width: 40% !important;
}

.Network span{
  width: 60px;
}
/* .data_screening_search p button{
  border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  background: #0079FE;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
} */
/* .data_screening_search p button:nth-child(2){
  background: #fff;
  border: 1px solid #eee;
  color: #444;
} */
</style>