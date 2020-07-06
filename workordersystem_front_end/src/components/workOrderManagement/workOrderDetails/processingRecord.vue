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
        <viewer class="layui-upload-list" style="display:flex;flex-wrap:wrap" :images="AfterimgArray">
          <div v-for="(item,index) in AfterimgArray" :key="index" style="flex: none;width:100px;height:100px;margin-right:10px;margin-bottom:10px;display:inline-block;">
            <img
             class="layui-upload-img"
             style="width:100%;height:100%"
             :src="DomainName+ item "
             :layer-src="DomainName+ item"
             alt
            />
            <!-- <a href="javascript:;" @click="delImg(item,index)" class="delImg">X</a> -->
          </div>
        </viewer>
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