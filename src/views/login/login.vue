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
            <!-- 暂时将忘记密码设置为打开密码错误窗口 -->
            <a href @click.prevent="openPasswordWrong">忘记密码</a>
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
    <div class="passwordWrong" v-show="passwordWrong">
      <div class="wrongBox">
        <h4>提示</h4>
        <div class="wrongContent">账号或密码不正确</div>
        <div class="wrongButton">
          <button type="button" @click="closePasswordWrong">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        userName: "",
        password: "",
      },
      passwordWrong:false
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
    },
    //打开提示密码错误窗口
    openPasswordWrong(){
      this.passwordWrong = true;
    },
    //关闭提示密码错误窗口
    closePasswordWrong(){
      this.passwordWrong = false;
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
  display: block;
  width: 70px;
  height: 100%;
  position: relative;
  z-index: 1;
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
.passwordWrong {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
}
.wrongBox {
  width: 634px;
  height: 236px;
  background: #fff;
  margin: 197px auto;
  position: relative;
}
.passwordWrong h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
  color: #000;
}
.passwordWrong h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.wrongContent {
  margin: 50px 230px;
  font-size: 20px;
  color: #000;
}
.wrongButton {
  height: 58px;
  width: 100%;
  background: #bcbcbc;
  position: relative;
  top: 11px;
}
.wrongButton button {
  width: 120px;
  height: 39px;
  background: #8A79AF;
  margin-left: 256px;
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
