<template>
  <div id="userBox">
    <div class="user_box">
      <h3>住户列表</h3>
      <div class="search_form">
        <div class="search_box1">
          <el-input
                  v-model="userSearch.name"
                  class="search_input"
                  clearable
                  placeholder="请输入住户姓名"></el-input>
          <el-button type="primary" @click="conditionSearch">搜索</el-button>
        </div>
        <div class="search_box2">
          <div class="select_box1">
            <label>栋数：</label>
            <el-select v-model="userSearch.buildingNumber" class="select">
              <el-option value="1"></el-option>
              <el-option value="2"></el-option>
              <el-option value="3"></el-option>
              <el-option value="4"></el-option>
              <el-option value="5"></el-option>
              <el-option value="6"></el-option>
              <el-option value="7"></el-option>
              <el-option value="8"></el-option>
              <el-option value="9"></el-option>
              <el-option value="10"></el-option>
            </el-select>
          </div>
          <div class="select_box2">
            <label>房间号：</label>
            <el-select v-model="userSearch.roomNumber" class="select">
              <el-option value="100"></el-option>
              <el-option value="101"></el-option>
              <el-option value="102"></el-option>
              <el-option value="103"></el-option>
              <el-option value="104"></el-option>
              <el-option value="105"></el-option>
              <el-option value="106"></el-option>
              <el-option value="107"></el-option>
              <el-option value="108"></el-option>
              <el-option value="109"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="user_table">
        <div class="add_user">
          <el-button type="primary" class="add_button" @click="openAdd">新增住户用户</el-button>
        </div>
        <el-table
                :data="userData"
                style="width: 100%"
                :default-sort = "{prop: 'buildingNumber', order: 'ascending'}"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="name" label="姓名" min-width="12%" align="center"></el-table-column>
          <el-table-column prop="buildingNumber" label="栋数" min-width="10%" align="center" sortable></el-table-column>
          <el-table-column prop="roomNumber" label="房间号" min-width="10%" align="center"></el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" min-width="15%" align="center"></el-table-column>
          <el-table-column label="操作" min-width="25%" align="center">
            <span slot-scope="scope">
            <!-- 修改未做 -->
            <!--<a href>
              <span class="operation" @click.prevent="openModify">修改</span>
            </a>-->
              <a href>
                <span class="operation" @click.prevent="openDelete(scope.row)">删除</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="getDetail(scope.row)">查看详情</span>
              </a>
            </span>
          </el-table-column>
        </el-table>
        <div class="page_block" v-show="listNull">
          <el-pagination
                  :current-page="pageBlock.currentPage"
                  :page-size="pageBlock.pageSize"
                  :total="pageBlock.total"
                  layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="deleteWindows" v-show="deleteWindows">
      <div class="deleteBox">
        <h4>删除住户信息</h4>
        <div class="back">
          <a href @click.prevent="closeDelete">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="deleteContent">确定要删除吗？</div>
        <ul>
          <li class="yes">
            <button type="button" @click="deleteUser">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelete">否</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="addWindows" v-show="addWindows">
      <div class="addBox">
        <h4>新增住户信息</h4>
        <div class="back">
          <a href @click.prevent="closeAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="addContent">
          <el-form :model="addUserData" ref="addUserData" :rules="formRules" class="form_table">
            <div class="personal">
              <h5>个人信息</h5>
              <el-form-item class="userName" prop="userName">
                <label>用户名：</label>
                <el-input type="text" class="input" v-model="addUserData.userName"></el-input>
              </el-form-item>
              <el-form-item class="password" prop="password">
                <label>密码：</label>
                <el-input type="password" class="input" v-model="addUserData.password" show-password></el-input>
              </el-form-item>
            </div>
            <div class="line1"></div>
            <div class="liver">
              <h5>户主信息</h5>
              <el-form-item class="name" prop="name">
                <label>姓名：</label>
                <el-input type="text" class="input" v-model="addUserData.name"></el-input>
              </el-form-item>
              <el-form-item class="sex" prop="sex">
                <label>性别：</label>
                <el-select v-model="addUserData.sex" class="select">
                  <el-option value="0">男</el-option>
                  <el-option value="1">女</el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="personalID" prop="personalID">
                <label>身份证号：</label>
                <el-input type="text" class="input" v-model="addUserData.personalID"></el-input>
              </el-form-item>
              <el-form-item class="ancestralHome" prop="ancestralHome">
                <label>籍贯：</label>
                <el-input type="text" class="input" v-model="addUserData.ancestralHome"></el-input>
              </el-form-item>
              <el-form-item class="residenceAddress" prop="residenceAddress">
                <label>户口所在地：</label>
                <el-input type="text" class="input" v-model="addUserData.residenceAddress"></el-input>
              </el-form-item>
            </div>
            <div class="line2"></div>
            <div class="house">
              <h5>房屋信息</h5>
              <el-form-item class="buildingNumber" prop="buildingNumber">
                <label>栋数：</label>
                <el-input type="text" class="input" v-model="addUserData.buildingNumber"></el-input>
              </el-form-item>
              <el-form-item class="roomNumber" prop="roomNumber">
                <label>房号：</label>
                <el-input type="text" class="input" v-model="addUserData.roomNumber"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="saveButton">
            <button type="button" @click="addUser">确定新增</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="modifyWindows" v-show="modifyWindows">
      <div class="modifyBox">
        <h4>修改住户信息</h4>
        <div class="back">
          <a href @click.prevent="closeModify">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="modifyContent">
          <form class="house">
            <h5>房屋信息</h5>
            <label class="houseLocation">
              房间：
              <input type="text" />
            </label>
            <label class="houseId">
              房间ID：
              <input type="text" />
            </label>
          </form>
          <div class="line3"></div>
          <form class="liver">
            <h5>户主信息</h5>
            <label class="name">
              姓名：
              <input type="text">
            </label>
            <label class="houseId">
              住户ID：
              <input type="text">
            </label>
            <label class="personalID">
              身份证号：
              <input type="text">
            </label>
            <label class="sex">性别：
              <select>
                <option value="man">男</option>
                <option value="woman">女</option>
              </select>
            </label>
            <label class="residenceAddress">
              户口所在地：
              <input type="text">
            </label>
            <label class="ancestralHome">
              籍贯：
              <input type="text">
            </label>
            <label class="userName">
              用户名：
              <input type="text">
            </label>
          </form>
          <div class="line4"></div>
          <form class="car">
            <h5>车辆信息</h5>
            <label class="carNumber">
              车牌号：
              <input type="text">
            </label>
            <label class="brand">
              品牌：
              <input type="text">
            </label>
            <label class="type">
              型号：
              <input type="text">
            </label>
            <label class="color">
              颜色：
              <input type="text">
            </label>
          </form>
          <div class="saveButton">
            <button type="button" @click="saveModify">保存修改</button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
/*
  import { sexChange } from "../../utils/sexUtil";
*/
  import bus from "../../api/bus";

  export default {
    inject:['reload'],  //注入App里的reload方法，刷新
    name: "userBox",
    data() {
      return {
        //住户搜索的数据
        userSearch: {
          name: '',
          buildingNumber: '',
          roomNumber: '',
        },
        //住户的列表数据
        /*userData: [
  {
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  },{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  },{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  },{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  },{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  },{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  },{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  }/!*,{
    name: '黄一月',
    buildingNumber: '1',
    roomNumber: '101',
    plateNumber: '粤A8888'
  }*!/
],*/
        userData: [],
        //新增住户信息数据
        addUserData: {
          userName: 'ycfszd',
          password: '123456a',
          name: '郑云龙',
          personalID: '330234566669809765',
          sex: '0',
          ancestralHome: '山东青岛',
          residenceAddress: '广东省东莞市大岭山镇教育西路',
          buildingNumber: 2,
          roomNumber: 101
        },
        /*addUserData: {
          userName: '',
          password: '',
          name: '',
          personalID: '',
          sex: '',
          ancestralHome: '',
          residenceAddress: '',
          buildingNumber: '',
          roomNumber: ''
        },*/
        //分页器
        pageBlock: {
          pageSize: 6,
          total: 100,
          currentPage: 1,
        },
        //要删除的userId
        delUserId: '',
        userList: true,
        deleteWindows: false,
        modifyWindows: false,
        addWindows: false,
        listNull: false,
        formRules:{
          userName:[
            { required: true, message: '用户名不得为空'},
            { min: 4, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '密码不得为空'},
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '姓名不得为空', trigger: 'blur'},
          ],
          sex:[
            { required: true, message: '性别不得为空', trigger: 'blur'},
          ],
          personalID:[
            { required: true, message: '身份证号不得为空', trigger: 'blur'},
            { len: 18, message: '身份证号为 18 位', trigger: 'blur' }
          ],
          nativenPlace:[
            { required: true, message: '籍贯不得为空', trigger: 'blur'},
          ],
          residenceAddress:[
            { required: true, message: '户口所在地不得为空', trigger: 'blur'},
          ],
          buildingNumber:[
            { required: true, message: '栋数不得为空', trigger: 'blur'},
            { len: 1, message: '栋数为 1 位', trigger: 'blur' }
          ],
          roomNumber:[
            { required: true, message: '房号不得为空', trigger: 'blur'},
            { len: 3, message: '房号为 3 位', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //打开删除提示窗口，获取UserID
      openDelete(row) {
        this.deleteWindows = true;
        //存储选中行的userId
        this.delUserId = row.userId;
      },
      //关闭删除提示窗口
      closeDelete() {
        this.deleteWindows = false;
      },
      //删除住户用户
      deleteUser() {
        this.$axios.get('/api/user/deleteUser',{
          params: {
            userId: this.delUserId
          }
        }).then((res) => {
          if(res.code === 200) {
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
      /* //打开修改用户窗口
      openModify(){
        this.modifyWindows = true;
      },
      //关闭修改用户窗口
      closeModify(){
        this.modifyWindows = false;
      }, */
      //打开新增用户窗口
      openAdd(){
        this.addWindows = true;
      },
      //关闭新增用户窗口
      closeAdd(){
        this.addWindows = false;
      },
      //修改用户窗口保存修改按钮
      saveModify(){
        this.modifyWindows = false;
      },
      //获取住户相关的列表
      getList() {
        let name = '';
        let buildingNumber = '';
        let roomNumber = '';
        this.searchUser(name, buildingNumber, roomNumber);
      },
      //根据条件查询指定住户
      conditionSearch() {
        let name = this.userSearch.name;
        let buildingNumber = this.userSearch.buildingNumber;
        let roomNumber = this.userSearch.roomNumber;
        this.searchUser(name, buildingNumber, roomNumber);
      },
      //查询住户接口
      searchUser(n, b, r) {
        this.$axios.get('/api/user/searchUser',{
          params: {
            name: n,
            buildingNumber: b,
            roomNumber: r
          }
        }).then((res) => {
          let data = res.data;
          if(data.records.length === 0) {
            this.listNull = false;
          }
          else {
            this.listNull = true;
            this.userData = data.records;
            this.pageBlock.pageSize = data.pageSize;
            this.pageBlock.total = data.total;
            this.pageBlock.currentPage = data.currentPage;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //新增住户用户
      addUser() {
        this.$axios.post('/api/user/addUser',{
          userName: this.addUserData.userName,
          password: this.addUserData.password,
          name: this.addUserData.name,
          idNumber: this.addUserData.personalID,
          sex: this.addUserData.sex,
          ancestralHome: this.addUserData.ancestralHome,
          residenceAddress: this.addUserData.residenceAddress,
          buildingNumber: this.addUserData.buildingNumber,
          roomNumber: this.addUserData.roomNumber
        }).then((res) => {
          if(res.code === 200) {
            this.$message.success('添加用户成功');
            this.addWindows = false;
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //获取住户的详细信息，获取UserID
      getDetail(row) {
        console.log(row);
        bus.$emit('userId', row.userId);
        this.$router.push('/index/user/userInfo');
        this.userList = false;
        this.$emit('userBoxData', this.userList);
      }
    },
    beforeMount() {
      //获取初始住户列表
      this.getList();
/*
      this.addUserData.personalInfo.sex = sexChange(this.addUserData.personalInfo.sex)
*/
    }
  }
</script>

<style scoped>
.user_box {
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
  margin: 40px 0 0 40px;
}
.search_box2 {
  display: flex;
  margin-top: 20px;
}
.search_input {
  width: 450px;
  /*border: 1px rgba(0, 0, 0, 0.5) solid;*/
  border-radius: 5px;
}
.el-button--primary {
  width: 130px;
  background: #8a79af;
  border-color: #8a79af;
  margin-left: 30px;
  position: relative;
  z-index: 1;
}
.select {
  width: 140px;
}
.select_box2 {
  margin-left: 30px;
}
.add_user {
  float: right;
  margin-top: -90px;
}
.add_button {
  background-color: #d38cae;
  width: 240px;
  height: 50px;
  font-size: 20px;
  /*  font-weight: 900;*/
  line-height: 20px;
  border-color: #d38cae;
  border-radius: 10px;
}
.user_table {
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
.deleteWindows,
.addWindows,
.modifyWindows {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
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
  margin: 80px 242px;
  font-size: 20px;
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
.addBox,
.modifyBox {
  width: 632px;
  height: 580px;
  background: #fff;
  margin: 5% auto;
  position: relative;
  font-size: 20px;
  color: #666;
}
.addBox h4,
.modifyBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
  color: #000;
}
.addBox h4::before,
.modifyBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.addBox h4::after,
.modifyBox h4::after {
  content: "";
  width: 94%;
  /*width: 1100px;*/
  height: 1px;
  background: #666;
  position: absolute;
  top: 60px;
  left: 18px;
  z-index: 2;
}
.addBox .back,
.modifyBox .back {
  position: absolute;
  left: 580px;
  top: 20px;
}
.addContent,
.modifyContent{
  margin-top: 30px;
}
h5 {
  font-size: 24px;
  margin-left: 20px;
  margin-top: 10px;
  color: #000;
}
.form_table label {
  font-size: 20px;
}
.form_table .input {
  margin-top: 10px;
  width: 137px;
  height: 20px;
}
.form_table .select {
  margin-top: 10px;
  width: 70px;
  height: 30px;
}
.line1,
.line2 {
  width: 94%;
  height: 1px;
  background: #666;
  margin-left: 18px;
}
.line1 {
  margin-top: 26px;
}
.line2 {
  margin-top: 23px;
}
label {
  display: block;
  float: left;
  margin-top: 10px;
}
.personal .userName{
  margin-left: 70px;
}
.personal .password {
  float: right;
  margin-top: -72px;
  margin-right: 90px;
}
.liver .name {
  margin-left: 90px;
}
.liver .sex {
  float: right;
  margin-top: -72px;
  margin-right: 160px;
}
.liver .personalID .input {
  margin-top: -30px;
  width: 190px;
}
.liver .residenceAddress .input {
  margin-top: -30px;
  width: 280px;
}
.liver .personalID label {
  margin-top: 0;
  margin-left: 50px;
}
.liver .residenceAddress label{
  margin-top: 0;
  margin-left: 30px;
}
.liver .ancestralHome {
  float: right;
  margin-top: -70px;
  margin-right: 60px;
}
.house .buildingNumber {
  margin-left: 90px;
}
.house .roomNumber {
  float: right;
  margin-top: -72px;
  margin-right: 100px;
}
.saveButton {
  margin-top: 25px;
  width: 100%;
  height: 60px;
  background: #bcbcbc;
}
.addBox button,
.modifyBox button {
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
</style>
<style>
.el-form-item__error {
  position: absolute;
}
.personal .el-form-item__error {
  left: 80px;
}
.password .el-form-item__error,
.name .el-form-item__error,
.ancestralHome .el-form-item__error,
.buildingNumber .el-form-item__error,
.roomNumber .el-form-item__error {
  left: 60px;
}
.personalID .el-form-item__error,
.residenceAddress .el-form-item__error {
  left: 150px;
}
</style>
