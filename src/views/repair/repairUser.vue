<template>
  <div id="repairUser">
    <div class="repairUserBox">
      <div class="processWindows" v-show="processWindows">
        <div class="nav">
          <ul>
            <li class="repairProcess">
              <span>报修流程</span>
            </li>
            <li class="addRepair">
              <a href @click.prevent="toAddRepairWindows">新增报修单</a>
            </li>
            <li class="checkRepair">
              <a href @click.prevent="toCheckRepairWindows">查看报修单</a>
            </li>
          </ul>
        </div>
        <div class="content">
          <h5>报修流程通知</h5>
          <p>{{ msg1 }}</p>
          <p>{{ msg2 }}</p>
          <p>{{ msg3 }}</p>
          <p>{{ msg4 }}</p>
          <p>{{ msg5 }}</p>
          <p>{{ msg6 }}</p>
          <p>{{ msg7 }}</p>
        </div>
      </div>
      <div class="addRepairWindows" v-show="addRepairWindows">
        <div class="nav">
          <ul>
            <li class="repairProcess">
              <a href @click.prevent="toProcessWindows">报修流程</a>
            </li>
            <li class="addRepair">
              <span>新增报修单</span>
            </li>
            <li class="checkRepair">
              <a href @click.prevent="toCheckRepairWindows">查看报修单</a>
            </li>
          </ul>
        </div>
        <div class="content">
          <h4>填写报修单</h4>
          <el-form ref="form" class="addTable" v-model="addContent" :rules="addRules">
            <el-form-item class="facility" prop="facility">
              <label>设施：</label>
              <el-input class="input" style="font-size:20px" v-model="addContent.facility"></el-input>
            </el-form-item>
            <el-form-item class="place" prop="place">
              <label>所在地：</label>
              <el-input class="input" style="font-size:20px" v-model="addContent.place"></el-input>
            </el-form-item>
            <el-form-item prop="reason">
              <label>原因：</label>
              <el-input
                type="textarea"
                resize="none"
                style="font-size:20px"
                v-model="addContent.reason"
                :rows="5"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="openAddMsgWindows">确定新增</el-button>
        </div>
      </div>
      <div class="checkRepairWindows" v-show="checkRepairWindows">
        <div class="nav">
          <ul>
            <li class="repairProcess">
              <a href @click.prevent="toProcessWindows">报修流程</a>
            </li>
            <li class="addRepair">
              <a href @click.prevent="toAddRepairWindows">新增报修单</a>
            </li>
            <li class="checkRepair">
              <span>查看报修单</span>
            </li>
          </ul>
        </div>
        <div class="content">
          <div class="form_table">
            <el-table
                    :data="formData"
                    height="440"
                    style="width: 100%;font-size:16px"
                    :default-sort = "{prop: 'createTime', order: 'ascending'}"
                    highlight-current-row>
              <el-table-column prop="id" label="单号" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="facility" label="设施" min-width="15%" align="center"></el-table-column>
              <el-table-column prop="place" label="所在地" min-width="15%" align="center"></el-table-column>
              <el-table-column prop="isReceived" label="状态" min-width="12%" align="center"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" min-width="18%" align="center" sortable></el-table-column>
              <el-table-column label="操作" min-width="15%" align="center">
                <span slot-scope="scope">
                  <a href>
                    <span class="operation" @click.prevent="openCheck(scope.row)">查看</span>
                  </a>
                </span>
              </el-table-column>
            </el-table>
            <div class="page_block" v-if="listNull">
              <el-pagination
                      @prev-click = "prevChange"
                      @next-click = "nextChange"
                      :current-page="paging.currentPage"
                      :page-size="paging.pageSize"
                      :total="paging.total"
                      layout="prev, pager, next, total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="addMsgWindows" v-show="addMsgWindows">
        <div class="addMsgBox">
          <h5>新增报修单</h5>
          <div class="addMsgContent">新增成功</div>
          <div class="buttonBox">
            <button type="button" @click="closeAddMsgWindows">确定</button>
          </div>
        </div>
      </div>
      <div class="checkWindows" v-show="checkWindows">
        <div class="checkBox">
          <h5>查看报修单</h5>
          <div class="checkContentBox">
            <div class="repairInfo">
              <h6>具体信息</h6>
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
              <h6>处理信息</h6>
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
  </div>
</template>

<script>
import {receiveJudge} from "../../utils/feedback";
import {timeChange, timeChangeT} from "../../utils/time";

export default {
  name: "repairUser",
  inject: ['reload'],
  data() {
    return {
      processWindows: true,
      addRepairWindows: false,
      checkRepairWindows: false,
      addMsgWindows: false,
      checkWindows: false,
      listNull: true,

      paging: {
        pageSize: 8,
        total: 100,
        currentPage: 1
      },

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
      addContent: {
        facility: "",
        place: "",
        reason: ""
      },
      formData: [],
      repairMsg: {},
      /*repairMsg: {
        id: "1",
        userId: "123",
        facility: "水管",
        userName: "邹雅岚",
        isReceived: "已处理",
        createTime: "2020-05-08",
        place: "住户房屋",
        reason: "水管老化",
        employeeId: "123456",
        employeeName: "刘杨十",
        handleTime: "2020-05-09",
        employeePhone: "13888888888",
        result: "完成维修"
      },*/
      addRules: {
        facility: [
          {required: true, message: '请输入报修设施', trigger: "blur"}
        ],
        place: [
          {required: true, message: '请输入报修地点', trigger: "blur"}
        ],
        reason: [
          {required: true, message: '请输入报修原因', trigger: "blur"}
        ]
      }
    };
  },
  methods: {
    /* 切换到报修流程板块 */
    toProcessWindows() {
      this.processWindows = true;
      this.addRepairWindows = false;
      this.checkRepairWindows = false;
    },
    /* 切换到新增报修单板块 */
    toAddRepairWindows() {
      this.processWindows = false;
      this.addRepairWindows = true;
      this.checkRepairWindows = false;
    },
    /* 切换到查看报修单板块 */
    toCheckRepairWindows() {
      this.getRepairList(1)
      this.paging.currentPage = 1;
      this.processWindows = false;
      this.addRepairWindows = false;
      this.checkRepairWindows = true;
    },
    /* 打开新增报修单确定窗口 */
    openAddMsgWindows() {
      this.$axios.post('/api/repair/addRepair',{
        userId: localStorage.getItem('userId'),
        facility: this.addContent.facility,
        place: this.addContent.place,
        reason: this.addContent.reason
      }).then((res) => {
        if(res.code === 200) {
          this.addMsgWindows = true;
        }else {
          this.$message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    /* 关闭新增报修单确定窗口 */
    closeAddMsgWindows() {
      this.addMsgWindows = false;
      this.addContent.facility = '';
      this.addContent.place = '';
      this.addContent.reason = '';
    },
    /* 打开查看报修单窗口 */
    openCheck(row) {
      let i = 0;
      for(i; i<this.formData.length; i++) {
        if(this.formData[i].id === row.id) {
          this.repairMsg = this.formData[i];
        }
      }
      this.checkWindows = true;
    },
    /* 关闭查看报修单窗口 */
    closeCheck() {
      this.checkWindows = false;
    },
    //获取报修单列表
    getRepairList(current) {
      this.$axios.get('/api/repair/getRepair',{
        params: {
          userId: localStorage.getItem("userId"),
          current: current,
          size: this.paging.pageSize
        }
      }).then((res) => {
        let data = res.data;
        if(res.code === 200) {
          this.formData = data.records;
          this.paging.total = data.total;
          this.paging.currentPage = data.currentPage;
          if(this.formData.length === 0) {
            this.listNull = false;
          }
          for(let i = 0; i<this.formData.length; i++) {
            this.formData[i].isReceived = receiveJudge(this.formData[i].isReceived);
            this.formData[i].createTime = timeChange(this.formData[i].createTime);
            if(this.formData[i].handleTime) {
              this.formData[i].handleTime = timeChangeT(this.formData[i].handleTime);
            }
            if(!this.formData[i].employeeId) {
              this.formData[i].employeeId = '暂无';
              this.formData[i].employeePhone = '暂无';
              this.formData[i].employeeName = '暂无';
              this.formData[i].handleTime = '暂无';
              this.formData[i].result = '暂无';
            }
          }
        }
        else {
          this.listNull = false;
          this.$message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //前一页
    prevChange(val) {
      //val是当前页
      this.getRepairList(val);
    },
    //后一页
    nextChange(val) {
      //val是当前页
      this.getRepairList(val);
    }
  },
  beforeMount() {
    this.getRepairList(this.paging.currentPage)
  }
}
</script>

<style scoped>
.processWindows,
.addRepairWindows,
.checkRepairWindows {
  margin-top: 30px;
  height: 560px;
  position: relative;
  left: 50px;
}
.processWindows .nav {
  background-image: url("../../assets/image/tab/three_left.png");
}
.addRepairWindows .nav {
  background-image: url("../../assets/image/tab/three_middle.png");
}
.checkRepairWindows .nav {
  background-image: url("../../assets/image/tab/three_right.png");
}
.nav {
  background-size: 373px;
  background-repeat: no-repeat;
  width: 373px;
  height: 36px;
  position: relative;
  left: 10px;
  z-index: 1;
}
.nav li {
  float: left;
  padding-left: 10px;
}
.nav span,
.nav a {
  display: block;
  width: 100px;
  height: 36px;
  font-size: 20px;
  text-align: center;
  line-height: 36px;
  color: black;
  position: absolute;
  z-index: 2;
}
.nav a:hover {
  color: #fff;
}
.nav .addRepair a,
.nav .addRepair span {
  left: 130px;
}
.nav .checkRepair a,
.nav .checkRepair span {
  left: 250px;
}
.content {
  height: 90%;
  margin-top: -1px;
  margin-left: 10px;
  padding: 30px 50px;
  min-width: 1000px;
  max-width: 1200px;
  border-radius: 0px 10px 10px 10px;
  border: #bcbcbc 1.3px solid;
}
.content h4 {
  font-size: 22px;
  font-weight: bold;
  margin-top: 15px;
  margin-left: 20px;
}
.content h4::after {
  content: "";
  width: 94%;
  height: 1px;
  background: #bcbcbc;
  position: absolute;
  top: 140px;
  left: 3%;
  z-index: 2;
}
.processWindows h5 {
  font-size: 22px;
  margin: 20px auto 30px auto;
  text-align: center;
}
.processWindows p{
  text-indent: 40px;
  font-size: 20px;
  margin: 10px 0;
  letter-spacing: 2px;
  line-height: 40px;
}
.addTable {
  margin-top: 60px;
}
.addTable label {
  font-size: 20px;
}
.input {
  height: 50px;
}
.facility .input {
  width: 250px;
}
.place .input {
  width: 400px;
}
.addRepairWindows .el-button--primary {
  float: right;
  width: 150px;
  background: #8a79af;
  border-color: #8a79af;
  border-radius: 10px;
  font-size: 18px;
}
.addMsgWindows,
.checkWindows {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.addMsgBox,
.checkBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.checkBox {
  height: 640px;
  margin-top: 3.5%;
}
.addMsgBox h5,
.checkBox h5 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
}
.addMsgBox h5::before,
.checkBox h5::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.checkBox h5::after {
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
.addMsgContent {
  margin: 80px 262px;
  font-size: 20px;
}
.checkContentBox {
  margin-top: 30px;
  margin-left: 30px;
  width: 90%;
}
.checkContentBox h6 {
  font-size: 20px;
  font-weight: bold;
}
.receivedInfo h6 {
  margin-top: 40px;
}
.checkBox ul {
  font-size: 20px;
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
  left: 100px;
  top: 265px;
}
.employeeId {
  left: 60px;
}
.employeeName {
  left: 330px;
}
.handleTime {
  top: 475px;
  left: 80px;
}
.employeePhone {
  top: 475px;
  left: 310px;
}
.result {
  top: 515px;
  left: 80px;
}
.reason p {
  position: absolute;
  top: 30px;
  left: -20px;
  width: 500px;
  height: 70px;
  text-indent: 40px;
}
.addMsgBox .buttonBox,
.checkBox .buttonBox {
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.checkBox .buttonBox {
  margin-top: 174px;
}
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
  border-radius: 10px;
  cursor: pointer;
}
.addMsgBox button {
  width: 120px;
  height: 39px;
  background: #8a79af;
  margin: 10px 245px;
  font-size: 20px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.form_table {
  margin-top: 20px;
}
.page_block {
  margin-top: 25px;
  /*text-align: center;*/
  float: right;
}
</style>
<style>
.facility .el-form-item__error {
  position: absolute;
  left: 60px;
}
.place .el-form-item__error {
  position: absolute;
  left: 80px;
}
.reason .el-form-item__error {
  position: absolute;
  left: 105px;
}
</style>
