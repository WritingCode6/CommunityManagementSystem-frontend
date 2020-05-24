<template>
  <div id="index">
    <div class="topBar">
      <ul class="title_location">
        <li class="title">社区小管家</li>
        <li class="location">
          <img src="../assets/image/icon/icon_location.png" alt />
          {{ communityLocation }}
        </li>
      </ul>
      <ul class="welcome_msg">
        <li class="exit">
          <a href @click.prevent="openExit">
            <img src="../assets/image/icon/icon_exit.png" alt />
          </a>
        </li>
        <li class="unread_message">
          <a href="#">
            <img src="../assets/image/icon/icon_unread_message.png" alt />
          </a>
        </li>
        <li class="line">|</li>
        <li class="welcome">欢迎您！{{ userName }}</li>
      </ul>
    </div>
    <div class="content">
      <div class="nav">
        <ul class="list">
          <li>
            <router-link to="/index/personal" class="personal">
              <span class="personal_word">个人中心</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/user" class="user">
              <span class="user_word">住户相关</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/parking" class="parking">
              <span class="parking_word">车位管理</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/staff" class="staff">
              <span class="staff_word">人员管理</span>
              <span class="arrows">></span>
            </router-link>
          </li>
<!--          <li>
            <router-link to="/index/visitor" class="visitor">
              <span class="visitor_word">访客管理</span>
              <span class="arrows">></span>
            </router-link>
          </li>-->
          <li>
            <router-link to="/index/repair" class="repair">
              <span class="repair_word">物业报修</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/notice" class="notice">
              <span class="notice_word">社区通知</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/activity" class="activity">
              <span class="activity_word">社区活动</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/feedback" class="feedback">
              <span class="feedback_word">投诉反馈</span>
              <span class="arrows">></span>
            </router-link>
          </li>
          <li>
            <router-link to="/index/property" class="property">
              <span class="property_word">物业信息</span>
              <span class="arrows">></span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right_part">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="exitWindows" v-show="exitWindows">
      <div class="exitBox">
        <h4>退出当前账号</h4>
        <div class="back">
          <a href @click.prevent="closeExit">
            <img src="../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="exitContent">确定要退出吗？</div>
        <ul>
          <li class="yes">
            <button type="button" @click="exit">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeExit">否</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      communityLocation: '东莞 · 碧桂园',
      //渲染用户名，待做
      userName: '李华华',
      exitWindows: false
    };
  },
  methods: {
    //打开退出账号窗口
    openExit(){
      this.exitWindows = true;
    },
    //关闭退出账号窗口
    closeExit(){
      this.exitWindows = false;
    },
    //退出账号
    exit() {
      localStorage.removeItem("token");
      this.$router.push('/login');
      this.$message.success("退出成功！")
    }
  }
};
</script>

<style scoped>
#index {
  font-family: Microsoft Yahei, SimSun;
  font-size: 14px;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.topBar {
  height: 60px;
  width: 100%;
  line-height: 60px;
  color: #fff;
  background: #a2738c;
}
.title_location li {
  float: left;
}
.title {
  font-family: STKaiti;
  font-size: 28px;
  margin-left: 19px;
  margin-right: 72px;
  letter-spacing: 2px;
}
.location img {
  margin-right: 7px;
}
.welcome_msg li {
  float: right;
}
.exit img {
  margin: 22px 40px 0 15px;
  width: 18px;
  height: 18px;
}
.unread_message img {
  margin-top: 16px;
  width: 27px;
  height: 27px;
}
.line {
  margin: 0 20px 0 20px;
}
.content {
  display: flex;
  flex-direction: row;
}
.nav {
  font-size: 18px;
  width: 190px;
  height: 100%;
  background: #645c84;
  /* 强行适应整个页面 */
  padding-bottom: 28px;
  /* 取消浮动 */
  /*float: left;*/
  /*min-height: 800px;
  max-height: 1000px;*/
}
.list {
  margin-top: 30px;
  padding-bottom: 65px;
  /*padding-bottom: 50px;*/
  /*padding-bottom: 30%;*/
}
.list span {
  line-height: 65px;
  vertical-align: top;
}
.arrows {
  margin-left: 16px;
}
.personal,
.user,
.parking,
.staff,
/*.visitor,*/
.repair,
.notice,
.activity,
.feedback,
.property {
  display: block;
  color: #bcbbbf;
  height: 65px;
  width: 100%;
}
.personal {
  background: url("../assets/image/icon/icon_personal.png") no-repeat;
  background-position: 16%;
}
.user {
  background: url("../assets/image/icon/icon_user.png") no-repeat;
  background-position: 16%;
}
.parking {
  background: url("../assets/image/icon/icon_parking.png") no-repeat;
  background-position: 16%;
}
.staff {
  background: url("../assets/image/icon/icon_staff.png") no-repeat;
  background-position: 16%;
}
/*.visitor {
  background: url("../assets/image/icon/icon_visitor.png") no-repeat;
  background-position: 16%;
}*/
.repair {
  background: url("../assets/image/icon/icon_repair.png") no-repeat;
  background-position: 16%;
}
.notice {
  background: url("../assets/image/icon/icon_notice.png") no-repeat;
  background-position: 16%;
}
.activity {
  background: url("../assets/image/icon/icon_activity.png") no-repeat;
  background-position: 16%;
}
.feedback {
  background: url("../assets/image/icon/icon_feedback.png") no-repeat;
  background-position: 16%;
}
.property {
  background: url("../assets/image/icon/icon_property.png") no-repeat;
  background-position: 16%;
}
/* 添加动态效果 */
.personal_word,
.user_word,
.parking_word,
.staff_word,
/*.visitor_word,*/
.repair_word,
.notice_word,
.activity_word,
.feedback_word,
.property_word {
  margin-left: 70px;
}
.personal_word:hover,
.user_word:hover,
.parking_word:hover,
.staff_word:hover,
/*.visitor_word:hover,*/
.repair_word:hover,
.notice_word:hover,
.activity_word:hover,
.feedback_word:hover,
.property_word:hover {
  margin-left: 65px;
}
/* hover状态的变色处理 */
.personal:hover {
  background: url("../assets/image/icon/icon_personal_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.user:hover {
  background: url("../assets/image/icon/icon_user_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.parking:hover {
  background: url("../assets/image/icon/icon_parking_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.staff:hover {
  background: url("../assets/image/icon/icon_staff_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
/*.visitor:hover {
  background: url("../assets/image/icon/icon_visitor_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}*/
.repair:hover {
  background: url("../assets/image/icon/icon_repair_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.notice:hover {
  background: url("../assets/image/icon/icon_notice_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.activity:hover {
  background: url("../assets/image/icon/icon_activity_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.feedback:hover {
  background: url("../assets/image/icon/icon_feedback_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.property:hover {
  background: url("../assets/image/icon/icon_property_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
/* router-link被激活的CSS，有bug */
.router-link-exact-active {
  background: url("../assets/image/icon/icon_check_user_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
/* 更换布局后的子组件展示样式 */
.right_part {
  width: calc(99% - 190px);
  /*width: 100%;*/
  height: 100%;
  margin: 15px;
}
.exitWindows {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
  max-padding-bottom: 27px;
}
.exitBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.exitBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
}
.exitBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.exitBox .back {
  position: absolute;
  left: 580px;
  top: 24px;
  z-index: 9999;
}
.exitContent {
  margin: 80px 242px;
  font-size: 20px;
}
.exitBox ul {
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.exitBox .yes button {
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
.exitBox .no button {
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
</style>
