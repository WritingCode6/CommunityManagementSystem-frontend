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
                      clearable
                      placeholder="请输入值班类型"></el-input>
            </div>
            <div class="search_box2">
              <el-date-picker
                      v-model="searchData.date"
                      type="date"
                      placeholder="选择值班日期">
              </el-date-picker>
              <button class="search_btn" @click="searchDuty">搜索</button>
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
                :default-sort = "{prop: 'employeeId', order: 'ascending'}"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="employeeId" label="工号" min-width="10%" align="center" sortable></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="type" label="值班类型" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="place" label="值班区域" min-width="15%" align="center"></el-table-column>
          <el-table-column prop="date" label="值班时间" min-width="20%" align="center"></el-table-column>
          <el-table-column label="操作" min-width="25%" align="center">
            <span slot-scope="scope">
              <a href>
                <span class="operation" @click.prevent="delDutyInfo(scope.row)">删除值班</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="delStaffInfo(scope.row)">删除用户</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="openStaffInfo(scope.row)">查看详情</span>
              </a>
            </span>
          </el-table-column>
        </el-table>
        <div class="page_block" v-if="listNull">
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
          <el-form :model="addDutyData" ref="addDutyData" :rules="dutyRules">
            <div class="duty_form">
              <div class="duty_form1">
                <el-form-item prop="type">
                  <label class="duty_word">值班类型：</label>
                  <el-select v-model="addDutyData.type" placeholder="请选择" class="duty_input">
                    <el-option
                            v-for="item in addDutyData.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="duty_form1">
                <el-form-item prop="date">
                  <label class="duty_word">值班时间：</label>
                  <el-date-picker
                          v-model="addDutyData.date"
                          type="date"
                          class="duty_input"
                          placeholder="选择值班日期">
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
            <div class="duty_form">
              <div class="duty_form1">
                <el-form-item prop="employeeId">
                  <label class="duty_word">工作人员ID：</label>
                  <el-input
                          v-model="addDutyData.employeeId"
                          class="duty_input"></el-input>
                </el-form-item>
              </div>
              <div class="duty_form1">
                <el-form-item prop="place">
                  <label class="duty_word">值班区域：</label>
                  <el-input
                          v-model="addDutyData.place"
                          class="duty_input"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
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
          <el-form :model="addStaffData" ref="addStaffData" :rules="staffRules">
            <div class="staff_form">
              <el-form-item prop="name" class="name">
                <label class="staff_word">姓名：</label>
                <el-input
                        v-model="addStaffData.name"
                        class="staff_input"></el-input>
              </el-form-item>
              <el-form-item prop="service_id" class="service_id">
                <label class="staff_word">工号：</label>
                <el-input
                        v-model="addStaffData.service_id"
                        class="staff_input"></el-input>
              </el-form-item>
            </div>
            <div class="staff_form">
              <el-form-item prop="sex" class="sex">
                <label class="staff_word">性别：</label>
                <el-select v-model="addStaffData.sex" class="staff_select">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="idNumber" class="idNumber">
                <label class="staff_word">身份证：</label>
                <el-input
                        v-model="addStaffData.idNumber"
                        class="staff_input"></el-input>
              </el-form-item>
            </div>
            <div class="staff_form">
              <el-form-item prop="phone" class="phone">
                <label class="staff_word">手机号：</label>
                <el-input
                        v-model="addStaffData.phone"
                        class="staff_input"></el-input>
              </el-form-item>
              <el-form-item prop="userType" class="userType">
                <label class="staff_word">职位：</label>
                <el-select v-model="addStaffData.userType" class="staff_select">
                  <el-option label="巡查" value="5"></el-option>
                  <el-option label="安保" value="6"></el-option>
                  <el-option label="清洁" value="3"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="staff_form">
              <el-form-item prop="address" class="address">
                <label class="staff_word">居住地址：</label>
                <el-input
                        class="staff_text"
                        v-model="addStaffData.address"></el-input>
              </el-form-item>
            </div>
            <div class="line1"></div>
            <h5>账户信息</h5>
            <div class="staff_form">
              <el-form-item prop="userName" class="userName">
                <label class="staff_word">用户名：</label>
                <el-input
                        v-model="addStaffData.userName"
                        class="staff_input"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="password">
                <label class="staff_word">密码：</label>
                <el-input
                      v-model="addStaffData.password"
                      show-password
                      class="staff_input"></el-input>
              </el-form-item>
            </div>
            <div class="saveButton_staff">
              <button type="button" @click="addStaffPost">确定新增</button>
            </div>
          </el-form>
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
  import {typeJudge, typeJudgeNum} from "../../utils/duty";

  export default {
    name: "staff",
    inject: ['reload'],
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
        /*staffData: [
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
        ],*/
        staffData: [],
        //新增值班框数据
        addDutyData: {
          options: [
            {
              value: '0',
              label: '巡查'
            },
            {
              value: '2',
              label: '安保'
            },
            {
              value: '1',
              label: '清洁'
            }
          ],
          type: '',
          date: '2020-05-06',
          employeeId: '1',
          place: '未知'
        },
        //新增工作人员数据
        addStaffData: {
          name: '11',
          service_id: '123456',
          sex: '',
          idNumber: '123456789012345678',
          address: '未知',
          phone: '12345678901',
          userType: '',
          userName: '1111',
          password: '123456a'
        },
        //工作人员详细信息
        /*staffDetail: {
          name: '菊花',
          serviceId: '001',
          sex: 1,
          phone: '19909090909'
        },*/
        staffDetail: {
          name: '',
          serviceId: '',
          sex: '',
          phone: ''
        },
        dutyRules:{
          type:[
            { required: true, message: '值班类型不能为空', trigger: 'change'}
          ],
          date:[
            { required: true, message: '值班时间不能为空', trigger: 'change'}
          ],
          employeeId:[
            { required: true, message: '工作人员ID不能为空', trigger: 'blur'}
          ],
          place:[
            { required: true, message: '值班区域不能为空', trigger: 'blur'}
          ]
        },
        staffRules:{
          name:[
            { required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          service_id:[
            { required: true, message: '工号不能为空', trigger: 'blur'},
            { len: 6, message: '工号为 6 位', trigger: 'blur' }
          ],
          sex:[
            { required: true, message: '性别不能为空', trigger: 'change'}
          ],
          idNumber:[
            { required: true, message: '身份证不能为空', trigger: 'blur'},
            { len: 18, message: '身份证号为 18 位', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '手机号不能为空', trigger: 'blur'},
            { len: 11, message: '手机号为 11 位', trigger: 'blur' }
          ],
          userType:[
            { required: true, message: '职位不能为空', trigger: 'change'}
          ],
          address:[
            { required: true, message: '居住地址不能为空', trigger: 'blur'}
          ],
          userName:[
            { required: true, message: '用户名不能为空', trigger: 'blur'},
            { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '密码不能为空', trigger: 'blur'},
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ]
        },
        addDuty: false,
        addWindows1: false,
        addWindows2: true,
        delWindows1: false,
        delWindows2: false,
        checkWindows: false,
        listNull: false,
        delDutyId: '',
        delStaffId: '',
        getStaffId: ''
      }
    },
    methods: {
      //查看值班信息
      getDutyList() {
        this.getList(this.searchData.date, this.searchData.type, this.pagingData.currentPage, this.pagingData.pageSize);
      },
      //搜索值班信息
      searchDuty() {
        this.getList(this.searchData.date, typeJudgeNum(this.searchData.type), this.pagingData.currentPage, this.pagingData.pageSize);
      },
      //值班信息接口
      getList(d, t, c, p) {
        this.$axios.get('/api/property/getDutyInfo',{
          params: {
            date: d,
            type: t,
            current: c,
            pageSize: p
          }
        }).then((res) => {
          console.log(res)
          let data = res.data;
          if(data.records.length === 0) {
            this.staffData = data.records;
            this.listNull = false;
          }
          else {
            this.listNull = true;
            this.staffData = data.records;
            this.change(this.staffData);
            this.pagingData.pageSize = data.pageSize;
            this.pagingData.total = data.total;
            this.pagingData.currentPage = data.currentPage;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //处理值班类型和时间的转换
      change(arr) {
        let i = 0;
        for(i; i<arr.length; i++) {
          arr[i].type = typeJudge(arr[i].type);
          /*arr[i].date = timeChange(arr[i].date);*/
        }
      },
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
        console.log(this.addDutyData);
        this.$axios.post('/api/property/addDutyForm',{
          date: this.addDutyData.date,
          employeeId: this.addDutyData.employeeId,
          type: this.addDutyData.type,
          place: this.addDutyData.place
        }).then((res) => {
          console.log(res);
          if(res.code === 200) {
            this.$message.success('新增成功');
            this.addWindows1 = false;
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
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
        this.$axios.post('/api/user/addStaff',{
          userName: this.addStaffData.userName,
          password: this.addStaffData.password,
          name: this.addStaffData.name,
          idNumber: this.addStaffData.idNumber,
          serviceId: this.addStaffData.service_id,
          sex: this.addStaffData.sex,
          address: this.addStaffData.address,
          userType: this.addStaffData.userType,
          phone: this.addStaffData.phone
        }).then((res) => {
          if(res.code === 200) {
            this.$message.success('新增成功');
            this.addWindows2 = false;
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //打开删除值班信息窗口
      delDutyInfo(row) {
        this.delWindows1 = true;
        console.log(row.id)
        this.delDutyId = row.id.toString();
      },
      //关闭删除值班信息窗口
      closeDelDuty() {
        this.delWindows1 = false;
      },
      //删除值班信息
      delDutyPost() {
        let arr = [];
        arr.push(this.delDutyId);
        //json数据
        this.$axios.post('/api/property/deleteDuty',arr).then((res) => {
          if(res.code === 200) {
            this.$message.success('删除值班信息成功');
            this.delWindows1 = false;
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //打开删除工作人员信息窗口
      delStaffInfo(row) {
        this.delWindows2 = true;
        this.delStaffId = row.employeeId;
      },
      //关闭删除工作人员信息窗口
      closeDelStaff() {
        this.delWindows2 = false;
      },
      //删除工作人员账号信息
      delStaffPost() {
        this.$axios.get('/api/user/deleteUser',{
          params: {
            userId: this.delStaffId
          }
        }).then((res) => {
          if(res.code === 200) {
            this.delWindow2 = false;
            this.$message.success("删除成功");
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //打开查看工作人员详情信息窗口
      openStaffInfo(row) {
        this.$axios.get('/api/user/getStaffInfo',{
          params: {
            userId: row.employeeId
          }
        }).then((res) => {
          if(res.code === 200) {
            this.checkWindows = true;
            this.staffDetail.name = res.data[0].name;
            this.staffDetail.serviceId = res.data[0].serviceId;
            this.staffDetail.sex = sexChange(res.data[0].sex);
            this.staffDetail.phone = res.data[0].phone;
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //关闭查看工作人员详情信息窗口
      closeStaffInfo() {
        this.checkWindows = false;
      }
    },
    beforeMount() {
      //获取值班列表
      this.getDutyList();
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
  height: 560px;
  background: #fff;
  margin: 80px auto;
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
  position: relative;
  margin-left: -50px;
  margin-top: -50px;
  left: -40px;
  width: 150px;
  line-height: 35px;
  color: rgba(0,0,0,0.7);
  z-index: 3;
}
.duty_input {
  width: 150px;
}
.staff_input,
.staff_select {
  position: absolute;
  top: 0px;
  left: 60px;
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
  margin-top: 190px;
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
  margin-top: 61px;
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
.el-form-item {
  position: absolute;
}
.name {
  left: 80px;
}
.service_id {
  left: 350px;
}
.sex {
  top: 40px;
  left: 80px;
}
.idNumber {
  top: 40px;
  left: 350px;
}
.phone {
  top: 80px;
  left: 80px;
}
.userType {
  top: 80px;
  left: 350px;
}
.address {
  top: 120px;
  left: 80px;
}
.address .staff_text {
  top: -40px;
  left: 60px;
}
.userName {
  top: -10px;
  left: 80px;
}
.password {
  top: -10px;
  left: 350px;
}
</style>
<style>
.duty_content .el-form-item__error {
  position: absolute;
  left: 110px;
}
.staff_content .el-form-item__error {
  width: 200px;
  position: absolute;
  left: 70px;
}
.address .el-form-item__error {
  top: 40px;
}
</style>