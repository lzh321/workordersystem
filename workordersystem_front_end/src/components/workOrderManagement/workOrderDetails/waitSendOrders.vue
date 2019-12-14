<template>
  <div>
    <div class="layui-form-item">
      <label class="layui-form-label">指派给</label>
      <div class="layui-input-block">
        <select name="acceptUserId">
          <option value>请选择指派人</option>
          <option v-for="item in userList" :key="item.userId" :value="item.userId">{{item.userName}}</option>
        </select>
      </div>
    </div>
   
  </div>
</template>
<script>
export default {
  name: "waitSendOrders",
  data() {
    return {
      userList: []
    }
  },
  created(){
    this.$axios.post("/api/getUserList",this.$store.state.userId).then(res=>{
      console.log(res)
      this.userList = res.data.body.userList
    })
  },
  updated(){
    layui.use("form", function(){
      layui.form.render()
    })
  }
};
</script>
<style scoped>
</style>