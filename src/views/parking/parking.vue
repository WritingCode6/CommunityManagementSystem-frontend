<template>
  <div id="parking">
    <div class="parkingMsgRead" v-show="parkingMsgRead">
      <ul class="switch">
        <li class="parkingMsg">
          <span>车位信息</span>
        </li>
        <li class="carMsg">
          <a href="" @click.prevent="toCarMsg">车辆资料</a>
        </li>
      </ul>
      <div class="content">
        <!-- 车位信息写这里 -->
      </div>
      <ul class="parkingButton">
        <li class="batchAdd">
          <button type="button" @click="openBatchAdd">批量增加车位</button>
        </li>
        <li class="batchDelete">
          <button type="button" @click="openBatchDelete">批量删除车位</button>
        </li>
      </ul>
      <div class="parkingPicture">
        <h4>车位数量</h4>
        <div class="picture">
          <!-- 曲线画在这里 -->
          大概这么大（请把我删除）
        </div>
      </div>
    </div>
    <div class="carMsgRead" v-show="carMsgRead">
      <ul class="switch">
        <li class="parkingMsg">
          <a href="" @click.prevent="toParkingMsg">车位信息</a>
        </li>
        <li class="carMsg">
          <span>车辆资料</span>
        </li>
      </ul>
      <div class="content">
        <!-- 车辆资料写这里 -->
      </div>
      <div class="addCarButon">
        <button type="button" @click="openCarAdd">增加车辆信息</button>
      </div>
      <div class="carPicture">
        <h4>车辆数量</h4>
        <div class="picture">
          <!-- 曲线画在这里 -->
          大概这么大（请把我删除）
        </div>
      </div>
    </div>
    <div class="batchAddWindows" v-show="batchAddWindows">
      <div class="batchBox">
        <h4>批量增加车位</h4>
        <div class="back">
          <a href @click.prevent="closeBatchAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="batchParkingNumber">车位号：</div>
        <input type="text" class="batchinput">
        <div class="batchAddButton">
          <button type="button" @click="saveBatchAdd">确定批量新增</button>
        </div>
      </div>
    </div>
    <div class="batchDeleteWindows" v-show="batchDeleteWindows">
      <div class="batchBox">
        <h4>批量删除车位</h4>
        <div class="back">
          <a href @click.prevent="closeBatchDelete">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="batchParkingNumber">车位号：</div>
        <input type="text" class="batchinput">
        <div class="batchDeleteButton">
          <button type="button" @click="saveBatchDelete">确定批量删除</button>
        </div>
      </div>
    </div>
    <div class="carAddWindows" v-show="carAddWindows">
      <div class="carAddBox">
        <h4>新增车辆信息</h4>
        <div class="back">
          <a href @click.prevent="closeCarAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <ul class="newCarMsg">
          <li class="newName">
            车主姓名：
            <input type="text">
          </li>
          <li class="newCarNumber">
            车牌号：
            <input type="text">
          </li>
          <li class="newBrand">
            品牌：
            <input type="text">
          </li>
          <li class="newType">
            型号：
            <input type="text">
          </li>
          <li class="newColor">
            颜色：
            <input type="text">
          </li>
        </ul>
        <div class="carAddButton">
          <button type="button" @click="saveCarAdd">确定新增</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "parking",
  data() {
    return {
      parkingMsgRead:true,
      carMsgRead:false,
      batchAddWindows:false,
      batchDeleteWindows:false,
      carAddWindows:false
    };
  },
  methods:{
    //切换到车辆资料板块
    toCarMsg(){
      this.parkingMsgRead = false;
      this.carMsgRead = true;
    },
    //切换到车位信息板块
    toParkingMsg(){
      this.parkingMsgRead = true;
      this.carMsgRead = false;
    },
    //打开批量增加车位窗口
    openBatchAdd(){
      this.batchAddWindows = true;
    },
    //关闭批量增加车位窗口
    closeBatchAdd(){
      this.batchAddWindows = false;
    },
    //确定批量增加车位
    saveBatchAdd(){
      this.batchAddWindows = false;
    },
    //打开批量删除车位窗口
    openBatchDelete(){
      this.batchDeleteWindows = true;
    },
    //关闭批量删除车位窗口
    closeBatchDelete(){
      this.batchDeleteWindows = false;
    },
    //确定批量删除车位
    saveBatchDelete(){
      this.batchDeleteWindows = false;
    },
    //打开新增车辆信息窗口
    openCarAdd(){
      this.carAddWindows = true;
    },
    //关闭新增车辆信息窗口
    closeCarAdd(){
      this.carAddWindows = false;
    },
    //确定新增车辆信息
    saveCarAdd(){
      this.carAddWindows = false;
    }
  }
};
</script>

<style scoped>
.parkingMsgRead,
.carMsgRead {
  margin-top: 25px;
  position: relative;
  left: 55px;
}
.parkingMsgRead .switch {
  background-image: url("../../assets/image/tab/two_left.png");
}
.carMsgRead .switch {
  background-image: url("../../assets/image/tab/two_right.png");
}
.parkingMsgRead .switch,
.carMsgRead .switch {
  background-size: 202px;
  background-repeat: no-repeat;
  width: 1012px;
  height: 36px;
  position: relative;
  z-index: 1;
}
.switch li {
  float: left;
}
span,
a {
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
.parkingMsgRead a,
.carMsgRead span {
  left: 101px;
}
a:hover {
  color: #fff;
}
.content {
  margin-top: -1px;
  width: 70%;
  height: 550px;
  border: 1px solid #bcbcbc;
  overflow-y: scroll;
}
.parkingButton,
.parkingPicture  {
  float: left;
  margin-top: -550px;
  margin-left: 75%;
}
.parkingButton button{
  width: 255px;
  height: 75px;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
}
.batchAdd button {
  background: #D38CAD;
}
.batchDelete button {
  margin-top: 30px;
  background: #FDC38A;
}
.parkingPicture {
  width: 300px;
  height: 300px;
  border: 1px solid #bcbcbc;
  margin-top: 20px;
  border-radius: 5px;
  position: relative;
  top: -320px;
}
h4 {
  font-size: 18px;
  margin-left: 8px;
  margin-top: 8px;
}
.picture {
  width: 270px;
  height: 250px;
  margin: 10px auto;
  border: 1px solid #666;
}
.addCarButon,
.carPicture {
  float: left;
  margin-top: -500px;
  margin-left: 75%;
}
.carMsgRead button {
  width: 255px;
  height: 75px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
}
.carPicture {
  width: 300px;
  height: 300px;
  border: 1px solid #bcbcbc;
  margin-top: 20px;
  border-radius: 5px;
  position: relative;
  top: -320px;
}
.batchAddWindows,
.batchDeleteWindows,
.carAddWindows {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
}
.batchBox,
.carAddBox {
  width: 634px;
  height: 236px;
  background: #fff;
  margin: 197px auto;
  position: relative;
}
.carAddBox {
  height: 380px;
  margin: 150px auto;
}
.batchAddWindows h4,
.batchDeleteWindows h4,
.carAddWindows h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
  color: #000;
}
.batchAddWindows h4::before,
.batchDeleteWindows h4::before,
.carAddWindows h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #D38CAD;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.batchDeleteWindows h4::before {
  background: #FDC38A;
}
.batchAddWindows h4::after,
.batchDeleteWindows h4::after,
.carAddWindows h4::after {
  content: "";
  width: 94%;
  height: 1px;
  background: #666;
  position: absolute;
  top: 70px;
  left: 18px;
  z-index: 2;
} 
.batchAddWindows .back,
.batchDeleteWindows .back,
.carAddWindows .back {
  position: absolute;
  left: 550px;
  top: 24px;
  z-index: 9999;
}
.batchParkingNumber {
  font-size: 20px;
  color: #666;
  margin-top: 55px;
  margin-left: 120px;
}
.batchinput {
  float: left;
  margin-top: -25px;
  margin-left: 200px;
  font-size: 20px;
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
}
.batchAddButton,
.batchDeleteButton,
.carAddButton  {
  margin-top: 50px;
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.carAddButton {
  margin-top: 266px;
}
.batchAddButton button,
.batchDeleteButton button,
.carAddButton button {
  float: left;
  width: 120px;
  height: 39px;
  background: #D38CAD;
  margin-left: 256px;
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.batchDeleteButton button  {
  background: #FDC38A;
}
.carAddWindows ul {
  font-size: 20px;
  color: #666;
  margin-top: 79px;
}
.carAddWindows li {
  float: left;
  margin-bottom: 20px;
}
.newCarMsg input{
  height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 20px;
  width: 120px;
}
.newName {
  margin-left: 70px;
}
.newCarNumber {
  margin-left: 20px;
}
.newBrand,
.newColor {
  margin-left: 110px;
}
.newType {
  margin-left: 40px;
}
</style>
