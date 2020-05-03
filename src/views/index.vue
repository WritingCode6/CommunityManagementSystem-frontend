<template>
  <div id="index">
    <div class="topbar">
      <ul class="title_loca">
        <li class="title">社区小管家</li>
        <li class="location">
          <img src="../assets/image/icon/icon_location.png" alt />
          东莞·碧桂园
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
        <li class="welcome">欢迎您，李华华</li>
      </ul>
    </div>
    <div class="nav">
      <ul class="list">
        <li>
          <a href>
            <img src="../assets/image/icon/icon_homepage.png" alt />
            <span>主页</span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_personal.png" alt />
            <span>个人中心</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_user.png" alt />
            <span>住户相关</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_parking.png" alt />
            <span>车位管理</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_staff.png" alt />
            <span>人员管理</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_visitor.png" alt />
            <span>访客管理</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_notice.png" alt />
            <span>社区通知</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon.activity.png" alt />
            <span>社区活动</span>
            <span class="arrows">></span>
          </a>
        </li>
        <li>
          <a href>
            <img src="../assets/image/icon/icon_feedback.png" alt />
            <span>投诉反馈</span>
            <span class="arrows">></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  }
};
</script>

<style scoped>
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
.topbar {
  height: 59px;
  width: 100%;
  line-height: 59px;
  color: #fff;
  background: #a2738c;
}
.topbar .title_loca li {
  float: left;
}
.topbar .title {
  font-size: 24px;
  margin-left: 19px;
  margin-right: 72px;
  letter-spacing: 2px;
}
.title .location,
.welcome_msg .welcome {
  font-size: 14px;
}
.topbar .location img {
  margin-right: 7px;
}
.topbar .welcome_msg li {
  float: right;
}
.topbar .welcome_msg .exit img {
  margin-right: 45px;
  margin-left: 19px;
  margin-top: 15px;
}
.topbar .welcome_msg .unread_message img {
  margin-top: 10px;
}
.topbar .welcome_msg .line {
  margin-right: 20px;
  margin-left: 20px;
}
.nav {
  width: 176px;
  background: #645c84;
  padding-bottom: 100%;
  position: fixed;
}
.list {
  margin-top: 31px;
}
.list li {
  height: 50px;
}
.list span {
  line-height: 50px;
  vertical-align: top;
}
.list li img {
  margin-top: 13px;
  margin-left: 25px;
  margin-right: 10px;
}
.list .arrows {
  margin-left: 12px;
}
.list a {
  display: block;
  color: #bcbbbf;
  height: 50px;
  width: 100%;
}
.list a:hover {
  background: #9b8fca;
  color: #fff;
}
</style>
