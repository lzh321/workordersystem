<template>
  <div class="customerInfo">
    <form action>
      <div class="info">
        <h2>客户信息</h2>
      </div>
      <div>
        <label for>
          <span>银行名称</span>：
        </label>
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>网点名称</span>：
        </label>

        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>网点地址</span>：
        </label>
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>联系人</span>：
        </label>
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>联系电话</span>：
        </label>
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>合同</span>：
        </label>
        <span>可选</span>
      </div>
      <div class="info">
        <h2>故障信息</h2>
      </div>
      <div>
        <label for>
          <span>工单来源</span>：
        </label>

        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>工单类型</span>：
        </label>

        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>紧急程度</span>：
        </label>
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>保障时间</span>：
        </label>

        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>设备型号</span>：
        </label>

        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>存货编码</span>：
        </label>
        <span>可选</span>
      </div>
      <div class="problem">
        <label for>
          <span>问题描述</span>：
        </label>
        <textarea name id cols="30" rows="10" disabled></textarea>
      </div>
      <div class="affix">
        <label for>
          <span>附件</span>：
        </label>
        <van-uploader v-model="fileList" />
      </div>
    </form>
    
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      fileList: []
    };
  },
  methods: {}
};
</script>

<style scoped>

form {
  padding: 0px 15px;
}
form div {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
h2 {
  font-size: 14px;
  font-weight: 600;
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: #999999;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}

label span {
  width: 60px;
  font-size: 14px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: 1px solid #f3f3f3;
  height: 35px;
}

.info {
  justify-content: space-between;
}
.info h2::before{
  content: "|";
  font-size: 14px;
  color: #333333;
  margin-right: 2px;
}
h2{
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.affix {
  align-items: baseline;
  flex-direction: column;
}
.affix div {
  border: none;
}
.remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.problem {
  align-items: baseline;
  flex-direction: column;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #FFFFFF;
}


</style>