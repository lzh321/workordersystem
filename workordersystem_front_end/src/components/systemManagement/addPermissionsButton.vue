<template>
<!-- 新增权限按钮 -->
  <div class="addPermissionsButton">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="layui-form-item" v-if="btnList">
        <label class="layui-form-label">菜单名称</label>
        <div class="layui-input-block">
          <input class="layui-input" type="text" name="menuName" :value="btnList.menuName" disabled>
        </div>
      </div>
      <div class="layui-form-item" v-else>
        <label class="layui-form-label">菜单名称</label>
        <div class="layui-input-block">
          <select name="menuName" lay-verify="required" lay-search lay-filter="getMenuName">
            <option value>请选择菜单名称</option>
            <option v-for="item in menuList" :key="item.menuId" :value="item.menuName" :selected="item.menuId == btnList.menuId ? true : false">{{item.menuName}}</option>
          </select>
          <input type="hidden" name="menuId" :value="getMenu.menuId ? getMenu.menuId : btnList.menuId">
          <input type="hidden" name="menuUrl" :value="getMenu.menuUrl ? getMenu.menuUrl : btnList.menuUrl">
        </div>
      </div>
      

      <div class="layui-form-item">
        <label class="layui-form-label">按钮编码</label>
        <div class="layui-input-block">
          <input
            type="text"
            v-model="btnCode"
            name="btnCode"
            lay-verify="required"
            placeholder="请输入按钮名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">按钮名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            v-model="btnName"
            name="btnName"
            lay-verify="required"
            placeholder="请输入按钮名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      
      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addPermissionsButton">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" type="" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addPermissionsButton",
  data() {
    return {
      menuList: [],
      getMenu: {},
      btnList: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : '',
      btnCode: '',
      btnName: ''
    };
  },
  methods:{
    cancel(){
      this.$router.push('/permissionsButton?type=permissionsButton')
    },
    getMenuList(){
      this.$axios.post("/api/getMenuList",{userId: this.$store.state.userId,currentPage: 1,everyCount:100}).then(res=>{
        console.log(res)
        for(var j = 0; j < res.data.body.menuList.length; j++){
          if(res.data.body.menuList[j].menuPno !== 1){
            this.menuList.push(res.data.body.menuList[j])
          }
        }
        
      })
    }
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();

      form.on("select(getMenuName)",function(data){
        console.log(data)
        for(var i = 0; i < _this.menuList.length; i++){
          if(_this.menuList[i].menuName == data.value){
            console.log(_this.menuList[i])
            _this.getMenu = _this.menuList[i]
          }
        }
      })
      //监听提交
      form.on("submit(addPermissionsButton)", function(data) {
        var btnId = localStorage.getItem('btnId') ? localStorage.getItem('btnId') : ''
        data.field.userId = _this.$store.state.userId
        if(btnId === null || btnId === '' || btnId === undefined){
          _this.$axios.post('/api/addBtnInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/permissionsButton?type=permissionsButton')
              },3000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }else{
          data.field.btnId = btnId
          console.log(data.field)
          _this.$axios.post('/api/alterBtnInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/permissionsButton?type=permissionsButton')
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
    this.getMenuList()
    this.btnCode = this.btnList.btnCode
    this.btnName = this.btnList.btnName
  },
  updated(){
    layui.use('form',function(){
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
input:disabled{
  color: #666666;
}
</style>