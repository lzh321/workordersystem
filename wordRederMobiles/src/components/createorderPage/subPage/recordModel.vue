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
            }
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
            }
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