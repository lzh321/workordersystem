<template>
  <div class="kuantan">
    <orderInfo></orderInfo>
    <VisitInfo></VisitInfo>
    <orderLog></orderLog>
  </div>
</template>

<script>
import orderInfo from './orderInfo'
import VisitInfo from './VisitInfo'
import orderLog from './orderLog'
export default {
  name: 'kuantan',
  data() {
    return {
      
    }
  },
  components:{
    orderInfo,
    VisitInfo,
    orderLog
  }
}
</script>

<style scoped>

</style>