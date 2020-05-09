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
          <button type="button" >批量增加车位</button>
        </li>
        <li class="batchDelete">
          <button type="button" >批量删除车位</button>
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
        <button type="button" >增加车辆</button>
      </div>
      <div class="carPicture">
        <h4>车辆数量</h4>
        <div class="picture">
          <!-- 曲线画在这里 -->
          大概这么大（请把我删除）
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
</style>
