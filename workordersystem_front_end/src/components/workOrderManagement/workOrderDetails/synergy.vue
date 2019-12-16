<template>
  <!-- 处理中 协同作业 -->
  <div v-if="Object.keys(coordinateList).length !== 0">
    <h2>协同作业</h2>
    <div class="layui-form-item">
      <div class="layui-collapse">
        <div v-for="item in coordinateList" :key="item.id" class="layui-colla-item">
          <h2 class="layui-colla-title">协同人员：{{item.responsibleName}}</h2>
          <div class="layui-colla-content">
            <ul>
              <li class="layui-form-item layui-form-text">
                <label class="">协同内容：</label>
                <span class="">
                  {{item.content}}
                </span>
              </li>
              <li class="layui-form-item">
                <label class="">紧急程度：</label>
                <span class="">{{item.orderUrgency == 0 ? '一般' : '紧急'}}</span>
              </li>
              <li class="layui-form-item">
                <label class="">状态：</label>
                <span>{{item.coordinateState == 0 ? '待受理' : (item.coordinateState == 1 ? '处理中' : item.coordinateState == 2 ? '已完成' : '')}}</span>
              </li>
              <li class="layui-form-item">
                <label class="">编号：</label>
                <span class="">{{item.id}}</span>
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
      coordinateList: {}
    }
  },
  methods:{
    getOrderCoordinateList(){
      var orderInfoId = sessionStorage.getItem("orderInfoId") ? sessionStorage.getItem("orderInfoId") : ''
      if(orderInfoId){
        var data = {
          userId: this.$store.state.userId,
          orderInfoId: orderInfoId
        }
        this.$axios.post("/api/getOrderCoordinateList",data).then(res=>{
          console.log(res)
          if(res.data.retCode == '000000'){
            this.coordinateList = res.data.body.coordinateList 
          }
        })

      }
    }
  },
  mounted(){
    this.getOrderCoordinateList()
    layui.use("element",function(){
      var element = layui.element
      element.render()
    })
  },
  created(){
    this.$emit("getcoordinateList", this.coordinateList)
  },
  updated() {
    layui.use("element",function(){
      var element = layui.element
      element.render()
    })
  },
};
</script>
<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>