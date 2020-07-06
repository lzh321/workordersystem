<template>
  <div class="layui-form-item">
    <label class="layui-form-label org">企业机构</label>
    <div id="cat_ids2"></div>
  </div>
</template>

<script>
import selectN from "@/assets/js/selectN"
export default {
  props: ['type'],
  name: "orgInfo",
  data() {
    return {
      OrgList: [],
      data: localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : {}
    };
  },
  methods: {
    getiOrg(data) {
      // console.log(data)
      data.forEach((item, index) => {
        // console.log(item)
        this.$axios
          .post("/api/getAllChildOrgInfoById", { orgId: item.orgId })
          .then(res => {
            //企业机构
            // console.log(res);
            if (res.data.retCode == "000000") {
              if (res.data.body.length > 0) {
                item.orgInfo = res.data.body;
              }
            }
            this.OrgList = JSON.parse(JSON.stringify(data));
            this.select(data);
          });
      });
    },

    select(data) {
      var _this = this;

      layui.use(["form", "jquery", "selectN"], function() {
        
        var $ = layui.jquery;
        var form = layui.form,
          selectN = layui.selectN;
        
        //无限级分类-所有配置
        var catIns2 = selectN({
          //元素容器【必填】
          elem: "#cat_ids2",
          //候选数据【必填】
          data: data,
          //设置了长度
          width: null,
          //默认值
          selected: [_this.data.orgId],

          //为真只取最后一个值
          last: false,

          //空值项提示，可设置为数组['请选择省','请选择市','请选择县']
          tips: "请选择",

          //事件过滤器，lay-filter名 不设置与选择器相同(去#.)
          filter: "",

          //input的name 不设置与选择器相同(去#.)
          name: "orgId",

          //数据分隔符
          delimiter: ",",

          //数据的键名
          field: {
            idName: "orgId",
            titleName: "orgName",
            childName: "orgInfo"
          },

          //表单区分 form.render(type, filter); 为class="layui-form" 所在元素的 lay-filter="" 的值
          formFilter: null
        });
        if (_this.$route.query.check == 1) {
          $("select").attr("disabled", true);
        }

        //通过js动态选择

        //监听重置按钮
        $('button[type="reset"]').click(function() {
          $("form")[0].reset();
          catIns2.set(); //默认值
          return false;
        });
      });
    }
  },
  created() {

    this.$axios.post("/api/getOrgInfoList", {userId: this.$store.state.userId}).then(res => {
      //企业机构
      console.log(res);
      if (res.data.retCode == "000000") {
        // this.OrgList = res.data.body.orgInfoList;
        // this.getiOrg(JSON.stringify(res.data.body.orgInfoList))
        var data = res.data.body.orgInfoList;
        // console.log(data)
        this.getiOrg(data);
      }
    });
  }
};
</script>

<style>
.org {
  display: flex;
  align-items: center;
  /* width: 130px !important; */
}
.org::before {
  content: "";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
</style>