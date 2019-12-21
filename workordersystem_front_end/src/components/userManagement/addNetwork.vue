<template>
  <div class="addNetwork">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
        </div>
      <div class="layui-form-item">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block">
          <select name="customerId" lay-verify="required">
              <option value>请选择一个客户</option>
              <option
                v-for="(item) in customerNameList"
                :key="item.customerId"
                :value="item.customerId"
              >{{item.customerName}}</option>
            </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">投放点</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="networName"
            lay-verify="required"
            placeholder="请输入网点名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      
      <div class="layui-form-item">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
          <select name="regionId" lay-verify="required">
            <option value="">请选择一个城市</option>
            <option
                v-for="(item) in RegionInfoList"
                :key="item.regionId"
                :value="item.regionId"
              >{{item.regionName}}</option>
          </select> 
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">投放点详细地址</label>
        <div class="layui-input-block">
          <textarea lay-verify="required" name="networAddress" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addNetwork",
  data() {
    return {
      customerNameList:[],
      RegionInfoList: []
    };
  },
  methods:{
    send(){
      var userId = this.$store.state.userId
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {  // 客户名称
      console.log(res)
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post("/api/getRegionInfoList", userId).then(res => {  // 客户名称
      console.log(res)
        this.RegionInfoList = res.data.body.addrList;
      });
    },
    cancel(){
      this.$router.push('/NetworkList?type=NetworkList')
    }
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();

      //监听提交
      form.on("submit(formDemo)", function(data) {
        var networkId = sessionStorage.getItem('networkId') ? sessionStorage.getItem('networkId') : ''
        data.field.userId = _this.$store.state.userId
        if(networkId === null || networkId === '' || networkId === undefined){
          _this.$axios.post('/api/addNetworkInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/NetworkList?type=NetworkList')
              },3200)
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }else{
          data.field.networkId = networkId
          _this.$axios.post('/api/alterNetworkInfo',data.field).then(res=>{
          console.log(res)
          if(res.data.retCode == '000000'){
            layer.msg(res.data.retMsg,{icon: 1})
            setTimeout(()=>{
              _this.$router.push('/NetworkList?type=NetworkList')
            },3200)
          }else{
            layer.msg(res.data.retMsg,{icon: 2})
          }
        })
        }
        return false;
      });

      //表单验证
      form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });
    });
  },
  created(){
    this.send()
  },
  updated() {
    setTimeout(function() {
      layui.use("form", function() {
        layui.form.render();
      });
    }, 10);
  },
  beforeDestroy(){
    sessionStorage.removeItem('networkId')
  }
};
</script>

<style scoped>
.addNetwork{
  padding: 15px;
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
.layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.layui-form-label {
  display: flex;
  align-items: center;
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