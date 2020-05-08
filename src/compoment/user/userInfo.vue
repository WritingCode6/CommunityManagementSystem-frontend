<template>
  <div id="userInfo">
    <div class="liverInfo">
      <h3>住户详情</h3>
      <div class="back">
          <a href @click.prevent="">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
      </div>
      <div class="liverMsg">
        <h4>住户资料</h4>
        <ul>
          <li class="name">
            <span>姓名：</span>

          </li>
          <li class="userName">
            <span>用户名：</span>

          </li>
          <li class="sex">
            <span>性别：</span>

          </li>
          
          <li class="personalId">
            <span>身份证号：</span>

          </li>
          <li class="household">
            <span>户口所在地：</span>

          </li>
          <li class="nativePlace">
            <span>籍贯：</span>

          </li>
        </ul>
      </div>
      <div class="otherMsg_house" v-show="houseRead">
        <ul class="top">
          <li class="houseMsg">
            <span>房屋信息</span>
          </li>
          <li class="carMsg">
            <a href="" @click.prevent="toCarMsg">车辆信息</a>
          </li>
        </ul>
        <div class="content">
          <ul>
            <li class="liver">
              <span>户主：</span>

            </li>
            <li class="apartmentNumber">
              <span>栋数：</span>

            </li>
            <li class="houseNumber">
              <span>房号：</span>

            </li>
          </ul>
        </div>
      </div>
      <div class="otherMsg_car" v-show="carRead">
        <ul class="top">
          <li class="houseMsg">
            <a href="" @click.prevent="toHouseMsg">房屋信息</a>
          </li>
          <li class="carMsg">
            <span>车辆信息</span>
          </li>
        </ul>
        <div class="content">
          <ul>
            <li class="carNumber">
              <span>车牌号：</span>

            </li>
            <li class="brand">
              <span>品牌：</span>

            </li>
            <li class="type">
              <span>型号：</span>

            </li>
            <li class="color">
              <span>颜色：</span>

            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userInfo",
    data() {
      return {
        houseRead:true,
        carRead:false
      }
    },
    methods: {
      //切换到车辆信息板块
      toCarMsg(){
        this.houseRead = false;
        this.carRead = true;
      },
      //切换到房屋信息板块
      toHouseMsg(){
        this.houseRead = true;
        this.carRead = false;
      }
    }
  }
</script>

<style scoped>
.liverInfo {
  width: 1200px;
  height: 100%;
  margin-top: 50px;
  position: relative;
  left: 60px;
}
h3 {
  font-size: 24px;
  font-weight: bold;
  color: #666;
  margin-left: 48px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.back {
  float:right;
  margin-top:-24px;
  margin-right: 80px;
}
.liverMsg {
  width: 1150px;
  height: 250px;
  border: 0.8px solid #bcbcbc;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 50px;
}
h4 {
  font-size: 20px;
  margin-left: 24px;
  margin-top: 10px;
}
h4::after {
  content: "";
  width: 90%;
  height: 0.8px;
  background: rgb(151, 149, 149);
  position: absolute;
  top: 88px;
  left: 25px;
  z-index: 2;
}
.liverMsg li,
.content li {
  position: relative;
  font-size: 20px;
}
.liverMsg span,
.content span {
  color: #666;
}
.name {
  left:100px;
  top:60px;
}
.userName {
  left:450px;
  top:40px;
}
.sex {
  left: 850px;
  top:20px;
}
.personalId {
  left: 60px;
  top:70px;
}
.household {
  left:410px;
  top:50px;
}
.nativePlace {
  left:850px;
  top:30px;
}
.otherMsg_house .top {
  background-image: url("../../assets/image/tab/two_left.png");
}
.otherMsg_car .top {
  background-image: url("../../assets/image/tab/two_right.png");
}
.otherMsg_house .top,
.otherMsg_car .top {
  background-size: 202px;
  background-repeat: no-repeat;
  width: 1012px;
  height: 36px;
  position: relative;
  z-index: 1;
}
.top li {
  float: left;
}
.top span,
.top a {
  display: block;
  width: 90px;
  height: 36px;
  font-size: 20px;
  text-align: center;
  line-height: 36px;
  color: black;
  position: absolute;
  z-index: 2;
}
.otherMsg_house .top span,
.otherMsg_car .top a {
  left:1px;
}
.otherMsg_house .top a,
.otherMsg_car .top span {
  left:101px;
}
.top a:hover {
  color: #fff;
}
.content {
  margin-top: -1px;
  width: 1150px;
  height: 150px;
  border: 1px solid #bcbcbc;
  border-radius: 0 10px 10px 10px;
}
.liver {
  left:100px;
  top:40px;
}
.apartmentNumber {
  left:460px;
  top:20px;
}
.houseNumber {
  left:850px;
  top:0;
}
.carNumber {
  left: 80px;
  top: 40px;
}
.brand {
  left: 460px;
  top:20px;
}
.type {
  left:850px;
  top:0;
}
.color {
  left: 100px;
  top:35px;
}
</style>
