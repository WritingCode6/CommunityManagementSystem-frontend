<template>
  <div id="repair">
    <div class="repairProcessRead" v-show="repairProcessRead">
      <ul>
        <li class="repairProcess">
          <span>报修流程</span>
        </li>
        <li class="repairForm">
          <a href @click.prevent="toRepairFormRead">报修单</a>
        </li>
      </ul>
      <div class="content">
        <h3>报修流程通知</h3>
        <p>{{ msg1 }}</p>
        <p>{{ msg2 }}</p>
        <p>{{ msg3 }}</p>
        <p>{{ msg4 }}</p>
        <p>{{ msg5 }}</p>
        <p>{{ msg6 }}</p>
        <p>{{ msg7 }}</p>
      </div>
      <div class="option">
        <h4>操作</h4>
        <button type="button" @click="openModifyProcess">修改报修流程</button>
      </div>
      <div class="repairPicture">
        <h4>报修申请新增情况</h4>
        <div class="picture">
          <!-- 曲线画在这里 -->
        </div>
      </div>
    </div>
    <div class="repairFormRead" v-show="repairFormRead">
      <ul>
        <li class="repairProcess">
          <a href="" @click.prevent="torepairProcessRead">报修流程</a>
        </li>
        <li class="repairForm">
          <span>报修单</span>
        </li>
      </ul>
      <div class="content">
        <!-- 报修单内容 -->
      </div>
    </div>
    <div class="modifyProcessWindows" v-show="modifyProcess">
      <div class="modifyProcessBox">
        <h4>修改报修流程</h4>
        <div class="back">
          <a href @click.prevent="closeModifyProcess">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="modifycontent">
          <textarea type="text" style="resize:none" v-model="msg"></textarea>
        </div>
        <div class="button">
          <button type="button" value="保存修改" class="saveButton" @click="saveModifyProcess">保存修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "repair",
  data() {
    return {
      repairProcessRead: true,
      repairFormRead: false,
      modifyProcess: false,
      msg:
        " 为保证社区正常运营，提升后勤服务质量及管理水平，规范运作维修、报修流程，现将物业维修及报修相关流程通知如下：\n" +
        "1、 巡查人员在发现需维修情况后，认真填写报修单报修，并送至物业维修部门。\n" +
        "2、 住户在发现需维修情况后，线上认真填写报修单报修，等待处理。\n" +
        "3、 经维修部门核实后，根据具体内容安排专业人员48小时内予以维修。\n" +
        "4、 维修项目超出维修范围或需安装、增添新设备、器具的，需以报告形式经物业管理部门签字同意。\n" +
        "5、 遇紧急情况涉及公共安全隐患的，可直接拨打紧急维修电话13222227356联系报修。\n" +
        "6、 报修单填写维修项目属人为故意损坏的，必须由损坏人员赔付后方可维修。",
      msg1:
        "为保证社区正常运营，提升后勤服务质量及管理水平，规范运作维修、报修流程，现将物业维修及报修相关流程通知如下：",
      msg2:
        "1、 巡查人员在发现需维修情况后，认真填写报修单报修，并送至物业维修部门。",
      msg3: "2、 住户在发现需维修情况后，线上认真填写报修单报修，等待处理。",
      msg4: "3、 经维修部门核实后，根据具体内容安排专业人员48小时内予以维修。",
      msg5:
        "4、 维修项目超出维修范围或需安装、增添新设备、器具的，需以报告形式经物业管理部门签字同意。",
      msg6:
        "5、 遇紧急情况涉及公共安全隐患的，可直接拨打紧急维修电话13222227356联系报修。",
      msg7:
        "6、 报修单填写维修项目属人为故意损坏的，必须由损坏人员赔付后方可维修。"
    };
  },
  methods: {
    //切换到报修单板块
    toRepairFormRead() {
      this.repairFormRead = true;
      this.repairProcessRead = false;
    },
    //切换到报修流程板块
    torepairProcessRead(){
      this.repairProcessRead = true;
      this.repairFormRead = false;
    },
    //打开修改报修流程窗口
    openModifyProcess() {
      this.modifyProncess = true;
    },
    //关闭修改报修流程窗口
    closeModifyProcess() {
      this.modifyProncess = false;
    },
    //保存修改报修流程
    saveModifyProcess() {
      this.modifyProncess = false;
    }
  }
};
</script>

<style scoped>
.repairProcessRead,
.repairFormRead {
  margin-top: 25px;
  position: relative;
  left: 55px;
}
.repairProcessRead ul {
  background-image: url("../../assets/image/tab/two_left.png");
}
.repairFormRead ul {
  background-image: url("../../assets/image/tab/two_right.png");
}
.repairProcessRead ul,
.repairFormRead ul {
  background-size: 202px;
  background-repeat: no-repeat;
  width: 1012px;
  height: 36px;
  position: relative;
  z-index: 1;
}
li {
  float: left;
}
span,
a {
  display: block;
  width: 90px;
  height: 36px;
  font-size: 20px;
  text-align: center;
  line-height: 36px;
  color: black;
  position: absolute;
  z-index: 2;
}
.repairProcessRead a,
.repairFormRead span {
  left: 101px;
}
a:hover {
  color: #fff;
}
.repairProcessRead .content {
  margin-top: -1px;
  width: 850px;
  height: 550px;
  border: 1px solid #bcbcbc;
  overflow-y: scroll;
}
h3 {
  margin-top: 20px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
}
p {
  text-indent: 40px;
  font-size: 20px;
  margin: 20px 40px;
  letter-spacing: 2px;
  line-height: 40px;
}
.option,
.repairPicture {
  float: left;
  margin-top: -550px;
  margin-left: 900px;
}
h4 {
  font-size: 24px;
  font-weight: bold;
  color: #666;
  margin-left: 20px;
}
h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 900px;
  z-index: 1;
}
.option h4::before {
  background-color: #d38cad;
}
.repairProcessRead button {
  width: 242px;
  height: 92px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
}
.repairPicture {
  margin-top: -350px;
}
.picture {
  width: 300px;
  height: 300px;
  border: 1px solid rgb(161, 158, 158);
  margin-top: 20px;
  border-radius: 5px;
}
.modifyProcessWindows {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.modifyProcessBox {
  width: 634px;
  height: 518px;
  background: #fff;
  margin: 100px auto;
  position: relative;
}
.modifyProcessBox h4 {
  padding-top: 24px;
  margin-left: 50px;
  color: #000;
}
.modifyProcessBox h4::before {
  left: 22px;
  z-index: 1;
}
.modifyProcessBox h4::after {
  content: "";
  width: 94%;
  height: 1px;
  background: #666;
  position: absolute;
  top: 60px;
  left: 18px;
  z-index: 2;
}
.modifyProcessBox .back {
  position: absolute;
  left: 550px;
  top: 20px;
}
.modifycontent {
  height: 80%;
}
.modifyProcessBox textarea {
  width: 90%;
  height: 85%;
  margin: 35px 29px;
  font-size: 20px;
  overflow-y: scroll;
}
.modifyProcessBox .button {
  height: 58px;
  width: 100%;
  background: #bcbcbc;
}
.saveButton {
  width: 120px;
  height: 39px;
  background: #8a79af;
  margin-left: 249px;
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 20px;
  cursor: pointer;
}
.repairFormRead .content{
  margin-top: -1px;
  min-width: 1000px;
  max-width: 1200px;
  height: 550px;
  border: 1px solid #bcbcbc;
}
</style>
