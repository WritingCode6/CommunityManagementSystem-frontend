<template>
  <div id="activity">
    <div class="activity_box">
      <h3>社区活动</h3>
      <div class="search">
          <el-input
                  v-model="title"
                  class="search_input"
                  placeholder="请输入活动名称"></el-input>
          <el-button type="primary">搜索</el-button>
      </div>
      <div class="option">
        <h4>操作</h4>
        <button type="button">新增社区活动</button>
      </div>
      <div class="activity_table">
        <el-table
                :data="noticeData"
                style="width: 100%"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="title" min-width="45%"></el-table-column>
          <el-table-column prop="date" min-width="18%"></el-table-column>
          <el-table-column min-width="20%">
            <a href>
              <span class="operation" @click.prevent="">查看</span>
            </a>
            <a href>
              <span class="operation" @click.prevent="">修改</span>
            </a>
            <a href>
              <span class="operation" @click.prevent="">删除</span>
            </a>
          </el-table-column>
        </el-table>
        <div class="page_block">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  :total="pageCount"
                  layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "activity",
    data() {
      return {
        title:'',

        noticeData:[
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          {
            title:"社区“争做环保小卫士”卫生环境大扫除活动",
            date:"2020/05/07至2020/05/08",
          },
          
        ],
        pageSize: 4,
        pageCount:400,
        currentPage: 1,
      }
    },
    methods:{
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>

<style scoped>
.activity_box {
  margin-top: 20px;
  width: 100%;
  height: 650px;
  border-radius: 10px;
  position: relative;
  left: 55px;
  font-size: 16px;
}
.activity_box h3 {
  font-size: 24px;
  color: #666;
  margin-left: 28px;
  margin-top: 20px;
}
.activity_box h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 0;
  z-index: 1;
}
.search {
  margin-top: 30px;
}
.search_input {
  width: 500px;
  border: 1px rgba(0, 0, 0, 0.5) solid;
  border-radius: 5px;
}
.el-button--primary {
  font-size: 18px;
  width: 130px;
  background: #8a79af;
  border-color: #8a79af;
  margin-left: 30px;
  position: relative;
  z-index: 1;
}
.option {
  position: absolute;
  left: 800px;
  top:0;
  z-index: 1;
}
.option h4 {
  font-size: 24px;
  font-weight: bold;
  color: #666;
  margin-left: 20px;
}
.option h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #d38cad;
  position: absolute;
  left: -10px;
  z-index: 1;
}
.option button {
  width: 300px;
  height: 40px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
  margin-left: -10px;
}
.activity_table {
  margin-top: 10px;
}
.activity_table a {
  display: block;
  float: left;
  margin: 2px 10px;
}
.page_block {
  margin-top: 15px;
  float: right;
}
</style>
