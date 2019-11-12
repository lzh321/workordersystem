<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">{{ title }}</div>
      <div class="modal-main">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <!-- <button @click="hideModal">取消</button> -->
        <button @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },

    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style scoped>
.modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 10;
}
.modal-container {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.modal-header {
    height: 55px;
    background: #409EFF;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: move;
}
.modal-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-top: 1px solid #ddd;
    padding: 5px 0;
}
.modal-footer button {
    width: 80%;
    height: 80%;
    border: none;
    background: #409EFF;
    border-radius: 5px;
    color: #fff;
}
.modal-main {
    padding: 50px 100px;
}
</style>