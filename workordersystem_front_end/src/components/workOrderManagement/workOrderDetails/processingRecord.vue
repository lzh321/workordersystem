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
    <div class="layui-form-item">
      <label class="layui-form-label">售后单</label>
      <div id="affix">
        <div class="uploadImg" v-html="img"></div>
      </div>
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
      img: ""
    };
  },
  methods:{
    send(){
      if(this.workOrderInfo.recordPhoto){
      this.$(".uploadImg").html(
        '<img style="width:100px;height:100px" src=" http://192.168.1.245/' +
          this.workOrderInfo.recordPhoto.split(",")[0] +
          '" alt />'
      );
    }
    }
  },
  mounted() {
    this.send()
  },
  components: {
    reservation
  },
  created() {
    
  },
  updated() {
    this.send()
  },
};
</script>

<style>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>