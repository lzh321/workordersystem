<template>
  <div class="workOrderManagement">
    <div class="work_type">
      <ul>
        <li v-for="(item,index) in workType" @click="active(index)" :class="{active:index === num}" :key="index"><i v-if="item.num ? true : false">{{item.num}}</i><span>{{item.title}}</span></li>
      </ul>
    </div>
    <data-screening></data-screening>
    <div></div>
  </div>
</template>

<script>
import dataScreening from '../dataScreening'
export default {
  name:'workOrderManagement',
  data() {
    return {
      num: 0,
      workType: [
        {title: "全部"},
        {title: "待发单", num: 2},
        {title: "待派单", num: 2},
        {title: "待受理", num: 2},
        {title: "处理中", num: 2},
        {title: "待回访", num: 2},
        {title: "已关单", num: 2},
      ]
    }
  },
  components: {
    dataScreening
  },
  methods: {
    active: function (index) {
      this.num = index
    }
  }
}
</script>

<style scoped>
.workOrderManagement{
  height: 100%;
}
.active {
  border-bottom: 2px solid #445eee;
  color: #445eee;
}
.work_type ul{
  display: flex;
  align-items: center;
  padding: 10px 15px 20px;
}
.work_type ul li{
  position: relative;
  text-align: center;
  padding: 12px 15px;
}
.work_type ul li i{
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: red;
  font-size: 10px;
  color: #fff;
  position: absolute;
  top: 8px;
  line-height: 15px;
  right: 0px;
}
</style>