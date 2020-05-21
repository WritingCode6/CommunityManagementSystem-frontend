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
        <button type="button" @click="openAdd">新增社区活动</button>
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
    <div class="addWindows" v-show="addWindows">
      <div class="addBox">
        <h4>新增社区活动</h4>
        <div class="back">
          <a href @click.prevent="closeAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="addContentBox">
          <el-form 
                ref="form" 
                :model="addActivity" 
                :rules="addRules"
                show-message="false">
            <el-form-item  class="activityName" prop="activityName">
              <label for="activityName">活动名称：</label>
              <el-input class="input" v-model="addActivity.activityName"></el-input>
            </el-form-item>
            <el-form-item  class="principal" prop="principal">
              <label for="principal">负责人：</label>
              <el-input class="input" v-model="addActivity.principal"></el-input>
            </el-form-item>
            <el-form-item  class="host" prop="host">
              <label for="host">主办方：</label>
              <el-input class="input" v-model="addActivity.host"></el-input>
            </el-form-item>
            <el-form-item  class="telNumber" prop="telNumber">
              <label for="telNumber">咨询电话：</label>
              <el-input class="input" v-model="addActivity.telNumber"></el-input>
            </el-form-item>
            <el-form-item  class="date">
              <label for="date">活动时间：</label>
              <el-form-item prop="startTime" class="startTimeSelect" >
                <el-date-picker
                      type="date" 
                      placeholder="选择日期" 
                       v-model="addActivity.startTime">
                </el-date-picker>
              </el-form-item>
              <p>至</p>
              <el-form-item prop="endTime" class="endTimeSelect" >
                <el-date-picker 
                      type="date" 
                      placeholder="选择日期" 
                      v-model="addActivity.endTime">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item class="content" prop="content">
              <label for="content">活动内容：</label>
              <el-input 
                    type="textarea" 
                    class="textarea" 
                    resize="none" 
                    :autosize="{ minRows: 9, maxRows: 9}" 
                    v-model="addActivity.content">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="button">
          <button type="button" value="确定新增" @click="saveAdd">确定新增</button>
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

        addActivity:{
          activityName:"",
          principal:"",
          host:"",
          telNumber:"",
          startTime:"",
          endTime:"",
          content:"",
        },
        addRules:{
          activityName:[
            { required: true, trigger: 'blur' }
          ],
          principal:[
            { required: true, trigger: 'blur' }
          ],
          host:[
            { required: true, trigger: 'blur' }
          ],
          telNumber:[
            { required: true, trigger: 'blur' }
          ],
          startTime:[
            { type: 'date', required: true, trigger: 'change' }
          ],
          endTime:[
            { type: 'date', required: true, trigger: 'change' }
          ],
          content:[
            { required: true, trigger: 'blur' }
          ]
        },

        pageSize: 4,
        pageCount:400,
        currentPage: 1,

        addWindows:false,
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
      /* 打开新增社区活动窗口 */
      openAdd(){
        this.addWindows = true;
      },
      /* 关闭新增社区活动窗口 */
      closeAdd(){
        this.addWindows = false;
      },
      /* 确定新增社区活动 */
      saveAdd(){
        this.addWindows = false;
      }
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
.addWindows,
.modifyWindows,
.deleteWindows {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.addBox,
.modifyBox {
  width: 1000px;
  height: 100%;
  background: #fff;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}
.addBox h4,
.deleteBox h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 70px;
  display: inline-block;
}
.deleteBox h4 {
  margin-left: 50px;
}
.addBox h4::before,
.modifyBox h4::before,
.deleteBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #d38cad;
  position: absolute;
  left: 40px;
  z-index: 1;
}
.deleteBox h4::before {
  left: 22px;
}
.addBox .back,
.modifyBox .back {
  position: absolute;
  left: 900px;
  top: 24px;
  z-index: 9;
}
.deleteBox .back {
  position: absolute;
  left: 580px;
  top: 24px;
}
.addContentBox,
.modifyContentBox {
  width: 920px;
  height: 75%;
  margin: 20px auto;
  overflow: hidden;
}
.addContentBox {
  padding: 20px 80px;
}
.addContentBox label,
.addContentBox p {
  font-size: 20px;
  color: #666;
}
.addBox .input{
  width: 250px;
  height: 50px;
}
.activityName {
  margin-left: 20px;
}
.principal {
  margin-top: -73px;
  margin-left: 50%;
}
.host {
  margin-left: 40px;
}
.telNumber {
  margin-top: -73px;
  margin-left: 47.8%;
}
.date {
  margin-left: 20px;
}
.date p {
  margin-top: -50px;
  margin-left: 330px;
}
.startTimeSelect,
.endTimeSelect {
  width: 200px;
  height: 50px;
}
.startTimeSelect {
  margin-top: -40px;
  margin-left: 100px;
}
.endTimeSelect {
  margin-top: -40px;
  margin-left: 360px;
}
.content {
  margin-top: -10px;
  margin-left: 20px;
}
.textarea {
  width: 850px;
  overflow-y: scroll;
  font-size: 20px;
  text-indent: 40px;
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 30px;
}
.addBox .button,
.modifyBox .button {
  margin-top: -30px;
  width: 100%;
  height: 20%;
  background: #bcbcbc;
  overflow: hidden;
}
.addBox button,
.modifyBox button {
  width: 143px;
  height: 43px;
  background: #d38cad;
  margin: 20px 420px;
  font-size: 20px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
