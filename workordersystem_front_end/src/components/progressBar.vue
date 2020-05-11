<template>
  <div class="progressBar">
      <div class="content">
        <span>发单</span>
        <p>{{ orderState == 0 ? '' : orderInfo.sendTime}}</p>
      </div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>派单</span><p>{{orderState == 1 || orderState == 0 ? '' : orderInfo.sellTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>受理</span><p>{{orderInfo.acceptTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>预约</span><p>{{orderInfo.appoinmentTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>出发</span><p>{{orderInfo.goTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>到达</span><p>{{orderInfo.arriveTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>开始</span><p>{{orderInfo.beginTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>完成</span><p>{{orderInfo.finishTime}}</p></div>
      <div class="line"><i></i></div>
      <div class="line"><i></i></div>
      <div class="content"><span>关单</span><p>{{orderInfo.closeTime}}</p></div>
    </div>
</template>

<script>
export default {
  name: 'progressBar',
  data() {
    return {
      orderInfo: {},
      orderState: localStorage.getItem("orderState")
    }
  },
  methods:{
    changeArticleSteps(){
      var orderState = localStorage.getItem("orderState")
      var childrenLen = this.$(".progressBar").children().length
      var orderState = localStorage.getItem("orderState") ? localStorage.getItem("orderState") : ''
      console.log(childrenLen)
      // for(var i = 0; i < childrenLen; i++){
        if(orderState == 0){
          this.$(".progressBar").children().slice(0,2).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,1).find("span").css("border", "1px solid blue")
        }
        if(orderState == 1){
          this.$(".progressBar").children().slice(0,2).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,3).find("span").css("border", "1px solid blue")
        }
        if(orderState == 2 || orderState == 3){
          this.$(".progressBar").children().slice(0,5).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,5).find("span").css("border", "1px solid blue")
        }
        if( orderState == 3){
          this.$(".progressBar").children().slice(0,8).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,7).find("span").css("border", "1px solid blue")
        }

        if(orderState == 4){
          this.$(".progressBar").children().slice(0,11).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,10).find("span").css("border", "1px solid blue")
        }
        if(orderState == 5){
          this.$(".progressBar").children().slice(0,14).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,13).find("span").css("border", "1px solid blue")
        }
        if(orderState == 7){  //待回访
          this.$(".progressBar").children().slice(0,23).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,22).find("span").css("border", "1px solid blue")
        }
        if(orderState == 8){ //已关单
          this.$(".progressBar").children().slice(0,24).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,25).find("span").css("border", "1px solid blue")
        }
        if(orderState == 9){ //已到达
          this.$(".progressBar").children().slice(0,17).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,16).find("span").css("border", "1px solid blue")
        }
        if(orderState == 10){ // 完成
          this.$(".progressBar").children().slice(0,20).find("i").css("background", "blue")
          this.$(".progressBar").children().slice(0,19).find("span").css("border", "1px solid blue")
        }

      // };
    },
    getOrderInfo(){
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: localStorage.getItem("orderInfoId")
      }
      this.$axios.post("/api/getOrderInfo",data).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          this.orderInfo = res.data.body
        }
      })
    }
  },
  mounted(){
    this.changeArticleSteps()
  },
  created(){
    this.getOrderInfo()
  }

}
</script>

<style>
.progressBar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
}
.progressBar .content{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progressBar .content p{
  display: inline-block;
  width: 72px;
  text-align: center;
  position: absolute;
  bottom: -35px;
}
.progressBar .content span{
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 50px;
  line-height: 50px;
  text-align: center;
}
.progressBar .line{
  flex: .05;
  height: 50px;
  line-height: 40px;
}
.progressBar .line i{
  display: inline-block;
  width: 100%;
  height: 1px;
  background: #ccc;
}
</style>