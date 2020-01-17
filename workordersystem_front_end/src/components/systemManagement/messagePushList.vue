<template>
  <div class="messageModule">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <!-- <p class="layui-btn-container">
          <router-link to="" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 查询</router-link>
          <button class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe669;</i>
            重置
          </button>
        </p> -->
      </div>
      <div class="dataList_table" >
        <table id="demo" lay-filter="test"></table>
        <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="freeze">冻结</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
        </div>
        <div id="barInput" style="display:none">
          <input type='checkbox' name='' lay-skin='primary'>
        </div>
        <div id="Enable_Disable" style="display:none">
          <input type="checkbox" name="switch" lay-skin="switch">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'messageModule',
  data() {
    return {
      type: ''
    }
  },
  components: {
    dataScreening
  },
  mounted() {
    var _this = this
    layui.use(["form","table"], function() {
      var table = layui.table;
      var form = layui.form
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getSmsInfoList",
          where: data.field,
          page: { curr: 1, limit: 10 }
        });
      });
      //第一个实例
      table.render({
        elem: "#demo",
        height: 485,
        url: "/api/getSmsInfoList", //数据接口
        method: "post",
        where:{
          userId: _this.$store.state.userId,
          page: { curr: 1 }
        },
        id: "serachData",
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.smsInfoList //解析数据列表
          };
        },
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          // curr: 'indexCount', //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        page: true, //开启分页
        limit: 10,
        cols: [
          [
            //表头
            { field: "id", title: "ID", sort: false, align: "center"},
            { field: "mobile", title: "接收手机",  sort: false,align: "center"},
            { field: "responserName", title: "接收对象",  sort: false,align: "center" },
            { field: "modelId", title: "模板编号",  align: "center" },
            { field: "modelName", title: "模板名称",  align: "center" },
            { field: "newsType", title: "推送渠道",  align: "center" ,templet:function(d){
              if(d.newsType == 0){
                return '微信'
              }
              if(d.newsType == 1){
                return '短信'
              }
            }},
            { field: "content", title: "推送内容",  align: "center" },
            { field: "status", title: "状态", align: "center",templet:function(d){
              if(d.status == 0){
                return '失败'
              }
              if(d.status == 1){
                return '成功'
              }
            }},
            { field: "createTime", title: "推送时间", align: "center" }
          ]
        ]
      });
    });
  },
  created(){
    this.type = this.$route.query.type
    sessionStorage.clear()
  }
}
</script>

<style scoped>
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
/* .dataList .dataList_top p button {
  border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  background: #0079fe;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
} */

.dataList .dataList_table{
  padding: 0 15px;
}
.dataList .dataList_table td{
  font-size: 13px !important;
}
.dataList .dataList_table td .btn{
  font-size: 13px !important;
  color: blue !important;
}
</style>