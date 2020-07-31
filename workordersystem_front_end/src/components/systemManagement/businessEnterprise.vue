<template>
  <!-- 企业机构管理 -->
  <div class="businessEnterprise">
    <data-screening ref="getData" :type="type"></data-screening>
    <div class="dataList">
      <div class="dataList_top">
        <h2>数据列表</h2>
        <p class="layui-btn-container">
          <router-link to="/addInstitution" v-if="add" class="add layui-btn layui-btn-normal layui-btn-sm" tag="button" ><i class="layui-icon">&#xe608;</i> 添加</router-link>
          <router-link to="/deploy?type=CompanyList" v-if="config" class="config layui-btn layui-btn-primary layui-btn-sm" tag="button"><i class="layui-icon">&#xe620;</i>配置</router-link>
        </p>
      </div>
      <div class="dataList_table">
        <table id="businessEnterprise" lay-filter="businessEnterprise" lay-data="{id: 'serachData}"></table>

      </div>
    </div>
  </div>
</template>

<script>
import dataScreening from "../dataScreening";
export default {
  name: "businessEnterprise",
  data() {
    return {
      type: "",
      add: false,
      config: false
    };
  },
  components: {
    dataScreening
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
        // console.log(btnList)
        // console.log(this.$('.tabBtn'))
        var str = ''
        for(var z = 0; z < btnList.length;z++){
          if(btnList[z].btnName == '添加'){
            this.add = true
          }else if(btnList[z].btnName == '配置'){
            this.config = true
          }else{
            str += '<a class="'+btnList[z].btnCode+' layui-btn layui-btn-xs" lay-event="'+btnList[z].btnName+'" >'+btnList[z].btnName+'</a>'
          }
          
          // console.log(btnList[z].btnCode)
        }
        // console.log(str)
        for(var j = 0; j < this.$('.tabBtn').length; j++){
          this.$(this.$('.tabBtn')[j]).html(str)
          // console.log(this.$(this.$('.tabBtn')[j]).html(str))
        }

        for(var i = 0; i < this.$('tbody tr td').length; i++){
          // console.log(this.$('tbody tr td')[i].textContent)
          if(this.$('tbody tr td')[i].textContent == this.$store.state.orgId){
           var ele = this.$(this.$('tbody tr td')[i]).siblings().find(".tabBtn").find("a")
           ele.addClass('layui-btn-disabled')
           ele.removeAttr('lay-event')
           console.log(ele.addClass('layui-btn-disabled'))
           return
          }
        }
        
    }
  },
  mounted() {
    var _this = this;
    layui.use(["table", "form"], function() {
      var table = layui.table;
      var form = layui.form;
      var curr = ''
      setTimeout(()=>{
        curr = sessionStorage.getItem("curr") ? sessionStorage.getItem("curr") : 1
        _this.$refs.getData.serachData = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {}
      })
      form.render();
      form.on("submit(serach)", function(data) {
        data.field.userId = _this.$store.state.userId;
        sessionStorage.setItem("data",JSON.stringify(data.field))
        console.log(data.field);
        table.reload("serachData", {
          url: "/api/getOrgInfoList",
          where: data.field,
          page: { curr: 1, limit: 10 }
        });
      });
      //第一个实例
      table.render({
        elem: "#businessEnterprise",
        // height: 485,
        url: "/api/getOrgInfoList", //数据接口
        method: "post",
        id: "serachData",
        where: { userId: _this.$store.state.userId },
        parseData: function(res) {
          //res 即为原始返回的数据
          return {
            code: res.retCode, //解析接口状态
            msg: res.retMsg, //解析提示文本
            count: res.body.totalCount, //解析数据长度
            data: res.body.orgInfoList //解析数据列表
          };
        },
        page: true, //开启分页
        request: {
          pageName: "currentPage", //页码的参数名称，默认：page
          // curr: 'indexCount', //页码的参数名称，默认：page
          limitName: "everyCount" //每页数据量的参数名，默认：limit
        },
        // limit: 10,
        cols: [
          [
            //表头
            {
              field: "orgId",
              title: "机构编号",
              width: 200,
              sort: false,
              align: "center",
            },
            {
              field: "orgName",
              title: "机构名称",
              sort: false,
              align: "center"
            },
            {
              field: "operation",
              title: "操作",
              align: "center",
              templet: function(d) {
                return '<div class="tabBtn"></div>'
              }
            }
          ]
        ],
        done: function(res, curr, count){
          _this.getBtns()
          if(count == 0){
            sessionStorage.setItem("curr",1)
          }else{
            sessionStorage.setItem("curr",_this.$('.layui-laypage-skip').find(".layui-input").val())
          }
        }
      });

      setTimeout(()=>{
        table.reload("serachData", {
          url: "/api/getOrgInfoList",
          where: sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {userId: _this.$store.state.userId},
          page: { curr: curr, limit: 10 }
        });
      })

      //监听行工具事件
      table.on("tool(businessEnterprise)", function(obj) {
        var data = obj.data;
        console.log(data);
        var orgId = data.orgId;
        if (obj.event === "删除") {
          layer.confirm(
            "你确定要删除这条记录？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送删除指令
              var delParam = {
                userId: _this.$store.state.userId,
                orgId: orgId
              };
              _this.$axios
                .post("/api/deleteOrgInfo", delParam)
                .then(res => {
                  console.log(res);
                  if (res.data.retCode == "000000") {
                    layer.msg(res.data.retMsg, { icon: 1 });
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    layer.close(index);
                  } else {
                    layer.msg(res.data.retMsg, { icon: 2 });
                  }
                });
            }
          );
        } else if (obj.event === "编辑") {
          //编辑
          localStorage.setItem("orgId", orgId);
          localStorage.setItem("data", JSON.stringify(data));
          _this.$router.push("/addInstitution");
        }
      });
    });
  },
  created() {
    this.type = this.$route.query.type;
    // this.$axios.post('/api/getOrganizationList').then(res=>{
    //   console.log(res)
    // }).catch(err=>{
    //   console.log(err)
    // })
    localStorage.clear()
  }
};
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