<template>
  <div class="selectBank">
    <div class="OrderSearch">
      <div class="search">
        <div class="SearchEntrance">
          <i></i>
        </div>
        <input placeholder="搜索" v-model="searchVal" />
      </div>
  </div>
    <ul>
      <li v-for="item in NewItems" :key="item.customerId" @click="selectBank(item)">
        <!-- <img src="" alt=""> -->
        <span>{{item.customerName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  name: 'selectBank',
  data() {
    return {
      bankList:[],
      orderInfoId: '',
      searchVal: ''
    }
  },
  methods:{
    selectBank(data){
      console.log(data)
      sessionStorage.setItem("bankList",JSON.stringify(data))
      this.$router.go(-1);
    }
  },
  created(){
    this.axios.post("/api/getCustomerNameList",{userId: this.$store.state.userId}).then(res=>{
      console.log(res)
      if(res.data.retCode == '000000'){
        this.bankList = res.data.body.customerNameList
      }
    })
  },
  computed: {
    //设置计算属性
    NewItems() {
      var _this = this;

      var NewItems = [];

      this.bankList.map(function(item) {
        if (item.customerName.search(_this.searchVal) != -1) {
          NewItems.push(item);
        }
      });

      return NewItems;
    }
  }
}
</script>

<style scoped>
.selectBank{
  
}
ul{
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

.OrderSearch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: #2f6cff;
  color: #ffffff;
  height: 50px;
  border: none;
}
.SearchEntrance {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  position: absolute;
  color: #2f6cff;
  top: 7px;
  left: 5px;
  width: 50px;
}
.search {
  display: flex;
  flex: 1;
  position: relative;
}
.search input {
  flex: 1;
  height: 30px;
  border: none;
  border-radius: 30px;
  padding-left: 45px;
  color: #333333;
  font-size: 15px;
}
.search input::placeholder {
  color: #2f6cff;
}
.SearchEntrance::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("../../../assets/Images/personnel_search.png") no-repeat;
  background-size: 100%;
}
</style>