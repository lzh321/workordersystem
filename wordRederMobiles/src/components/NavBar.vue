<template>
  <div class="navBar" v-if="type">
    <div class="filtrate" @click.stop="Expand">
      <i></i>
      <span>筛选</span>
    </div>
    <div v-show="showOrhide" class="filtrateBox" @click.stop="packUp">
      <div class="filtrateContent" @click.stop="bubbleStop">
        <div class="head">
          <i @click="exit"></i>
          <span>筛选</span>
        </div>
        <div class="content">
          <dl>
            <dt>紧急程度</dt>
            <dd>
              <span
                v-for="(item,index) in orderUrgency"
                :class="index == Urgency ? 'active' : ''"
                :key="index"
                @click="seleUrgency(item.state,index)"
              >
                {{item.UrgencyName}}
                <i
                  @click.stop="callOffUrgency"
                  v-if="index == Urgency ? true : false"
                ></i>
              </span>
            </dd>
          </dl>
          <dl>
            <dt>{{titleMsg}}</dt>
            <dd v-if="isShow">
              <span
                v-for="(item,index) in orderState"
                :class="index == cutId ? 'active' : ''"
                :key="item.state"
                @click="seleorderState(item.state,index)"
              >
                {{item.stateName}}
                <i
                  @click.stop="callOffState"
                  v-if="index == cutId ? true : false"
                ></i>
              </span>
            </dd>
            <dd v-else>
              <span
                v-for="(item,index) in synergyState"
                :class="index == cutId ? 'active' : ''"
                :key="item.state"
                @click.stop="seleorderState(item.state,index)"
              >
                {{item.stateName}}
                <i
                  @click.stop="callOffState"
                  v-if="index == cutId ? true : false"
                ></i>
              </span>
            </dd>
          </dl>
          <dl>
            <dt>创建时间</dt>
            <dd>
              <span @click="showPopup('termStart')">
                <input
                  type="text"
                  ref="termStart"
                  name="seleBeginTime"
                  placeholder="开始时间"
                  disabled
                />
              </span>
              <span @click="showPopup('termEnd')">
                <input
                  type="text"
                  ref="termEnd"
                  name="seleEndTime"
                  placeholder="结束时间"
                  disabled
                />
              </span>
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
          <button class="reset" type="button" @click="reset">重置</button>
          <button class="confirm" type="button" @click="ascertain">确定</button>
        </div>
      </div>
    <van-loading type="spinner" v-if="loading" color="#1989fa" :style="{position:'fixed',top: '45%',left:'45%',zIndex:'9999'}" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderTypeId", "synergyTypeId"],
  data() {
    return {
      type: "",
      titleMsg: "工单状态",
      cutId: null,
      typeId: null,
      Urgency: null,
      show: false,
      showOrhide: false,
      isSele: false,
      isShow: true,
      loading: false,
      orderState: [
        { stateName: "待发单", state: 0 },
        { stateName: "待派单", state: 1 },
        { stateName: "待受理", state: 2 },
        { stateName: "处理中", state: 3 },
        { stateName: "待回访", state: 7 },
        { stateName: "已关单", state: 8 }
      ],
      synergyState: [
        { stateName: "待受理", state: 0 },
        { stateName: "处理中", state: 1 },
        { stateName: "已完成", state: 2 },
        { stateName: "已驳回", state: 3 }
      ],
      orderUrgency: [
        { UrgencyName: "一般", state: 0 },
        { UrgencyName: "紧急", state: 1 },
      ],
      screenData: {},
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2016, 1, 1),
      maxDate: new Date(2030, 12, 31),
      currentDate: new Date(),
      datePicker: "" // 用于判断哪个选择器的显示与隐藏
    };
  },
  methods: {
    packUp() {
      this.showOrhide = false;
      this.$(".wordOrder").css("overflow-y",  "scroll")
    },
    Expand() {
      this.showOrhide = true;
      this.$(".wordOrder").css("overflow-y",  "hidden")
    },
    bubbleStop() {},
    seleorderState(state, index) {
      //选择工单状态
      console.log(state);
      this.cutId = index;
      if (this.orderTypeId == 0 || this.orderTypeId == 1) {
        this.screenData.seleorderState = state;
      } else if (this.synergyTypeId == 0 || this.synergyTypeId == 1) {
        this.screenData.seleCoordinateState = state;
      }
      // if(state.stateName == ele.target.innerText){
      //   console.log(state)
      //   this.$refs.current[i].style.background = '#d5e2ff'
      //   this.$refs.current[i].style.color = '#2F6CFF'
      // }
    },
    seleType() {
      //选择类型
      if (this.orderTypeId == 0 || this.orderTypeId == 1) {
        this.titleMsg = "工单状态";
        this.isShow = true;
      }
      if (this.synergyTypeId == 0 || this.synergyTypeId == 1) {
        this.titleMsg = "协同状态";
        this.isShow = false;
      }
    },
    seleUrgency(state, index) {
      //选择紧急程度
      console.log(state);
      this.Urgency = index;
      this.screenData.orderUrgency = state;
    },

    showPopup(picker) {
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
      this.datePicker = "";
    },
    ascertain() {
      this.screenData.seleBeginTime = this.$(
        'input[name="seleBeginTime"]'
      ).val();
      this.screenData.seleEndTime = this.$('input[name="seleEndTime"]').val();
      this.screenData.userId = this.$store.state.userId;
      this.screenData.currentPage = 1;
      this.screenData.everyCount = 100;
      console.log(this.screenData);
      if (this.orderTypeId == 0) {
        this.loading = true
        this.axios.post("/api/getOrderPlanList", this.screenData).then(res => {
          console.log(res);
          if(res.data.retCode == '000000'){
            setTimeout(()=>{
              this.$emit("getList", res.data.body.orderInfoList);
              this.loading = false;
              this.showOrhide = false;
              this.$(".wordOrder").css("overflow-y",  "scroll")
              this.reset()
            },1000)
          }
        });
      }
      if (this.orderTypeId == 1) {
        this.loading = true
        this.axios.post("/api/getOrderInfoList", this.screenData).then(res => {
          console.log(res);
          if(res.data.retCode == '000000'){
            setTimeout(()=>{
              this.$emit("getList", res.data.body.orderInfoList);
              this.loading = false;
              this.showOrhide = false;
              this.$(".wordOrder").css("overflow-y",  "scroll")
              this.reset()
            },1000)
          }
        });
      }
      if (this.synergyTypeId == 0) {
        this.loading = true
        this.axios.post("/api/getCoordinatePlanList", this.screenData).then(res => {
          console.log(res);
          if(res.data.retCode == '000000'){
            setTimeout(()=>{
              this.$emit("getList", res.data.body.coordinateList);
              this.loading = false;
              this.showOrhide = false;
              this.$(".wordOrder").css("overflow-y",  "scroll")
              this.reset()
            },1000)
          }
        });
      }
      if (this.synergyTypeId == 1) {
        this.loading = true
        this.axios.post("/api/getCoordinateInfoList", this.screenData).then(res => {
          console.log(res);
          if(res.data.retCode == '000000'){
            setTimeout(()=>{
              this.$emit("getList", res.data.body.coordinateList);
              this.loading = false;
              this.showOrhide = false;
              this.$(".wordOrder").css("overflow-y",  "scroll")
              this.reset()
            },1000)
          }
        });
      }
    },
    reset() {
      this.screenData = {};
      this.cutId = null;
      this.Urgency = null;
      this.$('input[name="seleBeginTime"]').val("");
      this.$('input[name="seleEndTime"]').val("");
    },
    exit() {
      this.showOrhide = false;
      this.$(".wordOrder").css("overflow-y",  "scroll")
    },

    callOffType() {},
    callOffUrgency() {
      this.Urgency = null;
      this.screenData.orderUrgency = null;
    },
    callOffState() {
      this.cutId = null;
      this.screenData.seleorderState = null;
      this.screenData.seleCoordinateState = null;
    }
  },

  mounted() {
    this.type = this.$route.query.type;
    this.seleType();
  },
  created() {
    
  },
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
.active {
  background: #d5e2ff;
  color: #2f6cff;
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
  z-index: 9999999;
  display: flex;
  flex-direction: row-reverse;
}
.filtrateContent {
  width: 80%;
  height: 100%;
  background: #ffffff;
  /* position: absolute; */
  right: 0;
  top: 0;
  z-index: 9999;
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
  justify-content: space-around;
}
.btn button {
  flex: .4;
  height: 45px;
  border: none;
  font-size: 16px;
  border-radius: 50px;
}
.reset {
  background: #f8a32c;
}
.confirm {
  background: #2f6cff;
}
dl {
  margin: 10px 0;
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
dd span {
  width: 29%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #f7f7f7;
  margin: 5px;
  border-radius: 3px;
}
dl:nth-child(3) dd {
  justify-content: center;
}
dl:nth-child(3) dd span {
  width: 60%;
  height: 40px;
  line-height: 40px;
  border-radius: 45px;
  position: relative;
}
dl dd span i {
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: url("../assets/Images/remove.png") no-repeat;
  background-size: 100%;
}
dl:nth-child(3) dd span input {
  width: 80%;
  border: none;
  background: #f7f7f7;
  border-radius: 45px;
  padding: 0 5px;
  text-align: center;
  color: #000000;
}
dl:nth-child(3) dd span input::placeholder {
  text-align: center;
  color: #dddddd;
}
.perch{
  height: 50px;
}
</style>