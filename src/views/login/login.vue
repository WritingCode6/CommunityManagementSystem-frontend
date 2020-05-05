<template>
  <div id="login" >
    <div class="login_box">
      <div class="title">社区小管家</div>
      <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              class="loginForm"
              hide-required-asterisk >
        <el-form-item prop="userName">
          <label>用户名</label>
          <el-input v-model="ruleForm.userName" placeholder="请输入用户名" ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <ul>
          <li class="forget">
            <!--看情况修为router-link-->
            <a href>忘记密码</a>
          </li>
          <li class="enroll">
            <!--看情况修为router-link-->
            <a href>新住户注册</a>
          </li>
        </ul>
        <el-form-item class="button">
          <!--示范代码，先注释-->
          <!--<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>-->
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      /*rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur"},
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }*/
    };
  },
  methods: {
    /*submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }*/
    login() {
      console.log('登录');
    }
  }
};
</script>

<style scoped>
#login {
  font-family: Microsoft Yahei, SimSun;
  font-size: 14px;
  width: 100%;
  height: 100%;
  background: #8a79af;
  position: absolute;
  color: #fff;
}
.login_box {
  /* 实现垂直居中 */
  width: 400px;
  height: 400px;
  /* top和left是宽高的负的一半 */
  margin: -200px 0 0 -200px;
  position: absolute;
  top: 50%;
  left: 50%;
}
.title {
  font-family: STKaiti;
  margin:0 auto;
  width: 250px;
  height: 58px;
  font-size: 45px;
  font-weight: bolder;
  line-height: 58px;
  color: #fff;
}
.loginForm {
  width: 350px;
  margin: 15px auto 0 auto;
}
/* 待修改 */
a {
  color: #fff;
}
.forget {
  float:left;
}
.enroll {
  float:right;
}
.el-button--primary {
  width: 350px;
  height: 60px;
  font-size: 22px;
  letter-spacing: 5px;
  border-color: #D38CAD;
  background-color: #D38CAD;
  margin-top: 15px;
  border-radius: 10px;
}
</style>
