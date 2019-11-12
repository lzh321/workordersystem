<template>
  <main>
      <div class="side">
        <ul class="side_nav">
          <li v-for="(nav_item, index) in nav" :key="index" ref="nav" @click="active(index)" :class="{active:index === num}">
            <span>{{nav_item.nav_name}}</span>
          </li>
        </ul>
      </div>
      <div class="content">
        <div class="content_all">
          <div class="content_header"><span>{{title}}</span><span>刷新</span></div>
          <div class="content_main">
            <div>content_main</div>
            <div>content_main</div>
            <div>content_main</div>
            <div>content_main</div>
            <div>content_main</div>
          </div>
        </div>
        <footer>footer</footer>
      </div>
    </main>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      title: "工作台",
      num: 0,
      nav: [
        {nav_name: '工作台'},
        {nav_name: '工单管理'},
        {nav_name: '协同管理'},
        {nav_name: '用户管理'},
        {nav_name: '系统管理'},
        {nav_name: '设备管理'}
      ]
    };
  },
  methods: {
    active: function (index) {
      this.num = index
    }
  }
}
</script>

<style scoped>
main {
  /* width: 100%;
  height: 100%; */
  flex: 1;
  display: flex;
  overflow: hidden;
}

.side {
  width: 180px;
  background: #28324b;
  height: 100%;
  color: aliceblue;
  overflow: hidden;
  overflow-y: scroll;
}
.side_nav li {
  height: 70px;
  width: 100%;
  border-bottom: 1px solid #224977;
  text-align: center;
  line-height: 70px;
  
}
.side_nav li:hover {
  background: #151f38;
  box-shadow: 0px -1px 8px 0px #224977 inset;
}
.active{
  background: #151f38;
}
.side::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
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
  justify-content: space-between
  /* background: #ccc; */
}
.content_header span:nth-child(1){
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

.content_header span:nth-child(2){
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