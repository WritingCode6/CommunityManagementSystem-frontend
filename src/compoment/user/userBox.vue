<template>
  <div id="userBox">
    <div class="user_box">
      <h3>住户列表</h3>
      <div class="search_form">
        <div class="search_box1">
          <el-input
                  v-model="name"
                  class="search_input"
                  placeholder="请输入住户姓名"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="search_box2">
          <div class="select_box1">
            <label>栋数：</label>
            <el-select v-model="buildingNumber" class="select">
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
            <el-select v-model="roomNumber" class="select">
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
          <el-button type="primary" class="add_button" @click="openAdd">新增用户</el-button>
        </div>
        <el-table
                :data="userData"
                style="width: 100%"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="name" label="姓名" min-width="12%"></el-table-column>
          <el-table-column prop="buildingNumber" label="栋数" min-width="10%"></el-table-column>
          <el-table-column prop="roomNumber" label="房间号" min-width="10%"></el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" min-width="15%"></el-table-column>
          <el-table-column label="操作" min-width="25%">
            <!-- 修改未做 -->
            <!--<a href>
              <span class="operation" @click.prevent="openModify">修改</span>
            </a>-->
            <a href>
              <span class="operation" @click.prevent="openDelete">删除</span>
            </a>
            <router-link to="/index/user/userInfo">
              <span class="operation" @click="toUserInfo">查看详情</span>
            </router-link>
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
            <button type="button">是</button>
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
          <form class="personal">
            <h5>个人信息</h5>
            <label class="userName">
              用户名：
              <input type="text" v-model="addUserData.basicInfo.userName">
            </label>
            <label class="password">
              密码：
              <input type="password" v-model="addUserData.basicInfo.password">
            </label>
          </form>
          <div class="line1"></div>
          <form class="liver">
            <h5>户主信息</h5>
            <label class="name">
              姓名：
              <input type="text" v-model="addUserData.personalInfo.name">
            </label>
            <label class="sex">性别：
              <select v-model="addUserData.personalInfo.sex">
                <option value="0">男</option>
                <option value="1">女</option>
              </select>
            </label>
            <label class="personalId">
              身份证号：
              <input type="text" v-model="addUserData.personalInfo.personalID">
            </label>
            <label class="nativePlace">
              籍贯：
              <input type="text" v-model="addUserData.personalInfo.ancestralHome">
            </label>
            <label class="household">
              户口所在地：
              <input type="text" v-model="addUserData.personalInfo.residenceAddress">
            </label>
          </form>
          <div class="line2"></div>
          <form class="house">
            <h5>房屋信息</h5>
            <label class="apartmentNumber">
              栋数：
              <input type="text" v-model="addUserData.houseInfo.buildingNumber">
            </label>
            <label class="houseNumber">
              房号：
              <input type="text" v-model="addUserData.houseInfo.roomNumber">
            </label>
          </form>
          <div class="saveButton">
            <button type="button" @click="saveAdd">确定新增</button>
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
            <label class="personalId">
              身份证号：
              <input type="text">
            </label>
            <label class="sex">性别：
              <select>
                <option value="man">男</option>
                <option value="woman">女</option>
              </select>
            </label>
            <label class="household">
              户口所在地：
              <input type="text">
            </label>
            <label class="nativePlace">
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

  export default {
    name: "userBox",
    data() {
      return {
        name: '',
        buildingNumber: '',
        roomNumber: '',
        userData: [
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
          }/*,{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          }*/
        ],
        //新增住户信息数据，仅作测试用途，到时候接收后台数据覆盖默认数据
        addUserData: {
          basicInfo: {
            userName: 'hyy',
            password: '123456a'
          },
          personalInfo: {
            name: '黄一月',
            personalID: '3302345666698097653',
            sex: 0,
            ancestralHome: '广东揭阳',
            residenceAddress: '广东省东莞市大岭山镇教育西路'
          },
          houseInfo: {
            buildingNumber: 1,
            roomNumber: 101
          }
        },
        pageSize: 6,
        total: 100,
        currentPage: 1,
        userList: true,
        deleteWindows: false,
        modifyWindows: false,
        addWindows: false,
      }
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
      //父子组件传值
      toUserInfo() {
        this.userList = false;
        this.$emit('userBoxData', this.userList);
      },
      //打开删除提示窗口
      openDelete() {
        this.deleteWindows = true;
      },
      //关闭删除提示窗口
      closeDelete() {
        this.deleteWindows = false;
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
      //新增用户窗口保存修改按钮
      saveAdd(){
        this.addWindows = false;
      },
      //修改用户窗口保存修改按钮
      saveModify(){
        this.modifyWindows = false;
      }
    },
    created() {
      this.pagination();
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
  height: 500px;
  background: #fff;
  margin: 8% auto;
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
.addBox input,
.modifyBox input {
  width: 137px;
  height: 26px;
  padding-left: 8px;
}
.addBox select,
.modifyBox select{
  width: 66px;
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
  margin-top: 55px;
}
.line2 {
  margin-top: 143px;
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
  margin-left: 30px;
}
.liver .name {
  margin-left: 90px;
}
.liver .sex {
  margin-left: 28px;
}
.liver .personalId input {
  width: 160px;
}
.liver .household input {
  width: 280px;
}
.liver .personalId {
  margin-left: 50px;
}
.liver .household {
  margin-left: 30px;
}
.liver .nativePlace {
  margin-left: 7px;
}
.house .apartmentNumber {
  margin-left: 90px;
}
.house .houseNumber {
  margin-left: 30px;
}
.saveButton {
  margin-top: 75px;
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
