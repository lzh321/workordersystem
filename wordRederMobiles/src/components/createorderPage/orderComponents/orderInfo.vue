<template>
  <!-- 故障处理记录详情 -->
  <div class="dispose">
    <form action>
      <div class="info">
        <h2>故障处理记录</h2>
      </div>
      <appointment :orderInfo="orderInfo"></appointment>
      <div class="fault">
        <label for>
          <span>故障类型</span>：
        </label>
        <span>{{orderInfo.recordType}}</span>
      </div>
      <div class="fault">
        <label for>
          <span>故障模块</span>：
        </label>
        <span>{{orderInfo.recordModel}}</span>
      </div>
      <div>
        <label for>
          <span>问题记录</span>：
        </label>
        <textarea cols="30" rows="10" :value="orderInfo.recordContent" disabled></textarea>
      </div>
      <div>
        <label for>
          <span>解决办法</span>：
        </label>
        <textarea cols="30" rows="10" :value="orderInfo.recordSettle" disabled></textarea>
      </div>
      <div class="affix">
        <label class=""><span>售后单</span>：</label>
        <div class="layui-upload">
          <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;padding:0;font-size:15px">
            附件
            <div class="layui-upload-list" id="AfterImgBox">
              <img
                v-for="(item,index) in AfterimgArray"
                :key="index"
                class="layui-upload-img"
                style="width:100px;height:100px;margin-right:10px"
                :src="DomainName+ item "
                @click="previewImg()"
                :layer-src="DomainName+ item"
                alt
              />
            </div>
          </blockquote>
        </div>
      </div>
      <synergyInfo></synergyInfo>
    </form>
  </div>
</template>

<script>
import synergyInfo from "./synergyInfo";
import appointment from "./appointment";
export default {
  name: "disposeInfo",
  props: ["orderInfo"],
  data() {
    return {
      Afterimg: "",
      AfterimgArray: [],
      DomainName: this.$store.state.url
    };
  },
  components: {
    synergyInfo,
    appointment
  },
  methods: {
    previewImg(){  // 图片预览
      layer.photos({
        photos: "#AfterImgBox"
        ,anim: 5, //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        closeBtn: 1
      });
    },
    send() {
      if (this.orderInfo.recordPhoto) {
        this.Afterimg = this.orderInfo.recordPhoto;
        for (
          var i = 0;
          i < this.orderInfo.recordPhoto.split(",").length;
          i++
        ) {
          if (this.orderInfo.recordPhoto.split(",")[i] !== "") {
            this.AfterimgArray.push(
              this.orderInfo.recordPhoto.split(",")[i]
            );
          }
        }
      }
    }
  },
  mounted() {
    setTimeout(()=>{
      this.send();

    },500)
  },
  created() {
  },
  updated() {
  }
};
</script>

<style scoped>
form {
  padding: 0 15px;
}
.fault {
  display: flex;
  align-items: center;
}
.fault span {
  font-size: 16px;
}
form div {
  padding: 10px 0;
  /* border-bottom: 1px solid #F0F0F0;  */
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 13px;
  color: #999999;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
/* label::before{
  content: '*';
  color: red;
  display: inline-block;
  margin-right: 3px;
} */

label span {
  width: 70px;
  font-size: 16px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: 1px solid #f3f3f3;
  height: 35px;
  font-size: 16px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  color: #666666;
  font-size: 16px;
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
.actionBtn ul li:nth-child(1) {
  color: #3fd188;
  font-size: 14px;
}
.actionBtn ul li:nth-child(2) {
  color: #f8a32c;
  font-size: 14px;
}
.actionBtn ul li:nth-child(3) {
  color: #7ca6f7;
  font-size: 14px;
}
.actionBtn ul li:nth-child(4) {
  color: #999999;
  font-size: 14px;
}
#AfterImgBox{
  display: flex;
  flex-wrap: wrap;
}
</style>