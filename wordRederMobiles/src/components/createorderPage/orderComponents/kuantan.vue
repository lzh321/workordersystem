<template>
  <div class="kuantan">
    <orderInfo :orderInfo="orderInfo"></orderInfo>
    <VisitInfo :orderInfo="orderInfo"></VisitInfo>
    <orderLog></orderLog>
  </div>
</template>

<script>
import orderInfo from './orderInfo'
import VisitInfo from './VisitInfo'
import orderLog from './orderLog'
export default {
  name: 'kuantan',
  props:['orderInfo'],
  data() {
    return {
      
    }
  },
  components:{
    orderInfo,
    VisitInfo,
    orderLog,
  }
}
</script>

<style scoped>

</style>