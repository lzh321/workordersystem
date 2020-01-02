<template>
<!-- 新增菜单 -->
  <div class="addMenu">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>

      <div class="layui-form-item" v-if="menuPno ? false : true">
        <label class="layui-form-label">菜单类型</label>
        <div class="layui-input-block">
          <select name="menuType" lay-verify="required">
            <option value>请选择菜单类型</option>
            <option value="1">父级菜单</option>
            <option value="2">子级菜单</option>
            <option value="3">其他</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item" v-if="menuPno ? menuPno == 1 ? false : true : false">
        <label class="layui-form-label">父级菜单</label>
        <div class="layui-input-block">
          <select name="menuPno" lay-verify="required">
            <option value>请选择菜单类型</option>
            <option v-for="(item) in menuList" :key="item.menuId" autocomplete="off" :value="item.menuNo">{{item.menuName}}</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">菜单名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="menuName"
            lay-verify="required"
            placeholder="请输入菜单名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item" v-if="menuPno == 1 ? false : true ">
        <label class="layui-form-label">菜单URL</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="menuUrl"
            lay-verify=""
            placeholder="请输入菜单名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      
      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addMenu">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" type="reset" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addMenu",
  data() {
    return {
      menuPno: '',
      menuList: [],
      menuInfo: sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : ''
    };
  },
  methods:{
    send(){
      var userId = this.$store.state.userId
      var data = {
        userId: userId,
      }
      this.$axios.post('/api/getFatherMenuList',userId).then(res=>{
        console.log(res)
        this.menuList = res.data.body.menuList
      })
    },
    getInstitution() {
      // 公司
      var companyId = this.menuInfo.companyId
      var companyIdLen = this.$("#companyId option").length;
      for (var i = 0; i < companyIdLen; i++) {
        var companyIdVal = this.$("#companyId option")
          .eq(i)
          .val();
        if (companyId == companyIdVal) {
          this.$("#companyId option")
            .eq(i)
            .attr("selected", "selected");
        }
      }
      // 部门
      var deptId = this.menuInfo.deptId;
      var deptIdLen = this.$("#deptId option").length;
      for (var i = 0; i < deptIdLen; i++) {
        var deptIdVal = this.$("#deptId option")
          .eq(i)
          .val();
        if (deptId == deptIdVal) {
          this.$("#deptId option")
            .eq(i)
            .attr("selected", "selected");
        }
      }
      // 职务
      var jobId = this.menuInfo.jobId;
      var jobIdLen = this.$("#jobId option").length;

      for (var i = 0; i < jobIdLen; i++) {
        var jobIdVal = this.$("#jobId option")
          .eq(i)
          .val();
        if (jobId == jobIdVal) {
          this.$("#jobId option")
            .eq(i)
            .attr("selected", "selected");
        }
      }
    },
    cancel(){
      this.$router.push('/menuManagement?type=menuManagement')
    }
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(addMenu)", function(data) {
        var menuId = sessionStorage.getItem('menuId') ? sessionStorage.getItem('menuId') : ''
        var menuPno = sessionStorage.getItem('menuPno') ? sessionStorage.getItem('menuPno') : ''
        data.field.userId = _this.$store.state.userId
        if(menuId === null || menuId === '' || menuId === undefined){
          _this.$axios.post('/api/addMenuInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/menuManagement?type=menuManagement')
              },3000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }else{
          data.field.menuId = menuId
          if(menuPno == 1){
            data.field.menuPno = menuPno
          }
          console.log(data.field)
          _this.$axios.post('/api/alterMenuInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/menuManagement?type=menuManagement')
              },3000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }
        return false;
      });
    });
  },
  created(){
    this.menuPno = sessionStorage.getItem('menuPno')
    this.send()
  },

  updated(){
    layui.use("form",function(){
      var form = layui.form
      form.render()
    })
  }
};
</script>

<style scoped>
.addMenu{
  padding: 15px 15px 0;
}
.layui-btn {
  padding: 0 50px;
}
.layui-form-label {
  display: flex;
  align-items: center;
}
.layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.info span{
  display: flex;
  align-items: center;
  font-weight: 600
}
.info span:nth-child(2){
  font-weight: 400;
  color: #c2c2c2;
}
.info span:nth-child(2)::before{
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
</style>