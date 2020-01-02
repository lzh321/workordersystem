<template>
  <!-- 处理中 故障处理记录 -->
  <div>
    <h2 v-if="orderState == 3">故障处理记录</h2>
    <div class="layui-form-item">
      <label class="layui-form-label">故障类型</label>
      <div class="layui-input-block">
        <select name="recordType" lay-filter="recordType">
          <option value>请选择故障类型</option>
          <option v-for="(item,index) in record" :key="index" :value="item.recordName ? item.recordName : workOrderInfo.recordType" :selected="workOrderInfo.recordType == item.recordName ? true : false">{{item.recordName}}</option>

        </select>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">故障模块</label>
      <div class="layui-input-block">
        <select name="recordModel">
          <option value>请选择故障模块</option>
          <option v-for="(items,index) in recordList" :key="index" :value="items.recordModelName ? items.recordModelName : workOrderInfo.recordModel" :selected="workOrderInfo.recordModel == items.recordModelName ? true : false">{{items.recordModelName}}</option>
        </select>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">问题记录</label>
      <div class="layui-input-block">
        <textarea v-if="workOrderInfo.recordContent"
          name="recordContent"
          placeholder="请输入内容"
          :value="workOrderInfo.recordContent"
          autocomplete="off"
          class="layui-textarea"
        ></textarea>
        <textarea v-else
          name="recordContent"
          placeholder="请输入内容"
          value=""
          autocomplete="off"
          class="layui-textarea"
        ></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">解决办法</label>
      <div class="layui-input-block">
        <textarea v-if="workOrderInfo.recordSettle"
          name="recordSettle"
          placeholder="请输入内容"
          :value="workOrderInfo.recordSettle"
          autocomplete="off"
          class="layui-textarea"
        ></textarea>
        <textarea v-else
          name="recordSettle"
          placeholder="请输入内容"
          value=""
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
    </div> -->

    <div class="affix layui-form-item">
        <label class="layui-form-label">售后单</label>
        <!-- <button type="button" class="layui-btn" id="selectImage">选择图片</button> -->
        <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
        <div class="layui-upload">
          <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
            预览
            <div class="layui-upload-list" id="imgBox">
              <img
                v-for="(item,index) in AfterimgArray"
                :key="index"
                class="layui-upload-img"
                style="width:100px;height:100px;margin-right:10px"
                :src="DomainName+ item "
                alt
              />
            </div>
            <input type="hidden" name="recordPhoto" :value="Afterimg" />
          </blockquote>
        </div>
      </div>
  </div>
</template>
<script>
import { send } from 'q';
export default {
  name: "inProcess",
  props: ["orderState", "workOrderInfo"],
  data() {
    return {
      orderInfoId: sessionStorage.getItem("orderInfoId")
        ? sessionStorage.getItem("orderInfoId")
        : "",
      recordList: [],
      AfterimgArray: [],
      Afterimg: "",
      DomainName: this.$store.state.url,
      record: [
        {
          recordType: 0,
          recordName: "硬件",
          recordList: [
            {
              recordModel: 0,
              recordModelName: "891支票模块"
            },
            {
              recordModel: 1,
              recordModelName: "891镜头模块"
            },
            {
              recordModel: 2,
              recordModelName: "891票箱"
            },
            {
              recordModel: 3,
              recordModelName: "支票售卖模块"
            },
            {
              recordModel: 4,
              recordModelName: "委托书售卖模块"
            },
            {
              recordModel: 5,
              recordModelName: "密码键盘"
            },
            {
              recordModel: 6,
              recordModelName: "显示屏"
            },
            {
              recordModel: 7,
              recordModelName: "存拆打印机"
            },
            {
              recordModel: 8,
              recordModelName: "热敏打印机"
            },
            {
              recordModel: 9,
              recordModelName: "凭条打印机"
            },
            {
              recordModel: 10,
              recordModelName: "激光打印机"
            },
            {
              recordModel: 11,
              recordModelName: "流水打印机"
            },
            {
              recordModel: 12,
              recordModelName: "UPS模块"
            },
            {
              recordModel: 13,
              recordModelName: "指纹仪"
            },
            {
              recordModel: 14,
              recordModelName: "风扇"
            },
            {
              recordModel: 15,
              recordModelName: "显示器切换模块"
            },
            {
              recordModel: 16,
              recordModelName: "小配件/线材"
            },
            {
              recordModel: 17,
              recordModelName: "电话手柄"
            },
            {
              recordModel: 18,
              recordModelName: "二代身份证"
            },
            {
              recordModel: 19,
              recordModelName: "电话手柄"
            },
            {
              recordModel: 20,
              recordModelName: "非接触卡片读卡器"
            },
            {
              recordModel: 21,
              recordModelName: "交流保险管"
            },
            {
              recordModel: 22,
              recordModelName: "滤波器"
            },
            {
              recordModel: 23,
              recordModelName: "回声消除设备"
            },
            {
              recordModel: 24,
              recordModelName: "IC卡读卡器"
            },
            {
              recordModel: 25,
              recordModelName: "读卡器"
            },
            {
              recordModel: 26,
              recordModelName: "监控主机"
            },
            {
              recordModel: 27,
              recordModelName: "监控摄像头"
            },
            {
              recordModel: 28,
              recordModelName: "A4扫描仪"
            },
            {
              recordModel: 29,
              recordModelName: "开关电源"
            },
            {
              recordModel: 30,
              recordModelName: "M5030/票箱"
            },
            {
              recordModel: 31,
              recordModelName: "PC主板"
            },
            {
              recordModel: 32,
              recordModelName: "PC电源"
            },
            {
              recordModel: 33,
              recordModelName: "PC/CPU"
            },
            {
              recordModel: 34,
              recordModelName: "PC硬盘"
            },
            {
              recordModel: 35,
              recordModelName: "PC内存"
            },
            {
              recordModel: 36,
              recordModelName: "PC电子/BIOS"
            },
            {
              recordModel: 37,
              recordModelName: "门锁"
            },
            {
              recordModel: 38,
              recordModelName: "转盘锁"
            },
            {
              recordModel: 39,
              recordModelName: "电子锁"
            },
            {
              recordModel: 40,
              recordModelName: "盖章模块"
            },
            {
              recordModel: 41,
              recordModelName: "人体感应模块"
            },
            {
              recordModel: 42,
              recordModelName: "电子签名笔模块"
            },
            {
              recordModel: 43,
              recordModelName: "发UKEY模块"
            },
            {
              recordModel: 44,
              recordModelName: "二维码模块"
            },
            {
              recordModel: 45,
              recordModelName: "电源模块"
            },
            {
              recordModel: 46,
              recordModelName: "电源开关"
            },
            {
              recordModel: 47,
              recordModelName: "指示灯及控制板"
            },
            {
              recordModel: 48,
              recordModelName: "打印机硬件"
            },
            {
              recordModel: 49,
              recordModelName: "计算机硬件"
            },
         ]
        },
        {
          recordType: 1,
          recordName: "软件",
          recordList: [
            {
              recordModel: 0,
              recordModelName: "系统安装"
            },
            {
              recordModel: 1,
              recordModelName: "测试系统"
            },
            {
              recordModel: 2,
              recordModelName: "测试应用"
            },
            {
              recordModel: 3,
              recordModelName: "应用故障"
            },
            {
              recordModel: 4,
              recordModelName: "收集数据"
            },
            {
              recordModel: 5,
              recordModelName: "升级程序补丁"
            },
            {
              recordModel: 6,
              recordModelName: "办公软件"
            },
            {
              recordModel: 7,
              recordModelName: "办公系统"
            },
            {
              recordModel: 8,
              recordModelName: "计算机网络"
            },
            {
              recordModel: 9,
              recordModelName: "计算机系统"
            },
            {
              recordModel: 10,
              recordModelName: "打印机软件"
            },
            {
              recordModel: 11,
              recordModelName: "扫描仪软件"
            },
          ]
        },
        {
          recordType: 2,
          recordName: "辅助",
          recordList: [
            {
              recordModel: 0,
              recordModelName: "补充打印机纸"
            },
            {
              recordModel: 1,
              recordModelName: "补充打印机色带"
            },
            {
              recordModel: 2,
              recordModelName: "蹲点/观察"
            },
            {
              recordModel: 3,
              recordModelName: "电话解释"
            },
          ]
        },
        {
          recordType: 3,
          recordName: "其他",
          recordList: [
            {
              recordModel: 0,
              recordModelName: "安装机具"
            },
            {
              recordModel: 1,
              recordModelName: "移机"
            },
            {
              recordModel: 2,
              recordModelName: "工厂/检测设备"
            },
            {
              recordModel: 3,
              recordModelName: "网络"
            },
            {
              recordModel: 4,
              recordModelName: "银行要求"
            },
          ]
        }
      ]
    };
  },
  mounted() {
    // this.getImg();
    setTimeout(()=>{
      this.send()
    },1000)
    var _this = this;
    layui.use(["form","element", "upload", "jquery"], function() {
      var form = layui.form
      var element = layui.element;
      var $ = layui.jquery;
      var upload = layui.upload;
      form.on('select(recordType)',function(data){
        console.log(data)
        for(var i = 0; i < _this.record.length; i++){
          if(data.value == _this.record[i].recordName){
            console.log(_this.record[i].recordList)
            _this.recordList = _this.record[i].recordList
            form.render();
          }
        }
      })
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
        choose: function(obj) {
          obj.preview(function(index, file, result) {
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
          _this.Afterimg += res.body.url;
          _this.AfterimgArray.push(res.body.url.split(",")[0]);
          console.log(_this.Afterimg);
        }
      });
    });
  },
  methods: {
    getImg() {
      if (this.workOrderInfo.recordPhoto) {
        this.Afterimg = this.workOrderInfo.recordPhoto
        for(var i = 0; i < this.workOrderInfo.recordPhoto.split(",").length; i++){
          if(this.workOrderInfo.recordPhoto.split(",")[i] !== ""){
            this.AfterimgArray.push(this.workOrderInfo.recordPhoto.split(",")[i]) 
          }
        }
      }
    },
    send(){
      if(this.workOrderInfo.recordType){
        for(var i = 0; i < this.record.length; i++){
          if(this.workOrderInfo.recordType == this.record[i].recordName){
            console.log(this.record[i].recordList)
            this.recordList = this.record[i].recordList
          }
        }
      }
    }
  },
  created() {
    this.getImg();
  },
  updated() {
    // this.getImg();
    layui.use(["form"], function() {
      layui.form.render();
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
/* label{
  display: flex;
  align-items: center;
} */
label::before{
  content: '*';
  color: red;
}
</style>