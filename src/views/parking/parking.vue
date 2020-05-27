<template>
  <div id="parking">
    <div class="parkingMsgRead" v-show="parkingMsgRead">
      <ul class="switch">
        <li class="parkingMsg">
          <span class="parking_word">车位信息</span>
        </li>
        <li class="carMsg">
          <a href @click.prevent="toCarMsg" class="car_href">车辆资料</a>
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
                  :default-sort = "{prop: 'id', order: 'ascending'}"
                  highlight-current-row>
            <!-- 设置min-width来自适应宽度 -->
            <el-table-column prop="id" label="车位ID" min-width="25%" align="center" sortable></el-table-column>
            <el-table-column prop="spaceNumber" label="车位号" min-width="25%" align="center" sortable></el-table-column>
            <el-table-column label="操作" min-width="40%" align="center">
              <span slot-scope="scope">
              <a href>
                <span class="operation" @click.prevent="openDeletePark(scope.row)">删除</span>
              </a>
            </span>

            </el-table-column>
          </el-table>
          <div class="page_block" v-if="listNullParking">
            <el-pagination
                    :current-page="currentPage1"
                    :page-size="pageSize1"
                    :total="total1"
                    layout="prev, pager, next, total"
            ></el-pagination>
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
          <a href @click.prevent="toParkingMsg" class="car_href">车位信息</a>
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
        <div class="car_table">
          <el-table
                  :data="carData"
                  style="width: 100%"
                  :default-sort = "{prop: 'buildingNumber', order: 'ascending'}"
                  highlight-current-row>
            <!-- 设置min-width来自适应宽度 -->
            <el-table-column prop="userId" label="车主ID" min-width="25%" align="center" sortable></el-table-column>
            <el-table-column prop="plateNumber" label="车牌号" min-width="25%" align="center"></el-table-column>
            <el-table-column label="操作" min-width="40%" align="center">
              <span slot-scope="scope">
               <a href>
                <span class="operation" @click.prevent="openCheckCar(scope.row)">查看</span>
               </a>
              <a href>
                <span class="operation" @click.prevent="openModifyModify(scope.row)">修改</span>
              </a>
              <a href>
                <span class="operation" @click.prevent="openDeleteCar(scope.row)">删除</span>
              </a>
            </span>
           </el-table-column>
          </el-table>
          <div class="page_block" v-if="listNullCar">
            <el-pagination
                    :current-page="currentPage2"
                    :page-size="pageSize2"
                    :total="total2"
                    layout="prev, pager, next, total"
            ></el-pagination>
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
            <img src="../../assets/image/icon/icon_back.png" alt>
          </a>
        </div>
        <div class="batchParkingNumber">车位号：</div>
        <el-input type="text" class="batchInput" v-model="inputAddBatch" placeholder="车位号请以空格隔开"></el-input>
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
            <img src="../../assets/image/icon/icon_back.png" alt>
          </a>
        </div>
        <div class="batchParkingNumber">车位ID：</div>
        <el-input type="text" class="batchInput" v-model="inputDelBatch" placeholder="车位号请以空格隔开"></el-input>
        <div class="batchDeleteButton">
          <button type="button" @click="saveBatchDelete">确定批量删除</button>
        </div>
      </div>
    </div>
    <div class="carDeleteWindows" v-show="parkDeleteWindows">
      <div class="carDeleteBox">
        <h4>删除车位信息</h4>
        <div class="back">
          <a href @click.prevent="closeDeletePark">
            <img src="../../assets/image/icon/icon_back.png" alt>
          </a>
        </div>
        <div class="deleteContent">确定要删除吗？</div>
        <ul>
          <li class="yes">
            <button type="button">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDeletePark">否</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="carAddWindows" v-show="carAddWindows">
      <div class="carAddBox">
        <h4>新增车辆信息</h4>
        <div class="back">
          <a href @click.prevent="closeCarAdd" class="back_icon">
            <img src="../../assets/image/icon/icon_back.png" alt>
          </a>
        </div>
        <el-form :model="carNewMsg" ref="carNewMsg" :rules="formRules" class="carInfo"> 
          <el-form-item class="userId" prop="userId">
            <label>车主ID：</label>
            <el-input type="text" class="input" v-model="carNewMsg.userId"></el-input>
          </el-form-item>
          <el-form-item class="plateNumber" prop="plateNumber">
            <label>车牌号：</label>
            <el-input type="text" class="input" v-model="carNewMsg.plateNumber"></el-input>
          </el-form-item>
          <el-form-item class="brand" prop="brand">
            <label>品牌：</label>
            <el-input type="text" class="input" v-model="carNewMsg.brand"></el-input>
          </el-form-item>
          <el-form-item class="model" prop="model">
            <label>型号：</label>
            <el-input type="text" class="input" v-model="carNewMsg.model"></el-input>
          </el-form-item>
          <el-form-item class="color" prop="color">
            <label>颜色：</label>
            <el-input type="text" class="input" v-model="carNewMsg.color"></el-input>
          </el-form-item>
        </el-form>
        <div class="carAddButton">
          <button type="button" @click="saveCarAdd">确定新增</button>
        </div>
      </div>
    </div>
    <div class="carModifyWindows" v-show="carModifyWindows">
      <div class="carModifyBox">
        <h4>修改车辆信息</h4>
        <div class="back">
          <a href @click.prevent="closeModifyModify" class="back_icon">
            <img src="../../assets/image/icon/icon_back.png" alt>
          </a>
        </div>
        <el-form :model="carMsg" ref="carMsg" :rules="formRules" class="carInfo">
          <el-form-item class="userId" prop="userId">
            <label>车主ID：</label>
            <el-input type="text" class="input" v-model="carMsg.userId"></el-input>
          </el-form-item>
          <el-form-item class="plateNumber" prop="plateNumber">
            <label>车牌号：</label>
            <el-input type="text" class="input" v-model="carMsg.plateNumber"></el-input>
          </el-form-item>
          <el-form-item class="brand" prop="brand">
            <label>品牌：</label>
            <el-input type="text" class="input" v-model="carMsg.brand"></el-input>
          </el-form-item>
          <el-form-item class="model" prop="model">
            <label>型号：</label>
            <el-input type="text" class="input" v-model="carMsg.model"></el-input>
          </el-form-item>
          <el-form-item class="color" prop="color">
            <label>颜色：</label>
            <el-input type="text" class="input" v-model="carMsg.color"></el-input>
          </el-form-item>
        </el-form>
        <div class="carModifyButton">
          <button type="button" @click="saveCarModify">保存修改</button>
        </div>
      </div>
    </div>
    <div class="carCheckWindows" v-show="carCheckWindows">
      <div class="carCheckBox">
        <h4>查看车辆信息</h4>
        <ul class="carInfo">
          <li class="userId">
            车主ID：
            <span>{{ carMsg.userId }}</span>
          </li>
          <li class="plateNumber">
            车牌号：
            <span>{{ carMsg.plateNumber }}</span>
          </li>
          <li class="brand">
            品牌：
            <span>{{ carMsg.brand }}</span>
          </li>
          <li class="model">
            型号：
            <span>{{ carMsg.model }}</span>
          </li>
          <li class="color">
            颜色：
            <span>{{ carMsg.color }}</span>
          </li>
        </ul>
        <div class="carCheckButton">
          <button type="button" @click="closeCheckCar">返回</button>
        </div>
      </div>
    </div>
    <div class="carDeleteWindows" v-show="carDeleteWindows">
      <div class="carDeleteBox">
        <h4>删除车辆信息</h4>
        <div class="back">
          <a href @click.prevent="closeDeleteCar">
            <img src="../../assets/image/icon/icon_back.png" alt>
          </a>
        </div>
        <div class="deleteContent">确定要删除吗？</div>
        <ul>
          <li class="yes">
            <button type="button">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDeleteCar">否</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "parking",
  inject: ['reload'],  //注入App里的reload方法，刷新
  data() {
    return {
      parkingMsgRead: true,
      carMsgRead: false,
      batchAddWindows: false,
      batchDeleteWindows: false,
      parkDeleteWindows: false,
      carAddWindows: false,
      carModifyWindows: false,
      carCheckWindows: false,
      carDeleteWindows: false,
      listNullParking: false,
      listNullCar: false,
      //车位信息
      parkingData: [],
      /*parkingData: [
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
      ],*/
      //车辆信息
      /*carData: [],*/
      carData: [
        {
          userId: 1,
          plateNumber: "粤A99999"
        },
        {
          userId: 2,
          plateNumber: "粤A99999"
        },
        {
          userId: 3,
          plateNumber: "粤A99999"
        },
        {
          userId: 4,
          plateNumber: "粤A99999"
        },
        {
          userId: 5,
          plateNumber: "粤A99999"
        },
        {
          userId: 6,
          plateNumber: "粤A99999"
        },
        {
          userId: 7,
          plateNumber: "粤A99999"
        },
        {
          userId: 8,
          plateNumber: "粤A99999"
        },
        {
          userId: 9,
          plateNumber: "粤A99999"
        }
      ],
      carNewMsg:{
        userId:'',
        plateNumber:'',
        brand:'',
        model:'',
        color:''
      },
      carMsg:{
        userId:1,
        plateNumber:'粤A8888',
        brand:'长安',
        model:'SC7103',
        color:'黑色'
      },
      formRules:{
        userId:[
          { required: true, message: '车主ID不得为空'}
        ],
        plateNumber:[
          { required: true, message: '车牌号不得为空'}
        ],
        brand:[
          { required: true, message: '品牌不得为空'}
        ],
        model:[
          { required: true, message: '型号不得为空'}
        ],
        color:[
          { required: true, message: '颜色不得为空'}
        ]
      },
      currentPage1: 1,
      pageSize1: 9,
      total1: 100,
      currentPage2: 1,
      pageSize2: 9,
      total2: 100,
      inputAddBatch: "",
      inputAddBatchArr: [],
      inputDelBatch: "",
      inputDelBatchArr: []
    };
  },
  methods: {
    //切换到车辆资料板块
    toCarMsg() {
      this.parkingMsgRead = false;
      this.carMsgRead = true;
    },
    //切换到车位信息板块
    toParkingMsg() {
      this.parkingMsgRead = true;
      this.carMsgRead = false;
    },
    //获取车位信息列表
    getParkingList() {
      this.$axios.get('/api/car/getParkingInfo')
      .then((res) => {
        console.log(res);
        let data = res.data;
        if(data.length === 0) {
          this.listNullParking = false;
        }
        else {
          this.listNullParking = true;
          this.parkingData = data;
          /*this.pageBlock.pageSize = data.pageSize;
          this.pageBlock.total = data.total;
          this.pageBlock.currentPage = data.currentPage;*/
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //打开批量增加车位窗口
    openBatchAdd() {
      this.batchAddWindows = true;
      this.inputAddBatch = '';
    },
    //关闭批量增加车位窗口
    closeBatchAdd() {
      this.batchAddWindows = false;
    },
    //确定批量增加车位
    saveBatchAdd() {
      this.inputAddBatchArr = this.inputAddBatch.split(' ');
      //传json数据，花括号都不用套= =
       this.$axios.post('/api/parking/addParking',this.inputAddBatchArr)
         .then((res) => {
         if(res.code === 200) {
           this.$message.success('批量新增成功');
           this.batchAddWindows = false;
           this.reload();
         }
         else {
           this.$message.error(res.message);
         }
       }).catch((err) => {
         console.log(err);
       })
    },
    //打开批量删除车位窗口
    openBatchDelete() {
      this.batchDeleteWindows = true;
      this.inputDelBatch = '';
    },
    //关闭批量删除车位窗口
    closeBatchDelete() {
      this.batchDeleteWindows = false;
    },
    //确定批量删除车位
    saveBatchDelete() {
      this.inputDelBatchArr = this.inputDelBatch.split(' ');
      //传json数据，花括号都不用套= =
      this.$axios.post('/api/parking/deleteParking',this.inputDelBatchArr)
        .then((res) => {
          if(res.code === 200) {
            this.$message.success('批量删除成功');
            this.batchDeleteWindows = false;
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
        console.log(err);
      })
    },
    /* 打开删除车辆信息窗口 */
    openDeletePark(row) {
      this.parkDeleteWindows = true;
      let arr = [];
      arr.push(row.id);
      //传json数据，花括号都不用套= =
      this.$axios.post('/api/parking/deleteParking',arr)
        .then((res) => {
          if(res.code === 200) {
            this.$message.success('删除成功');
            this.parkDeleteWindows = false;
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
        console.log(err);
      })
    },
    /* 关闭删除车辆信息窗口 */
    closeDeletePark() {
      this.parkDeleteWindows = false;
    },
    //打开新增车辆信息窗口
    openCarAdd() {
      this.carAddWindows = true;
    },
    //关闭新增车辆信息窗口
    closeCarAdd() {
      this.carAddWindows = false;
    },
    //确定新增车辆信息
    saveCarAdd() {
      this.$axios.post('/api/car/addCarInfo',{
        userId: this.carNewMsg.userId,
        plateNumber: this.carNewMsg.plateNumber,
        brand: this.carNewMsg.brand,
        model: this.carNewMsg.model,
        color: this.carNewMsg.color
      }).then((res) => {
        console.log(res);
        if(res.code === 200) {
          this.$message.success('新增成功');
          this.carAddWindows = false;
        }
        else {
          this.$message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //打开修改车辆信息窗口
    openModifyModify(row) {
      this.carModifyWindows = true;
      console.log(row.id);
    },
    //关闭修改车辆信息窗口
    closeModifyModify() {
      this.carModifyWindows = false;
    },
    //确定修改车辆信息
    saveCarModify() {
      this.carModifyWindows = false;
    },
    /* 打开查看车辆信息窗口 */
    openCheckCar(row) {
      this.carCheckWindows = true;
      console.log(row.id);
    },
    /* 关闭查看车辆信息窗口 */
    closeCheckCar() {
      this.carCheckWindows = false;
    },
    /* 打开删除车辆信息窗口 */
    openDeleteCar(row) {
      this.carDeleteWindows = true;
      console.log(row.id);
    },
    /* 关闭删除车辆信息窗口 */
    closeDeleteCar() {
      this.carDeleteWindows = false;
    },
    /* //批量输入信息提醒
    inputMsg() {
      if (this.inputAddBatch === "" || this.inputDelBatch === "") {
        this.$message("车位号请以空格隔开");
      }
    } */
  },
  beforeMount() {
    //获取车位列表
    this.getParkingList();
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
.parkingPicture {
  float: left;
  margin-top: -570px;
  margin-left: 79%;
}
.parkingButton button {
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
  background: #d38cad;
}
.batchDelete button {
  margin-top: 30px;
  background: #fdc38a;
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
.carAddWindows,
.carModifyWindows,
.carCheckWindows,
.carDeleteWindows {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 100;
}
.batchBox,
.carAddBox,
.carModifyBox,
.carCheckBox {
  width: 634px;
  height: 236px;
  background: #fff;
  margin: 197px auto;
  position: relative;
}
.carAddBox,
.carModifyBox,
.carCheckBox {
  height: 380px;
  margin: 150px auto;
}
.carDeleteBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.batchAddWindows h4,
.batchDeleteWindows h4,
.carAddWindows h4,
.carModifyBox h4,
.carCheckBox h4,
.carDeleteBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 50px;
  display: inline-block;
  color: #000;
}
.carDeleteBox h4 {
  margin-left: 50px;
}
.batchAddWindows h4::before,
.batchDeleteWindows h4::before,
.carAddWindows h4::before,
.carModifyBox h4::before,
.carCheckBox h4::before,
.carDeleteBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #d38cad;
  position: absolute;
  left: 22px;
  z-index: 1;
}
.batchDeleteWindows h4::before {
  background: #fdc38a;
}
.carModifyBox h4::before,
.carCheckBox h4::before {
  background: #8a79af;
}
.carDeleteBox h4::before {
  background: #8a79af;
  left: 22px;
}
.batchAddWindows h4::after,
.batchDeleteWindows h4::after,
.carAddWindows h4::after,
.carModifyBox h4::after,
.carCheckBox h4::after {
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
.carAddWindows .back,
.carModifyBox .back {
  position: absolute;
  left: 550px;
  top: 24px;
  z-index: 9999;
}
.carDeleteBox .back {
  position: absolute;
  left: 580px;
  top: 24px;
}
.deleteContent {
  margin: 80px 242px;
  font-size: 20px;
}
.batchParkingNumber {
  font-size: 20px;
  color: #666;
  margin-top: 55px;
  margin-left: 120px;
}
.batchInput {
  float: left;
  margin-top: -30px;
  margin-left: 200px;
  font-size: 20px;
  width: 50%;
  padding-left: 5px;
  padding-right: 5px;
}
.batchAddButton,
.batchDeleteButton,
.carAddButton,
.carModifyButton,
.carCheckButton {
  margin-top: 50px;
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.carCheckButton {
  margin-top: 268px;
}
.batchAddButton button,
.batchDeleteButton button,
.carAddButton button,
.carModifyButton button,
.carCheckButton button {
  float: left;
  width: 120px;
  height: 39px;
  background: #d38cad;
  margin-left: 256px;
  margin-top: 10px;
  font-size: 18px;
  color: #fff;
  outline: none;
  border-width: 0;
  border-radius: 10px;
  cursor: pointer;
}
.batchDeleteButton button {
  background: #fdc38a;
}
.carModifyButton button,
.carCheckButton button {
  background: #8a79af;
}
.carDeleteBox ul {
  margin-top: -2px;
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.carDeleteBox .yes button {
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
.carDeleteBox .no button {
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
.carAddWindows ul,
.carModifyWindows ul,
.carCheckWindows ul,
.carAddWindows label,
.carModifyWindows label {
  font-size: 20px;
  color: #666;
  margin-top: 79px;
}
.carAddWindows li,
.carModifyWindows li,
.carCheckWindows li {
  float: left;
  margin-bottom: 20px;
}
.carInfo span {
  display: flex;
  float: right;
}
.carInfo .input,
.carInfo span {
  height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 20px;
  width: 120px;
}
.carAddBox .userId,
.carModifyBox .userId {
  margin-top: 79px;
}
.userId {
  margin-left: 90px;
}
.carAddBox .plateNumber,
.carModifyBox .plateNumber,
.carAddBox .color,
.carModifyBox .color {
  float: right;
  margin-top: -65px;
  margin-right: 110px;
}
.carAddBox .color,
.carModifyBox .color {
  margin-top: -130px;
}
.carCheckBox .plateNumber {
  margin-left: 20px;
}
.carAddBox .brand,
.carModifyBox .brand {
  margin-top: 20px;
}
.brand,
.carCheckBox .color {
  margin-left: 110px;
}
.carAddBox .model,
.carModifyBox .model {
  margin-left: 110px;
}
.carCheckBox .model {
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
.parking_table,
.car_table {
  margin: 50px 0 0 40px;
  width: 93%;
}
.parking_table a {
  display: block;
  width: 100%;
  padding-left: 3.5%;
}
.car_table a {
  margin-left: 20px;
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
<style>
.carAddBox .el-form-item__error, 
.carModifyBox .el-form-item__error {
  position: absolute;
  left: 90px;
}
.brand .el-form-item__error,
.color .el-form-item__error,
.model .el-form-item__error {
  left: 70px;
}
</style>