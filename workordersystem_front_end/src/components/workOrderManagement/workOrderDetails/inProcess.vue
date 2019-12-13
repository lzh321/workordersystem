<template>
  <!-- 处理中 故障处理记录 -->
  <div>
    <h2 v-if="orderState == 3">故障处理记录</h2>
    <div class="layui-form-item">
      <label class="layui-form-label">故障类型</label>
      <div class="layui-input-block">
        <select name="recordType">
          <option value>请选择故障类型</option>
          <option value="0">硬件</option>
          <option value="1">软件</option>
          <option value="2">辅助</option>
          <option value="3">其他</option>
        </select>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">故障模块</label>
      <div class="layui-input-block">
        <select name="recordModel">
          <option value>请选择故障模块</option>
          <option value="0">显示屏</option>
          <option value="1">密码键盘</option>
        </select>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">问题记录</label>
      <div class="layui-input-block">
        <textarea name="recordContent" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">解决办法</label>
      <div class="layui-input-block">
        <textarea name="recordSettle" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>

    <div class="layui-form-item">
      <label class="layui-form-label">售后单</label>
      <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
      <div class="layui-upload">
        <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
          预览
          <div class="layui-upload-list" id="imgBox"></div>
          <input type="hidden" name="recordPhoto" />
        </blockquote>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">备注</label>
      <div class="layui-input-block">
        <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inProcess",
  props:["orderState"],
  data() {
    return {};
  },
  mounted() {
    var _this = this
    layui.use(["element","upload","jquery"], function() {
      var element = layui.element;
      var $ = layui.jquery
      var upload = layui.upload;
      element.render();
      //上传图片
      upload.render({
        elem: "#uploadImage",
        url: "/api/uploadImagesInfo",
        // bindAction:"#workOrderCreate",
        method: "post",
        multiple: false, //是否多文件上传
        accept: "images", // 规定上传文件类型 ，images/file/video/audio
        auto: true, // 是否自动上传
        field: "file", // 设定文件域字段
        choose: function(obj) {
          var files = obj.pushFile();
          console.log(files)
          obj.preview(function(index, file, result) {
            console.log(file)
            var imgBox = document.getElementById("imgBox");
            var imgUrl = document.getElementById("imgUrl");
            var img = document.createElement("img");
            img.src = result;
            img.className = "layui-upload-img";
            img.alt = file.name;
            img.style = "width:100px;height:100px";
            imgBox.appendChild(img);
            // obj.resetFile(index, file, _this.orderInfoId + '-' + index); //重命名文件名
          });
          for(var item in files){
            console.log(item.split('-')[1])
            this.data = {orderInfoId: _this.orderInfoId, soreId: item.split('-')[1] + 1}
          }
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
          $("input[name='recordPhoto']").val(res.body.url);
        }
      });
    });
  }
};
</script>
<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>