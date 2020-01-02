<template>
  <div class="navBar" v-if="type">
    <div class="filtrate" @click="Expand">
      <i></i>
      <span>筛选</span>
    </div>
    <div v-show="showOrhide" class="filtrateBox" @click="packUp">
      <div class="filtrateContent" @click.stop="bubbleStop">
        <div class="head">
          <i></i>
          <span>筛选</span>
        </div>
        <div class="content">
          <dl>
            <dt>类型</dt>
            <div></div>
            <dd>
              <span v-for="(item,index) in searchType" :class="index == typeId ? 'active' : ''" :key="index" @click="seleType(item.state,index)">{{item.typeName}}<i v-if="index == typeId ? true : false"></i></span>
            </dd>
          </dl>
          <dl>
            <dt>紧急程度</dt>
            <dd>
              <span v-for="(item,index) in orderUrgency" :class="index == Urgency ? 'active' : ''" :key="index" @click="seleUrgency(item.state,index)">{{item.UrgencyName}}<i v-if="index == Urgency ? true : false"></i></span>
            </dd>
          </dl>
          <dl>
            <dt>工单状态</dt>
            <dd>
              <span v-for="(item,index) in orderState" :class="index == cutId ? 'active' : ''" :key="item.state" @click="seleorderState(item.state,index)">{{item.stateName}}<i v-if="index == cutId ? true : false"></i></span>
            </dd>
          </dl>
          <dl>
            <dt>创建时间</dt>
            <dd>
              <span><input type="text" ref="termStart" @click="showPopup('termStart')" name="seleBeginTime" placeholder="开始时间"></span>
              <span><input type="text" ref="termEnd" @click="showPopup('termEnd')" name="seleEndTime" placeholder="结束时间"></span>
            </dd>
          </dl>
          <div class="seleTime">
            <van-popup v-model="show" position="bottom" :style="{ height: '52%' }">
              <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
                v-if="datePicker == 'termStart'"
                @confirm="confirm"
                @cancel="cancel"
              />
              <van-datetime-picker
                v-model="currentDate"
                type="datetime"
                v-if="datePicker == 'termEnd'"
                :min-date="minDate"
                :max-date="maxDate"
                @confirm="confirm"
                @cancel="cancel"
              />
            </van-popup>
          </div>
        </div>
        <div class="btn">
          <button class="reset"  type="button" @click="reset">重置</button>
          <button class="confirm" type="button" @click="ascertain">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titleNaem","list"],
  data() {
    return {
      type: "",
      cutId: null,
      typeId: null,
      Urgency: null,
      show: false,
      showOrhide: false,
      isSele: false,
      orderState:[
        {stateName: '待发单' , state: 0},
        {stateName: '待派单' , state: 1},
        {stateName: '待受理' , state: 2},
        {stateName: '处理中' , state: 3},
        {stateName: '待回访' , state: 7},
        {stateName: '已关单' , state: 8},
      ],
      searchType:[
        {typeName: '工单',state: 0},
        {typeName: '协同',state: 1}
      ],
      orderUrgency:[
        {UrgencyName: '紧急',state: 0},
        {UrgencyName: '一般',state: 1},
      ],
      screenData: {
        type: '',
        orderUrgency: '',
        seleorderState: '',
        seleBeginTime: '',
        seleEndTime: ''
      },
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2016, 1, 1),
      maxDate: new Date(2030, 12, 31),
      currentDate: new Date(),
      datePicker: '', // 用于判断哪个选择器的显示与隐藏
    };
  },
  methods: {
    packUp() {
      this.showOrhide = false;
    },
    Expand() {
      this.showOrhide = true;
    },
    bubbleStop() {},
    seleorderState(state,index){ //选择工单状态
      console.log(state)
      this.cutId = index
      this.screenData.seleorderState = state
      // if(state.stateName == ele.target.innerText){
      //   console.log(state)
      //   this.$refs.current[i].style.background = '#d5e2ff'
      //   this.$refs.current[i].style.color = '#2F6CFF'
      // }
    },
    seleType(state,index){ //选择类型
      console.log(state)
      this.typeId = index
      this.screenData.type = state
      // if(state.stateName == ele.target.innerText){
      //   console.log(state)
      //   this.$refs.current[i].style.background = '#d5e2ff'
      //   this.$refs.current[i].style.color = '#2F6CFF'
      // }
    },
    seleUrgency(state,index){ //选择紧急程度
      console.log(state)
      this.Urgency = index
      this.screenData.orderUrgency = state
      // if(state.stateName == ele.target.innerText){
      //   console.log(state)
      //   this.$refs.current[i].style.background = '#d5e2ff'
      //   this.$refs.current[i].style.color = '#2F6CFF'
      // }
    },

    showPopup(picker){
      this.show = true;
      this.datePicker = picker;
    },
    confirm(val) {
      //预约
      var date = val;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var sec = date.getMinutes();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      if (h < 10) h = "0" + h;
      if (sec < 10) sec = "0" + sec;
      var timer =
        date.getFullYear() +
        "-" +
        m +
        "-" +
        d +
        " " +
        h +
        ":" +
        sec +
        ":" +
        "00";
      console.log(timer);
      // this.$('input[name="seleBeginTime"]').val(timer);
      this.$refs[this.datePicker].value = timer;
// seleEndTime
      this.show = false;

     
    },
    cancel() {
      this.show = false;
      this.datePicker = '';
    },
    reset() {},
    ascertain() {
      this.screenData.seleBeginTime = this.$('input[name="seleBeginTime"]').val()
      this.screenData.seleEndTime = this.$('input[name="seleEndTime"]').val()
      console.log(this.screenData)
    }
  },

  mounted() {
    this.type = this.$route.query.type;
  },
  created() {},
  watch: {
    $route: {
      handler: function() {
        this.type = this.$route.query.type;
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style scoped>

.filtrate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  width: 30px;
  margin-left: 10px;
}
.active{
  background: #d5e2ff;
  color: #2F6CFF
}

.filtrate::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 17px;
  background: url("../assets/Images/screening.png") no-repeat;
  background-size: 100%;
}
.filtrateBox {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
.filtrateContent {
  width: 80%;
  height: 100%;
  background: #ffffff;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}
.head {
  height: 50px;
  display: flex;
  align-items: center;
}
.head i {
  display: flex;
  align-items: center;
  width: 40px;
  height: 100%;
  justify-content: center;
}
.head i::before {
  display: inline-block;
  width: 9px;
  height: 17px;
  background: url("../assets/Images/return.png") no-repeat;
  background-size: 100%;
  content: "";
}
.head::after {
  content: "";
  width: 40px;
  height: 100%;
  display: inline-block;
}
.head span {
  color: #2f6cff;
  font-size: 16px;
  flex: 1;
  text-align: center;
}
.content {
  flex: 1;
  padding: 0 10px; 
}
.btn {
  display: flex;
}
.btn button {
  flex: 1;
  height: 50px;
  border: none;
  font-size: 16px;
}
.reset {
  background: #f8a32c;
}
.confirm {
  background: #2f6cff;
}
dl {
  margin: 15px 0;
}
dt {
  color: #666666;
  font-size: 15px;
  margin-bottom: 10px;
}
dd {
  color: #666666;
  display: flex;
  font-size: 15px;
  align-items: center;
  flex-wrap: wrap;
}
dd span{
  width: 29%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #F7F7F7;
  margin: 5px ;
  border-radius: 3px;
}
dl:nth-child(4) dd{
  justify-content: center;
}
dl:nth-child(4) dd span{
  width: 60%;
  height: 40px;
  line-height: 40px;
  border-radius: 45px;
  position: relative;
}
dl dd span i{
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: url("../assets/Images/remove.png") no-repeat;
  background-size: 100%;
}
dl:nth-child(4) dd span input{
  width: 100%;
  border: none;
  background: #F7F7F7;
  border-radius: 45px;
  padding: 0 5px;
  text-align: center;
} 
dl:nth-child(4) dd span input::placeholder{
  text-align: center;
  color: #DDDDDD
}
</style>