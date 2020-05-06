<template>
  <div id="login" >
    <div class="login_box">
      <div class="title">社区小管家</div>
      <el-form
              :model="userInfo"
              class="loginForm">
        <el-form-item prop="userName">
          <label>用户名</label>
          <el-input
                  v-model="userInfo.userName"
                  placeholder="请输入用户名"
                  @change="userNameChange"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
                  v-model="userInfo.password"
                  placeholder="请输入密码"
                  show-password
                  @change="pwdChange"></el-input>
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
      userInfo: {
        userName: "",
        password: ""
      }
    };
  },
  methods: {
    //字符串合理性判断
    isValid(str) {
      return /^[\u4e00-\u9fa5\w]{4,16}$/.test(str);
    },
    //用户名的合理性判断
    userNameChange() {
      let userName = this.userInfo.userName
      if (userName === '')
        this.$message.error('用户名不得为空');
      else if (userName.length < 4 || userName.length > 16) {
        this.$message.warning('用户名长度必须在4-16位');
      } else if (!this.isValid(userName)) {
        //排除特殊字符和空格
        this.$message.warning('用户名必须由中文字符、数字、字母和下划线组成');
      } else if (!isNaN(userName)) {
        //判断username是不是一个值
        this.$message.warning('用户名不能为纯数字');
      }
    },
    //密码的合理性判断
    pwdChange() {
      let password = this.userInfo.password
      if (password === '') {
        this.$message.error('密码不得为空');
      }
      else if (password.length < 6 || password.length > 16) {
        this.$message.warning('密码长度必须在6-16位');
      }
      else if (!this.isValid(password)) {
        //排除特殊字符和空格
        this.$message.warning('密码必须由中文字符、数字、字母和下划线组成');
      }
      else if (!isNaN(password)) {
        //判断Pwd是不是一个值
        this.$message.warning('密码不能为纯数字');
      }
    },
    //登录接口
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
