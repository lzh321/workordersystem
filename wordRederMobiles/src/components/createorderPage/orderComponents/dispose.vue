<template>
  <div class="dispose">
    <form action id="formData">
      <div class="info">
        <h2>故障处理记录</h2>
      </div>
      <appointment v-if="orderInfo.appoinmentTime" :orderInfo="orderInfo"></appointment>
      <div v-if="orderStatus == 3 || orderStatus == 10">
        <router-link to="/recordType" tag="div" class="fault">
          <label for>
            <span>故障类型</span>：
          </label>
          <input
            type="hidden"
            name="recordType"
            :value="recordType.recordName ? recordType.recordName : orderInfo.recordType"
          />
          <input
            type="text"
            :value="recordType.recordName ? recordType.recordName : orderInfo.recordType"
          />
          <span>可选</span>
        </router-link>
        <div @click="gorecordModel(recordType.recordType)" class="fault">
          <label for>
            <span>故障模块</span>：
          </label>
          <input
            type="hidden"
            name="recordModel"
            :value="recordModel.recordModelName ? recordModel.recordModelName : orderInfo.recordModel"
          />
          <input
            type="text"
            :value="recordModel.recordModelName ? recordModel.recordModelName : orderInfo.recordModel"
          />
          <span>可选</span>
        </div>
        <div>
          <label for>
            <span>问题记录</span>：
          </label>
          <textarea
            v-if="orderInfo.recordContent"
            name="recordContent"
            :value="orderInfo.recordContent"
            cols="30"
            rows="10"
          ></textarea>
          <textarea
            v-else
            name="recordContent"
            v-model="recordContent"
            @keyup="getRecordContent"
            value
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div>
          <label for>
            <span>解决办法</span>：
          </label>
          <textarea
            v-if="orderInfo.recordSettle"
            name="recordSettle"
            :value="orderInfo.recordSettle"
            cols="30"
            rows="10"
          ></textarea>
          <textarea
            v-else
            name="recordSettle"
            v-model="recordSettle"
            @keyup="getRecordSettle"
            value
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <!-- <div v-if="orderInfo.appoinmentTime" class="affix">
          <label for>
            <span>附件</span>：
          </label>
          <van-uploader :after-read="afterRead" v-model="fileList" multiple />
        </div>-->

        <div class="affix">
          <div>
            <label for>
              <span>售后单</span>：
            </label>
            <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
          </div>
          <div class="layui-upload">
            <blockquote
              class="layui-elem-quote layui-quote-nm"
              style="margin-top: 10px;padding:4px;"
            >
              预览
              <viewer class="layui-upload-list" style="display:flex;flex-wrap:wrap" :images="AfterimgArray">
                <div v-for="(item,index) in AfterimgArray" :key="index" style="flex: none;width:100px;height:100px;margin-right:10px;margin-bottom:10px;display:inline-block;">
                  <img
                  class="layui-upload-img"
                  style="width:100%;height:100%"
                  :src="DomainName+ item "
                  :layer-src="DomainName+ item"
                  alt
                  />
                  <a href="javascript:;" @click="delImg(item,index)" class="delImg">X</a>
                </div>
              </viewer>
              <input type="hidden" name="recordPhoto" :value="Afterimg" />
            </blockquote>
          </div>
        </div>
      </div>
      <synergyInfo :orderInfo="orderInfo"></synergyInfo>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea class="remark" name="remark" cols="30" rows="10"></textarea>
      </div>
      <div class="seleTime">
        <van-popup v-model="show" position="bottom" :style="{ height: '52%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
          />
        </van-popup>
      </div>
    </form>
    <orderLog></orderLog>
  </div>
</template>

<script>
import orderLog from "./orderLog";
import synergyInfo from "./synergyInfo";
import appointment from "./appointment";
export default {
  name: "dispose",
  props: ["orderStatus", "orderInfo"],
  data() {
    return {
      fileList: [],
      show: false,
      minHour: 10,
      maxHour: 20,
      recordContent: sessionStorage.getItem("recordContent")
        ? sessionStorage.getItem("recordContent")
        : "",
      recordSettle: sessionStorage.getItem("recordSettle")
        ? sessionStorage.getItem("recordSettle")
        : "",
      minDate: new Date(2016, 1, 1),
      maxDate: new Date(2030, 12, 31),
      currentDate: new Date(),
      recordType: {},
      recordModel: {},
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      isDisabled: false,
      AfterimgArray: sessionStorage.getItem("AfterimgArray")
        ? JSON.parse(sessionStorage.getItem("AfterimgArray"))
        : [],
      Afterimg: sessionStorage.getItem("AfterimgUrl")
        ? JSON.parse(sessionStorage.getItem("AfterimgUrl"))
        : "",
      DomainName: this.$store.state.url
    };
  },
  components: {
    orderLog,
    synergyInfo,
    appointment
  },
  methods: {
    delImg(item, index) {
      // 删除附件图片
      this.AfterimgArray.splice(index, 1);
      this.Afterimg = this.AfterimgArray.join(",");
      this.axios
        .post("/api/deleImagesInfo", {
          userId: this.$store.state.userId,
          url: item
        })
        .then(res => {
          console.log(res);
        });
    },
    getRecordContent() {
      console.log(this.recordContent);
      sessionStorage.setItem("recordContent", this.recordContent);
    },
    getRecordSettle() {
      console.log(this.recordSettle);
      sessionStorage.setItem("recordSettle", this.recordSettle);
    },
    getImg() {
      if (this.orderInfo.recordPhoto) {
        this.Afterimg = this.orderInfo.recordPhoto;
        for (var i = 0; i < this.orderInfo.recordPhoto.split(",").length; i++) {
          if (this.orderInfo.recordPhoto.split(",")[i] !== "") {
            this.AfterimgArray.push(this.orderInfo.recordPhoto.split(",")[i]);
          }
        }
      }
    },
    send() {
      var recordType = sessionStorage.getItem("recordType");
      if (recordType) {
        //用户列表
        this.recordType = JSON.parse(recordType);
      }
      var recordModel = sessionStorage.getItem("recordModel");
      if (recordModel) {
        //用户列表
        this.recordModel = JSON.parse(recordModel);
      }
    },
    gorecordModel(recordType) {
      console.log(recordType);
      this.$router.push("/recordModel?recordType=" + recordType);
    },
    showPopup() {
      this.show = true;
    },
    resData(handleState) {
      var createData = this.$("#formData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.handleState = handleState;
      console.log(createData);
      this.axios.post("/api/handleOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder?type=wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false;
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },

    synergy() {
      //协同
      this.$router.push("/goSynergy");
    },
    reject() {
      //驳回
      this.$router.push("/kuantanState?handleState=9");
    },
    kuantan() {
      //关单
      // this.resData(8);
      this.$router.push("/kuantanState?handleState=8");
    },
    finish() {
      //完成
      this.isDisabled = true;
      var createData = this.$("#formData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      console.log(createData);
      this.axios.post("/api/finishOrderInfo", createData).then(res => {
        console.log(res);

        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$destroy("orderDetails");
            sessionStorage.removeItem("AfterimgArray");
            sessionStorage.removeItem("AfterimgUrl");
            this.$router.push("/wordOrder?type=wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false;
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    start() {
      //出发
      this.isDisabled = true;
      this.resData(4);
    },
    reach() {
      //到达
      this.isDisabled = true;
      this.resData(5);
    },
    begin() {
      //开始
      this.isDisabled = true;
      this.resData(6);
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
      // this.$refs[this.datePicker].innerHTML = timer;
      this.show = false;
      if (this.orderStatus == 4) {
        var handleState = 12;
      } else {
        var handleState = 3;
      }
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId,
        handleState: handleState,
        appoinmentTime: timer,
        remark: this.$(".remark").val()
      };
      console.log(data);
      this.isDisabled = true;
      this.axios.post("/api/handleOrderInfo", data).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder?type=wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false;
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    cancel() {
      this.show = false;
    }
  },
  mounted() {
    var _this = this;
    layui.use(["upload"], function() {
      var upload = layui.upload;
      //上传图片
      upload.render({
        elem: "#uploadImage",
        url: "/api/uploadImagesInfo",
        // bindAction: "#uploadImage",
        method: "post",
        multiple: false, //是否多文件上传
        accept: "images", // 规定上传文件类型 ，images/file/video/audio
        auto: true, // 是否自动上传
        size: 4096,
        field: "file", // 设定文件域字段
        choose: function(obj) {
          obj.preview(function(index, file, result) {
            console.log(index, file);
            // _this
            //   .$("#imgBox")
            //   .html(
            //     '<img class="layui-upload-img" style="width:100px;height:100px" src="' +
            //       result +
            //       '" alt />'
            //   );
            // obj.resetFile(index, file, _this.orderInfoId + '-' + index); //重命名文件名
          });
          this.data = { orderInfoId: _this.orderInfoId, soreId: 1 };
        },
        before: function(obj) {
          //预读本地文件示例，不支持ie8
        },
        // allDone:function(obj){
        //   console.log(obj.total); //得到总文件数
        //   console.log(obj.successful); //请求成功的文件数
        //   console.log(obj.aborted); //请求失败的文件数
        // },
        done: function(res) {
          //上传完毕
          console.log(res);
          if (res.retCode == 0) {
            layer.msg(res.retMsg, { icon: 1 });
          } else {
            layer.msg(res.retMsg, { icon: 2 });
          }
          _this.AfterimgArray.push(res.body.url.split(",")[0]);
          var str = JSON.stringify(_this.AfterimgArray);
          _this.Afterimg = _this.AfterimgArray.join(",");
          var AfterimgUrl = JSON.stringify(_this.Afterimg);
          sessionStorage.setItem("AfterimgArray", str);
          sessionStorage.setItem("AfterimgUrl", AfterimgUrl);
          console.log(_this.Afterimg);
          // _this.$("input[name='recordPhoto']").val(res.body.url);
        }
      });
    });
  },
  created() {
    setTimeout(() => {
      this.send();
      this.getImg();
    }, 500);
  },
  updated() {
    // layui.use("form", function() {
    //   layui.form.render();
    // });
  },
  activated() {
    // this.send();
  }
};
</script>

<style scoped>
form {
  padding: 0 15px;
}
.seleTime div {
  padding: 0;
}
.fault {
  display: flex;
  align-items: center;
}
.fault i {
  color: #666666;
}
form div {
  padding: 10px 0;
}
form > div {
  border-bottom: 1px solid #f0f0f0;
}
form > div > div {
  border-bottom: 1px solid #f0f0f0;
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 16px;
}
form div > span::after {
  content: "";
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url("../../../assets/Images/choose.png") no-repeat;
  background-size: 100%;
  margin-left: 5px;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
label::before {
  content: "*";
  color: red;
  display: inline-block;
  margin-right: 3px;
}

label span {
  width: 70px;
  font-size: 16px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: none;
  height: 35px;
  color: #666666;
  font-size: 16px;
  padding: 0 0px 0 5px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  color: #666666;
  font-size: 15px;
  padding: 5px;
}
.info {
  justify-content: space-between;
}
.info h2::before {
  content: "|";
  font-size: 16px;
  color: #333333;
  margin-right: 2px;
}
h2 {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.actionBtn ul li:nth-child(1) button {
  color: #3fd188;
  font-size: 14px;
}
.actionBtn ul li:nth-child(2) button {
  color: #f8a32c;
  font-size: 14px;
}
.actionBtn ul li:nth-child(3) button {
  color: #7ca6f7;
  font-size: 14px;
}
.actionBtn ul li:nth-child(4) button {
  color: #999999;
  font-size: 14px;
}
.remakeInfo label::before {
  content: "";
}
.affix div {
  display: flex;
}
.uploadImg {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  padding: 0;
}
.layui-upload {
  width: 100%;
  padding: 0;
}
.layui-elem-quote {
  width: 100%;
  font-size: 15px;
}
.layui-btn {
  height: 35px;
  line-height: 35px;
}
#displseImgBox {
  display: flex;
  flex-wrap: wrap;
}
.delImg {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #c2c2c2;
  position: absolute;
  text-align: center;
  right: -5px;
  top: -5px;
}
</style>