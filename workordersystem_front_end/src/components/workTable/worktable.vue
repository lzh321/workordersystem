<template>
  <div class="workTable">
    <div class="workTable_top">
      <h2>工单状态统计图</h2>
      <div class="workTable_content">
      <ul>
        <li>
          <span class="active">今日</span>
        </li>
        <li>
          <span>本周</span>
        </li>
        <li>
          <span>本月</span>
        </li>
        <li>
          
        </li>
      </ul>
      <div class="selectTime"><p>
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
          </p></div>
          </div>
    </div>
    <div class="Echarts">
      <chart :options="options" :auto-resize="true"></chart>
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
      options: {}
    };
  },
  mounted() {
    layui.use(["form", "laydate"], function() {
      var form = layui.form;
      var laydate = layui.laydate;
      form.render();
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
        bottom: 10,
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
          data: [
            { value: 335, name: "待发单" },
            { value: 310, name: "待派单" },
            { value: 234, name: "待受理" },
            { value: 135, name: "处理中" },
            { value: 1048, name: "待回访" },
            { value: 420, name: "已关单" }
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.workTable {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.workTable_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.workTable_content{
  display: flex
}
.Echarts {
  flex: 1;
  display: flex;
  padding-top: 30px;
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
.selectTime{
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
</style>