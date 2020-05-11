import axios from 'axios'
import $ from 'jquery'
export default {
  getbtns: function () {
    $('td a').hide()
    var userId = localStorage.getItem('userId')
    axios({
      method: 'post',
      url: '/api/getAllRoleInfoByUserId',
      data: {
        userId: userId,
        seleUserId: userId
      }
    }).then((res) => {
      console.log(res)
      // debugger
      if (res.data.body.roleBtnList.length > 0) {
        var arr = []
        for (var i = 0; i < res.data.body.roleBtnList.length; i++) {
          if (res.data.body.roleBtnList[i].btnLimit) {
            arr.push(JSON.parse(res.data.body.roleBtnList[i].btnLimit))
          }
        }
        console.log(arr)
        var url = location.pathname + location.search
        console.log(url)
        var str = ""
        for (var j = 0; j < arr.length; j++) {
          for (var z = 0; z < arr[j].length; z++) {
            if (arr[j][z].btns && arr[j][z].menuUrl == url) {
              str += arr[j][z].btns + ','
            }
          }
        }
        var btn = str.substr(0, str.length - 1).split(',')
        for (var h = 0; h < btn.length; h++) {
          for (var k = h + 1; k < btn.length; k++) {
            if (btn[h] == btn[k]) {         //第一个等同于第二个，splice方法删除第二个
              btn.splice(k, 1);
              k--;
            }
          }
        }
        var userBtn = btn
        if (userBtn.length > 0) {
          for (var i = 0; i < userBtn.length; i++) {
            if (userBtn[i] == 'edit') {
              $('.edit').show()
            }
            if (userBtn[i] == "add") {
             $('.add').show()
            }
            if (userBtn[i] == "role-parts") {
              $('.role-parts').show()
            }
            if (userBtn[i] == "disabled") {
              $('.disabled').show()
            }
            if (userBtn[i] == "invoke") {
              $('.invoke').show()
            }
            if (userBtn[i] == "check") {
              $('.check').show()
            }
          }
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  btnArr: ""
}
