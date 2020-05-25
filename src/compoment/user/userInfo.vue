<template>
  <div id="userInfo">
    <div class="liverInfo">
      <h3>住户详情</h3>
      <div class="back">
        <router-link to="/index/user">
          <img src="../../assets/image/icon/icon_back.png" alt @click="toUserBox" />
        </router-link>
      </div>
      <div class="liverMsg">
        <h4>住户资料</h4>
        <ul>
          <li class="name">
            <span>姓名：</span>
            {{ liverData.userInfo.name }}
          </li>
          <li class="userName">
            <span>用户名：</span>
            {{ liverData.userInfo.userName }}
          </li>
          <li class="sex">
            <span>性别：</span>
            {{ liverData.userInfo.sex }}
          </li>
          <li class="personalId">
            <span>身份证号：</span>
            {{ liverData.userInfo.idNumber }}
          </li>
          <li class="household">
            <span>户口所在地：</span>
            {{ liverData.userInfo.residenceAddress }}
          </li>
          <li class="nativePlace">
            <span>籍贯：</span>
            {{ liverData.userInfo.ancestralHome }}
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
              {{ liverData.userInfo.name }}
            </li>
            <li class="apartmentNumber">
              <span>栋数：</span>
              {{ liverData.houseInfo.buildingNumber }}
            </li>
            <li class="houseNumber">
              <span>房号：</span>
              {{ liverData.houseInfo.roomNumber }}
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
              {{ liverData.carInfo.plateNumber }}
            </li>
            <li class="brand">
              <span>品牌：</span>
              {{ liverData.carInfo.brand }}
            </li>
            <li class="type">
              <span>型号：</span>
              {{ liverData.carInfo.model }}
            </li>
            <li class="color">
              <span>颜色：</span>
              {{ liverData.carInfo.color }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { sexChange } from "../../utils/sexUtil";
  import bus from "../../api/bus";

  export default {
    name: "userInfo",
    data() {
      return {
        //住户详细信息
        liverData: {
          userInfo: {
            name: '',
            userName: '',
            sex: '',
            idNumber: '',
            ancestralHome: '',
            residenceAddress: ''
          },
          carInfo: {
            plateNumber: '',
            brand: '',
            model: '',
            color: ''
          },
          houseInfo: {
            buildingNumber: '',
            roomNumber: ''
          }
        },
        /*liverData: {
          userInfo: {
            name: '黄一月',
            userName: '黄一月',
            sex: 0,
            idNumber: '1111112222222222222',
            ancestralHome: '广东广州',
            residenceAddress: '广州市体育西路'
          },
          carInfo: {
            plateNumber: '粤A88888',
            brand: '长安',
            model: '？',
            color: '红色'
          },
          houseInfo: {
            buildingNumber: '1',
            roomNumber: '101'
          }
        },*/
        houseRead: true,
        carRead: false,
        userInfo: true
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
      },
      //父子组件传值
      toUserBox() {
        this.userInfo = false;
        this.$emit('userInfoData', this.userInfo);
      },
      //获取住户详细信息
      getUserInfo(id) {
        this.$axios.get('/api/user/getUserInfo',{
          params: {
            userId: id
          }
        }).then((res) => {
          if(res.code === 200) {
            console.log(res.data);
            this.liverData.userInfo.name = res.data.userInfo.name;
            this.liverData.userInfo.userName = res.data.userInfo.userName;
            this.liverData.userInfo.sex = sexChange(res.data.userInfo.sex);
            this.liverData.userInfo.idNumber = res.data.userInfo.idNumber;
            this.liverData.userInfo.ancestralHome = res.data.userInfo.ancestralHome;
            this.liverData.userInfo.residenceAddress = res.data.userInfo.residenceAddress;
            if(res.data.carInfo) {
              this.liverData.carInfo.plateNumber = res.data.carInfo.plateNumber;
              this.liverData.carInfo.brand = res.data.carInfo.brand;
              this.liverData.carInfo.model = res.data.carInfo.model;
              this.liverData.carInfo.color = res.data.carInfo.color;
            }
            else {
              this.liverData.carInfo.plateNumber = '暂无信息';
              this.liverData.carInfo.brand = '暂无信息';
              this.liverData.carInfo.model = '暂无信息';
              this.liverData.carInfo.color = '暂无信息';
            }
            if(res.data.houseInfo) {
              this.liverData.houseInfo.buildingNumber = res.data.houseInfo.buildingNumber;
              this.liverData.houseInfo.roomNumber = res.data.houseInfo.roomNumber;
            }
            else {
              this.liverData.houseInfo.buildingNumber = '暂无信息';
              this.liverData.houseInfo.roomNumber = '暂无信息';
            }
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    },
    beforeMount() {
      this.liverData.userInfo.sex = sexChange(this.liverData.userInfo.sex);
    },
    mounted() {
      bus.$on('userId', (res) => {
        //获取列表页传来的userId
        /*this.userId = res
        console.log(res);*/
        this.getUserInfo(res);
      })
      console.log(this.userId);
     /* this.getUserInfo();*/
    }
  }
</script>

<style scoped>
.liverInfo {
 /* width: 1200px;*/
  width: 100%;
  height: 100%;
  margin-top: 35px;
  position: relative;
  left: 60px;
}
h3 {
  font-size: 24px;
  font-weight: bold;
  color: #666;
  margin-left: 35px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 5px;
  z-index: 1;
}
.back {
  float:right;
  margin-top:-24px;
  margin-right: 80px;
}
.liverMsg {
  /*width: 1150px;*/
  width: 95%;
  height: 270px;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  margin-top: 25px;
  margin-bottom: 60px;
}
h4 {
  font-size: 20px;
  margin-left: 34px;
  margin-top: 10px;
}
h4::after {
  content: "";
  width: 90%;
  height: 1px;
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
  left:80px;
  top:60px;
}
.userName {
  left:460px;
  top:40px;
}
.sex {
  left: 850px;
  top:20px;
}
.personalId {
  left: 40px;
  top:70px;
}
.household {
  left:420px;
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
  /*width: 1012px;*/
  width: 95%;
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
  /*width: 1150px;*/
  width: 95%;
  height: 180px;
  border: 1px solid #bcbcbc;
  border-radius: 0 10px 10px 10px;
}
.liver {
  left:90px;
  top:40px;
}
.apartmentNumber {
  left:450px;
  top:20px;
}
.houseNumber {
  left:840px;
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
