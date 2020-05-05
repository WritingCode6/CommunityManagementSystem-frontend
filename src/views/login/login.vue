<template>
  <div id="login" >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="loginform" hide-required-asterisk >
      <div class="title">社区小管家</div>
      <el-form-item label="账号：" prop="userid">
        <el-input v-model="ruleForm.userid" placeholder="请输入ID" ></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <ul>
        <li class="forget">
          <a href>忘记密码</a>
        </li>
        <li class="enroll">
          <a href>新住户注册</a>
        </li>
      </ul>
      <el-form-item class="button">
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        userid: "",
        password: ""
      },
      rules: {
        userid: [
          { required: true, message: "请输入ID", trigger: "blur"},
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#login {
  width: 100%;
  height: 100%;
  background: #8a79af;
  position: absolute;
}
.loginform {
  width: 350px;
  margin: 200px auto;
}
.title {
  margin:0 auto;
  width: 225px;
  height: 58px;
  font-size: 45px;
  line-height: 58px;
  color: #fff;
}
.el-form-item__label {
  font-size: 24px;
  background: #fff;
}
a,
.button {
  color: #fff;
}
.forget {
  float:left;
}
.enroll {
  float:right;
}
.el-button--primary {
  width: 356px;
  height: 63px;
  font-size:24px;
  border: #D38CAD;
  background: #D38CAD;
  margin-top:14px;
  border-radius: 15px;
}
</style>
