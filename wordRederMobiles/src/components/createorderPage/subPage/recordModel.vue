<template>
  <div>
    <ul>
      <li v-for="item in recordList" :key="item.recordModel" @click="selectBank(item)">
        <span>{{item.recordModelName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "recordModel",
  data() {
    return {
      recordList: [],
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
          ]
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
          ]
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
          ]
        },
        {
          recordType: 3,
          recordName: "安装",
          recordList: [
            { recordModel: "0", recordModelName: "安装机具" }
          ]
        }
      ]
    };
  },
  methods: {
    selectBank(data) {
      console.log(data);
      sessionStorage.setItem("recordModel", JSON.stringify(data));
      this.$router.go(-1);
    }
  },
  created() {
    var recordType = this.$route.query.recordType;
    for (var i = 0; i < this.record.length; i++) {
      if (recordType == this.record[i].recordType) {
        console.log(this.record[i].recordList);
        this.recordList = this.record[i].recordList;
      }
    }
  },
  activated() {
    var recordType = this.$route.query.recordType;
    for (var i = 0; i < this.record.length; i++) {
      if (recordType == this.record[i].recordType) {
        console.log(this.record[i].recordList);
        this.recordList = this.record[i].recordList;
      }
    }
  },
};
</script>

<style scoped>
div {
  padding: 0 15px;
}
ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #f3f3f3;
}
ul li img {
  width: 14px;
  height: 14px;
  border: 1px solid red;
  margin-right: 5px;
}
</style>