<template>
  <div id="feedback">
    <div class="feedbackBox">
      <h3>投诉反馈</h3>
      <div class="addOptionBox">
        <button type="button" @click="openAdd">新增投诉反馈</button>
      </div>
      <div class="feedback_table">
        <el-table
                :data="feedbackData"
                style="width: 95%;font-size:16px"
                highlight-current-row>
          <el-table-column prop="id" label="ID" min-width="10%" align="center"></el-table-column>
          <el-table-column prop="type" label="反馈类型" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="userId" label="反馈用户ID" min-width="10%" align="center"></el-table-column>
          <el-table-column prop="isReceived" label="反馈状态" min-width="12%" align="center"></el-table-column>
          <el-table-column prop="creatTime" label="反馈时间" min-width="15%" align="center"></el-table-column>
          <el-table-column label="操作" min-width="35%" align="center">
            <a href>
              <span class="check" @click.prevent="openCheck">查看</span>
            </a>
            <a href>
              <span class="modify" @click.prevent="openModify">修改</span>
            </a>
            <a href>
              <span class="delete" @click.prevent="openDelete">删除</span>
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
    <div class="addWindows" v-show="addWindows">
      <div class="addBox">
        <h4>新增投诉反馈</h4>
        <div class="back">
          <a href @click.prevent="closeAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="addContentBox">
          <el-form 
                ref="form" 
                :model="addContent" 
                :rules="formRules"
                :show-message="false">
            <el-form-item class="type" prop="type">
              <label>反馈类型：</label>
              <el-select placeholder="请选择反馈类型" v-model="addContent.type">
                <el-option label="建议" value="advice"></el-option>
                <el-option label="投诉" value="complaint"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item class="addContent" prop="details">
              <label>反馈内容：</label>
              <br>
              <el-input
                  type="textarea" 
                  placeholder="请输入反馈内容"
                  style="font-size:18px;width:92%"
                  resize="none" 
                  :rows="8"
                  v-model="addContent.details">
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
        <h4>修改投诉反馈</h4>
        <div class="back">
          <a href @click.prevent="closeModify">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="modifyContentBox">
          <el-form 
                ref="form" 
                :model="modifyContent" 
                :rules="formRules"
                :show-message="false">
            <el-form-item class="type" prop="type">
              <label>处理状态：</label>
              <el-select placeholder="请选择处理状态" v-model="modifyContent.isReceived">
                <el-option label="未处理" value="unreceived"></el-option>
                <el-option label="已处理" value="received"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item class="addContent" prop="details">
              <label>处理结果：</label>
              <br>
              <el-input
                  type="textarea" 
                  placeholder="请输入处理结果"
                  style="font-size:18px;width:92%"
                  resize="none" 
                  :rows="8"
                  v-model="modifyContent.details">
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
        <h4>查看投诉反馈</h4>
        <div class="feedbackInfo">
          <h5>具体信息</h5>
          <ul>
            <li class="id">
              ID：
              <span>{{ feedbackMsg.id }}</span>
            </li>
            <li class="userId">
              反馈用户ID：
              <span>{{ feedbackMsg.userId }}</span>
            </li>
            <li class="type">
              反馈类型：
              <span>{{ feedbackMsg.type }}</span>
            </li>
            <li class="userName">
              反馈用户真实姓名：
              <span>{{ feedbackMsg.userName }}</span>
            </li>
            <li class="received">
              处理状态：
              <span>{{ feedbackMsg.received }}</span>
            </li>
            <li class="creatTime">
              反馈时间：
              <span>{{ feedbackMsg.creatTime }}</span>
            </li>
            <li class="details">
              反馈内容：
              <p>{{ feedbackMsg.details }}</p>
            </li>
          </ul>
        </div>
        <div class="line"></div>
        <div class="receivedInfo">
          <h5>处理信息</h5>
          <ul>
            <li class="employeeId">
              处理工作人员ID：
              <span>{{ feedbackMsg.employeeId }}</span>
            </li>
            <li class="employeeName">
              处理工作人员真实姓名：
              <span>{{ feedbackMsg.employeeName }}</span>
            </li>
            <li class="result">
              处理结果：
              <span>{{ feedbackMsg.result }}</span>
            </li>
          </ul>
        </div>
        <div class="buttonBox">
          <button type="button" @click="closeCheck">返回</button>
        </div>
      </div>
    </div>
    <div class="deleteWindows" v-show="deleteWindows">
      <div class="deleteBox">
        <h4>删除投诉反馈</h4>
        <div class="back">
          <a href @click.prevent="closeDelete">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="deleteContent">确定要删除吗？</div>
        <ul>
          <li class="yes">
            <button type="button">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelete">否</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "feedback",
    data() {
      return {
        feedbackData:[
          {
            id:1,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:2,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:3,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:4,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:5,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:6,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:7,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          },
          {
            id:8,
            type:'建议',
            userId:1,
            isReceived:'未处理',
            creatTime:'2020-05-08',
          }
        ],
        feedbackMsg:{
          id:1,
          userId:1,
          type:'投诉',
          userName:'刘星',
          received:'未处理',
          creatTime:'2020-05-08',
          details:'住户刘胡苏高空抛物',
          employeeId:'123456',
          employeeName:'夏东海',
          result:'已联系相应住户进行沟通'
        },

        addContent:{
          type:"",
          details:""
        },
        modifyContent:{
          isReceived:"",
          result:""
        },

        formRules:{
          type:[
            { required: true, trigger: "change" }
          ],
          details:[
            { required: true, trigger: "blur" }
          ]
        },

        pageSize: 10,
        total: 100,
        currentPage: 1,

        addWindows:false,
        modifyWindows:false,
        checkWindows:false,
        deleteWindows:false,
      }
    },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      /* 打开新增投诉反馈窗口 */
      openAdd() {
        this.addWindows = true;
      },
      /* 关闭新增投诉反馈窗口 */
      closeAdd() {
        this.addWindows = false;
      },
      /* 确认新增投诉反馈 */
      saveAdd() {
        this.addWindows = false;
      },
      /* 打开修改社区通知窗口 */
      openModify() {
        this.modifyWindows = true;
      },
      /* 关闭修改社区通知窗口 */
      closeModify() {
        this.modifyWindows = false;
      },
      /* 保存修改社区通知 */
      saveModify() {
        this.modifyWindows = false;
      },
      /* 打开查看社区通知窗口 */
      openCheck() {
        this.checkWindows = true;
      },
      /* 关闭修改社区通知窗口 */
      closeCheck() {
        this.checkWindows = false;
      },
      /* 打开删除投诉反馈窗口 */
      openDelete() {
        this.deleteWindows = true;
      },
      /* 关闭删除投诉反馈窗口 */
      closeDelete() {
        this.deleteWindows = false;
      },
    }
  }
</script>

<style scoped>
#feedback {
  display: flex;
}
.feedbackBox {
  margin-top: 20px;
  width: 100%;
  height: 630px;
  position: relative;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  left: 55px;
  font-size: 16px;
}
.feedbackBox h3 {
  font-size: 24px;
  color: #666;
  margin-left: 68px;
  margin-top: 20px;
}
.feedbackBox h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 40px;
  z-index: 1;
}
.addOptionBox button{
  width: 300px;
  height: 40px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 68%;
}
.feedback_table {
  margin-top: 35px;
  margin-left: 4%;
}
.feedback_table .check {
  float: left;
  margin-left: 20%;
}
.feedback_table .delete {
  float:right;
  margin-right: 20%;
}
.page_block {
  margin-top: 15px;
  margin-right: 3%;
  float: right;
}
.addWindows,
.modifyWindows,
.checkWindows,
.deleteWindows {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.addBox,
.modifyBox,
.checkBox {
  width: 634px;
  height: 518px;
  background: #fff;
  position: relative;
  margin: 8% auto;
  overflow: hidden;
}
.checkBox {
  margin-top: 6%;
  height: 595px;
}
.deleteBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.addBox h4,
.modifyBox h4,
.checkBox h4,
.deleteBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 70px;
  display: inline-block;
}
.deleteBox h4 {
  margin-left: 50px;
}
.addBox h4::before,
.modifyBox h4::before,
.checkBox h4::before,
.deleteBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 40px;
  z-index: 1;
}
.deleteBox h4::before {
  left: 22px;
}
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
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: -15px;
}
.addBox .back,
.modifyBox .back {
  position: absolute;
  left: 560px;
  top: 24px;
  z-index: 99;
}
.deleteBox .back {
  position: absolute;
  left: 580px;
  top: 24px;
}
.addContentBox,
.modifyContentBox {
  margin-top: 35px;
  margin-left: 40px;
}
.addContentBox label,
.modifyContentBox label {
  font-size: 18px;
  color: #666;
}
.feedbackInfo,
.receivedInfo {
  margin-top: 35px;
  margin-left: 40px;
  font-size: 20px;
}
.checkBox h5 {
  font-weight: bold;
}
.checkBox ul {
  margin-top: 20px;
  margin-left: 30px;
  color: #666;
}
.checkBox p,
.checkBox span {
  color: #000;
}
.id {
  margin-left: 60px;
}
.userId {
  margin-left: 280px;
  margin-top: -20px;
}
.type {
  margin-top: 15px;
}
.userName {
  margin-top: -20px;
  margin-left: 224px;
}
.creatTime {
  margin-top: -20px;
  margin-left: 300px;
}
.received {
  margin-top: 15px;
}
.details {
  margin-top: 15px;
}
.details p {
  margin-top: 10px;
  width: 500px;
  height: 50px;
  text-indent: 40px;
}
.employeeName {
  margin-top: 15px;
}
.result {
  margin-top: 15px;
}
.deleteContent {
  margin: 80px 242px;
  font-size: 20px;
}
.buttonBox {
  margin-top: 40px;
  width: 100%;
  height: 66px;
  background: #bcbcbc;
}
.checkBox .buttonBox {
  margin-top: 60.8px;
}
.addBox button,
.modifyBox button,
.checkBox button {
  float: left;
  width: 120px;
  height: 39px;
  background: #8a79af;
  margin-left: 260px;
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.deleteBox ul {
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.deleteBox .yes button {
  float: left;
  width: 120px;
  height: 39px;
  background: #8a79af;
  margin-left: 128px;
  margin-top: 9px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.deleteBox .no button {
  float: right;
  width: 120px;
  height: 39px;
  background: #fff;
  margin-right: 166px;
  margin-top: 9px;
  font-size: 18px;
  color: #000;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
