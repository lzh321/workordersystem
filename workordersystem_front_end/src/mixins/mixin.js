import axios from 'axios'
let MIXIN = {
  data () {
      return {
          btns: ""
      }
  },
  created() {
    this.getbtns()
  },
  mounted () {
      
  },
  methods: {
      //权限按钮
    getbtns(){
      axios({
        method: 'post',
        url: '/api/getAllRoleInfoByUserId',
        data: {
          userId: this.$store.state.userId,
          seleUserId: this.$store.state.userId
        }
      }).then((res)=>{

        console.log(res)
        // debugger
        if(res.data.body.roleBtnList.length > 0 ) {
          var arr = []
          for(var i = 0; i < res.data.body.roleBtnList.length; i++){
            if(res.data.body.roleBtnList[i].btnLimit){
              arr.push(JSON.parse(res.data.body.roleBtnList[i].btnLimit))
            }
          }
          console.log(arr)
          var url = location.pathname + location.search
          console.log(url)
          var str = ""
          for(var j = 0; j < arr.length; j++){
            for(var z = 0; z < arr[j].length; z++){
              if(arr[j][z].btns && arr[j][z].menuUrl == url){
                str += arr[j][z].btns + ','
              }
            }
          }
          let btn = str.substr(0,str.length-1).split(',')
          for(var h = 0; h < btn.length;h++){
            for(var k =h+1; k < btn.length; k++){
              if(btn[h]==btn[k]){         //第一个等同于第二个，splice方法删除第二个
                btn.splice(k,1);
                k--;
              }
            }
          }
          this.btns = JSON.stringify(btn);

        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}

export default MIXIN