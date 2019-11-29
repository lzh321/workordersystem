<template>
  <div class="addEquipment">
    <form class="layui-form layui-form-pane" action>
      <div class="info">基础信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">存货编码</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入存货编码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">存货名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入存货名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">设备型号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入设备型号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">维保开始时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" id="Maintenance_start" placeholder="请选择维保开始时间" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">维保结束时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" id="Maintenance_end" placeholder="请选择维保结束时间" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">银行名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入银行名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value>请选择一个城市</option>
            <option value="1">北京</option>
            <option value="2">上海</option>
            <option value="3">深圳</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">网点名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入网点名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">网点地址</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入网点地址"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="info">其他信息</div>

      <div class="layui-form-item">
        <label class="layui-form-label">设备状态</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入设备状态"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">生产批次</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入生产批次"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">签报号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入签报号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">物料类型</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入物料类型"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">发货时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" id="shipments" placeholder="请选择发货时间" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">运单号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入运单号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否转运</label>
        <div class="layui-input-block">
          <select name="transfer" lay-verify>
            <option value>请选择是否转运</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">转运流程</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入转运流程"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">验收单</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入验收单"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">验收时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" id="acceptance" placeholder="请选择验收时间" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">客户联系人</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入客户联系人"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">联系电话</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入联系电话"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">资产状态</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify
            placeholder="请输入资产状态"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否入库</label>
        <div class="layui-input-block">
          <select name="storage" lay-verify>
            <option value>请选择是否入库</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">开票时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" id="payment" placeholder="请选择开票时间" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否回款</label>
        <div class="layui-input-block">
          <select name="returnedMoney" lay-verify>
            <option value>请选择是否回款</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">回款时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" id="returnedMoney" disabled placeholder="请选择回款时间" />
        </div>
      </div>

      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addEquipment",
  data() {
    return {};
  },
  mounted() {
    layui.use("laydate", function() {
      var laydate = layui.laydate;
      //日期时间选择器
      laydate.render({  // 维保开始时间
        elem: "#Maintenance_start",
        type: "datetime",
        closeStop: '#Maintenance_start'
      });
      laydate.render({  // 维保结束时间
        elem: "#Maintenance_end",
        type: "datetime"
      });
      laydate.render({  // 发货时间
        elem: "#shipments",
        type: "datetime"
      });
      laydate.render({  // 验收时间
        elem: "#acceptance",
        type: "datetime"
      });
      laydate.render({  // 开票时间
        elem: "#payment",
        type: "datetime"
      });
      laydate.render({  // 回款时间
        elem: "#returnedMoney",
        type: "datetime"
      });
    });
    //Demo
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      // select监听
      form.on("select(filter)", function(data) {
        console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        console.log(data.othis); //得到美化后的DOM对象
      });
      // 监听radio
      form.on("radio(filter)", function(data) {
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
      });
      //监听提交
      form.on("submit(formDemo)", function(data) {
        layer.msg(JSON.stringify(data.field));
        return false;
      });

      //表单验证
      form.verify({
        username: function(value, item) {
          //value：表单的值、item：表单的DOM对象
          if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return "用户名不能有特殊字符";
          }
          if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return "用户名首尾不能出现下划线'_'";
          }
          if (/^\d+\d+\d$/.test(value)) {
            return "用户名不能全为数字";
          }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"]
      });
    });
  }
};
</script>

<style scoped>
.addEquipment {
  padding: 15px 15px 0 15px;
}
.info {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
}
</style>