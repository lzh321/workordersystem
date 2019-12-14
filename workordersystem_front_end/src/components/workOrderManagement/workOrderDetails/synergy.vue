<template>
  <!-- 处理中 协同作业 -->
  <div>
    <h2>协同作业</h2>
    <div class="layui-form-item">
      <div class="layui-collapse">
        <div class="layui-colla-item">
          <h2 class="layui-colla-title">协同人员：杜甫</h2>
          <div class="layui-colla-content">
            <ul>
              <li class="layui-form-item layui-form-text">
                <label class="">协同内容：</label>
                <span class="">
                  打算吃顿饭
                </span>
              </li>
              <li class="layui-form-item">
                <label class="">紧急程度：</label>
                <span class="">一般</span>
              </li>
              <li class="layui-form-item">
                <label class="">状态：</label>
                <span>待受理</span>
              </li>
              <li class="layui-form-item">
                <label class="">编号：</label>
                <span class="">PL10632562</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "synergy",

  data() {
    return {
    }
  },
  mounted(){
    layui.use("element",function(){
      var element = layui.element
      element.render()
    })
  },
  created(){
    var orderInfoId = sessionStorage.getItem("orderInfoId") ? sessionStorage.getItem("orderInfoId") : ''
    if(orderInfoId){
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: orderInfoId
      }
      this.$axios.post("/api/getOrderCoordinateList",data).then(res=>{
        console.log(res)
      })

    }
  }
};
</script>
<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>