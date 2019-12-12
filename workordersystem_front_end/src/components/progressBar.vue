<template>
  <div class="progressBar">
      <ul>
        <li>
          <div class="left">
            <i></i>
            <i></i>
          </div>
          <span>发单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="center">
            <i></i>
            <i></i>
          </div>
          <span>派单</span>
        </li>
        <li>
          <div class="right">
            <i></i>
          </div>
          <span>发单</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'progressBar',
  data() {
    return {
      
    }
  },
  mounted(){}
}
</script>

<style>
.progressBar ul{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.progressBar ul li{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.progressBar ul li i{
  display: inline-block;

}
.progressBar ul li i:nth-child(1){
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid blue;
}
.progressBar ul li i:nth-child(2){
  width: 20%;
  height: 1px;
  background: blue;
  position: absolute;
  top: 20px;
}
</style>