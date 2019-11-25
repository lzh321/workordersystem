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
          <div class="right">
            <i></i>
            <i></i>
          </div>
          <span>发单</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'progressBar'
}
</script>

<style>
.progressBar ul{
  display: flex;
  align-items: center;
}
.progressBar ul li{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.progressBar ul li i{
  display: inline-block;
}
.progressBar ul li .left i:nth-child(1){
  
}
</style>