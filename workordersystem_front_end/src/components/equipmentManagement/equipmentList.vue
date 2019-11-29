<template>
  <div class="equipmentList">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p>
          <router-link to="/addEquipment" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 新增</router-link>
          <router-link to="/bulkImport" class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe620;</i>
            批量导入
          </router-link>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="demo" lay-filter="test"></table>
        <!-- <script type="text/html" id="toolbarDemo">
          <div class="layui-btn-container">
            <button class="layui-btn layui-btn-sm" lay-event="getCheckData">获取选中行数据</button>
            <button class="layui-btn layui-btn-sm" lay-event="getCheckLength">获取选中数目</button>
            <button class="layui-btn layui-btn-sm" lay-event="isAll">验证是否全选</button>
          </div>
        </script> -->
        
        <script type="text/html" id="barDemo">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="detail">查看</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
        </script>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'equipmentList',
  data() {
    return {
      type:''
    }
  },
  components: {
    dataScreening
  },
  methods: {
    
  },
  mounted() {
    var self = this  // 改变this指向
    layui.use("table", function() {
      var table = layui.table;
      //第一个实例
      table.render({
        elem: "#demo",
        height: 485,
        url: "../../../static/table.json", //数据接口
        // toolbar: '#toolbarDemo',
        defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
          title: '提示'
          ,layEvent: 'LAYTABLE_TIPS'
          ,icon: 'layui-icon-tips'
        }],
        page: true, //开启分页
        limit: 10,
        title: '设备列表',
        cols: [
          [
            //表头
            {type: 'checkbox', fixed: 'left'},
            { field: "workOrderId", title: "存货编码", sort: true,align: "center"},
            { field: "workOrderStatus", title: "存货名称",  sort: true,align: "center"},
            { field: "bankName", title: "设备型号",  sort: true,align: "center" },
            { field: "subBranchName", title: "维保开始时间",  align: "center" },
            { field: "PriorityDescription", title: "维保结束时间",  align: "center" },
            { field: "currentTotalTime", title: "银行名称",sort: true,align: "center" },
            { field: "workOrderTime", title: "网点名称", sort: true,align: "center" },
            { field: "creator", title: "所在城市", width: 100, align: "center"},
            { field: "creator", title: "网点地址", align: "center"},
            { field: "operation", title: "操作",width: 165, align: "center", toolbar: '#barDemo' }
          ]
        ]
      });

      //头工具栏事件
      table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
          case 'getCheckData':
            var data = checkStatus.data;
            layer.alert(JSON.stringify(data));
          break;
          case 'getCheckLength':
            var data = checkStatus.data;
            layer.msg('选中了：'+ data.length + ' 个');
          break;
          case 'isAll':
            layer.msg(checkStatus.isAll ? '全选': '未全选');
          break;
          
          //自定义头工具栏右侧图标 - 提示
          case 'LAYTABLE_TIPS':
            layer.alert('这是工具栏右侧自定义的一个图标按钮');
          break;
        };
      });
      
      //监听行工具事件
      table.on('tool(test)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'deletion'){
          layer.confirm('真的删除行么', function(index){
            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
            layer.close(index);
            //向服务端发送删除指令
          });
        } else if(obj.event === 'edit'){
          layer.prompt({
            formType: 2
            ,value: data.email
          }, function(value, index){
            //同步更新缓存对应的值
            obj.update({
              email: value
            });
            layer.close(index);
          });
        }else if(obj.event === 'detail'){
          self.$router.push({path: "/checkEquipmentInfo"})
        }
      });
    });
  },
  created(){
    this.type = this.$route.query.type

    this.$ajax.post('/getDeviceModelList').then((res)=>{
      console.log(res)
    })
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
/* .dataList .dataList_top p button:nth-child(1) {
  background: #fff;
  border: 1px solid #eee;
  color: #444;
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