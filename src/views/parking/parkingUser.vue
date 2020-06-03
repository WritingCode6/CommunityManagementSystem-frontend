<template>
  <div id="parkingUser">
    <div class="pakingUserBox">
      <div class="paking">
        <h3>车位资料</h3>
        <el-table
                :data="parkingData"
                class="table"
                height="480"
                style="width: 95%;font-size:20px"
                highlight-current-row>
          <el-table-column prop="spaceNumber" label="车位号" min-width="50%" align="center"></el-table-column>
          <el-table-column prop="id" label="车位ID" min-width="50%" align="center"></el-table-column>
        </el-table>
        <!--<div class="paking_pageblock">
          <el-pagination
            :current-page="paking_currentPage"
            :page-size="paking_pageSize"
            :total="paking_total"
            layout="prev, pager, next, total"
          ></el-pagination>
        </div>-->
      </div>
      <div class="parking_img">
        <div class="picture">
          <h4>可用车位情况</h4>
          <el-progress
                  type="circle"
                  :percentage="parkingNum"
                  class="pakingProgress"
                  :width="210"
                  :height="210"
                  :stroke-width="15"
                  color="#D7676E">
          </el-progress>
        </div>
      </div>
      <!--<div class="car">
        <h3>车辆资料</h3>
        <el-table
                :data="carData"
                class="table"
                height="500"
                style="width: 95%;font-size:20px"
                highlight-current-row>
          <el-table-column prop="plateNumber" label="车牌号" min-width="33%" align="center"></el-table-column>
          <el-table-column prop="userId" label="车主ID" min-width="33%" align="center"></el-table-column>
          <el-table-column label="操作" min-width="33%" align="center">
            <a href>
              <span class="check" @click.prevent="openCheck">查看</span>
            </a>
          </el-table-column>
        </el-table>
        &lt;!&ndash;<div class="car_pageblock">
          <el-pagination
            :current-page="car_currentPage"
            :page-size="car_pageSize"
            :total="car_total"
            layout="prev, pager, next, total"
          ></el-pagination>
        </div>&ndash;&gt;
      </div>
      <div class="checkWindows" v-show="checkWindows">
        <div class="checkBox">
          <h4>查看车辆信息</h4>
          <ul class="carInfo">
            <li class="userId">
              车主ID：
              <span>{{ carMsg.userId }}</span>
            </li>
            <li class="carNumber">
              车牌号：
              <span>{{ carMsg.carNumber }}</span>
            </li>
            <li class="brand">
              品牌：
              <span>{{ carMsg.brand }}</span>
            </li>
            <li class="type">
              型号：
              <span>{{ carMsg.type }}</span>
            </li>
            <li class="color">
               颜色：
              <span>{{ carMsg.color }}</span>
            </li>
          </ul>
          <div class="checkButton">
            <button type="button" @click="closeCheck">返回</button>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import {parkingProgress} from "../../utils/parking";

export default {
  name: "parkingUser",
  data() {
    return {
      /*paking_pageSize: 8,
      paking_total: 100,
      paking_currentPage: 1,*/
     /* car_pageSize: 8,
      car_total: 100,
      car_currentPage: 1,*/
      parkingData: [],
      carMsg:{
        userId:1,
        carNumber:'粤A8888',
        brand:'长安',
        type:'SC7103',
        color:'黑色'
      },
      checkWindows: false,
      parkingNum: 0,
      parkingTotal: 200
    };
  },
  methods: {
    //获取车位信息列表
    getParkingList() {
      this.$axios.get('/api/car/getParkingInfo')
        .then((res) => {
          if(res.code === 200) {
            this.parkingData = res.data;
            this.parkingNum = Number(parkingProgress(this.parkingData.length, this.parkingTotal));
          }else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
        console.log(err);
      })
    },
    /* 打开查看车辆信息窗口 */
    openCheck() {
      this.checkWindows = true;
    },
    /* 关闭查看车辆信息窗口 */
    closeCheck() {
      this.checkWindows = false;
    }
  },
  beforeMount() {
    this.getParkingList();
  }
};
</script>

<style scoped>
.pakingUserBox {
  display: flex;
  justify-content: space-around;
}
.paking,
.car {
  margin-top: 30px;
  width: 70%;
  height: 600px;
  float: left;
  position: relative;
  left: 50px;
  border: 1px #bcbcbc solid;
  border-radius: 14px;
}
.paking {
  margin-right: 50px;
}
h3 {
  margin-top: 30px;
  margin-left: 65px;
  font-size: 24px;
}
h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 30px;
  z-index: 1;
}
.table {
  margin: 30px auto;
}
.paking_pageblock,
.car_pageblock {
  margin-left: 40px;
}
.checkWindows {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
}
.checkBox {
  width: 634px;
  height: 380px;
  background: #fff;
  margin: 150px auto;
  position: relative;
}
.checkBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
  color: #000;
}
.checkBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.checkBox h4::after {
  content: "";
  width: 94%;
  height: 1px;
  background: #666;
  position: absolute;
  top: 70px;
  left: 18px;
  z-index: 2;
}
.checkWindows ul {
  font-size: 20px;
  color: #666;
  margin-top: 79px;
}
.checkWindows li {
  float: left;
  margin-bottom: 20px;
}
.checkWindows span {
  display: block;
  float: right;
  height: 25px;
  font-size: 20px;
  width: 120px;
}
.userId {
  margin-left: 90px;
}
.carNumber {
  margin-left: 20px;
}
.brand,
.color {
  margin-left: 110px;
}
.type {
  margin-left: 40px;
}
.checkButton {
  margin-top: 274px;
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.checkButton button {
  float: left;
  width: 120px;
  height: 39px;
  background: #8a79af;
  margin-left: 256px;
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0;
  border-radius: 10px;
  cursor: pointer;
}
/* fxy */
.parking_img {
  position: relative;
  left: 10px;
  top: 60px;
}
.parking_img h4 {
  font-size: 24px;
  font-weight: bold;
  color: #666;
  position: relative;
  left: 32px;
}
.parking_img h4::before {
  content: "";
  width: 8px;
  height: 28px;
  background: #fdc38a;
  position: absolute;
  right: 230px;
  z-index: 1;
}
.pakingProgress {
  position: relative;
  top: 40px;
  left: 10px;
}
</style>
