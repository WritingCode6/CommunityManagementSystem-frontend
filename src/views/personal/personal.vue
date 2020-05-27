<template>
  <div id="personal">
      <div class="info">
        <div v-show="onlyReadInfo">
          <h3>个人资料</h3>
          <el-form :model="userInfo" class="infoFrom">
            <div class="form_left">
              <el-form-item prop="userName" class="userName">
                <label>用户名：</label>
                <el-input v-model="userInfo.userName" class="input" readonly></el-input>
              </el-form-item>
              <el-form-item prop="name" class="name">
                <label>真实姓名：</label>
                <el-input v-model="userInfo.name" class="input" readonly></el-input>
              </el-form-item>
              <el-form-item prop="sex" class="sex">
                <label>性别：</label>
                <el-input v-model="userInfo.sex" class="select" readonly></el-input>
              </el-form-item>
            </div>
            <div class="form_right">
              <el-form-item prop="personalId" class="personalId">
                <label>身份证号：</label>
                <el-input v-model="userInfo.personalId" class="longInput input" readonly></el-input>
              </el-form-item>
              <el-form-item prop="workId" class="workId">
                <label>工作ID：</label>
                <el-input v-model="userInfo.workId" class="input" readonly></el-input>
              </el-form-item>
              <el-form-item prop="location" class="location">
                <label>地址：</label>
                <el-input v-model="userInfo.location" class="longInput input" readonly></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="form_button">
            <el-button type="primary" @click="readToWriteInfo">修改</el-button>
            <el-button type="primary">刷新</el-button>
          </div>
        </div>
        <div v-show="onlyWriteInfo">
          <h3>个人资料</h3>
          <el-form :model="userInfo[0]" ref="userInfo[0]" class="infoFrom" :rules="infoRules">
            <div class="form_left">
              <el-form-item class="name">
                <label>姓名：</label>
                <el-input v-model="userInfo[0].name" class="input" readonly></el-input>
              </el-form-item>
              <el-form-item prop="phone" class="phone">
                <label>手机号：</label>
                <el-input v-model.number="userInfo[0].phone" class="input" clearable></el-input>
              </el-form-item>
              <el-form-item class="sex">
                <label>性别：</label>
                <el-select v-model="userInfo[0].sex" class="select" disabled>
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="form_right">
              <el-form-item class="idNumber">
                <label>身份证号：</label>
                <el-input v-model="userInfo.personalId" class="longInput input"></el-input>
              </el-form-item>
              <el-form-item class="serviceId">
                <label>工作ID：</label>
                <el-input v-model="userInfo.workId" class="input"></el-input>
              </el-form-item>
              <el-form-item prop="location" class="location">
                <label>地址：</label>
                <el-input v-model="userInfo[0].address" class="longInput input" clearable></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="form_button">
            <el-button type="primary" @click="writeToReadInfo">取消</el-button>
            <el-button type="primary">保存</el-button>
          </div>
        </div>
      </div>
      <div class="password">
        <div v-show="onlyReadPwd">
          <h3>修改密码</h3>
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
          <h3>修改密码</h3>
          <el-form class="passwordForm">
            <div class="form_left">
              <el-form-item class="old">
                <label>旧密码：</label>
                <el-input v-model="passwordInfoWrite.oldPwd" class="input" show-password></el-input>
              </el-form-item>
            </div>
            <div class="form_right">
              <el-form-item class="new">
                <label>新密码：</label>
                <el-input v-model="passwordInfoWrite.newPwd" class="input" show-password></el-input>
              </el-form-item>
              <el-form-item class="again">
                <label>确认密码：</label>
                <el-input v-model="passwordInfoWrite.againPwd" class="input" show-password></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="form_button">
            <el-button type="primary" @click="writeToReadPwd">取消</el-button>
            <el-button type="primary">保存</el-button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name:"personal",
  data() {
    return {
      userInfo: {
        userName: "靓仔",
        name: "李华华",
        phone: '12345678910',
        sex: 0,
        personalId: "441900197609239999",
        workId: "123443",
        location: "广东省东莞市大岭山镇教育西路"
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
      infoRules:{
        phone:[
          { required: true, message: '手机号不能为空', trigger: 'blur'},
          { type: 'number', message: '手机号必须为数字值', trigger: 'blur'}
        ],
        address:[
          { required: true, message: '地址不能为空', trigger: 'blur'},
        ]
      },
      onlyReadInfo: true,
      onlyReadPwd: true,
      onlyWriteInfo: false,
      onlyWritePwd: false
    };
  },
  methods: {
    //信息只读变为可修改
    readToWriteInfo() {
      this.onlyReadInfo = false;
      this.onlyWriteInfo = true;
    },
    //密码只读变为可修改
    readToWritePwd() {
      this.onlyReadPwd = false;
      this.onlyWritePwd = true;
    },
    //信息可修改变为只读
    writeToReadInfo() {
      this.onlyReadInfo = true;
      this.onlyWriteInfo = false;
      this.sexChange();
    },
    //密码可修改变为只读
    writeToReadPwd() {
      this.onlyReadPwd = true;
      this.onlyWritePwd = false;
    },
    //性别转换，包括修改的转换和初渲染的转换
    sexChange() {
      if(this.userInfo.sex === 0 || this.userInfo.sex === '0')  this.userInfo.sex = '男';
      else if(this.userInfo.sex === 1 || this.userInfo.sex === '1')  this.userInfo.sex = '女';
      else this.userInfo.sex = '';
    }
  },
  beforeMount() {
    this.sexChange();
  }
};
</script>

<style scoped>
#personal {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info,
.password {
  margin-top: 20px;
  width: 100%;
  height: 350px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  position: relative;
  left: 55px;
}
.password {
  margin-top: 30px;
  height: 285px;
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
h3::after {
  content: "";
  width: 94%;
  /*width: 1100px;*/
  height: 1px;
  background: #666666;
  position: absolute;
  top: 60px;
  left: 40px;
  z-index: 2;
}
.infoFrom,
.passwordForm{
  display: flex;
}
/* label固定宽度并右对齐，实现表单对齐 */
label {
  font-size: 16px;
  display: inline-block;
  width: 80px;
  text-align: right;
}
.input {
  width: 220px;
}
.select {
  width: 100px;
}
.longInput {
  width: 320px;
}
.form_left,
.form_right{
  /* 参照h3::after的left位置40px */
  margin: 40px 0 0 40px;
}
.form_right {
  margin-left: 200px;
}
.form_button {
  float: right;
  margin-right: 5%;
  margin-top: 10px;
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
</style>