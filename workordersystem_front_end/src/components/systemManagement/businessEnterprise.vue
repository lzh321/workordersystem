<template>
<!-- 企业机构管理 -->
  <div class="businessEnterprise">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link to="/addInstitution" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 添加</router-link>
          <router-link to="/deploy?type=CompanyList" class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe620;</i>
            配置
          </router-link>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="businessEnterprise" lay-filter="businessEnterprise" lay-data="{id: 'serachData}"></table>
        <div id="barDemo" style="display:none">
          <a class="layui-btn layui-btn-xs" lay-event="edit" >编辑</a>
          <a class="layui-btn layui-btn-xs" lay-event="deletion" >删除</a>
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
  name:'businessEnterprise',
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
    layui.use(["table","form"], function() {
      var table = layui.table;
      var form = layui.form
      form.render()
      form.on('submit(serach)', function(data){
        data.field.userId = _this.$store.state.userId
          console.log(data.field)
          table.reload('serachData',{
            url: "/api/getOrganizationList",
            where:data.field,
            // page:{curr: 1}
          })
        })
      //第一个实例
      table.render({
        elem: "#businessEnterprise",
        // height: 485,
        url: "/api/getOrganizationList", //数据接口
        method: 'post',
        id: 'serachData',
        parseData: function(res){ //res 即为原始返回的数据
          return {
            "code": res.retCode, //解析接口状态
            "msg": res.retMsg, //解析提示文本
            "count": res.body.list.length, //解析数据长度
            "data": res.body.list //解析数据列表
          };
        },
        // page: true, //开启分页
        // limit: 10,
        cols: [
          [
            //表头
            { field: "companyId", title: "公司编号", width:200, sort: true,align: "center"},
            { field: "companyName", title: "公司名称", width:260, sort: true,align: "center"},
            { field: "deptName", title: "部门",  sort: true,align: "center" },
            { field: "jobName", title: "职务", width:150, align: "center" },
            { field: "PriorityDescription", title: "启用", align: "center", toolbar: '#Enable_Disable'},
            { field: "operation", title: "操作", align: "center", toolbar: '#barDemo' }
          ]
        ]
      });

      //监听行工具事件
        table.on('tool(businessEnterprise)', function(obj){
          var data = obj.data;
          console.log(data)
          var listId = data.id
          if(obj.event === 'deletion'){
            layer.confirm('真的删除行么', function(index){
              obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
              layer.close(index);
              //向服务端发送删除指令
              var delParam = {
                userId : _this.$store.state.userId,
                listId: listId
              }
              _this.$axios.post('/api/deleOrganizationInfo',delParam).then(res=>{
                console.log(res)
                if(res.data.retCode == '000000'){
                  layer.msg(res.data.retMsg,{icon: 1})
                }else{
                  layer.msg(res.data.retMsg,{icon: 2})
                }
              })
            });
          } else if(obj.event === 'edit'){ //编辑
            sessionStorage.setItem('listId',listId)
            _this.$router.push('/addInstitution')
          }else if(obj.event === 'privilege'){  // 权限
            // sessionStorage.setItem('deviceId',deviceId)
            // _this.$router.push("/checkEquipmentInfo")
          }else if(obj.event === 'freeze'){   //冻结

          }
        });
    });
  },
  created(){
    this.type = this.$route.query.type
    this.$axios.post('/api/getOrganizationList').then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
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