<template>
  <!-- 故障处理记录  详情 -->
  <div>
    <h2>故障处理记录</h2>
    <reservation :workOrderInfo="workOrderInfo"></reservation>
    <div class="layui-form-item">
      <label class="layui-form-label">故障类型</label>
      <div class="layui-input-block">
        <input type="text" name :value="workOrderInfo.recordType" class="layui-input" disabled />
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">故障模块</label>
      <div class="layui-input-block">
        <input type="text" name :value="workOrderInfo.recordModel" class="layui-input" disabled />
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">问题记录</label>
      <div class="layui-input-block">
        <textarea
          name
          :value="workOrderInfo.recordContent"
          placeholder
          class="layui-textarea"
          disabled
        ></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">解决办法</label>
      <div class="layui-input-block">
        <textarea
          name
          :value="workOrderInfo.recordSettle"
          placeholder
          class="layui-textarea"
          disabled
        ></textarea>
      </div>
    </div>
    <!-- <div class="layui-form-item">
      <label class="layui-form-label">售后单</label>
      <div id="affix">
        <div class="uploadImg">
          
        </div>
      </div>
    </div>-->
    <div class="affix layui-form-item">
      <label class="layui-form-label">售后单</label>
    </div>
    <div class="layui-upload">
      <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
        附件
        <div class="layui-upload-list" id="imgBoxs">
          <img
            v-for="(item,index) in AfterimgArray"
            :key="index"
            class="layui-upload-img"
            style="width:100px;height:100px;margin-right:10px"
            :src="DomainName+ item "
            @click="previewImgs()"
            :layer-src="DomainName+ item"
            alt
          />
        </div>
      </blockquote>
    </div>
  </div>
</template>

<script>
import reservation from "./reservation";
export default {
  name: "processingRecord",
  props: ["workOrderInfo"],
  data() {
    return {
      Afterimg: "",
      AfterimgArray: [],
      DomainName: this.$store.state.url
    };
  },
  methods: {
    previewImgs(){  // 图片预览
      layer.photos({
        photos: "#imgBoxs"
        ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
      });
    },
    getImg() {
      if (this.workOrderInfo.recordPhoto) {
        this.Afterimg = this.workOrderInfo.recordPhoto;
        for (
          var i = 0;
          i < this.workOrderInfo.recordPhoto.split(",").length;
          i++
        ) {
          if (this.workOrderInfo.recordPhoto.split(",")[i] !== "") {
            this.AfterimgArray.push(
              this.workOrderInfo.recordPhoto.split(",")[i]
            );
          }
        }
      }
    }
  },
  mounted() {
    setTimeout(()=>{
      this.getImg();
    },1000)
  },
  components: {
    reservation
  },
  created() {
    // this.getImg();
  },
  updated() {
    layui.use("form", function() {
      layui.form.render();
    });
  }
};
</script>

<style>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>