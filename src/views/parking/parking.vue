<template>
  <div id="parking">
    <div class="parkingMsgRead" v-show="parkingMsgRead">
      <ul class="switch">
        <li class="parkingMsg">
          <span class="parking_word">车位信息</span>
        </li>
        <li class="carMsg">
          <a href="" @click.prevent="toCarMsg" class="car_href">车辆资料</a>
        </li>
      </ul>
      <div class="content">
        <!--<div class="search_box">
          <el-input
                  v-model="name"
                  class="search_input"
                  placeholder="请输入车位号"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>-->
        <div class="parking_table">
          <el-table
                  :data="parkingData"
                  style="width: 100%"
                  highlight-current-row>
            <!-- 设置min-width来自适应宽度 -->
            <el-table-column prop="id" label="车位ID" min-width="25%"></el-table-column>
            <el-table-column prop="spaceNumber" label="车位号" min-width="25%"></el-table-column>
            <el-table-column label="操作" min-width="40%">
              <a href>
                <span class="operation">删除</span>
              </a>
            </el-table-column>
          </el-table>
          <div class="page_block">
            <el-pagination
                    :current-page="currentPage1"
                    :page-size="pageSize1"
                    :total="total1"
                    layout="prev, pager, next, total">
            </el-pagination>
          </div>
        </div>
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
          <a href="" @click.prevent="toParkingMsg" class="car_href">车位信息</a>
        </li>
        <li class="carMsg">
          <span class="parking_word">车辆资料</span>
        </li>
      </ul>
      <div class="content">
        <!--<div class="search_box">
          <el-input
                  v-model="name"
                  class="search_input"
                  placeholder="请输入车牌号"></el-input>
          <el-button type="primary" class="search">搜索</el-button>
        </div>-->
        <div class="parking_table">
          <el-table
                  :data="carData"
                  style="width: 100%"
                  highlight-current-row>
            <!-- 设置min-width来自适应宽度 -->
            <el-table-column prop="userId" label="车主ID" min-width="25%"></el-table-column>
            <el-table-column prop="plateNumber" label="车牌号" min-width="25%"></el-table-column>
            <el-table-column label="操作" min-width="40%">
              <a href>
                <span class="operation">修改</span>
              </a>
              <a href>
                <span class="operation">删除</span>
              </a>
            </el-table-column>
          </el-table>
          <div class="page_block">
            <el-pagination
                    :current-page="currentPage2"
                    :page-size="pageSize2"
                    :total="total2"
                    layout="prev, pager, next, total">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="addCarButton">
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
          <a href @click.prevent="closeBatchAdd" class="back_icon">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="batchParkingNumber">车位号：</div>
        <input
                type="text"
                class="batchInput"
                @click="inputMsg"
                v-model="inputAddBatch">
        <div class="batchAddButton">
          <button type="button" @click="saveBatchAdd">确定批量新增</button>
        </div>
      </div>
    </div>
    <div class="batchDeleteWindows" v-show="batchDeleteWindows">
      <div class="batchBox">
        <h4>批量删除车位</h4>
        <div class="back">
          <a href @click.prevent="closeBatchDelete" class="back_icon">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="batchParkingNumber">车位号：</div>
        <input
                type="text"
                class="batchInput"
                @click="inputMsg"
                v-model="inputDelBatch">
        <div class="batchDeleteButton">
          <button type="button" @click="saveBatchDelete">确定批量删除</button>
        </div>
      </div>
    </div>
    <div class="carAddWindows" v-show="carAddWindows">
      <div class="carAddBox">
        <h4>新增车辆信息</h4>
        <div class="back">
          <a href @click.prevent="closeCarAdd" class="back_icon">
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
      carAddWindows:false,
      parkingData: [
        {
          id: 1,
          spaceNumber: 11
        },
        {
          id: 2,
          spaceNumber: 22
        },
        {
          id: 3,
          spaceNumber: 3
        },
        {
          id: 4,
          spaceNumber: 4
        },
        {
          id: 5,
          spaceNumber: 5
        },
        {
          id: 6,
          spaceNumber: 11
        },
        {
          id: 7,
          spaceNumber: 11
        },
        {
          id: 8,
          spaceNumber: 11
        },
        {
          id: 9,
          spaceNumber: 11
        }
      ],
      carData: [
        {
          userId: 1,
          plateNumber: '粤A99999'
        },
        {
          userId: 2,
          plateNumber: '粤A99999'
        },
        {
          userId: 3,
          plateNumber: '粤A99999'
        },
        {
          userId: 4,
          plateNumber: '粤A99999'
        },
        {
          userId: 5,
          plateNumber: '粤A99999'
        },
        {
          userId: 6,
          plateNumber: '粤A99999'
        },
        {
          userId: 7,
          plateNumber: '粤A99999'
        },
        {
          userId: 8,
          plateNumber: '粤A99999'
        },
        {
          userId: 9,
          plateNumber: '粤A99999'
        }
      ],
      currentPage1: 1,
      pageSize1: 9,
      total1: 100,
      currentPage2: 1,
      pageSize2: 9,
      total2: 100,
      inputAddBatch: '',
      inputDelBatch: ''
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
    },
    //批量输入信息提醒
    inputMsg() {
      if(this.inputAddBatch === '' || this.inputDelBatch === '') {
        this.$message('车位号请以空格隔开');
      }
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
.parking_word,
.car_href,
.back_icon {
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
.car_href:hover {
 color: #fff;
}
.content {
 margin-top: -1px;
 width: 75%;
 height: 590px;
 border: 1px solid #bcbcbc;
}
.parkingButton,
.parkingPicture  {
 float: left;
 margin-top: -570px;
 margin-left: 79%;
}
.parkingButton button{
 width: 255px;
 height: 75px;
 font-size: 20px;
 font-weight: bold;
 color: #fff;
 outline: none;
 border-width: 0;
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
.parkingPicture,
.carPicture {
 width: 300px;
 height: 300px;
 border: 1px solid #bcbcbc;
 border-radius: 5px;
 position: relative;
 top: 245px;
 right: 20px;
}
.carPicture {
  position: relative;
  top: 195px;
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
.addCarButton,
.carPicture {
 float: left;
 margin-top: -550px;
 margin-left: 79%;
}
.carMsgRead button {
  width: 255px;
  height: 75px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
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
.batchInput {
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
 border-width: 0;
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

/*fxy*/
.parkingMsgRead .content,
.carMsgRead .content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/*.search_box {
  position: relative;
  top: 30px;
}
.search_input {
  width: 450px;
  border-radius: 5px;
}
.el-button--primary {
  width: 130px;
  background: #8a79af;
  border-color: #8a79af;
  margin-left: 30px;
  position: relative;
  z-index: 1;
}*/
.parking_table {
  margin: 50px 0 0 40px;
  width: 93%;
}
.operation {
  display: inline-block;
  margin-right: 25px;
}
.page_block {
  float: right;
  margin-top: 20px;
}
</style>
