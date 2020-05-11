<template>
  <div class="modelType">
    <ul>
      <li v-for="item in modelType" :key="item.modelId" @click="selemodelType(item)">
        <span>{{item.modelType}}（{{item.modelName}}）</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  name: 'modelType',
  data() {
    return {
      modelType:[],
      orderInfoId: '',
    }
  },
  methods:{
    selemodelType(data){
      console.log(data)
      sessionStorage.setItem("modelType",JSON.stringify(data))
      this.$router.go(-1);
    }
  },
  created(){
    var networkId = this.$route.query.networkId
    var userId = this.$store.state.userId
    this.axios.post("/api/getDeviceNumberListByNetworkId",{networkId: networkId,userId:userId}).then(res=>{
      console.log(res)
      if(res.data.retCode == '000000'){
        this.modelType = res.data.body.modelList
      }
    })
  }
}
</script>

<style scoped>
.modelType{
  padding: 0 15px;
}
ul li{
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #F3F3F3;
}
ul li img{
  width: 14px;
  height: 14px;
  border: 1px solid red;
  margin-right: 5px;
}
</style>