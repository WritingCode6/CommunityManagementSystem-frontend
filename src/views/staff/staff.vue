<template>
  <div id="staff">
    <div class="staff_box">
      <h3>工作人员值班管理</h3>
      <div class="staff_table">
        <div class="search_form">
          <div class="search_box">
            <div class="search_box1">
              <el-input
                      v-model="searchData.type"
                      class="search_input"
                      placeholder="请输入值班类型"></el-input>
            </div>
            <div class="search_box2">
              <el-date-picker
                      v-model="searchData.date"
                      type="date"
                      placeholder="选择值班日期">
              </el-date-picker>
              <button class="search_btn">搜索</button>
              <div class="add_staff">
                <el-button type="primary" class="add_button1" @click="addDutyInfo">新增值班信息</el-button>
                <el-button type="primary" class="add_button2" @click="addStaffInfo">新增工作人员用户</el-button>
              </div>
            </div>
          </div>
        </div>
        <el-table
                :data="staffData"
                style="width: 100%"
                :default-sort = "{prop: 'employee_id', order: 'ascending'}"
                ref="singleTable"
                @select='getStaffInfo(row)'
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="employee_id" label="工号" min-width="10%" align="center" sortable></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="type" label="值班类型" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="place" label="值班区域" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="date" label="值班时间" min-width="20%" align="center"></el-table-column>
          <el-table-column label="操作" min-width="25%" align="center">
            <span slot-scope="scope">
              <a href>
                <span class="operation" @click.prevent="delDutyInfo">删除值班</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="delStaffInfo">删除用户</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="getStaffInfo(scope.$index, scope.row)">查看详情</span>
              </a>
            </span>
          </el-table-column>
        </el-table>
        <div class="page_block">
          <el-pagination
                  :current-page="pagingData.currentPage"
                  :page-size="pagingData.pageSize"
                  :total="pagingData.total"
                  layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="addWindows" v-show="addWindows1">
      <div class="add_duty">
        <h4>新增值班信息</h4>
        <div class="back">
          <a href @click.prevent="closeAddDuty">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="duty_content">
          <h5>个人值班信息</h5>
          <div class="duty_form">
            <div class="duty_form1">
              <label class="duty_word">值班类型：</label>
              <el-select v-model="addDutyData.type" placeholder="请选择" class="duty_input">
                <el-option
                        v-for="item in addDutyData.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="duty_form1">
              <label class="duty_word">值班时间：</label>
              <el-date-picker
                      v-model="addDutyData.date"
                      type="date"
                      class="duty_input"
                      placeholder="选择值班日期">
              </el-date-picker></div>
          </div>
          <div class="duty_form">
            <div class="duty_form1">
              <label class="duty_word">工作人员ID：</label>
              <el-input
                      v-model="addDutyData.employeeId"
                      class="duty_input"></el-input>
            </div>
            <div class="duty_form1">
              <label class="duty_word">值班区域：</label>
              <el-input
                      v-model="addDutyData.place"
                      class="duty_input"></el-input>
            </div>
          </div>
          <div class="saveButton">
            <button type="button" @click="addDutyPost">确定新增</button>
          </div>
        </div>
      </div>
    </div>
    <div class="addWindows" v-show="addWindows2">
      <div class="add_staff_info">
        <h4>新增工作人员信息</h4>
        <div class="back">
          <a href @click.prevent="closeAddStaff">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="staff_content">
          <h5>个人资料</h5>
          <div class="staff_form">
            <label class="staff_word">姓名：</label>
            <el-input
                    v-model="addStaffData.name"
                    class="staff_input"></el-input>
            <label class="staff_word">工号：</label>
            <el-input
                    v-model="addStaffData.service_id"
                    class="staff_input"></el-input>
          </div>
          <div class="staff_form">
            <label class="staff_word">性别：</label>
            <el-select v-model="addStaffData.sex" class="staff_select">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
            <label class="staff_word">身份证：</label>
            <el-input
                    v-model="addStaffData.idNumber"
                    class="staff_input"></el-input>
          </div>
          <div class="staff_form">
            <label class="staff_word">手机号：</label>
            <el-input
                    v-model="addStaffData.phone"
                    class="staff_input"></el-input>
            <label class="staff_word">职位：</label>
            <el-select v-model="addStaffData.userType" class="staff_select">
              <el-option label="巡查" value="巡查"></el-option>
              <el-option label="安保" value="安保"></el-option>
              <el-option label="清洁" value="清洁"></el-option>
            </el-select>
          </div>
          <div class="staff_form">
            <label class="staff_word">居住地址：</label>
            <el-input
                    class="staff_text"
                    v-model="addStaffData.address"></el-input>
          </div>
          <div class="line1"></div>
          <h5>账户信息</h5>
          <div class="staff_form">
            <label class="staff_word">用户名：</label>
            <el-input
                    v-model="addStaffData.userName"
                    class="staff_input"></el-input>
            <label class="staff_word">密码：</label>
            <el-input
                    v-model="addStaffData.password"
                    show-password
                    class="staff_input"></el-input>
          </div>
          <div class="saveButton_staff">
            <button type="button" @click="addStaffPost">确定新增</button>
          </div>
        </div>
      </div>
    </div>
    <div class="delWindows" v-show="delWindows1">
      <div class="deleteBox">
        <h4>删除值班信息</h4>
        <div class="back" @click="closeDelDuty">
            <img src="../../assets/image/icon/icon_back.png" alt />
        </div>
        <div class="deleteContent">确定要删除该人员的值班信息吗？</div>
        <ul>
          <li class="yes">
            <button type="button" @click="delDutyPost">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelDuty">否</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="delWindows" v-show="delWindows2">
      <div class="deleteBox">
        <h4>删除工作人员账户信息</h4>
        <div class="back" @click="closeDelStaff">
          <img src="../../assets/image/icon/icon_back.png" alt />
        </div>
        <div class="deleteContent">确定要删除该人员的账号信息吗？</div>
        <ul>
          <li class="yes">
            <button type="button" @click="delStaffPost">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelStaff">否</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="checkWindows" v-show="checkWindows">
      <div class="check_staff">
        <h4>查看工作人员信息</h4>
        <div class="back">
          <a href @click.prevent="closeStaffInfo">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="check_content">
          <h5>个人资料</h5>
          <div class="check_form">
            <div class="check_form1">
              <span class="check_word">姓名：</span>
              <span class="check_info">{{ staffDetail.name }}</span>
            </div>
            <div class="check_form1">
              <span class="check_word">工号：</span>
              <span class="check_info">{{ staffDetail.serviceId }}</span>
            </div>
            <div class="check_form1">
              <span class="check_word">性别：</span>
              <span class="check_info">{{ staffDetail.sex }}</span>
            </div>
            <div class="check_form2">
              <span class="check_word">手机号：</span>
              <span class="check_info">{{ staffDetail.phone }}</span>
            </div>
          </div>
          <div class="backButton">
            <button type="button" @click="closeStaffInfo">返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {sexChange} from "../../utils/sexUtil";

  export default {
    name: "staff",
    data() {
      return {
        //分页器数据
        pagingData: {
          pageSize: 6,
          total: 100,
          currentPage: 1,
        },
        //搜索框的数据
        searchData: {
          date: '',
          type: '',
        },
        //表格数据
        staffData: [
          {
            employee_id: 1,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          },
          {
            employee_id: 2,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          },
          {
            employee_id: 3,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          },
          {
            employee_id: 4,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          },
          {
            employee_id: 5,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          },
          {
            employee_id: 6,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          },
          {
            employee_id: 7,
            name: '梨花',
            type: '安保',
            place: '走廊',
            date: '2020-20-20'
          }
        ],
        //新增值班框数据
        addDutyData: {
          options: [
            {
              value: '巡查',
              label: '巡查'
            },
            {
              value: '安保',
              label: '安保'
            },
            {
              value: '清洁',
              label: '清洁'
            }
          ],
          type: '',
          date: '',
          employeeId: '',
          place: ''
        },
        //新增工作人员数据
        addStaffData: {
          name: '',
          service_id: '',
          sex: '',
          idNumber: '',
          address: '',
          phone: '',
          userType: '',
          userName: '',
          password: ''
        },
        //工作人员详细信息
        staffDetail: {
          name: '菊花',
          serviceId: '001',
          sex: 1,
          phone: '19909090909'
        },
        addDuty: false,
        addWindows1: false,
        addWindows2: false,
        delWindows1: false,
        delWindows2: false,
        checkWindows: false
      }
    },
    methods: {
      //打开新增值班信息窗口
      addDutyInfo() {
        this.addWindows1 = true;
      },
      //关闭新增值班信息窗口
      closeAddDuty() {
        this.addWindows1 = false
      },
      //新增值班信息
      addDutyPost() {
        this.addWindows1 = false;
      },
      //打开新增工作人员信息窗口
      addStaffInfo() {
        this.addWindows2 = true;
      },
      //关闭新增工作人员信息窗口
      closeAddStaff() {
        this.addWindows2 = false
      },
      //新增工作人员信息
      addStaffPost() {
        this.addWindows2 = false;
      },
      //打开删除值班信息窗口
      delDutyInfo() {
        this.delWindows1 = true;
        console.log(this.delWindows1)
      },
      //关闭删除值班信息窗口
      closeDelDuty() {
        this.delWindows1 = false;
      },
      //删除值班信息
      delDutyPost() {
        this.delWindows1 = false;
      },
      //打开删除工作人员信息窗口
      delStaffInfo() {
        this.delWindows2 = true;
      },
      //关闭删除工作人员信息窗口
      closeDelStaff() {
        this.delWindows2 = false;
      },
      //删除工作人员账号信息
      delStaffPost() {
        this.delWindow2 = false;
      },
      //打开查看工作人员详情信息窗口
      getStaffInfo(index, row) {
        console.log(index, row);
        this.checkWindows = true;
        this.staffDetail.sex = sexChange(this.staffDetail.sex);

      },
      //关闭查看工作人员详情信息窗口
      closeStaffInfo() {
        this.checkWindows = false;
      }
    }
  }
</script>

<style scoped>
.staff_box {
  margin-top: 20px;
  width: 100%;
  height: 650px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  position: relative;
  left: 55px;
  font-size: 16px;
}
h3 {
  font-size: 24px;
  color: #666;
  margin-left: 68px;
  margin-top: 20px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 40px;
  z-index: 1;
}
.search_form {
  display: flex;
  flex-direction: column;
/*  margin: 40px 0 0 40px;*/
}
.search_box1 {
  margin: 15px 0;
}
.search_box2 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}
.search_input {
  width: 500px;
  /*border: 1px rgba(0, 0, 0, 0.5) solid;*/
  border-radius: 5px;
}
.search_btn {
  width: 120px;
  height: 38px;
  background: #8a79af;
  color: white;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
}
.add_staff {
  display: flex;
}
.add_button1,
.add_button2 {
  background-color: #d38cae;
  width: 200px;
  height: 50px;
  font-size: 20px;
  line-height: 20px;
  border-color: #d38cae;
  border-radius: 10px;
  margin-top: -10px;
}
.add_button1 {
  margin-right: 100px;
  background-color: #FDC38A;
  border-color: #FDC38A;
}
.staff_table {
  margin: 20px 0 0 40px;
  width: 93%;
}
.operation {
  display: inline-block;
  margin-right: 15px;
}
.page_block {
  float: right;
  margin-top: 20px;
}
/*弹出框样式*/
.addWindows,
.delWindows,
.checkWindows {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
}
.add_duty {
  width: 632px;
  height: 320px;
  background: #fff;
  margin: 200px auto;
  position: relative;
  font-size: 20px;
  color: #666;
}
.add_staff_info {
  width: 632px;
  height: 520px;
  background: #fff;
  margin: 100px auto;
  position: relative;
  font-size: 20px;
  color: #666;
}
.deleteBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.check_staff {
  width: 632px;
  height: 320px;
  background: #fff;
  margin: 200px auto;
  position: relative;
  font-size: 20px;
  color: #666;
}
.add_duty h4,
.add_staff_info h4,
.check_staff h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
  color: #000;
}
.add_duty h4::before,
.add_staff_info h4::before,
.check_staff h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.add_duty h4::after,
.add_staff_info h4::after,
.check_staff h4::after{
  content: "";
  width: 94%;
  height: 1px;
  background: #666;
  position: absolute;
  top: 60px;
  left: 18px;
  z-index: 2;
}
.add_duty .back,
.add_staff_info .back,
.check_staff .back {
  position: absolute;
  left: 580px;
  top: 20px;
}
.duty_content,
.staff_content,
.check_content {
  display: flex;
  flex-direction: column;
}
.deleteBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.deleteBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
}
.deleteBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.deleteBox .back {
  position: absolute;
  left: 580px;
  top: 24px;
}
.deleteContent {
  width: 300px;
  height: 26px;
  margin: 80px 170px;
  font-size: 20px;
}
h5 {
  font-size: 20px;
  font-weight: bold;
  margin-left: 18px;
  margin-top: 30px;
  color: #000;
}
.duty_form,
.staff_form,
.check_form {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.staff_form {
  position: relative;
  right: 38px;
}
.check_form {
  flex-wrap: wrap;
}
.check_form1,
.check_form2 {
  width: 220px;
  margin: 15px 0 25px 0;
}
.check_form2 {
  position: relative;
  right: 20px;
}
.duty_word,
.staff_word {
  font-size: 18px;
  color: rgba(0,0,0,0.5);
  display: inline-block;
  width: 110px;
  text-align: right;
}
.staff_word {
  width: 150px;
  line-height: 35px;
  color: rgba(0,0,0,0.7);
}
.duty_input {
  width: 150px;
}
.staff_input,
.staff_select {
  width: 180px;
}
.staff_text {
  width: 505px;
}
.check_info {
  color: #000;
}
.line1 {
  width: 94%;
  height: 1px;
  background: #666;
  margin-top: 30px;
  margin-left: 18px;
}
.saveButton,
.backButton,
.saveButton_staff {
  margin-top: 45px;
  width: 100%;
  height: 60px;
  background: #bcbcbc;
}
.saveButton_staff {
  margin-top: 30px;
}
.backButton {
  margin-top: 25px;
}
.add_duty button,
.add_staff_info button,
.check_staff button {
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
  border-width: 0;
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
  border-width: 0;
  border-radius: 10px;
  cursor: pointer;
}
</style>
