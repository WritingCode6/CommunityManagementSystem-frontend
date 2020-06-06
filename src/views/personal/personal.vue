<template>
  <div id="personal">
    <div class="info">
      <div v-show="onlyReadInfo">
        <h3>个人资料</h3>
        <el-form class="infoFrom">
          <div class="form_left">
            <el-form-item prop="name" class="name">
              <label>姓名：</label>
              <el-input v-model="userInfo.name" class="input" readonly></el-input>
            </el-form-item>
            <el-form-item prop="phone" class="phone">
              <label>手机号：</label>
              <el-input v-model="userInfo.phone" class="input" readonly></el-input>
            </el-form-item>
            <el-form-item prop="sex" class="sex">
              <label>性别：</label>
              <el-input v-model="userInfo.sex" class="select" readonly></el-input>
            </el-form-item>
          </div>
          <div class="form_right">
            <el-form-item prop="idNumber" class="idNumber">
              <label>身份证号：</label>
              <el-input v-model="userInfo.idNumber" class="longInput input" readonly></el-input>
            </el-form-item>
            <el-form-item prop="serviceId" class="serviceId">
              <label>工号：</label>
              <el-input v-model="userInfo.serviceId" class="input" readonly></el-input>
            </el-form-item>
            <el-form-item prop="address" class="address">
              <label>地址：</label>
              <el-input v-model="userInfo.address" class="longInput input" readonly></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="form_button">
          <el-button type="primary" @click="readToWriteInfo">修改</el-button>
          <el-button type="primary" @click="refresh">刷新</el-button>
        </div>
      </div>
      <div v-show="onlyWriteInfo">
        <h3>个人资料</h3>
        <el-form :model="userInfo" ref="userInfo[0]" class="infoFrom" :rules="infoRules">
          <div class="form_left">
            <el-form-item class="name">
              <label>姓名：</label>
              <el-input v-model="userInfo.name" class="input" readonly></el-input>
            </el-form-item>
            <el-form-item prop="phone" class="phone">
              <label>手机号：</label>
              <el-input v-model="userInfo.phone" class="input" clearable></el-input>
            </el-form-item>
            <el-form-item class="sex">
              <label>性别：</label>
              <el-input v-model="userInfo.sex" class="select" readonly></el-input>
              <!--<el-select v-model="userInfo.sex" class="select" readonly>
                <el-option label="男" value="0"></el-option>
                <el-option label="女" value="1"></el-option>
              </el-select>-->
            </el-form-item>
          </div>
          <div class="form_right">
            <el-form-item class="idNumber">
              <label>身份证号：</label>
              <el-input v-model="userInfo.idNumber" class="longInput input" readonly></el-input>
            </el-form-item>
            <el-form-item class="serviceId">
              <label>工号：</label>
              <el-input v-model="userInfo.serviceId" class="input" readonly></el-input>
            </el-form-item>
            <el-form-item prop="address" class="address">
              <label>地址：</label>
              <el-input v-model="userInfo.address" class="longInput input" clearable></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="form_button">
          <el-button type="primary" @click="writeToReadInfo">取消</el-button>
          <el-button type="primary" @click="updateStaffInfo">保存</el-button>
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
          <el-button type="primary" @click="refresh">刷新</el-button>
        </div>
      </div>
      <div v-show="onlyWritePwd">
        <h3>修改密码</h3>
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
</template>

<script>
  import {sexChange} from "../../utils/sexUtil";

export default {
  name:"personal",
  inject: ['reload'],
  data() {
    return {
      userInfo: {},
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
          /*v-model.number="userInfo[0].phone"*/
          /*{ type: 'number', message: '手机号必须为数字值', trigger: 'blur'},*/
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "请输入正确的11位手机号码"
          }
        ],
        address:[
          { required: true, message: '地址不能为空', trigger: 'blur'},
        ]
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
      this.$message.warning("注意：部分信息不可修改");
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
      this.getStaffInfo();
    },
    //密码可修改变为只读
    writeToReadPwd() {
      this.onlyReadPwd = true;
      this.onlyWritePwd = false;
      this.passwordInfoWrite.oldPwd = '';
      this.passwordInfoWrite.newPwd = '';
      this.passwordInfoWrite.againPwd = '';
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
        this.$message.warning('密码必须由中文字符、数字、字母和下划线组成');
      }
      else if (!isNaN(password)) {
        //判断Pwd是不是一个值
        this.$message.warning('密码不能为纯数字');
      }
    },
    //获取管理员个人资料
    getStaffInfo() {
      this.$axios.get('/api/user/getStaffInfo',{
        params: {
          userId: localStorage.getItem("userId")
        }
      }).then((res) => {
        let data = res.data;
        if(res.code === 200) {
          this.userInfo = data[0];
          //性别展示
          this.userInfo.sex = sexChange(this.userInfo.sex);
        }
        else {
          this.$message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //更新管理员个人资料
    updateStaffInfo() {
      this.$axios.post('/api/user/updateStaffInfo', {
        id: this.userInfo.id,
        phone: this.userInfo.phone,
        address: this.userInfo.address
      }).then((res) => {
        if(res.code === 200) {
          this.writeToReadInfo();
          this.$message.success("修改成功");
        }
        else {
          this.$message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
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
    //刷新函数
    refresh() {
      this.reload();
    }
  },
  beforeMount() {
    this.getStaffInfo();
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
  height: 345px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  position: relative;
  left: 55px;
}
.password {
  margin-top: 25px;
  height: 280px;
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
