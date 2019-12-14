<template>
  <div class="synergyInfo">
    <form action class="layui-form layui-form-pane">
      <div class="layui-form-item">
        <label class="layui-form-label">编号</label>
        <div class="layui-input-block">
          <input type="text" name :value="synergyInfo.id" class="layui-input" disabled />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">协同内容</label>
        <div class="layui-input-block">
          <input type="text" name :value="synergyInfo.content" class="layui-input" disabled />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">创建人</label>
        <div class="layui-input-block">
          <input type="text" name :value="synergyInfo.createrName" class="layui-input" disabled />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">创建时间</label>
        <div class="layui-input-block">
          <input type="text" name :value="synergyInfo.createTime" class="layui-input" disabled />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">紧急程度</label>
        <div class="layui-input-block">
          <input
            type="text"
            name
            :value="synergyInfo.orderUrgency == 0 ? '一般' : '紧急'"
            class="layui-input"
            disabled
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">受理人</label>
        <div class="layui-input-block">
          <input type="text" name class="layui-input" disabled />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">受理时间</label>
        <div class="layui-input-block">
          <input type="text" name :value="synergyInfo.responsibleTime" class="layui-input" disabled />
        </div>
      </div>

      <div v-if="coordinateState == 2" class="layui-form-item layui-form-text">
        <label class="layui-form-label">处理结果</label>
        <div class="layui-input-block">
          <textarea
                name="handleContent"
                id="handleContent"
                value=""
                placeholder="请输入处理结果"
                class="layui-textarea"
              ></textarea>
        </div>
      </div>

      <div class="layui-form-item">
        <button v-if="coordinateState == 1" type="button" class="layui-btn" @click="Accepted">受理</button>
        <button v-if="coordinateState == 2" type="button" class="layui-btn" @click="finish">完成</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "synergyInfo",
  data() {
    return {
      id: sessionStorage.getItem("id") ? sessionStorage.getItem("id") : "",
      coordinateState: sessionStorage.getItem("coordinateState")
        ? sessionStorage.getItem("coordinateState")
        : "",
      synergyInfo: {}
    };
  },
  methods: {
    getSynergyInfo() {
      if (this.id) {
        var data = {
          userId: this.$store.state.userId,
          id: this.id
        };
        this.$axios.post("/api/getCoordinateInfo", data).then(res => {
          console.log(res);
          this.synergyInfo = res.data.body;
        });
      }
    },
    Accepted() {
      var data = {
        userId: this.$store.state.userId,
        id: this.id,
        handleState: 1
      };
      this.$axios.post("/api/handleCoordinateInfo", data).then(res => {
        console.log(res);
        this.synergyInfo = res.data.body;
      });
    },
    finish() {
      var data = {
        userId: this.$store.state.userId,
        id: this.id,
        handleState: 2,
        handleContent: this.$("#handleContent").val()
      };
      this.$axios.post("/api/handleCoordinateInfo", data).then(res => {
        console.log(res);
        this.synergyInfo = res.data.body;
      });
    }
  },
  mounted(){
    this.getSynergyInfo();
  },
  created() {
    
  },
  beforeDestroy(){
    sessionStorage.removeItem("id")
    sessionStorage.removeItem("coordinateState")
  }
};
</script>

<style scoped>
</style>