<template>
  <main>
    <div class="content">
      <div class="content_all">
        <div class="content_header">
          <span>{{title}}</span>
          <span>刷新</span>
        </div>
        <div class="content_main">
          <router-view></router-view>
        </div>
      </div>
      <footer>footer</footer>
    </div>
  </main>
</template>

<script>
export default {
  name: "Main",
  props: ['title'],
  data() {
    return {
      // title: "",
    };
  },
  mounted(){
    
  }
};
</script>

<style scoped>
main {
  /* width: 100%;
  height: 100%; */
  flex: 1;
  display: flex;
  overflow: hidden;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
}
.content::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.content_all {
  flex: 1;
  background: #eee;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
}
.content_all .content_main {
  background: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  flex: 1;
  padding: 5px;
}
.content_header {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background: #ccc; */
}
.content_header span:nth-child(1) {
  display: flex;
  align-items: center;
}
.content_header span:nth-child(1):before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 20px;
  background: #445eee;
  margin-right: 5px;
}

.content_header span:nth-child(2) {
  padding: 5px 10px;
  font-size: 12px;
  margin-right: 20px;
  background: #445eee;
  color: #fff;
  border-radius: 2px;
}

footer {
  width: 100%;
  /* height: 40px; */
  background: #ccc;
  padding: 10px 10px;
}

</style>