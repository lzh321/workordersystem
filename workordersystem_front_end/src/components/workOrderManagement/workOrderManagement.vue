<template>
  <div class="workOrderManagement">
    <div class="layui-tab layui-tab-brief" lay-filter="workOrderManagement">
      <ul class="layui-tab-title">
        <li
          v-for="(item,index) in workType"
          @click="active(index)"
          :class="index == num ? 'layui-this ' : ''"
          :key="index"
        >
          <a>
            {{item.title}}
            <span v-if="item.num" class="layui-badge">{{item.num}}</span>
          </a>
        </li>
      </ul>
      <div class="layui-tab-content">
        <data-screening :type="type"></data-screening>
        <div class="dataList">
          <div class="dataList_top">
            <h2>数据列表</h2>
            <p>
              <button @click="derived">导出</button>
              <router-link to="/workOrderCreate" tag="button">创建</router-link>
            </p>
          </div>
          <div class="dataList_table">
            <table
              id="workOrderManagement"
              lay-filter="workOrderManagement"
              lay-data="{id: 'serachData'}"
            ></table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "workOrderManagement",
  data() {
    return {
      num: 0,
      workType: [
        { title: "全部" },
        { title: "待发单", num: 2 },
        { title: "待派单", num: 2 },
        { title: "待受理", num: 2 },
        { title: "处理中", num: 2 },
        { title: "待回访", num: 2 },
        { title: "已关单", num: 2 }
      ],
      type: ""
    };
  },
  components: {
    dataScreening
  },
  methods: {
    active: function(index) {
      this.num = index;
    },
    derived: function() {
      table.exportFile();
    }
  },
  mounted() {
    var _this = this;
    layui.use(["table", "form","element"], function() {
      var table = layui.table;
      var element = layui.element
      var form = layui.form;
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getOrderInfoList",
          where: data.field,
          page: { curr: 1, limit: 10 }
        });
      });
      //第一个实例
      table.render({
        elem: "#workOrderManagement",
        method: "post",
        url: "/api/getOrderInfoList", //数据接口
        id: "serachData",
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.orderInfoList //解析数据列表
          };
        },
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        page: true, //开启分页
        cols: [
          [
            //表头
            {
              field: "orderInfoId",
              title: "工单编号",
              sort: true,
              width: 160,
              align: "center"
            },
            {
              field: "orderStateName",
              title: "工单状态",
              width: 100,
              sort: true,
              align: "center"
            },
            {
              field: "customerName",
              title: "银行名称",
              sort: true,
              align: "center"
            },
            { field: "networName", title: "支行名称", align: "center" },
            {
              field: "orderUrgency",
              title: "紧急程度",
              width: 80,
              align: "center",
              templet: function(d) {
                return d.orderUrgency == 0 ? "一般" : "紧急";
              }
            },
            {
              field: "expendTime",
              title: "当前总耗时（min）",
              sort: true,
              align: "center"
            },
            {
              field: "amountTime",
              title: "工单总耗时（min）",
              sort: true,
              align: "center"
            },
            {
              field: "userName",
              title: "创建人",
              width: 100,
              align: "center"
            },
            {
              field: "createTime",
              title: "创建时间",
              sort: true,
              align: "center"
            },
            {
              field: "orderState",
              title: "操作",
              width: 260,
              align: "center",
              // toolbar: "#barDemo",
              templet: function(d) {
                // console.log(d.orderState)
                if (d.orderState == 0) {
                  //待发单
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="bill">发单</a>';
                }
                if (d.orderState == 1) {
                  //待派单
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="sendOrders">派单</a><a class="layui-btn layui-btn-xs" lay-event="reject">驳回</a>';
                }
                if (d.orderState == 2) {
                  // 待受理
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="acceptance">受理</a><a class="layui-btn layui-btn-xs" lay-event="reassignment">改派</a>';
                }
                if (d.orderState == 3) {
                  // 处理中
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="reservation" >预约</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a><a class="layui-btn layui-btn-xs" lay-event="finish">完成</a>';
                }
                if (d.orderState == 4) {
                  // 已预约
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="start">出发</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="reservation" >更改预约</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a><a class="layui-btn layui-btn-xs" lay-event="finish">完成</a>';
                }
                if (d.orderState == 5) {
                  // 已出发
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="reach">到达</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
                if (d.orderState == 6) {
                  // 已开始
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="begin">开始</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
                if (d.orderState == 7) {
                  //待回访
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="reject">驳回</a>';
                }
                if (d.orderState == 8) {
                  //已关单
                  return ;
                }
                if (d.orderState == 9) {
                  // 已到达
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="begin">开始</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
                if (d.orderState == 10) {
                  // 已到达
                  return '<a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a><a class="layui-btn layui-btn-xs" lay-event="begin">完成</a><a class="layui-btn layui-btn-xs" lay-event="Kuantan">关单</a><a class="layui-btn layui-btn-xs" lay-event="synergy" >协同</a>';
                }
              }
            }
          ]
        ]
      });

      //监听行工具事件
      table.on("tool(workOrderManagement)", function(obj) {
        var data = obj.data;
        console.log(data);
        var orderState = data.orderState;
        var orderInfoId = data.orderInfoId;
        console.log(orderState);
        if (obj.event === "edit") {
          //编辑
          sessionStorage.setItem("orderState", orderState);
          sessionStorage.setItem("orderInfoId", orderInfoId);

          if (orderState == 0) {
            _this.$router.push("/workOrderCreate");
          } else {
            _this.$router.push("/workOrderDetails");
          }
        } else if (obj.event === "reservation") {
          //预约
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "Kuantan") {
          //关单
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "synergy") {
          //协同
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "finish") {
          //完成
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "sendOrders") {
          //派单
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "reject") {
          //驳回
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "bill") {
          //发单
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "acceptance") {
          //受理
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        } else if (obj.event === "reassignment") {
          //改派
          // sessionStorage.setItem('orderState',orderState)
          // _this.$router.push('/addCustomer')
        }
      });
    });
  },
  created() {
    this.type = this.$route.query.type;
    var data = {
      userId: this.$store.state.userId,
      currentPage: 1,
      everyCount: 10
    };
    this.$axios.post("/api/getOrderInfoList", data).then(res => {
      console.log(res);
    });
    sessionStorage.removeItem("orderState");
    sessionStorage.removeItem("orderInfoId");
  }
};
</script>

<style scoped>
.workOrderManagement {
  height: 100%;
}
/* .active {
  border-bottom: 2px solid #445eee;
  color: #445eee;
} */
/* .work_type ul {
  display: flex;
  align-items: center;
  padding: 10px 15px 20px;
}
.work_type ul li {
  position: relative;
  text-align: center;
  padding: 12px 15px;
}
.work_type ul li i {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: red;
  font-size: 10px;
  color: #fff;
  position: absolute;
  top: 8px;
  line-height: 15px;
  right: 0px;
} */
.dataList .dataList_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 15px 20px;
}
.dataList .dataList_top h2 {
  font-size: 13px;
  font-weight: 600;
}
.dataList .dataList_top p {
  margin-right: 48px;
}
.dataList .dataList_top p button {
  border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  background: #0079fe;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
}
.dataList .dataList_top p button:nth-child(1) {
  background: #fff;
  border: 1px solid #eee;
  color: #444;
}
.dataList .dataList_table {
  padding: 0 15px;
}
.dataList .dataList_table td {
  font-size: 13px !important;
}
.dataList .dataList_table td .btn {
  font-size: 13px !important;
  color: blue !important;
}
</style>