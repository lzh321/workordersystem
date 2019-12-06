<template>
  <div class="data_screening">
    <div class="data_screening_top">
      <h2>数据筛选</h2>
    </div>
    <form action class="layui-form">
      <div class="data_screening_search">
        <div class="search_input" v-if="workOrderManagement">
          <p>
            <span for>工单编号</span>
            <input type="text" value placeholder />
          </p>
          <p>
            <span for>工单状态</span>
            <select name id>
              <option value>全部</option>
              <option value>待发单</option>
              <option value>待派单</option>
              <option value>待受理</option>
              <option value>处理中</option>
              <option value>待回访</option>
              <option value>已关单</option>
            </select>
          </p>
          <p>
            <span for>创建时间</span>
            <input type="text" />
          </p>
        </div>
        <div class="search_input" v-if="staffManagement">
          <p>
            <span for>输入查询</span>
            <input type="text" name="seleUserPhone" value placeholder />
          </p>
          <p>
            <span for>员工职务</span>
            <select name="jobName">
              <option value>请选择</option>
              <option v-for="(item) in JobList" :key="item.id" :value="item.jobName">{{item.jobName}}</option>
            </select>
          </p>
          <p>
            <span for>所属部门</span>
            <select name="deptName">
              <option value>全部</option>
              <option v-for="(item) in DeptList" :key="item.id" :value="item.deptName">{{item.deptName}}</option>
            </select>
          </p>
        </div>
        <div class="search_input" v-if="NetworkList">
          <p>
            <span for>客户名称</span>
            <select name="seleCustomerName" lay-verify="">
              <option value>请选择一个客户</option>
              <option
                v-for="(item) in customerNameList"
                :key="item.customerId"
                :value="item.customerId"
              >{{item.customerName}}</option>
            </select>
          </p>
          <p>
            <span for>投放点</span>
            <input type="text" name="seleNetworkName" />
          </p>
        </div>
        <div class="search_input" v-if="CustomerNameList">
          <p>
            <span for>客户名称</span>
            <select name="seleCustomerName" lay-verify="">
              <option value>请选择一个客户</option>
              <option
                v-for="(item) in customerNameList"
                :key="item.customerId"
                :value="item.customerName"
              >{{item.customerName}}</option>
            </select>
          </p>
        </div>
        <div class="search_input" v-if="messageModule">
          <p v-if="messagePushList">
            <span for>接收手机</span>
            <input type="text" />
          </p>
          <p>
            <span for>模板编号</span>
            <input type="text" />
          </p>
          <p>
            <span for>模板名称</span>
            <input type="text" />
          </p>
        </div>
        <div class="search_input" v-if="equipmentList">
          <p>
            <span>存货编码</span>
            <input
              type="text"
              name="seleDeviceNumber"
              required
              lay-verify
              placeholder="请输入存货编码"
              autocomplete="off"
            />
          </p>
          <p>
            <span>存货名称</span>
            <input type="text" lay-verify name="seleModelName" />
          </p>
          <p>
            <span>设备型号</span>
            <select name="seleModelType">
              <option value>全部</option>
              <option
                v-for="(item) in DeviceModelType"
                :key="item.modelId"
                :value="item.modelId"
              >{{item.modelType}}</option>
            </select>
          </p>
        </div>
        <div class="search_input" v-if="equipmentType">
          <p>
            <span for>设备型号</span>
            <select name="seleModelType">
              <option value>全部</option>
              <option
                v-for="(item) in DeviceModelType"
                :key="item.modelId"
                :value="item.modelId"
              >{{item.modelType}}</option>
            </select>
          </p>
          <p>
            <span for>存货名称</span>
            <input type="text" name="seleModelName" />
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
      staffManagement: "",
      workOrderManagement: "",
      NetworkList: "",
      CustomerNameList: "",
      businessEnterprise: "",
      messageModule: "",
      messagePushList: "",
      equipmentList: "",
      equipmentType: "",
      DeviceModelType: [],
      DeptList: [],
      JobList: [],
      customerNameList: []
    };
  },
  methods: {
    send() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getDeviceModelList", userId).then(res => {
        // 设备型号
        // console.log(res)
        this.DeviceModelType = res.data.body.modelList;
      });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {  // 客户名称
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post('/api/getDeptList',userId).then(res=>{  //部门列表
        // console.log(res)
        if(res.data.retCode == '000000'){
          this.DeptList = res.data.body.list
        }
      })
      this.$axios.post('/api/getJobList',userId).then(res=>{  //职务列表
        // console.log(res)
        if(res.data.retCode == '000000'){
          this.JobList = res.data.body.list
        }
      })
    }
  },
  mounted() {},
  created() {
    console.log(this.type);
    if (this.type == "staffManagement" || this.type == "businessEnterprise") {
      this.staffManagement = this.type;
    }
    if (this.type == "workOrderManagement") {
      this.workOrderManagement = this.type;
    }
    if (this.type == "CustomerNameList") {
      this.CustomerNameList = this.type;
    }
    if (this.type == "NetworkList") {
      this.NetworkList = this.type;
    }
    if (this.type == "messageModule") {
      this.messageModule = this.type;
    }
    if (this.type == "messagePushList") {
      this.messagePushList = this.type;
      this.messageModule = true;
    }
    if (this.type == "equipmentList") {
      this.equipmentList = this.type;
    }
    if (this.type == "equipmentType") {
      this.equipmentType = this.type;
    }
    this.send()
  },
  updated() {
    setTimeout(function() {
      layui.use("form", function() {
        layui.form.render();
      });
    }, 10);
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
}
.data_screening_search p {
  /* height: 20px; */
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.data_screening_search .search_input p span {
  font-size: 13px;
  margin-right: 10px;
}
.data_screening_search p input {
  border: 1px solid #e6e6e6;
  border-radius: 2px;
  width: 240px;
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