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
        <div class="function_box">
          <div class="search_box1">
            <el-input
                    v-model="name"
                    class="search_input"
                    placeholder="请输入住户姓名"></el-input>
            <el-button type="primary">搜索</el-button>
          </div>
          <div class="add_form">
            <el-button type="primary" class="add_button" @click="openAdd">新增报修单</el-button>
          </div>
        </div>
        <div class="form_table">
          <el-table
                  :data="formData"
                  style="width: 100%"
                  highlight-current-row>
            <!-- 设置min-width来自适应宽度 -->
            <el-table-column prop="id" label="单号" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="facility" label="设施" min-width="15%" align="center"></el-table-column>
            <el-table-column prop="place" label="所在地" min-width="15%" align="center"></el-table-column>
            <el-table-column prop="isReceived" label="状态" min-width="12%" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="18%" align="center"></el-table-column>
            <el-table-column label="操作" min-width="15%" align="center">
              <a href>
                <span class="operation" @click.prevent="openModify">修改</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="openCheck">查看详情</span>
              </a>
            </el-table-column>
          </el-table>
          <div class="page_block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    layout="prev, pager, next, total">
            </el-pagination>
          </div>
        </div>
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
    <div class="addWindows" v-show="addWindows">
      <div class="addBox">
        <h4>新增报修单</h4>
        <div class="back">
          <a href @click.prevent="closeAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="addContentBox">
          <h5>具体信息</h5>
          <el-form 
                ref="form" 
                :v-model="addContent"
                :rules="repairWordRules"
                :show-message="false">
            <el-form-item class="facility" prop="facility">
              <label>设施：</label>
              <el-input
                  type="text" 
                  class="input" 
                  style="font-size:20px"
                  v-model="addContent.facility">
              </el-input>
            </el-form-item>
            <el-form-item class="place" prop="place">
              <label>所在地：</label>
              <el-input
                  type="text" 
                  class="input" 
                  style="font-size:20px"
                  v-model="addContent.place">
              </el-input>
            </el-form-item>
            <el-form-item class="reason" prop="reason">
              <label>原因：</label>
              <el-input
                  type="textarea" 
                  style="font-size:20px"
                  resize="none" 
                  :rows="3"
                  v-model="addContent.reason">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttonBox">
          <button type="button" @click="saveAdd">确定新增</button>
        </div>
      </div>
    </div>
    <div class="modifyWindows" v-show="modifyWindows">
      <div class="modifyBox">
        <h4>修改报修单</h4>
        <div class="back">
          <a href @click.prevent="closeModify">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="modifyContentBox">
          <h5>处理信息</h5>
          <el-form 
                ref="form" 
                :v-model="modifyCotent"
                :show-message="false">
            <el-form-item class="isReceived">
              <label>处理状态：</label>
              <el-select placeholder="请选择处理状态" v-model="modifyCotent.isReceived">
                <!-- 下拉框有问题 -->
                <el-option label="未处理" value="unreceived"></el-option>
                <el-option label="已处理" value="received"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="handleTime">
              <label>处理时间：</label>
              <el-date-picker type="date" placeholder="选择日期" v-model="modifyCotent.handleTime"></el-date-picker>
            </el-form-item>
            <el-form-item class="result">
              <label>处理结果：</label>
              <el-input
                  type="textarea" 
                  style="font-size:20px"
                  resize="none" 
                  :rows="4"
                  v-model="modifyCotent.result">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttonBox">
          <button type="button" @click="saveModify">保存修改</button>
        </div>
      </div>
    </div>
    <div class="checkWindows" v-show="checkWindows">
      <div class="checkBox">
        <h4>查看报修单</h4>
        <div class="CheckContentBox">
          <div class="repairInfo">
            <h5>具体信息</h5>
            <ul>
              <li class="id">
                ID：
                <span>{{ repairMsg.id }}</span>
              </li>
              <li class="userId">
                报修人ID：
                <span>{{ repairMsg.userId }}</span>
              </li>
              <li class="facility">
                设施：
                <span>{{ repairMsg.facility }}</span>
              </li>
              <li class="userName">
                报修人姓名：
                <span>{{ repairMsg.userName }}</span>
              </li>
              <li class="isReceived">
                处理状态：
                <span>{{ repairMsg.isReceived }}</span>
              </li>
              <li class="createTime">
                创建时间：
                <span>{{ repairMsg.createTime }}</span>
              </li>
              <li class="place">
                所在地：
                <span>{{ repairMsg.place }}</span>
              </li>
              <li class="reason">
                原因：
                <p>{{ repairMsg.reason }}</p>
              </li>
            </ul>
          </div>
          <div class="line"></div>
          <div class="receivedInfo">
            <h5>处理信息</h5>
            <ul>
              <li class="employeeId">
                工作人员ID：
                <span>{{ repairMsg.employeeId }}</span>
              </li>
              <li class="employeeName">
                工作人员姓名：
                <span>{{ repairMsg.employeeName }}</span>
              </li>
              <li class="handleTime">
                处理时间：
                <span>{{ repairMsg.handleTime }}</span>
              </li>
              <li class="employeePhone">
                工作人员手机号：
                <span>{{ repairMsg.employeePhone }}</span>
              </li>
              <li class="result">
                处理结果：
                <span>{{ repairMsg.result }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="buttonBox">
          <button type="button" @click="closeCheck">返回</button>
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
      addWindows:false,
      modifyWindows:false,
      checkWindows:false,
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
        "6、 报修单填写维修项目属人为故意损坏的，必须由损坏人员赔付后方可维修。",
      formData: [
        {
          id: 1,
          facility: '水管',
          place: '走廊',
          isReceived: '已处理',
          createTime: '2020-20-20'
        },
        {
          id: 2,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        },
        {
          id: 3,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        },
        {
          id: 4,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        },
        {
          id: 5,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        },
        {
          id: 6,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        },
        {
          id: 7,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        },
        {
          id: 8,
          facility: '水管',
          place: '房屋',
          isReceived: '未处理',
          createTime: '2020-20-20'
        }
      ],
      repairMsg:{
        id:'1',
        userId:'123',
        facility:'水管',
        userName:'邹雅岚',
        isReceived:'已处理',
        createTime:'2020-05-08',
        place:'住户房屋',
        reason:'水管老化',
        employeeId:'123456',
        employeeName:'刘杨十',
        handleTime:'2020-05-09',
        employeePhone:'13888888888',
        result:'完成维修'
      },
      addContent:{
        facility:'',
        place:'',
        reason:''
      },
      modifyCotent:{
        isReceived:'',
        handleTime:'',
        result:''
      },
      repairWordRules:{
        facility:[
          { required: true, trigger: "blur" }
        ],
        place:[
          { required: true, trigger: "blur" }
        ],
        reason:[
          { required: true, trigger: "blur" }
        ]
      },
      pageSize: 10,
      total: 100,
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
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
      this.modifyProcess = false;
    },
    /* 打开新增报修单窗口 */
    openAdd() {
      this.addWindows = true;
    },
    /* 关闭新增报修单窗口 */
    closeAdd() {
      this.addWindows = false;
    },
    /* 确认新增报修单 */
    saveAdd() {
      this.addWindows = false;
    },
    /* 打开修改报修单窗口 */
    openModify() {
      this.modifyWindows = true;
    },
    /* 关闭修改报修单窗口 */
    closeModify() {
      this.modifyWindows = false;
    },
    /* 保存修改报修单 */
    saveModify() {
      this.modifyWindows = false;
    },
    /* 打开查看报修单窗口 */
    openCheck() {
      this.checkWindows = true;
    },
    /* 关闭查看报修单窗口 */
    closeCheck() {
      this.checkWindows = false;
    },
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
.form_table a:hover {
  color: #8a79af;
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
.modifyProcessWindows,
.addWindows,
.modifyWindows,
.checkWindows {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.modifyProcessBox,
.addBox,
.modifyBox,
.checkBox {
  width: 634px;
  height: 518px;
  background: #fff;
  margin: 100px auto;
  position: relative;
}
.addBox,
.modifyBox {
  height: 472px;
}
.checkBox {
  margin-top: 3.5%;
  height: 640px;
  position: relative;
}
.modifyProcessBox h4,
.addBox h4,
.modifyBox h4,
.checkBox h4 {
  padding-top: 24px;
  margin-left: 50px;
  color: #000;
}
.modifyProcessBox h4::before,
.addBox h4::before,
.modifyBox h4::before,
.checkBox h4::before {
  left: 22px;
  z-index: 1;
}
.modifyProcessBox h4::after,
.addBox h4::after,
.modifyBox h4::after,
.checkBox h4::after {
  content: "";
  width: 94%;
  height: 1px;
  background: #666;
  position: absolute;
  top: 60px;
  left: 18px;
  z-index: 2;
}
.line {
  width: 94%;
  height: 0.6px;
  background: #666;
  margin-top: 265px;
  margin-left: 20px;
  margin-bottom: -15px;
}
.modifyProcessBox .back,
.addBox .back,
.modifyBox .back {
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
.addContentBox,
.modifyContentBox,
.CheckContentBox {
  margin-top: 30px;
  margin-left: 30px;
  width: 90%;
}
.addContentBox h5,
.modifyContentBox h5,
.CheckContentBox h5 {
  font-size: 20px;
  font-weight: bold;
}
.addContentBox label,
.modifyContentBox label {
  font-size: 20px;
}
.addContentBox .facility {
  margin-top: 20px;
  margin-left: 50px;
}
.addContentBox .place {
  margin-top: -10px;
  margin-left: 30px;
}
.addContentBox .place .input {
  width: 350px;
}
.addContentBox .reason {
  margin: -15px 30px;
}
.addBox .input {
  width: 200px;
  height: 50px;
}
.modifyContentBox .isReceived {
  margin-top: 20px;
  margin-left: 30px;
}
.modifyContentBox .handleTime {
  margin-top: -10px;
  margin-left: 30px;
}
.modifyContentBox .result {
  margin: -15px 30px;
}
.repairInfo,
.receivedInfo {
  margin-top: 35px;
  margin-left: 40px;
  font-size: 20px;
}
.checkBox ul {
  margin-top: 25px;
  margin-left: 30px;
  color: #666;
}
.checkBox li {
  position: absolute;
}
.checkBox p,
.checkBox span {
  color: #000;
}
.id {
  left: 120px;
}
.userId {
  left: 300px;
}
.facility {
  top: 160px;
  left: 99px;
}
.userName {
  top: 160px;
  left: 280px;
}
.isReceived {
  top: 195px;
  left: 60px;
}
.createTime {
  top: 195px;
  left: 300px;
}
.place {
  top: 230px;
  left: 80px;
}
.reason {
  top: 265px;
}
.employeeId {
  left: 60px;
}
.employeeName {
  left: 330px;
}
.handleTime {
  top: 470px;
  left: 80px;
}
.employeePhone {
  top: 470px;
  left: 310px;
}
.result {
  top: 510px;
  left: 80px;
}
.reason p {
  position: absolute;
  top: 5px;
  left: -70px;
  width: 500px;
  height: 70px;
  text-indent: 40px;
}
.modifyProcessBox .button,
.addBox .buttonBox,
.modifyBox .buttonBox,
.checkBox .buttonBox {
  height: 58px;
  width: 100%;
  background: #bcbcbc;
}
.addBox .buttonBox,
.modifyBox .buttonBox {
  margin-top: 50px;
}
.checkBox .buttonBox {
  margin-top: 174px;
}
.saveButton,
.addBox button,
.modifyBox button,
.checkBox button {
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
.addBox button,
.modifyBox button,
.checkBox button {
  border-radius: 10px;
}
/*fxy*/
.repairFormRead .content{
  margin-top: -1px;
  min-width: 1000px;
  max-width: 1200px;
  height: 550px;
  border: 1px solid #bcbcbc;
}
</style>
