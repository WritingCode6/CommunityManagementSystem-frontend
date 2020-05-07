<template>
  <div id="userBox">
    <div class="user_box">
      <h3>住户列表</h3>
      <div class="search_form">
        <div class="search_box1">
          <el-input
                  v-model="name"
                  class="search_input"
                  placeholder="请输入住户姓名"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div class="search_box2">
          <div class="select_box1">
            <label>栋数：</label>
            <el-select v-model="buildingNumber" class="select">
              <el-option value="1"></el-option>
              <el-option value="2"></el-option>
              <el-option value="3"></el-option>
              <el-option value="4"></el-option>
              <el-option value="5"></el-option>
              <el-option value="6"></el-option>
              <el-option value="7"></el-option>
              <el-option value="8"></el-option>
              <el-option value="9"></el-option>
              <el-option value="10"></el-option>
            </el-select>
          </div>
          <div class="select_box2">
            <label>房间号：</label>
            <el-select v-model="roomNumber" class="select">
              <el-option value="100"></el-option>
              <el-option value="101"></el-option>
              <el-option value="102"></el-option>
              <el-option value="103"></el-option>
              <el-option value="104"></el-option>
              <el-option value="105"></el-option>
              <el-option value="106"></el-option>
              <el-option value="107"></el-option>
              <el-option value="108"></el-option>
              <el-option value="109"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="user_table">
        <div class="add_user">
          <el-button type="primary" class="add_button">新增用户</el-button>
        </div>
        <el-table
                :data="userData"
                style="width: 100%"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="name" label="姓名" min-width="12%"></el-table-column>
          <el-table-column prop="buildingNumber" label="栋数" min-width="10%"></el-table-column>
          <el-table-column prop="roomNumber" label="房间号" min-width="10%"></el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" min-width="15%"></el-table-column>
          <el-table-column label="操作" min-width="25%">
            <a href>
              <span class="operation">修改</span>
            </a>
            <a href>
              <span class="operation">删除</span>
            </a>
            <router-link to="/index/user/userInfo">
              <span class="operation" @click="toUserInfo">查看详情</span>
            </router-link>
          </el-table-column>
        </el-table>
        <div class="page_block">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  :total="total"
                  layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userBox",
    data() {
      return {
        name: '',
        buildingNumber: '',
        roomNumber: '',
        userData: [
          {
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          },{
            name: '黄一月',
            buildingNumber: '1',
            roomNumber: '101',
            plateNumber: '粤A8888'
          }
        ],
        pageSize: 8,
        total: 100,
        currentPage: 1,
        userList: true
      }
    },
    methods: {
      //实现分页，未写
      pagination() {
        /*this.total = this.userData.length;
        if(this.userData.length > this.pageSize) {
          let totalData = this.userData;
          let data = this.userData.slice(0,this.pageSize);
          this.userData = data;
        }*/
      },
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      toUserInfo() {
        this.userList = false;
        this.$emit('userBoxData', this.userList);
      }
    },
    beforeMount() {
      this.pagination();
    }
  }
</script>

<style scoped>
  .user_box {
    margin-top: 20px;
    width: 100%;
    height: 700px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    position: relative;
    left: 55px;
    font-size: 16px;
  }
  h3 {
    font-size: 24px;
    color: #666;
    margin-left: 68px;
    margin-top: 20px;
  }
  h3::before {
    content: "";
    width: 7px;
    height: 26px;
    background: #8a79af;
    position: absolute;
    left: 40px;
    z-index: 1;
  }
  .search_form {
    display: flex;
    flex-direction: column;
    margin: 40px 0 0 40px;
  }
  .search_box2 {
    display: flex;
    margin-top: 20px;
  }
  .search_input {
    width: 450px;
    border: 1px rgba(0,0,0,0.5) solid;
    border-radius: 5px;
  }
  .el-button--primary {
    width: 130px;
    background: #8a79af;
    border-color: #8a79af;
    margin-left: 30px;
  }
  .select {
    width: 140px;
  }
  .select_box2 {
    margin-left: 30px;
  }
  .add_user {
    float: right;
    margin-top: -90px;
  }
  .add_button {
    background-color: #D38CAE;
    width: 240px;
    height: 50px;
    font-size: 20px;
    /*  font-weight: 900;*/
    line-height: 20px;
    border-color: #D38CAE;
    border-radius: 10px;
  }
  .user_table {
    margin: 20px 0 0 40px;
    width: 93%;
  }
  .operation {
    display: inline-block;
    margin-right: 10px;
  }
  .page_block {
    float: right;
    margin-top: 20px;
  }
</style>
