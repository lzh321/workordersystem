<template>
  <!-- 协同处理 -->
  <div class="synergyDispose">
    <form action id="formData">
      <div class="synergyId">
        <label for>编&emsp;&emsp;&emsp;&nbsp;号：</label>
        <span>{{synergyList.id}}</span>
      </div>
      <div class="synergyContent">
        <label for>协&nbsp;&nbsp;同&nbsp;&nbsp;内&nbsp;&nbsp;容：</label>
        <span>{{synergyList.content}}</span>
      </div>
      <div class="creator">
        <div>
          <label for>创&nbsp;&nbsp;&nbsp;建&nbsp;&nbsp;&nbsp;人：</label>
          <span>{{synergyList.createrId}}</span>
        </div>
        <div>
          <label for>创&nbsp;&nbsp;建&nbsp;&nbsp;时&nbsp;&nbsp;间：</label>
          <span>{{synergyList.createTime}}</span>
        </div>
      </div>

      <div
        v-if="synergyList.coordinateState == 2 || synergyList.coordinateState == 1"
        class="acceptor"
      >
        <div>
          <label for>受&nbsp;&nbsp;&nbsp;理&nbsp;&nbsp;&nbsp;人：</label>
          <span>{{synergyList.responsibleId}}</span>
        </div>
        <div>
          <label for>受&nbsp;&nbsp;理&nbsp;&nbsp;时&nbsp;&nbsp;间：</label>
          <span>{{synergyList.operationTime}}</span>
        </div>
      </div>

      <div class="urgency">
        <label for>紧&nbsp;&nbsp;急&nbsp;&nbsp;程&nbsp;&nbsp;度：</label>
        <span>{{synergyList.orderUrgency == 0 ? '一般' : synergyList.orderUrgency == 1 ? '紧急' : ''}}</span>
      </div>

      <div v-if="synergyList.coordinateState == 2" class="ResultCode">
        <label for>处&nbsp;&nbsp;理&nbsp;&nbsp;结&nbsp;&nbsp;果：</label>
        <span>{{synergyList.handleContent}}</span>
      </div>

      <div v-if="synergyList.coordinateState == 1" class="result">
        <label for>处&nbsp;&nbsp;理&nbsp;&nbsp;结&nbsp;&nbsp;果：</label>
        <textarea name="handleContent" id cols="30" rows="5" placeholder="请输入必填项"></textarea>
      </div>

      <div v-if="synergyList.coordinateState == 3">
        <label for>驳&nbsp;&nbsp;回&nbsp;&nbsp;内&nbsp;&nbsp;容：</label>
        <span>{{synergyList.rejectContent}}</span>
      </div>

      <div v-if="synergyList.coordinateState == 0" class="Accepted btn">
        <a @click="accept" class="layui-btn btns">受理</a>
      </div>

      <div v-if="synergyList.coordinateState == 0" class="finish btn">

        <a @click="reject" class="layui-btn btns">驳回</a>
      </div>

      <div v-if="synergyList.coordinateState == 1" class="finish btn">
        <a @click="finish" class="layui-btn btns">完成</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "synergyDispose",
  data() {
    return {
      synergyStatus: 1,
      id: sessionStorage.getItem("id"),
      synergyList: {}
    };
  },
  methods: {
    resData(handleState) {
      var formData = this.$("#formData").serializeObject();
      formData.userId = this.$store.state.userId;
      formData.id = this.synergyList.id;
      formData.handleState = handleState;
      console.log(formData);
      this.axios.post("/api/handleCoordinateInfo", formData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/synergyManagement");
          }, 3000);
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    accept() {
      this.resData(1);
    },
    reject() {
      this.$router.push('/kuantanState?handleState=3&id='+this.synergyList.id)
    },
    finish() {
      this.resData(2);
    }
  },
  created() {
    var data = {
      userId: this.$store.state.userId,
      id: this.id
    };
    this.axios.post("/api/getCoordinateInfo", data).then(res => {
      console.log(res);
      if (res.data.retCode == "000000") {
        this.synergyList = res.data.body;
      }
    });
  }
};
</script>

<style scoped>
.synergyDispose {
}
.btns{
  border-radius: 50px;
  width: 100%;
  background: #2F6CFF
}
form > div {
  padding: 10px;
}
form .synergyDispose div {
  display: flex;
  font-size: 14px;
}
form .synergyDispose div label {
  width: 95px;
  text-align-last: justify;
}
.creator {
  display: flex;
  flex-direction: column;
}
.creator div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.acceptor {
  display: flex;
  flex-direction: column;
}

.acceptor div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.btn {
  width: 200px;
  margin: auto;
}
.result {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.result label {
  display: flex;
  justify-content: center;
}
.result label::before {
  content: "*";
  color: red;
  display: inline-block;
}
.result textarea {
  flex: 1;
  border: 1px solid #eeee;
  margin-top: 10px;
  width: 100%;
}
</style>