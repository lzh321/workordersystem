<template>
  <div class="roleManagement">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link to="/addRole" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 添加</router-link>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="roleManagement" lay-filter="roleManagement"></table>
        <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="privilegeAssign" >权限分配</a>
          <a class="layui-btn layui-btn-xs" lay-event="buttonAssign" >按钮分配</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'roleManagement',
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
    layui.use("table", function() {
      var table = layui.table;
      //第一个实例
      table.render({
        elem: "#roleManagement",
        height: 485,
        url: "/api/getMenuList", //数据接口
        method: 'post',
        // parseData: function(res){ //res 即为原始返回的数据
        //   return {
        //     "code": res.retCode, //解析接口状态
        //     "msg": res.retMsg, //解析提示文本
        //     "count": res.body.list.length, //解析数据长度
        //     "data": res.body.list //解析数据列表
        //   };
        // },
        page: true, //开启分页
        limit: 10,
        cols: [
          [
            //表头

            { field: "companyId", title: "序号", width:200, sort: true,align: "center"},
            { field: "companyId", title: "角色编号", width:200, sort: true,align: "center"},
            { field: "deptName", title: "菜单名称",  sort: true,align: "center" },
            { field: "operation", title: "操作", align: "center", toolbar: '#barDemo' }
          ]
        ]
      });

      //监听行工具事件
        table.on('tool(roleManagement)', function(obj){
          var data = obj.data;
          console.log(data)
          var listId = data.companyId
          if(obj.event === 'deletion'){
            layer.confirm('真的删除行么', function(index){
              obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
              layer.close(index);
              //向服务端发送删除指令
              var delParam = {
                userId : _this.$store.state.userId,
                listId: listId
              }
              // _this.$axios.post('/api/deleDeviceInfo',delParam).then(res=>{
              //   console.log(res)
              //   if(res.data.retCode == '000000'){
              //     layer.msg(res.data.retMsg,{icon: 1})
              //   }
              // })
            });
          } else if(obj.event === 'edit'){ //编辑
            // sessionStorage.setItem('listId',listId)
            // _this.$router.push('/addInstitution')
          }else if(obj.event === 'privilegeAssign'){  // 权限分配
            // sessionStorage.setItem('deviceId',deviceId)
            // _this.$router.push("/checkEquipmentInfo")
          }else if(obj.event === 'buttonAssign'){   //按钮分配


          }
        });
    });
  },
  created(){
    this.type = this.$route.query.type
    // var data = {
    //   userId: this.$store.state.userId,
    //   currentPage: 1,
    //   everyCount: 10
    // }
    // this.$axios.post('/api/getRoleInfoList',data).then(res=>{
    //   console.log(res)
    // }).catch(err=>{
    //   console.log(err)
    // })
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