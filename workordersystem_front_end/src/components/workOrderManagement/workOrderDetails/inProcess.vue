<template>
  <!-- 处理中 故障处理记录 -->
  <div>
    <h2>故障处理记录</h2>
    <reservation :workOrderInfo="workOrderInfo"></reservation>
    <div class="layui-form-item">
      <label class="layui-form-label">故障类型</label>
      <div class="layui-input-block" lay-search>
        <select name="recordType" lay-filter="recordType">
          <option value>请选择故障类型</option>
          <option
            v-for="(item,index) in record"
            :key="index"
            :value="item.recordName ? item.recordName : workOrderInfo.recordType"
            :selected="workOrderInfo.recordType == item.recordName ? true : false"
          >{{item.recordName}}</option>
        </select>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">故障模块</label>
      <div class="layui-input-block">
        <select name="recordModel" lay-search>
          <option value>请选择故障模块</option>
          <option
            v-for="(items,index) in recordList"
            :key="index"
            :value="items.recordModelName ? items.recordModelName : workOrderInfo.recordModel"
            :selected="workOrderInfo.recordModel == items.recordModelName ? true : false"
          >{{items.recordModelName}}</option>
        </select>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">问题记录</label>
      <div class="layui-input-block">
        <!-- <textarea
          
          name="recordContent"
          placeholder="请输入内容"
          :value="recordContent ? recordContent : workOrderInfo.recordContent"
          autocomplete="off"
          class="layui-textarea"
        ></textarea>-->
        <textarea
          v-model="recordContent"
          name="recordContent"
          placeholder="请输入内容"
          value
          autocomplete="off"
          class="layui-textarea"
        ></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">解决办法</label>
      <div class="layui-input-block">
        <!-- <textarea
          
          name="recordSettle"
          placeholder="请输入内容"
          :value="recordSettle ? recordSettle : workOrderInfo.recordSettle"
          autocomplete="off"
          class="layui-textarea"
        ></textarea>-->
        <textarea
          v-model="recordSettle"
          name="recordSettle"
          placeholder="请输入内容"
          value
          autocomplete="off"
          class="layui-textarea"
        ></textarea>
      </div>
    </div>

    <!-- <div class="layui-form-item">
      <label class="layui-form-label">售后单</label>
      <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
      <div class="layui-upload">
        <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
          预览
          <div class="layui-upload-list" id="AfterimgBox"></div>
          <input type="hidden" name="recordPhoto" />
        </blockquote>
      </div>
    </div>-->

    <div class="affix layui-form-item">
      <label class="layui-form-label">售后单</label>
      <!-- <button type="button" class="layui-btn" id="selectImage">选择图片</button> -->
      <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
      <div class="layui-upload">
        <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
          预览
          <viewer
            class="layui-upload-list"
            style="display:flex;flex-wrap:wrap"
            :images="AfterimgArray"
          >
            <div
              v-for="(item,index) in AfterimgArray"
              :key="index"
              style="flex: none;width:100px;height:100px;margin-right:10px;margin-bottom:10px;display:inline-block;"
            >
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
</template>
<script>
import reservation from "./reservation";
export default {
  name: "inProcess",
  props: ["orderState", "workOrderInfo"],
  components: {
    reservation,
  },
  data() {
    return {
      orderInfoId: localStorage.getItem("orderInfoId")
        ? localStorage.getItem("orderInfoId")
        : "",
      recordList: [],
      AfterimgArray: [],
      Afterimg: "",
      DomainName: this.$store.state.url,
      recordContent: "",
      recordSettle: "",
      record: [
        {
          recordType: 0,
          recordName: "硬件",
          recordList: [
            { recordModel: "0", recordModelName: "891支票模块" },
            { recordModel: "1", recordModelName: "891支票模块数据线" },
            { recordModel: "2", recordModelName: "891镜头模块" },
            { recordModel: "3", recordModelName: "891票箱" },
            { recordModel: "4", recordModelName: "M5030/票箱" },
            { recordModel: "5", recordModelName: "密码键盘" },
            { recordModel: "6", recordModelName: "密码键盘数据线" },
            { recordModel: "7", recordModelName: "显示屏" },
            { recordModel: "8", recordModelName: "显示屏数据线" },
            { recordModel: "9", recordModelName: "显示器切换模块" },
            { recordModel: "10", recordModelName: "热敏打印机" },
            { recordModel: "11", recordModelName: "热敏打印机数据线" },
            { recordModel: "12", recordModelName: "凭条打印机" },
            { recordModel: "13", recordModelName: "凭条打印机数据线" },
            { recordModel: "14", recordModelName: "流水打印机" },
            { recordModel: "15", recordModelName: "流水打印机数据线" },
            { recordModel: "16", recordModelName: "激光打印机" },
            { recordModel: "17", recordModelName: "激光打印机数据线" },
            { recordModel: "18", recordModelName: "UPS模块" },
            { recordModel: "19", recordModelName: "电池模块" },
            { recordModel: "20", recordModelName: "指纹仪" },
            { recordModel: "21", recordModelName: "指纹数据线" },
            { recordModel: "22", recordModelName: "4G模块" },
            { recordModel: "23", recordModelName: "4G模块数据线" },
            { recordModel: "24", recordModelName: "4G卡槽" },
            { recordModel: "25", recordModelName: "风扇" },
            { recordModel: "26", recordModelName: "LED灯条" },
            { recordModel: "27", recordModelName: "LED控制板" },
            { recordModel: "28", recordModelName: "LED控制板数据线" },
            { recordModel: "29", recordModelName: "电话手柄" },
            { recordModel: "30", recordModelName: "二代身份证" },
            { recordModel: "31", recordModelName: "二代身份证数据线" },
            { recordModel: "32", recordModelName: "身份证强制退卡按键" },
            { recordModel: "33", recordModelName: "非接IC读卡器" },
            { recordModel: "34", recordModelName: "非接IC读卡器数据线" },
            { recordModel: "35", recordModelName: "读卡器" },
            { recordModel: "36", recordModelName: "读卡器数据线" },
            { recordModel: "37", recordModelName: "读发卡器" },
            { recordModel: "38", recordModelName: "读发卡器数据线" },
            { recordModel: "39", recordModelName: "卡箱" },
            { recordModel: "40", recordModelName: "A4扫描仪" },
            { recordModel: "41", recordModelName: "A4扫描仪数据线" },
            { recordModel: "42", recordModelName: "双目摄像头" },
            { recordModel: "43", recordModelName: "双目摄像头数据线" },
            { recordModel: "44", recordModelName: "直流电源" },
            { recordModel: "45", recordModelName: "PC硬件" },
            { recordModel: "46", recordModelName: "PC主板" },
            { recordModel: "47", recordModelName: "PC电源" },
            { recordModel: "48", recordModelName: "PC CPU" },
            { recordModel: "49", recordModelName: "PC硬盘" },
            { recordModel: "50", recordModelName: "PC内存" },
            { recordModel: "51", recordModelName: "PC电子/BIOS" },
            { recordModel: "52", recordModelName: "MIC模块" },
            { recordModel: "53", recordModelName: "MIC模块数据线" },
            { recordModel: "54", recordModelName: "二维码" },
            { recordModel: "55", recordModelName: "二维码数据线" },
            { recordModel: "56", recordModelName: "U盾模块" },
            { recordModel: "57", recordModelName: "U盾模块数据线" },
            { recordModel: "58", recordModelName: "扬声器" },
            { recordModel: "59", recordModelName: "人体传感器" },
            { recordModel: "60", recordModelName: "开关电源" },
            { recordModel: "61", recordModelName: "滤波器" },
            { recordModel: "62", recordModelName: "回声消除设备" },
            { recordModel: "63", recordModelName: "监控主机" },
            { recordModel: "64", recordModelName: "监控摄像头" },
            { recordModel: "65", recordModelName: "USB模块" },
            { recordModel: "66", recordModelName: "I/O板" },
            { recordModel: "67", recordModelName: "资料受理箱模块" },
            { recordModel: "68", recordModelName: "锁头" },
            { recordModel: "69", recordModelName: "蓝牙" },
          ],
        },
        {
          recordType: 1,
          recordName: "软件",
          recordList: [
            { recordModel: "0", recordModelName: "系统安装" },
            { recordModel: "1", recordModelName: "测试系统" },
            { recordModel: "2", recordModelName: "测试应用" },
            { recordModel: "3", recordModelName: "应用故障" },
            { recordModel: "4", recordModelName: "收集数据" },
            { recordModel: "5", recordModelName: "升级软件" },
            { recordModel: "6", recordModelName: "办公软件(运维专用）" },
            { recordModel: "7", recordModelName: "办公系统(运维专用）" },
            { recordModel: "8", recordModelName: "PC系统" },
            { recordModel: "9", recordModelName: "打印机软件(运维专用）" },
            { recordModel: "10", recordModelName: "扫描仪软件(运维专用）" },
          ],
        },
        {
          recordType: 2,
          recordName: "其他",
          recordList: [
            { recordModel: "0", recordModelName: "移机" },
            { recordModel: "1", recordModelName: "网络" },
            { recordModel: "2", recordModelName: "PM保养" },
            { recordModel: "3", recordModelName: "网点巡检" },
            { recordModel: "4", recordModelName: "银行要求" },
            { recordModel: "5", recordModelName: "蹲点/观察" },
            { recordModel: "6", recordModelName: "工厂/检测设备" },
            { recordModel: "7", recordModelName: "补充打印机纸" },
            { recordModel: "8", recordModelName: "补充打印机色带" },
            { recordModel: "9", recordModelName: "特殊关单" },
          ],
        },
        {
          recordType: 3,
          recordName: "安装",
          recordList: [{ recordModel: "0", recordModelName: "安装机具" }],
        },
      ],
    };
  },
  mounted() {
    // this.getImg();
    var _this = this;
    layui.use(["form", "element", "upload", "jquery"], function () {
      var form = layui.form;
      var element = layui.element;
      var $ = layui.jquery;
      var upload = layui.upload;
      form.on("select(recordType)", function (data) {
        console.log(data);
        for (var i = 0; i < _this.record.length; i++) {
          if (data.value == _this.record[i].recordName) {
            console.log(_this.record[i].recordList);
            _this.recordList = _this.record[i].recordList;
            form.render();
          }
        }
      });
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
        size: 4096,
        field: "file", // 设定文件域字段
        choose: function (obj) {
          obj.preview(function (index, file, result) {
            console.log(file);
            // $("#AfterimgBox").html(
            //   '<img class="layui-upload-img" style="width:100px;height:100px" src="' +
            //     result +
            //     '" alt />'
            // );
            // obj.resetFile(index, file, _this.orderInfoId + '-' + index); //重命名文件名
          });
          this.data = { orderInfoId: _this.orderInfoId, soreId: 1 };
        },
        before: function (obj) {
          //预读本地文件示例，不支持ie8
        },
        // allDone:function(obj){
        //   console.log(obj.total); //得到总文件数
        //   console.log(obj.successful); //请求成功的文件数
        //   console.log(obj.aborted); //请求失败的文件数
        // },
        done: function (res) {
          //上传完毕
          console.log(res);
          if (res.retCode == 0) {
            layer.msg(res.retMsg, { icon: 1 });
          } else {
            layer.msg(res.retMsg, { icon: 2 });
          }
          _this.AfterimgArray.push(res.body.url.split(",")[0]);
          _this.Afterimg = _this.AfterimgArray.join(",");
          console.log(_this.Afterimg);
        },
      });
      $("#layui-layer-photos").click(function () {
        console.log(this);
      });
    });
  },
  methods: {
    delImg(item, index) {
      // 删除附件图片
      this.AfterimgArray.splice(index, 1);
      this.Afterimg = this.AfterimgArray.join(",");
      this.$axios
        .post("/api/deleImagesInfo", {
          userId: this.$store.state.userId,
          url: item,
        })
        .then((res) => {
          console.log(res);
          if (res.data.retCode == "000000") {
            layer.msg(res.data.retMsg, { icon: 1 });
          } else {
            layer.msg(res.data.retMsg, { icon: 2 });
          }
        });
      if (this.workOrderInfo.recordPhoto){
        this.$axios.post("/api/alter", {userId: this.$store.state.userId,orderInfoId:this.orderInfoId,recordPhoto: this.Afterimg}).then(res => {
          console.log(res);
        });
      }
    },
    getImg() {
      if (this.workOrderInfo.recordPhoto) {
        this.Afterimg = this.workOrderInfo.recordPhoto;
        console.log(this.workOrderInfo.recordPhoto);
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
    },
    send() {
      if (this.workOrderInfo.recordType) {
        for (var i = 0; i < this.record.length; i++) {
          if (this.workOrderInfo.recordType == this.record[i].recordName) {
            console.log(this.record[i].recordList);
            this.recordList = this.record[i].recordList;
          }
        }
      }
      this.recordContent = this.workOrderInfo.recordContent;
      this.recordSettle = this.workOrderInfo.recordSettle;
    },
  },
  created() {
    setTimeout(() => {
      this.getImg();
      this.send();
    }, 500);
  },
  updated() {
    // this.getImg();
    layui.use(["form"], function () {
      layui.form.render();
    });
  },
};
</script>
<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
/* label{
  display: flex;
  align-items: center;
} */
label::before {
  content: "*";
  color: red;
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