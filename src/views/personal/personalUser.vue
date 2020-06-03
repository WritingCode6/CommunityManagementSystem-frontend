<template>
  <div id="personalUser">
    <div class="info">
      <h3>个人资料</h3>
      <ul>
        <li class="name">
          姓名：
          <span>{{ personalMsg.userInfo.name }}</span>
        </li>
        <li class="userName">
          用户名：
          <span>{{ personalMsg.userInfo.userName }}</span>
        </li>
        <li class="userId">
          用户ID：
          <span>{{ personalMsg.userInfo.id }}</span>
        </li>
        <li class="sex">
          性别：
          <span>{{ personalMsg.userInfo.sex }}</span>
        </li>
        <li class="idNumber">
          身份证号：
          <span>{{ personalMsg.userInfo.idNumber }}</span>
        </li>
        <li class="ancestralHome">
          籍贯：
          <span>{{ personalMsg.userInfo.ancestralHome }}</span>
        </li>
        <li class="residenceAddress">
          户口住址：
          <span>{{ personalMsg.userInfo.residenceAddress }}</span>
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
              <el-button type="primary" @click="refresh">刷新</el-button>
            </div>
          </div>
          <div v-show="onlyWritePwd">
            <el-form :model="passwordInfoWrite" ref="passwordInfoWrite" class="passwordForm" :rules="passwordRules">
              <div class="form_left">
                <el-form-item class="old" prop="oldPwd">
                  <label>旧密码：</label>
                  <el-input v-model="passwordInfoWrite.oldPwd" class="input" show-password></el-input>
                </el-form-item>
              </div>
              <div class="form_right">
                <el-form-item class="new" prop="newPwd">
                  <label>新密码：</label>
                  <el-input v-model="passwordInfoWrite.newPwd" class="input" show-password></el-input>
                </el-form-item>
                <el-form-item class="again" prop="againPwd">
                  <label>确认密码：</label>
                  <el-input v-model="passwordInfoWrite.againPwd" class="input" show-password></el-input>
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
              <span>{{ personalMsg.houseInfo.buildingNumber  }}</span>
            </li>
            <li class="roomNumber">
              房间号：
              <span>{{ personalMsg.houseInfo.roomNumber }}</span>
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
              <span>{{ personalMsg.carInfo.plateNumber }}</span>
            </li>
            <li class="brand">
              品牌：
              <span>{{ personalMsg.carInfo.brand }}</span>
            </li>
            <li class="model">
              型号：
              <span>{{ personalMsg.carInfo.model }}</span>
            </li>
            <li class="color">
              颜色：
              <span>{{ personalMsg.carInfo.color }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {sexChange} from "../../utils/sexUtil";

  export default {
    name: "personalUser",
    inject: ['reload'],
    data() {
      return {
        accountRead:true,
        houseRead:false,
        carRead:false,
        onlyReadPwd:true,
        onlyWritePwd:false,
        personalMsg:{
          userInfo: {
            name:'',
            userName:'',
            id: '',
            sex: '',
            idNumber:'',
            ancestralHome:'',
            residenceAddress:''
          },
          houseInfo: {
            buildingNumber: '',
            roomNumber: ''
          },
          carInfo: {
            plateNumber:'',
            brand:'',
            model:'',
            color:''
          }
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
        this.writeToReadPwd();
      },
      /* 切换到房屋信息板块 */
      toHouseRead(){
        this.accountRead = false;
        this.houseRead = true;
        this.carRead = false;
        this.writeToReadPwd();
      },
      /* 切换到车辆信息板块 */
      toCarRead(){
        this.accountRead = false;
        this.houseRead = false;
        this.carRead = true;
        this.writeToReadPwd();
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
        this.passwordInfoWrite.oldPwd = '';
        this.passwordInfoWrite.newPwd = '';
        this.passwordInfoWrite.againPwd = '';
      },
      //获取住户详细信息
      getUserInfo() {
        this.$axios.get('/api/user/getUserInfo',{
          params: {
            userId: localStorage.getItem("userId")
          }
        }).then((res) => {
          if(res.code === 200) {
            this.personalMsg.userInfo.name = res.data.userInfo.name;
            this.personalMsg.userInfo.userName = res.data.userInfo.userName;
            this.personalMsg.userInfo.id = res.data.userInfo.id;
            this.personalMsg.userInfo.sex = sexChange(res.data.userInfo.sex);
            this.personalMsg.userInfo.idNumber = res.data.userInfo.idNumber;
            this.personalMsg.userInfo.ancestralHome = res.data.userInfo.ancestralHome;
            this.personalMsg.userInfo.residenceAddress = res.data.userInfo.residenceAddress;
            if(res.data.carInfo) {
              this.personalMsg.carInfo.plateNumber = res.data.carInfo.plateNumber;
              this.personalMsg.carInfo.brand = res.data.carInfo.brand;
              this.personalMsg.carInfo.model = res.data.carInfo.model;
              this.personalMsg.carInfo.color = res.data.carInfo.color;
            }
            else {
              this.personalMsg.carInfo.plateNumber = '暂无信息';
              this.personalMsg.carInfo.brand = '暂无信息';
              this.personalMsg.carInfo.model = '暂无信息';
              this.personalMsg.carInfo.color = '暂无信息';
            }
            if(res.data.houseInfo) {
              this.personalMsg.houseInfo.buildingNumber = res.data.houseInfo.buildingNumber;
              this.personalMsg.houseInfo.roomNumber = res.data.houseInfo.roomNumber;
            }
            else {
              this.personalMsg.houseInfo.buildingNumber = '暂无信息';
              this.personalMsg.houseInfo.roomNumber = '暂无信息';
            }
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //字符串合理性判断
      isValid(str) {
        return /^[\u4e00-\u9fa5\w]{4,16}$/.test(str);
      },
      //新密码的合理性判断
      pwdChange() {
        let password = this.passwordInfoWrite.newPwd
        if (password === '') {
          this.$message.error('密码不得为空');
        }
        else if (password.length < 6 || password.length > 16) {
          this.$message.warning('密码长度必须在6-16位');
        }
        else if (!this.isValid(password)) {
          //排除特殊字符和空格
          this.$message.warning('密码必须由数字、字母和下划线组成');
        }
        else if (!isNaN(password)) {
          //判断Pwd是不是一个值
          this.$message.warning('密码不能为纯数字');
        }
      },
      //更新账户密码
      updatePwd(){
        let pwd = localStorage.getItem("pwd");
        //比较旧密码是否正确
        if(pwd === this.passwordInfoWrite.oldPwd) {
          //比较新密码的合理性
          this.pwdChange();
          //比较新密码和旧密码是否一致
          if(this.passwordInfoWrite.oldPwd === this.passwordInfoWrite.newPwd) {
            this.$message.warning("新旧密码一致，请更换！");
          }
          else {
            //比较两次新密码是否一样
            if(this.passwordInfoWrite.newPwd === this.passwordInfoWrite.againPwd) {
              this.$axios.post('/api/user/updateAccount',{
                id: localStorage.getItem("userId"),
                password: this.passwordInfoWrite.newPwd
              }).then((res) => {
                if(res.code === 200) {
                  this.writeToReadPwd();
                  localStorage.setItem("pwd",this.passwordInfoWrite.newPwd)  //将password存入localStorage
                  this.$message.success('修改密码成功');
                }
                else {
                  this.$message.error(res.message);
                }
              }).catch((err) => {
                console.log(err);
              })
              //密码可修改变为只读
              this.writeToReadPwd();
            }
            else {
              this.$message.warning("两次输入的新密码不一致，请重试！");
            }
          }
        }
        else {
          this.$message.warning("旧密码输入错误，请重试！");
        }

      },
      //刷新
      refresh() {
        this.reload();
      }
    },
    beforeMount() {
      this.getUserInfo();
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
  margin-left: 50px;
  margin-top: 10px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 20px;
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
  height: 210px;
  width: 105%;
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
