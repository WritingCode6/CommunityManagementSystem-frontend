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
          <a href>
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
            <router-link to="/index/homepage" class="homepage">
              <span class="homepage_word">社区主页</span>
              <span class="arrows">></span>
            </router-link>
          </li>
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
          <li>
            <router-link to="/index/visitor" class="visitor">
              <span class="visitor_word">访客管理</span>
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
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      communityLocation: '东莞 · 碧桂园',
      userName: '李华华'
    };
  },
  methods: {

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
  width: 180px;
  background: #645c84;
  /* 取消浮动 */
  /*float: left;*/
  /* 取消固定定位 */
/*  padding-bottom: 100%;
  position: fixed;*/
}
.list {
  margin-top: 20px;
  /* padding-bottom: 75px; */
  padding-bottom: 110%;
}
.list span {
  line-height: 50px;
  vertical-align: top;
}
.arrows {
  margin-left: 12px;
}
/*
.list li,
*/
.homepage,
.personal,
.user,
.parking,
.staff,
.visitor,
.notice,
.activity,
.feedback,
.property {
  display: block;
  color: #bcbbbf;
  height: 50px;
  width: 100%;
}
.homepage {
  background: url("../assets/image/icon/icon_homepage.png") no-repeat;
  background-position: 18%;
}
.personal {
  background: url("../assets/image/icon/icon_personal.png") no-repeat;
  background-position: 18%;
}
.user {
  background: url("../assets/image/icon/icon_user.png") no-repeat;
  background-position: 18%;
}
.parking {
  background: url("../assets/image/icon/icon_parking.png") no-repeat;
  background-position: 18%;
}
.staff {
  background: url("../assets/image/icon/icon_staff.png") no-repeat;
  background-position: 18%;
}
.visitor {
  background: url("../assets/image/icon/icon_visitor.png") no-repeat;
  background-position: 18%;
}
.notice {
  background: url("../assets/image/icon/icon_notice.png") no-repeat;
  background-position: 18%;
}
.activity {
  background: url("../assets/image/icon/icon_activity.png") no-repeat;
  background-position: 18%;
}
.feedback {
  background: url("../assets/image/icon/icon_feedback.png") no-repeat;
  background-position: 18%;
}
.property {
  background: url("../assets/image/icon/icon_property.png") no-repeat;
  background-position: 18%;
}
.homepage_word,
.personal_word,
.user_word,
.parking_word,
.staff_word,
.visitor_word,
.notice_word,
.activity_word,
.feedback_word,
.property_word {
  margin-left: 57px;
}
/* hover状态的变色处理 */
.homepage:hover {
  background: url("../assets/image/icon/icon_homepage_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
.homepage:hover {
  background: url("../assets/image/icon/icon_homepage_selected.png") no-repeat #9b8fca;
  background-position: 18%;
  color: #fff;
}
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
.visitor:hover {
  background: url("../assets/image/icon/icon_visitor_selected.png") no-repeat #9b8fca;
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
/* router-link被激活的CSS */
.homepage .router-link-exact-active {
  background: url("../assets/image/icon/icon_homepage_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.personal .router-link-exact-active {
  background: url("../assets/image/icon/icon_personal_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.user .router-link-exact-active {
  background: url("../assets/image/icon/icon_user_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.parking .router-link-exact-active {
  background: url("../assets/image/icon/icon_parking_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.staff .router-link-exact-active {
  background: url("../assets/image/icon/icon_staff_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.visitor .router-link-exact-active {
  background: url("../assets/image/icon/icon_visitor_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.notice .router-link-exact-active {
  background: url("../assets/image/icon/icon_notice_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.activity .router-link-exact-active {
  background: url("../assets/image/icon/icon_activity_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.feedback .router-link-exact-active {
  background: url("../assets/image/icon/icon_feedback_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
.property .router-link-exact-active {
  background: url("../assets/image/icon/icon_property_selected.png") no-repeat;
  background-position: 18%;
  color: #fff;
}
/* 原定子组件展示样式 */
/*.right_part {
   !*导航栏的宽度是165px，另外再加margin-left: 10px *!
  width: calc(99% - 175px);
   !*165+10 *!
  margin: 10px 10px 0 175px;
  overflow-y: auto;
}*/
.right_part {
  width: 100%;
  height: 100%;
  margin: 15px;
}
</style>
