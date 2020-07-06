<template>
  <div class="equipmentList">
    <data-screening :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p>
          <router-link to="/addEquipment" v-if="add" class="layui-btn layui-btn-normal layui-btn-sm" tag="button" type="button"><i class="layui-icon">&#xe608;</i> 新增</router-link>
          <span id="leadIn" v-show="leadIn" class="layui-btn layui-btn-primary layui-btn-sm">
            <i class="layui-icon">&#xe681;</i>
            导入
          </span>
        </p>
      </div>
      <div class="dataList_table" >
        <table id="demo" lay-filter="equipmentList" lay-data="{id:'serachData'}"></table>
      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'equipmentList',
  inject: ["reload"],
  data() {
    return {
      type:'',
      add: false,
      leadIn: false
    }
  },
  components: {
    dataScreening
  },
  mounted(){

      var _this = this  // 改变this指向
      layui.use(['table', 'form', 'upload'], function() {
        var table = layui.table;
        var form = layui.form
        var upload = layui.upload
        form.render()
        form.on('submit(serach)', function(data){
          console.log(data.field)
          data.field.userId = _this.$store.state.userId
          table.reload('serachData',{
            url: "/api/getDeviceInfoList",
            where:data.field,
            page:{curr: 1}
          })
        })
        //第一个实例
        table.render({
          elem: "#demo",
          url: "/api/getDeviceInfoList", //数据接口
          method: 'post',
          id: 'serachData',
          where: {userId: _this.$store.state.userId},
          parseData: function(res){ //res 即为原始返回的数据
              return {
                "code": res.retCode, //解析接口状态
                "msg": res.retMsg, //解析提示文本
                "count": res.body.totalCount, //解析数据长度
                "data": res.body.deviceInfoList //解析数据列表
              };
            },
          defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
          }],
          initSort: {  // 排序
            field: 'deviceId',
            type: 'asc'   //升序
          },
          page: true, //开启分页
          request: {
            pageName: 'currentPage', //页码的参数名称，默认：page
            curr: 'indexCount', //页码的参数名称，默认：page
            limitName: 'everyCount' //每页数据量的参数名，默认：limit
          },
          title: '设备列表',
          cols: [
            [
              //表头
              {field: "deviceId", fixed: 'left', hide:true},
              { field: "deviceNumber", title: "设备序列号", sort: false,align: "center"},
              { field: "modelName", title: "存货名称",  sort: false,align: "center"},
              { field: "modelType", title: "设备型号",  sort: false,align: "center" },
              { field: "seviceBegintime", title: "维保开始时间",  align: "center" },
              { field: "seviceEndtime", title: "维保结束时间",  align: "center" },
              { field: "customerName", title: "客户名称",sort: false,align: "center" },
              { field: "networkName", title: "投放点", sort: false,align: "center" },
              { field: "region", title: "所在城市", width: 100, align: "center"},
              { field: "networkAddress", title: "投放点地址", align: "center"},
              { field: "operation", title: "操作",width: 165, align: "center", templet: function(d) {
                return '<div class="tabBtn"></div>'
              } }
            ]
          ],
          done: function(res, curr, count){
            _this.getBtns()
          }
        });

        table.reload('serachData',
          {
            url: "/api/getDeviceInfoList", //数据接口
            where:{
              userId: _this.$store.state.userId
            }
        })
        //头工具栏事件
        table.on('toolbar(equipmentList)', function(obj){
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
        table.on('tool(equipmentList)', function(obj){
          var data = obj.data;
          console.log(data)
          var deviceId = data.deviceId
          if(obj.event === '删除'){
            layer.confirm('你确定要删除这条记录？',{ icon: 3, title: "提示" }, function(index){
              
              //向服务端发送删除指令
              var delParam = {
                userId : _this.$store.state.userId,
                deviceId: deviceId
              }
              _this.$axios.post('/api/deleDeviceInfo',delParam).then(res=>{
                console.log(res)
                if(res.data.retCode == '000000'){
                  layer.msg(res.data.retMsg,{icon: 1})
                  obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                  layer.close(index);
                }else{
                  layer.msg(res.data.retMsg,{icon: 2})
                }
              })
            });
          } else if(obj.event === '编辑'){;
            localStorage.setItem('deviceId',deviceId)
            localStorage.setItem('data',JSON.stringify(data))
            _this.$router.push('/addEquipment')
          }else if(obj.event === '查看'){
            localStorage.setItem('deviceId',deviceId)
            _this.$router.push("/checkEquipmentInfo")
          }
        });
        upload.render({
          elem: "#leadIn",
          url: "/api/importDeviceInfo",
          method: "post",
          multiple: false, //是否多文件上传
          accept: "file", // 规定上传文件类型 ，images/file/video/audio
          auto: true, // 是否自动上传
          field: "file", // 设定文件域字段
          choose: function(obj) {
            obj.preview(function(index, file, result) {
              console.log(file);
              // obj.resetFile(index, file, _this.orderInfoId + '-' + index); //重命名文件名
            });
            this.data = { userId: _this.$store.state.userId };
          },
          before: function(obj) {
            //预读本地文件示例，不支持ie8
          },
          // allDone:function(obj){
          //   console.log(obj.total); //得到总文件数
          //   console.log(obj.successful); //请求成功的文件数
          //   console.log(obj.aborted); //请求失败的文件数
          // },
          done: function(res) {
            //上传完毕
            console.log(res);
            if (res.retCode == 0) {
              layer.msg(res.retMsg, { icon: 1 });
              _this.reload()
            } else {
              layer.msg(res.retMsg, { icon: 2 });
            }
          }
        });
      });
  },
  methods: {
    getBtns(){
      this.$('tbody a').hide()
      this.$('.dataList_top').find('a').hide()
      // console.log(this.$('.content_main a'))
      var userId = this.$store.state.userId
      this.$axios({
        method: 'post',
        url: '/api/getAllRoleInfoByUserId',
        data: {
          userId: userId,
          seleUserId: userId
        }
      }).then((res) => {
        console.log(res)
        // debugger
        if (res.data.body.roleBtnList.length > 0) {
          var arr = []
          for (var i = 0; i < res.data.body.roleBtnList.length; i++) {
            if (res.data.body.roleBtnList[i].btnLimit) {
              arr.push(JSON.parse(res.data.body.roleBtnList[i].btnLimit))
            }
          }
          console.log(arr)
          var url = location.pathname + location.search
          console.log(url)
          var str = []
          for (var j = 0; j < arr.length; j++) {
            for (var z = 0; z < arr[j].length; z++) {
              if (arr[j][z].btns && arr[j][z].menuUrl == url) {
                console.log(arr[j][z].btns)
                str = arr[j][z].btns
              }
            }
          }
          if(str.length == 0){
            this.$('tbody a').hide()
          }else{
            var btn = str
            for (var h = 0; h < btn.length; h++) {
              for (var k = h + 1; k < btn.length; k++) {
                if (btn[h].btnCode == btn[k].btnCode) {         //第一个等同于第二个，splice方法删除第二个
                  btn.splice(k, 1);
                  k--;
                }
              }
            }
            var userBtn  = btn
            this.getBtnList(userBtn)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getBtnList(userBtn){
        var btnList = userBtn
        console.log(btnList)
        console.log(this.$('.tabBtn'))
        var str = ''
        for(var z = 0; z < btnList.length;z++){
          if(btnList[z].btnName == '添加'){
            this.add = true
          }else if(btnList[z].btnName == '导入'){
            this.leadIn = true
          }else{
            str += '<a class="'+btnList[z].btnCode+' layui-btn layui-btn-xs" lay-event="'+btnList[z].btnName+'" >'+btnList[z].btnName+'</a>'
          }
          // console.log(btnList[z].btnCode)
        }
        console.log(str)
        for(var j = 0; j < this.$('.tabBtn').length; j++){
          console.log(this.$(this.$('.tabBtn')[j]).html(str))
          this.$(this.$('.tabBtn')[j]).html(str)
        }
       
    }
  },
  created(){
    this.type = this.$route.query.type

    // this.$axios.post('/api/getDeviceInfoList').then((res)=>{
    //   console.log(res.data)
    // }).catch(err=>{
    //   console.log(err)
    // })
    localStorage.clear()
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