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
          <input type="text" name :value="synergyInfo.createrId" class="layui-input" disabled />
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
      <div v-if="coordinateState == 2" class="layui-form-item">
        <label class="layui-form-label">受理人</label>
        <div class="layui-input-block">
          <input type="text" name :value="synergyInfo.responsibleId" class="layui-input" disabled />
        </div>
      </div>
      <div v-if="coordinateState == 2" class="layui-form-item">
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
                :value="synergyInfo.handleContent"
                placeholder=""
                class="layui-textarea"
                disabled
              ></textarea>
        </div>
      </div>
      <div v-if="coordinateState == 3" class="layui-form-item layui-form-text">
        <label class="layui-form-label">驳回原因</label>
        <div class="layui-input-block">
          <textarea
                name="handleContent"
                id="handleContent"
                :value="synergyInfo.rejectContent"
                placeholder=""
                class="layui-textarea"
                disabled
              ></textarea>
        </div>
      </div>

      <div class="layui-form-item">
        <button v-if="coordinateState == 0" type="button" class="layui-btn" @click="Accepted">受理</button>
        <button v-if="coordinateState == 0" type="button" class="layui-btn" @click="reject">驳回</button>
        <button v-if="coordinateState == 1" type="button" class="layui-btn" @click="finish">完成</button>
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
        if(res.data.retCode == '000000'){
          layer.msg(res.data.retMsg,{icon: 1})
          setTimeout(()=>{
            this.$router.push('/synergyManagement?type=synergyManagement')
          },3000)
        }else{
          layer.msg(res.data.retMsg,{icon: 2})
        }
      });
    },
    reject(){
      var _this = this
      layer.open({
          type: 1,
          title: "是否驳回此工单？",
          area: ["600px", "400px"],
          fixed: false, //不固定
          maxmin: true,
          content: `
                      <div style="padding:10px" class="layui-form-item layui-form-text">
                        <textarea name="reject" placeholder="请输入驳回说明" id="reject" row="50" style="min-height:260px" class="layui-textarea"></textarea>
                      </div>
                    `,
          btn: ["确定", "取消"],
          // success: function() {
          //   form.render();
          // },
          yes: function(index, layero) {
            var content = _this.$("#reject").val();
            var data = {
              userId: _this.$store.state.userId,
              id: _this.id,
              handleState: 3,
              rejectContent: content
            };
            _this.$axios.post("/api/handleCoordinateInfo", data).then(res => {
              console.log(res);
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg,{icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/synergyManagement?type=synergyManagement')
                },3000)
              }else{
                layer.msg(res.data.retMsg,{icon: 2})
              }
            });
            layer.close(index);
            return false;
          },
          btnAlign: "c"
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
        if(res.data.retCode == '000000'){
          layer.msg(res.data.retMsg,{icon: 1})
          setTimeout(()=>{
            this.$router.push('/synergyManagement?type=synergyManagement')
          },3000)
        }else{
          layer.msg(res.data.retMsg,{icon: 2})
        }
      });
    },
  },
  mounted(){
    this.getSynergyInfo();
  },
  created() {
    
  },
};
</script>

<style scoped>
.synergyInfo{
  padding: 15px 15px 0;
}
</style>