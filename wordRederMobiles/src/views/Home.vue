<template>
  <div class="home">
    <router-view></router-view>
    <img
      class="xuanfu"
      id="moveDiv"
      @mousedown="down()"
      @touchstart="down()"
      @mousemove="move()"
      @touchmove="move()"
      @mouseup="end()"
      @touchend="end()"
      @click="goCreate"
      src="../assets/Images/create_in.png"
      alt
    />
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar'
import wordOrder from "@/components/wordOrderPage/wordOrder";
import Tabbar from "@/components/TabBar";
export default {
  data() {
    return {
      title: "工单管理",
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: ""
    };
  },
  methods: {
    // 实现移动端拖拽
    goCreate() {
      this.$router.push("/create");
    },
    down() {
      this.flags = true;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
    },
    move() {
      if (this.flags) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        //添加限制：只允许在屏幕内拖动
        const maxWidth = document.body.clientWidth - 54; //屏幕宽度减去悬浮框宽高
        const maxHeight = document.body.clientHeight - 54;
        if (this.xPum < 0) {
          //屏幕x限制
          this.xPum = 0;
        } else if (this.xPum > maxWidth) {
          this.xPum = maxWidth;
        }
        if (this.yPum < 0) {
          //屏幕y限制
          this.yPum = 0;
        } else if (this.yPum > maxHeight) {
          this.yPum = maxHeight;
        }
        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件
        document.addEventListener(
          "touchmove",
          function() {
            // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
            // event.preventDefault(); //jq 阻止冒泡事件
            // event.preventDefault();
            event.stopPropagation(); // 如果没有引入jq 就用 stopPropagation()
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
    }
  },
  components: {
    wordOrder
    // NavBar
  }
};
</script>

<style scoped>
.home {
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.xuanfu {
  height: 54px; /* rem = 12px */
  width: 54px;
  /*1.3  如果碰到滑动问题，请检查 z-index。z-index需比web大一级*/
  z-index: 9997;
  position: fixed;
  bottom: 60px;
  right: 0;
  border-radius: 0.8rem;
}
</style>