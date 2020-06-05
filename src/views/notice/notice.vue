<template>
  <div id="notice">
    <div class="notice_box">
      <h3>社区通知</h3>
      <!--<div class="search">
          <el-input
                  v-model="title"
                  class="search_input"
                  placeholder="请输入通知标题/发布时间"></el-input>
          <el-button type="primary">搜索</el-button>
      </div>-->
      <div class="option" v-if="role">
        <!--<h4>操作</h4>-->
        <button type="button" @click="openAdd">新增社区通知</button>
      </div>
      <div class="notice_table">
        <el-table
                :data="noticeData"
                style="width: 100%; margin-top: 45px;"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="title" min-width="30%"></el-table-column>
          <el-table-column prop="createTime" min-width="40%" align="center"></el-table-column>
          <el-table-column min-width="30%" align="center">
             <span slot-scope="scope">
               <a href v-if="role">
                <span class="operation" @click.prevent="openModify(scope.row)">修改</span>
               </a>
               <a href>
                <span class="operation" @click.prevent="openCheck(scope.row)">查看</span>
               </a>
             </span>
           <!-- <a href v-if="role">
              <span class="operation" @click.prevent="openDelete">删除</span>
            </a>-->
          </el-table-column>
        </el-table>
        <div class="page_block" v-if="!listNull">
          <el-pagination
                  @prev-click = "prevChange"
                  @next-click = "nextChange"
                  :current-page="paging.currentPage"
                  :page-size="paging.pageSize"
                  :total="paging.total"
                  layout="prev, pager, next, total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="addWindows" v-show="addWindows">
      <div class="addBox">
        <h4>新增社区通知</h4>
        <div class="back">
          <a href @click.prevent="closeAdd">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="addContentBox">
          <el-form
                ref="form"
                :model="noticeContent"
                :rules="formRules">
            <el-form-item class="title" prop="title">
              <el-input
                  type="text"
                  class="input"
                  placeholder="请输入通知标题"
                  style="font-size:20px; text-align: center;"
                  v-model="noticeContent.title">
              </el-input>
            </el-form-item>
            <el-form-item class="addContent" prop="content">
              <el-input
                  type="textarea"
                  placeholder="请输入通知内容"
                  style="font-size:18px"
                  resize="none"
                  :rows="15"
                  v-model="noticeContent.content">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="button">
          <button type="button" value="确定发布" @click="saveAdd">确定发布</button>
        </div>
      </div>
    </div>
    <div class="modifyWindows" v-show="modifyWindows" >
      <div class="modifyBox">
        <h4>修改社区通知</h4>
        <div class="back">
          <a href @click.prevent="closeModify">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="modifyContentBox">
          <el-form
                ref="form"
                :model="noticeMsg"
                :rules="formRules">
            <el-form-item class="title" prop="title">
              <el-input
                  type="text"
                  class="input"
                  placeholder="请输入通知标题"
                  style="font-size:20px; text-align: center;"
                  v-model="noticeMsg.title">
              </el-input>
            </el-form-item>
            <el-form-item class="modifyContent" prop="content">
              <el-input
                  type="textarea"
                  placeholder="请输入通知内容"
                  style="font-size:18px"
                  resize="none"
                  :rows="16"
                  v-model="noticeMsg.content">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="button">
          <button type="button" value="保存修改" @click="saveModify">保存修改</button>
        </div>
      </div>
    </div>
    <div class="checkWindows" v-show="checkWindows">
      <div class="checkBox">
        <h4>查看社区通知</h4>
        <div class="checkContentBox">
          <span>{{ noticeMsg.title }}</span>
          <div>{{ noticeMsg.content }}</div>
        </div>
        <div class="button">
          <button type="button" value="返回" @click="closeCheck">返回</button>
        </div>
      </div>
    </div>
    <!--<div class="deleteWindows" v-show="deleteWindows">
      <div class="deleteBox">
        <h4>删除社区通知</h4>
        <div class="back">
          <a href @click.prevent="closeDelete">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="deleteContent">确定要删除吗？</div>
        <ul>
          <li class="yes">
            <button type="button">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelete">否</button>
          </li>
        </ul>
      </div>
    </div>-->
  </div>
</template>

<script>
  import {roleJudge} from "../../utils/roleUtil";
  import {timeChange} from "../../utils/time";

  export default {
    name: "notice",
    inject: ['reload'],
    data() {
      return {
        title:'',
        noticeData: [],
        noticeContent:{
          title:"",
          content:"",
        },
        noticeMsg: {},
        formRules:{
          title:[
            { required: true, message:"通知标题不能为空" }
          ],
          content:[
            { required: true, message:"通知内容不能为空" }
          ]
        },
        paging: {
          pageSize: 9,
          total: 100,
          currentPage: 1
        },
        addWindows:false,
        modifyWindows:false,
        checkWindows:false,
        deleteWindows:false,
        role: false,
        listNull: false
      }
    },
    methods:{
      /* 打开新增社区通知窗口 */
      openAdd() {
        this.addWindows = true;
      },
      /* 关闭新增社区通知窗口 */
      closeAdd() {
        this.addWindows = false;
        this.noticeContent.title = '';
        this.noticeContent.content = '';
      },
      /* 确认新增社区通知 */
      saveAdd() {
        this.$axios.post('/api/community/addCommunityNotice',{
          employeeId: localStorage.getItem('userId'),
          title: this.noticeContent.title,
          content: this.noticeContent.content
        }).then((res) => {
          if(res.code === 200) {
            this.addWindows = false;
            this.$message.success('新增成功');
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      /* 打开修改社区通知窗口 */
      openModify(row) {
        for(let i = 0; i<this.noticeData.length; i++) {
          if(row.id === this.noticeData[i].id) {
            this.noticeMsg = this.noticeData[i];
          }
        }
        this.modifyWindows = true;
      },
      /* 关闭修改社区通知窗口 */
      closeModify() {
        this.modifyWindows = false;
        this.noticeMsg = '';
      },
      /* 保存修改社区通知 */
      saveModify() {
        this.$axios.post('/api/community/updateCommunityNotice',{
          id: this.noticeMsg.id,
          title: this.noticeMsg.title,
          content: this.noticeMsg.content
        }).then((res) => {
          if(res.code === 200) {
            this.modifyWindows = false;
            this.$message.success('修改成功');
            this.reload();
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      /* 打开查看社区通知窗口 */
      openCheck(row) {
        for(let i = 0; i<this.noticeData.length; i++) {
          if(row.id === this.noticeData[i].id) {
            this.noticeMsg = this.noticeData[i];
          }
        }
        this.checkWindows = true;
      },
      /* 关闭修改社区通知窗口 */
      closeCheck() {
        this.checkWindows = false;
      },
      /* 打开删除社区通知窗口 */
      openDelete() {
        this.deleteWindows = true;
      },
      /* 关闭删除社区通知窗口 */
      closeDelete() {
        this.deleteWindows = false;
      },
      //获取社区通知的接口
      getNotice(c) {
        this.$axios.get('/api/community/getCommunityNotice',{
          params: {
            current: c,
            size: this.paging.pageSize
          }
        }).then((res) => {
          let data = res.data;
          if(res.code === 200) {
            this.paging.total = data.total;
            this.noticeData = data.records;
            for(let i = 0; i < this.noticeData.length; i++) {
              this.noticeData[i].createTime = timeChange(this.noticeData[i].createTime);
            }
            if(data.records.length === 0) {
              this.listNull = true;
            }else {
              this.listNull = false;
            }
          }
          else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      //前一页
      prevChange(val) {
        //val是当前页
        this.getNotice(val);
      },
      //后一页
      nextChange(val) {
        //val是当前页
        this.getNotice(val);
      }
    },
    beforeMount() {
      this.role = roleJudge();
      //获取社区通知列表
      this.getNotice(1);
      this.paging.currentPage = 1;
    }
  }
</script>

<style scoped>
.notice_box {
  margin-top: 20px;
  width: 100%;
  height: 650px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  position: relative;
  left: 55px;
  font-size: 16px;
}
.notice_box h3 {
  font-size: 24px;
  color: #666;
  margin-left: 88px;
  margin-top: 30px;
}
.notice_box h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 60px;
  z-index: 1;
}
.search {
  margin-top: 30px;
}
.search_input {
  width: 500px;
  /*border: 1px rgba(0, 0, 0, 0.5) solid;*/
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
  width: 260px;
  height: 60px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 30px;
  margin-left: 150px;
}
.notice_table {
  /*margin-top: 10px;*/
  width: 90%;
  margin: -10px auto;
}
.notice_table a {
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
.checkWindows,
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
.modifyBox,
.checkBox {
  width: 1000px;
  height: 100%;
  background: #fff;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}
.deleteBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.addBox h4,
.modifyBox h4,
.checkBox h4,
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
.checkBox h4::before,
.deleteBox h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
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
  left: 930px;
  top: 24px;
  z-index: 99;
}
.deleteBox .back {
  position: absolute;
  left: 580px;
  top: 24px;
}
.addContentBox,
.modifyContentBox,
.checkContentBox {
  width: 920px;
  height: 78%;
  margin: 20px auto;
  border: 1px solid #000;
  overflow: hidden;
}
.deleteContent {
  margin: 80px 242px;
  font-size: 20px;
}
.checkContentBox {
  overflow-y: scroll;
  position: relative;
}
.addBox .title,
.modifyBox .title,
.checkBox span {
  display: block;
  width: 300px;
  height: 25px;
  margin: 30px auto 50px;
  font-size: 24px;
  text-align: center;
}
.checkBox span::after {
  content: "";
  width: 90%;
  height: 1px;
  border: #bcbcbc 1px transparent;
  border-top: #666 1.5px dashed;
  position: absolute;
  top: 70px;
  left: 5%;
  z-index: 2;
}
.addBox .addContent,
.modifyBox .modifyContent{
  width: 850px;
  margin: 10px 33px;
  text-indent: 40px;
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 30px;
}
.checkContentBox div {
  margin: 40px 30px;
  font-size: 20px;
}
.addBox .button,
.modifyBox .button,
.checkBox .button {
  margin-top: 20px;
  width: 100%;
  height: 15%;
  background: #bcbcbc;
  overflow: hidden;
}
.deleteBox ul {
  width: 100%;
  height: 58px;
  background: #bcbcbc;
}
.addBox button,
.modifyBox button,
.checkBox button {
  width: 143px;
  height: 43px;
  background: #8A79AF;
  margin: 20px 420px;
  font-size: 20px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 10px;
  cursor: pointer;
}
.deleteBox .yes button {
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
.deleteBox .no button {
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
</style>
<style>
.el-form-item__error {
  position: absolute;
}
.addContent .el-form-item__error,
.modifyContent .el-form-item__error {
  left: -40px;
  letter-spacing:0;
}
.title .el-input__inner {
  text-align: center;
}
</style>
