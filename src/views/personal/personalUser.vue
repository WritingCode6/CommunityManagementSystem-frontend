<template>
  <div id="personalUser">
    <div class="info">
      <h3>个人资料</h3>
      <ul>
        <li class="name">
          姓名：
          <span>{{ personalMsg.name }}</span>
        </li>
        <li class="userName">
          用户名：
          <span>{{ personalMsg.userName }}</span>
        </li>
        <li class="userId">
          用户ID：
          <span>{{ personalMsg.userId }}</span>
        </li>
        <li class="sex">
          性别：
          <span>{{ personalMsg.sex }}</span>
        </li>
        <li class="idNumber">
          身份证号：
          <span>{{ personalMsg.idNumber }}</span>
        </li>
        <li class="ancestralHome">
          籍贯：
          <span>{{ personalMsg.ancestralHome }}</span>
        </li>
        <li class="residenceAddress">
          户口住址：
          <span>{{ personalMsg.residenceAddress }}</span>
        </li>
      </ul>
    </div>
    <div class="otherInfo">
      <div class="accountRead" v-show="accountRead">
        <ul class="nav">
          <li class="account">
            <span>账号信息</span>
          </li>
          <li class="house">
            <a href @click.prevent="toHouseRead">房屋信息</a>
          </li>
          <li class="car">
            <a href @click.prevent="toCarRead">车辆信息</a>
          </li>
        </ul>
        <div class="content">
          <h4>修改密码</h4>
          <div v-show="onlyReadPwd">
            <el-form class="passwordForm">
              <div class="form_left">
                <el-form-item class="old">
                  <label>旧密码：</label>
                  <el-input v-model="passwordInfoRead.oldPwd" class="input" readonly></el-input>
                </el-form-item>
              </div>
              <div class="form_right">
                <el-form-item class="new">
                  <label>新密码：</label>
                  <el-input v-model="passwordInfoRead.newPwd" class="input" readonly></el-input>
                </el-form-item>
                <el-form-item class="again">
                  <label>确认密码：</label>
                  <el-input v-model="passwordInfoRead.againPwd" class="input" readonly></el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="form_button">
              <el-button type="primary" @click="readToWritePwd">修改</el-button>
              <el-button type="primary">刷新</el-button>
            </div>
          </div>
          <div v-show="onlyWritePwd">
            <el-form :model="passwordInfoWrite" ref="passwordInfoWrite" class="passwordForm" :rules="passwordRules">
              <div class="form_left">
                <el-form-item class="old" prop="oldPwd">
                  <label>旧密码：</label>
                  <el-input v-model="passwordInfoWrite.oldPwd" class="input"></el-input>
                </el-form-item>
              </div>
              <div class="form_right">
                <el-form-item class="new" prop="newPwd">
                  <label>新密码：</label>
                  <el-input v-model="passwordInfoWrite.newPwd" class="input"></el-input>
                </el-form-item>
                <el-form-item class="again" prop="againPwd">
                  <label>确认密码：</label>
                  <el-input v-model="passwordInfoWrite.againPwd" class="input"></el-input>
                </el-form-item>
              </div>
            </el-form>
            <div class="form_button">
              <el-button type="primary" @click="writeToReadPwd">取消</el-button>
              <el-button type="primary" @click="updatePwd">保存</el-button>
            </div>
            <div class="form_right">
              <el-form-item class="new">
                <label>新密码：</label>
                <el-input class="input" readonly></el-input>
              </el-form-item>
              <el-form-item class="again">
                <label>确认密码：</label>
                <el-input class="input" readonly></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="form_button">
            <el-button type="primary" @click="writeToReadPwd">取消</el-button>
            <el-button type="primary" @click="updatePwd">保存</el-button>
          </div>
        </div>
        </div>
      </div>
      <div class="houseRead" v-show="houseRead">
        <ul class="nav">
          <li class="account">
            <a href @click.prevent="toAcconutRead">账号信息</a>
          </li>
          <li class="house">
            <span>房屋信息</span>
          </li>
          <li class="car">
            <a href @click.prevent="toCarRead">车辆信息</a>
          </li>
        </ul>
        <div class="content">
          <ul>
            <li class="buildingNumber">
              栋数：
              <span>{{ personalMsg.buildingNumber  }}</span>
            </li>
            <li class="roomNumber">
              房间号：
              <span>{{ personalMsg.roomNumber }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="carRead" v-show="carRead">
        <ul class="nav">
          <li class="account">
            <a href @click.prevent="toAcconutRead">账号信息</a>
          </li>
          <li class="house">
            <a href @click.prevent="toHouseRead">房屋信息</a>
          </li>
          <li class="car">
            <span>车辆信息</span>
          </li>
        </ul>
        <div class="content">
          <ul>
            <li class="plateNumber">
              车牌号：
              <span>{{ personalMsg.plateNumber }}</span>
            </li>
            <li class="brand">
              品牌：
              <span>{{ personalMsg.brand }}</span>
            </li>
            <li class="model">
              型号：
              <span>{{ personalMsg.model }}</span>
            </li>
            <li class="color">
              颜色：
              <span>{{ personalMsg.color }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "personalUser",
    data() {
      return {
        accountRead:true,
        houseRead:false,
        carRead:false,
        onlyReadPwd:true,
        onlyWritePwd:false,
        personalMsg:{
          name:'李华华',
          userName:'破晓',
          userId:123456,
          sex:'女',
          idNumber:'441588888888888888',
          ancestralHome:'广东深圳',
          residenceAddress:'广东省深圳市罗湖区XX村XX路XX号',
          buildingNumber:'A栋',
          roomNumber:123,
          plateNumber:'粤A88888',
          brand:'长安',
          model:'SC7103',
          color:'黑色'
        },
        passwordInfoRead: {
          oldPwd: '******',
          newPwd: '******',
          againPwd: '******'
        },
        passwordInfoWrite: {
          oldPwd: '',
          newPwd: '',
          againPwd: ''
        },
        passwordRules:{
        oldPwd:[
          { required: true, message: '旧密码不能为空', trigger: 'blur'}
        ],
        newPwd:[
          { required: true, message: '新密码不能为空', trigger: 'blur'},
        ],
        againPwd:[
          { required: true, message: '请再次输入新密码', trigger: 'blur'},
        ]
      },
      }
    },
    methods:{
      /* 切换到账号信息板块 */
      toAcconutRead(){
        this.accountRead = true;
        this.houseRead = false;
        this.carRead = false;
      },
      /* 切换到房屋信息板块 */
      toHouseRead(){
        this.accountRead = false;
        this.houseRead = true;
        this.carRead = false;
      },
      /* 切换到车辆信息板块 */
      toCarRead(){
        this.accountRead = false;
        this.houseRead = false;
        this.carRead = true;
      },
      //密码只读变为可修改
      readToWritePwd() {
        this.onlyReadPwd = false;
        this.onlyWritePwd = true;
      },
      //密码可修改变为只读
      writeToReadPwd() {
        this.onlyReadPwd = true;
        this.onlyWritePwd = false;
      },
    }
  }
</script>

<style scoped>
.info,
.otherInfo {
  margin-top: 20px;
  position: relative;
  left: 55px;
}
h3 {
  font-size: 24px;
  color: #666;
  margin-left: 68px;
  margin-top: 10px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 30px;
  z-index: 1;
}
.info ul,
.content {
  margin-top: 20px;
  margin-left: 10px;
  width: 95%;
  height: 300px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  font-size: 20px;
  color: #666;
  position: relative;
}
.content {
  height: 205px;
}
.info li {
  position: absolute;
  margin-top: -10px;
}
.info span {
  color: #000;
}
.name {
  top: 70px;
  left: 130px;
}
.userName {
  top: 70px;
  left: 450px;
}
.userId {
  top: 70px;
  left: 800px;
}
.sex {
  top: 150px;
  left: 130px;
}
.idNumber {
  top: 150px;
  left: 430px;
}
.ancestralHome {
  top: 230px;
  left: 130px;
}
.residenceAddress {
  top: 230px;
  left: 430px;
}
.accountRead .nav {
  background-image: url("../../assets/image/tab/three_left.png");
}
.houseRead .nav {
  background-image: url("../../assets/image/tab/three_middle.png");
}
.carRead .nav {
  background-image: url("../../assets/image/tab/three_right.png");
}
.nav {
  background-size: 298.4px;
  background-repeat: no-repeat;
  width: 373px;
  height: 36px;
  position: relative;
  left: 10px;
  z-index: 1;
}
.nav li {
  float: left;
}
.nav span,
.nav a {
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
.nav a:hover {
  color: #fff;
}
.nav .house a,
.nav .house span{
  left: 100px;
}
.nav .car a,
.nav .car span{
  left: 195px;
}
.content {
  margin-top: -1px;
  min-width: 1000px;
  max-width: 1200px;
  border-radius: 0px 10px 10px 10px;
  border-color: #bcbcbc;
}
.content h4 {
  margin:20px 40px;
  font-size: 20px;
  color: #000;
}
.passwordForm label{
  font-size: 20px;
}
.input {
  width: 220px;
}
.form_left,
.form_right{
  /* 参照h3::after的left位置40px */
  margin: 10px 0 0 80px;
}
.form_right {
  margin-top: -65px;
  margin-left: 500px;
}
.again {
  margin-left: -20px;
}
.buildingNumber {
  margin-top: 80px;
  margin-left: 200px;
}
.roomNumber {
  margin-top: -20px;
  margin-left: 600px;
}
.plateNumber {
  margin-top: 60px;
  margin-left: 200px;
}
.brand {
  margin-top: -20px;
  margin-left: 600px;
}
.model {
  margin-top: 40px;
  margin-left: 220px;
}
.color {
  margin-top: -20px;
  margin-left: 600px;
}
.content span {
  color: #000;
}
.form_button {
  float: right;
  margin-right: 2%;
  margin-top: -40px;
}
.el-button--primary {
  width: 122px;
  background: #8a79af;
  border-color: #8a79af;
  margin-left: 30px;
}
</style>
<style>
.el-form-item__error {
  position: absolute;
  left: 80px;
}
.again .el-form-item__error {
  left: 100px;
}
</style>