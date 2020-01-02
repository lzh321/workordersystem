<template>
  <div class="workTable layui-tab layui-tab-brief" lay-filter="workTable">
    <div class="workTable_top">
      <h2>工单状态统计图</h2>
      <div class="workTable_content">
        <ul class="layui-tab-title">
          <li class="layui-this">
            <span>今日</span>
          </li>
          <li>
            <span>本周</span>
          </li>
          <li>
            <span>本月</span>
          </li>
        </ul>
        <div class="selectTime">
          <p>
            <input
              type="text"
              class="layui-input"
              placeholder="开始时间"
              name="seleBeginTime"
              id="seleBeginTime"
            />
            <i></i>
          </p>—
          <p>
            <input
              type="text"
              class="layui-input"
              placeholder="结束时间"
              name="seleEngTime"
              id="seleEngTime"
            />
            <i></i>
          </p>
        </div>
        <button class="btn layui-btn  layui-btn-normal"  @click="getorderNum(type)">查询</button>
      </div>
    </div>
    <div class="Echarts layui-tab-content">
      <div class="layui-tab-item layui-show">
        <chart :options="options" :auto-resize="true"></chart>
      </div>
    </div>
  </div>
</template>

<script>
// 饼状图
import "echarts/lib/chart/pie";
// 提示
import "echarts/lib/component/tooltip";
// 图例
import "echarts/lib/component/legend";
// 标题
import "echarts/lib/component/title";
export default {
  name: "workTable",
  data() {
    return {
      options: {},
      type: null
    };
  },
  methods: {
    getorderNum(type) {
      var data = {
        userId: this.$store.state.userId,
        type: type,
        seleBeginTime: this.$("input[name='seleBeginTime']").val(),
        seleEndTime: this.$("input[name='seleEngTime']").val()
      };
      this.$axios.post("/api/getOrderInfoNum", data).then(res => {
        console.log(res);
        var chartData = [
          { value: res.data.body.sendNum, name: "待发单" },
          { value: res.data.body.sellNum, name: "待派单" },
          { value: res.data.body.acceptNum, name: "待受理" },
          { value: res.data.body.processingNum, name: "处理中" },
          { value: res.data.body.finishNum, name: "待回访" },
          { value: res.data.body.closeNum, name: "已关单" }
        ];
        this.options.series[0].data = chartData;
      });
    }
  },
  mounted() {
    this.getorderNum(0);
    var _this = this;
    layui.use(["form", "laydate", "element"], function() {
      var form = layui.form;
      var element = layui.element;
      var laydate = layui.laydate;
      form.render();
      element.render();
      element.on("tab(workTable)", function(data) {
        console.log(data.index);
        _this.getorderNum(data.index);
      });
      laydate.render({
        // 开始时间
        elem: "#seleBeginTime",
        type: "datetime",
        closeStop: "#seleBeginTime",
        trigger: "click"
      });
      laydate.render({
        // 结束时间
        elem: "#seleEngTime",
        type: "datetime",
        closeStop: "#seleEngTime",
        trigger: "click"
      });
    });
    this.options = {
      // 标题
      title: {
        text: "",
        x: "center",
        textStyle: {
          color: "#000",
          fontSize: 14,
          fontWeight: "normal"
        }
      },
      // 工具提示
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // 图例说明
      legend: {
        show: true,
        x: "center",
        bottom: 0,
        data: ["待发单", "待派单", "待受理", "处理中", "待回访", "已关单"],
        textStyle: {
          color: "#444",
          fontSize: 14
        }
      },
      // 各个部分的颜色
      color: ["#18DBDF", "#F6EF7B", "#3DE16F", "#EF69FB", "#FE5679", "#CCCCCC"],
      // 拖拽的时候重新渲染  默认关闭
      calculable: true,
      // 工具箱
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ["pie", "funnel"],
            option: {
              funnel: {
                x: "25%",
                width: "50%",
                funnelAlign: "left",
                max: 1548
              }
            }
          },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      label: {
        show: true,
        fontSize: 15
      },
      series: [
        {
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b} : {c} ({d}%)"
              },
              labelLine: {
                show: true
              }
            }
          },
          name: "访问来源",
          // 类型：这里是饼图
          type: "pie",
          radius: "70%",
          center: ["50%", "50%"],
          // 数据
          data: []
        }
      ]
    };
  },
  created() {
    sessionStorage.clear()
  }
};
</script>

<style scoped>
.workTable {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 15px 15px 0;
}
.workTable_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.workTable_content {
  display: flex;
  align-items: center
}
.Echarts {
  flex: 1;
  display: flex;
  padding-top: 40px;
  justify-content: center;
}
.workTable_top h2 {
  font-size: 13px;
  padding-left: 10px;
  font-weight: 600;
}
.workTable_top ul {
  display: flex;
}
.workTable_top ul li {
  /* padding: 0 20px; */
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 5px;
}
.selectTime {
  display: flex;
  align-items: center;
  height: 45px;
  padding-left: 5px;
}
.workTable_top ul li span {
  display: inline-block;
  padding: 0 15px;
  font-size: 13px;
  line-height: 45px;
}
.workTable_top ul li p {
  display: flex;
  align-items: center;
  position: relative;
  width: 130px;
  height: 30px;
}
.workTable_top ul li p input {
  width: 100%;
  height: 100%;
  padding-right: 25px;
}
.workTable_top ul li p i {
  position: absolute;
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid red;
  right: 5px;
}
.active {
  border-bottom: 2px solid #445eee;
  color: #445eee;
}
.btn{
  margin-left:10px;
}
</style>