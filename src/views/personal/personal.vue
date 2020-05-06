<template>
  <div id="personal">
    <div id="info">
      <h3>个人资料</h3>
      <el-form :model="info" :rules="infoRules" ref="info" class="infoFrom" :show-message="false">
        <el-form-item prop="userName" class="leftItem userName">
          <label>用户名：</label>
          <el-input v-model="info.userName" class="input">{{ userName }}</el-input>
        </el-form-item>
        <el-form-item prop="name" class="leftItem name">
          <label>真实姓名：</label>
          <el-input v-model="info.name" class="input"></el-input>
        </el-form-item>
        <el-form-item prop="sex" class="leftItem sex">
          <label>性别：</label>
          <el-select v-model="info.sex" class="select">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="personalId" class="rightItem personalId">
          <label>身份证号：</label>
          <el-input v-model="info.personalId" class="input"></el-input>
        </el-form-item>
        <el-form-item prop="workId" class="rightItem workId">
          <label>工作ID：</label>
          <el-input v-model="info.workId" class="input"></el-input>
        </el-form-item>
        <el-form-item prop="location" class="rightItem location">
          <label>地址：</label>
          <el-input v-model="info.location" class="input"></el-input>
        </el-form-item>
        <el-form-item class="modifyButton">
          <el-button type="primary" @click="submitForm('info')">修改</el-button>
        </el-form-item>
        <el-form-item class="saveButton">
          <el-button type="primary" @click="submitForm('info')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="password">
      <h3>修改密码</h3>
      <el-form class="passwordForm">
        <el-form-item class="leftItem old">
          <label>旧密码：</label>
          <el-input type="password" class="input" @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item class="leftItem new">
          <label>新密码：</label>
          <el-input type="password" class="input"></el-input>
        </el-form-item>
        <el-form-item class="leftItem again">
          <label>确认密码：</label>
          <el-input type="password" class="input"></el-input>
        </el-form-item>
        <el-form-item class="modifyButton">
          <el-button type="primary">修改</el-button>
        </el-form-item>
        <el-form-item class="saveButton">
          <el-button type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:"personal",
  data() {
    return {
      e:'',
      info: {
        userName: "",
        name: "",
        sex: "",
        personalId: "",
        workId: "",
        location: ""
      },
      infoRules: {
        userName: [
          { required: true, trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, trigger: "change" }],
        personalId: [{ required: true, trigger: "blur" }],
        workId: [{ required: true, trigger: "blur" }],
        location: [{ required: true, trigger: "blur" }]
      },
      userName:"靓仔",
      name: "李华华",
      sex: "男",
      personalId: "441900197609239999",
      workId: "123443",
      location: "广东省东莞市大岭山镇教育西路"
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
    },
    change(e){
      this.$forceUpdate() 
    }
  }
};
</script>

<style scoped>
#personal {
  margin-top: 10px;
  width: 1200px;
  height: 330px;
  border: 1.2px solid #dcdcdc;
  position: relative;
  left: 55px;
  border-radius: 10px;
}
h3 {
  font-size: 24px;
  color: #666666;
  margin-left: 68px;
  margin-top: 20px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 48px;
  z-index: 1;
}
h3::after {
  content: "";
  width: 1100px;
  height: 0.8px;
  background: #666666;
  position: absolute;
  top: 60px;
  left: 48px;
  z-index: 2;
}
label {
  font-size: 17px;
}
.leftItem,
.rightItem {
  position: absolute;
}
.userName {
  margin-top: 40px;
  margin-left: 100px;
}
.name {
  margin-top: 100px;
  margin-left: 83px;
}
.sex {
  margin-top: 160px;
  margin-left: 117px;
}
.personalId {
  margin-top: 40px;
  margin-left: 500px;
}
.workId {
  margin-top: 100px;
  margin-left: 515px;
}
.location {
  margin-top: 160px;
  margin-left: 533px;
}
#personal .saveButton {
  position: absolute;
  margin-top: 220px;
  margin-left: 1000px;
}
#personal .modifyButton {
  position: absolute;
  margin-top: 220px;
  margin-left: 850px;
}
.el-button--primary {
  width: 122px;
  background: #8a79af;
  border-color: #8a79af;
}
.select {
  width: 100px;
}
.input {
  width: 140px;
  height: 100px;
}
.personalId .input {
  width: 280px;
}
.workId .input {
  width: 170px;
}
.location .input {
  width: 400px;
}
#password {
  margin-top: 310px;
  width: 1200px;
  height: 260px;
  border: 1.2px solid #dcdcdc;
  position: relative;
  left: 0px;
  border-radius: 10px;
}
.old {
  margin-top: 40px;
  margin-left: 100px;
}
.new {
  margin-top: 40px;
  margin-left: 500px;
}
.again {
  margin-top: 100px;
  margin-left: 483px;
}
#password .input {
  width: 220px;
}
#password .saveButton {
  position: absolute;
  margin-top: 160px;
  margin-left: 1000px;
}
#password .modifyButton {
  position: absolute;
  margin-top: 160px;
  margin-left: 850px;
}
</style>
