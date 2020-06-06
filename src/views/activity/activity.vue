<template>
  <div id="activity">
    <div class="activity_box">
      <h3>社区活动</h3>
      <!--<div class="search">
        <el-input v-model="title" class="search_input" placeholder="请输入活动名称"></el-input>
        <el-button type="primary">搜索</el-button>
      </div>-->
      <div class="option" v-if="role">
        <!--<h4>操作</h4>-->
        <button type="button" @click="openAdd">新增社区活动</button>
      </div>
      <div class="activity_table">
        <el-table :data="activityData" style="width: 100%" highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="activityName" min-width="15%"></el-table-column>
          <el-table-column prop="startTime" min-width="60%" align="center"></el-table-column>
          <el-table-column min-width="30%" align="center">
           <span slot-scope="scope">
             <a href>
               <span class="operation" @click.prevent="openCheck(scope.row)">查看</span>
             </a>
             <a href v-if="role">
               <span class="operation" @click.prevent="openModify(scope.row)">修改</span>
             </a>
             <a href v-if="role">
               <span class="operation" @click.prevent="openDelete(scope.row)">删除</span>
             </a>
           </span>
          </el-table-column>
        </el-table>
        <div class="page_block" v-if="listNull">
          <el-pagination
                  @prev-click = "prevChange"
                  @next-click = "nextChange"
                  :current-page="paging.currentPage"
                  :page-size="paging.pageSize"
                  :total="paging.total"
                  layout="prev, pager, next, total"
          ></el-pagination>
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
          <el-form ref="addActivity" :model="addActivity" :rules="formRules">
            <el-form-item class="activityName" prop="activityName">
              <label for="activityName">活动名称：</label>
              <el-input class="input" v-model="addActivity.activityName"></el-input>
            </el-form-item>
            <el-form-item class="principal" prop="principal">
              <label for="principal">负责人：</label>
              <el-input class="input" v-model="addActivity.principal"></el-input>
            </el-form-item>
            <el-form-item class="host" prop="host">
              <label for="host">主办方：</label>
              <el-input class="input" v-model="addActivity.host"></el-input>
            </el-form-item>
            <el-form-item class="telNumber" prop="telNumber">
              <label for="telNumber">咨询电话：</label>
              <el-input class="input" v-model="addActivity.telNumber"></el-input>
            </el-form-item>
            <el-form-item class="date" required>
              <label for="date">活动时间：</label>
              <el-form-item prop="startTime" class="startTimeSelect">
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="addActivity.startTime"
                        value-format="yyyy-MM-dd"></el-date-picker>
                <el-time-picker
                        v-model="addActivity.startTime1"
                        value-format="HH:mm:ss"
                        placeholder="选择时间"></el-time-picker>
              </el-form-item>
              <p class="time_liner">至</p>
              <el-form-item prop="endTime" class="endTimeSelect">
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        v-model="addActivity.endTime"></el-date-picker>
                <el-time-picker
                        v-model="addActivity.endTime1"
                        value-format="HH:mm:ss"
                        placeholder="选择时间"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item class="content" prop="content">
              <label for="content">活动内容：</label>
              <el-input
                type="textarea"
                class="textarea"
                resize="none"
                :rows="9"
                v-model="addActivity.content"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttonBox">
          <button type="button" value="确定新增" @click="saveAdd">确定新增</button>
        </div>
      </div>
    </div>
    <div class="modifyWindows" v-show="modifyWindows">
      <div class="modifyBox">
        <h4>修改社区活动</h4>
        <div class="back">
          <a href @click.prevent="closeModify">
            <img src="../../assets/image/icon/icon_back.png" alt />
          </a>
        </div>
        <div class="modifyContentBox">
          <el-form ref="modifyActivity" :model="modifyActivity" :rules="formRules">
            <el-form-item class="activityName" prop="activityName">
              <label for="activityName">活动名称：</label>
              <el-input class="input" v-model="modifyActivity.activityName"></el-input>
            </el-form-item>
            <el-form-item class="principal" prop="principal">
              <label for="principal">负责人：</label>
              <el-input class="input" v-model="modifyActivity.principal"></el-input>
            </el-form-item>
            <el-form-item class="host" prop="host">
              <label for="host">主办方：</label>
              <el-input class="input" v-model="modifyActivity.host"></el-input>
            </el-form-item>
            <el-form-item class="telNumber" prop="telNumber">
              <label for="telNumber">咨询电话：</label>
              <el-input class="input" v-model="modifyActivity.telNumber"></el-input>
            </el-form-item>
            <el-form-item class="date" required>
              <label for="date">活动时间：</label>
              <el-form-item prop="startTime" class="startTimeSelect">
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        v-model="modifyActivity.startTime"></el-date-picker>
                <el-time-picker
                        v-model="startT"
                        value-format="HH:mm:ss"
                        placeholder="选择时间"></el-time-picker>
              </el-form-item>
              <p class="time_liner">至</p>
              <el-form-item prop="endTime" class="endTimeSelect">
                <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd"
                        v-model="modifyActivity.endTime"></el-date-picker>
                <el-time-picker
                        v-model="endT"
                        value-format="HH:mm:ss"
                        placeholder="选择时间"></el-time-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item class="content" prop="content">
              <label for="content">活动内容：</label>
              <el-input
                type="textarea"
                class="textarea"
                resize="none"
                :rows="9"
                v-model="modifyActivity.content"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttonBox">
          <button type="button" value="保存修改" @click="saveModify">保存修改</button>
        </div>
      </div>
    </div>
    <div class="deleteWindows" v-show="deleteWindows">
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
            <button type="button" @click="saveDelete">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelete">否</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="checkWindows" v-show="checkWindows">
      <h3>查看社区活动</h3>
      <img src="../../../src/assets/image/icon/icon_back.png" class="back" @click="checkWindows=false">
      <div class="check_box">
        <div class="check_detail">
          活动详情
        </div>
        <div class="check_box1">
          <div class="check_form">
            <span class="check_title">活动名称：</span>
            {{checkActivity.activityName}}
          </div>
          <div class="check_form">
            <span class="check_title">负责人：</span>
            {{checkActivity.principal}}
          </div>
          <div class="check_form">
            <span class="check_title">主办方：</span>
            {{checkActivity.host}}
          </div>
          <div class="check_form">
            <span class="check_title">咨询电话：</span>
            {{checkActivity.telNumber}}
          </div>
          <div class="check_form check_time">
            <span class="check_title">活动时间：</span>
            {{activityAllTime}}
          </div>
          <div class="check_form check_content">
            <span class="check_title">活动内容：</span>
            {{checkActivity.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {roleJudge} from "../../utils/roleUtil";
import {timeChange, timeChangeC} from "../../utils/time";
/*import {timeChange2} from "../../utils/time";*/

export default {
  name: "activity",
  inject: ['reload'],
  data() {
    return {
      //搜索的标题
      title: "",
      //存储活动开始日期和结束日期
      startTime: [],
      endTime: [],
      //绑定修改框的时间
      startT: '',
      endT: '',
      //要删除的活动ID
      delId: [],
      //活动详情中的时间渲染结果
      activityAllTime: '',
      activityData: [],
      addActivity: {
        activityName: "",
        principal: "",
        host: "",
        telNumber: "",
        startTime: "",
        endTime: "",
        content: "",
        startTime1: '',
        endTime1: ''
      },
      checkActivity: {},
      modifyActivity: {},
      formRules: {
        activityName: [
          { required: true, message:"请输入活动名称", trigger: "blur" },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        principal: [
          { required: true, message:"请输入负责人", trigger: "blur" }
        ],
        host: [
          { required: true, message:"请输入主办方", trigger: "blur" }
        ],
        telNumber: [
          { required: true, message:"请输入咨询电话", trigger: "blur" },
          {
            pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
            message: "请输入正确的11位手机号码"
          }
        ],
        startTime: [
          { type: "string", required: true, message:"请输入活动开始时间", trigger: "change" }
        ],
        endTime: [
          { type: "string", required: true, message:"请输入活动结束时间", trigger: "change" }
        ],
        content: [
          { required: true, message:"请输入活动内容", trigger: "blur" }
        ]
      },
      paging: {
        pageSize: 9,
        total: 100,
        currentPage: 1,
      },
      addWindows: false,
      modifyWindows:false,
      deleteWindows:false,
      checkWindows: false,
      role: false,
      listNull: true
    };
  },
  methods: {
    /* 打开新增社区活动窗口 */
    openAdd() {
      this.addWindows = true;
    },
    /* 关闭新增社区活动窗口 */
    closeAdd() {
      this.addWindows = false;
      this.addActivity.activityName = '';
      this.addActivity.principal = '';
      this.addActivity.host = '';
      this.addActivity.telNumber = '';
      this.addActivity.startTime = '';
      this.addActivity.endTime = '';
      this.addActivity.content = '';
      this.addActivity.startTime1 = '';
      this.addActivity.endTime1 = '';
    },
    /* 确定新增社区活动 */
    saveAdd() {
      let s = this.addActivity.startTime + ' ' + this.addActivity.startTime1;
      let e = this.addActivity.endTime + ' ' + this.addActivity.endTime1;
      this.$axios.post('/api/community/addCommunityActivity',{
         activityName: this.addActivity.activityName,
         principal: this.addActivity.principal,
         host: this.addActivity.host,
         telNumber: this.addActivity.telNumber,
         startTime: s,
         endTime: e,
         content: this.addActivity.content
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
    //打开查看社区活动窗口
    openCheck(row) {
      this.checkWindows = true;
      for(let i = 0; i<this.activityData.length; i++) {
        if(row.id === this.activityData[i].id) {
          this.checkActivity = this.activityData[i];
          if(this.startTime[i] && this.endTime[i]) {
            this.activityAllTime = timeChangeC(this.startTime[i]) + '  至  ' + timeChangeC(this.endTime[i]);
          }
          else if(!this.startTime[i] && this.endTime[i]) {
            this.activityAllTime = '未知' + '  至  ' + timeChangeC(this.endTime[i]);
          }
          else if(!this.endTime[i] && this.startTime[i]) {
            this.activityAllTime = timeChangeC(this.startTime[i]) + '  至  ' + '未知';
          }
          else {
            this.activityAllTime = '未知';
          }
          break;
        }
      }
    },
    //关闭查看社区活动窗口
    clockCheck() {
      this.checkWindows = false;
      this.checkActivity = '';
    },
    /* 打开修改社区活动窗口 */
    openModify(row) {
      for(let i = 0; i<this.activityData.length; i++) {
        if(row.id === this.activityData[i].id) {
          this.modifyActivity = this.activityData[i];
          this.modifyActivity.startTime = this.startTime[i];
          this.modifyActivity.endTime = this.endTime[i];
        }
      }
      let a1 = [];
      let a2 = [];
      a1 = this.modifyActivity.startTime.split(' ');
      a2 = this.modifyActivity.endTime.split(' ');
      this.modifyActivity.startTime = a1[0];
      this.modifyActivity.endTime = a2[0];
      this.startT = a1[1];
      this.endT = a2[1];
      this.modifyWindows = true;
    },
    /* 关闭修改社区活动窗口 */
    closeModify() {
      this.modifyWindows = false;
      this.modifyActivity = '';
      this.activityTime();
    },
    /* 确定修改社区活动 */
    saveModify() {
      this.modifyActivity.startTime = this.modifyActivity.startTime + ' ' + this.startT;
      this.modifyActivity.endTime = this.modifyActivity.endTime + ' ' + this.endT;
      this.$axios.post('/api/community/updateCommunityActivity',{
        id: this.modifyActivity.id,
        activityName: this.modifyActivity.activityName,
        host: this.modifyActivity.host,
        principal: this.modifyActivity.principal,
        telNumber: this.modifyActivity.telNumber,
        content: this.modifyActivity.content,
        startTime: this.modifyActivity.startTime,
        endTime: this.modifyActivity.endTime
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
    /* 打开删除社区通知窗口 */
    openDelete(row) {
      this.deleteWindows = true;
      this.delId.push(row.id);
    },
    /* 关闭删除社区通知窗口 */
    closeDelete() {
      this.deleteWindows = false;
      this.delId = [];
    },
    //删除选中的活动
    saveDelete() {
      this.$axios.post('/api/community/deleteCommunityActivity',this.delId)
        .then((res) => {
        if(res.code === 200) {
          this.delId = [];
          this.deleteWindows = false;
          this.$message.success('删除成功');
          this.reload();
        }
        else {
          this.$message.error(res.message);
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    //获取活动的接口
    getActivity(c) {
      this.$axios.get('/api/community/getCommunityActivity',{
        params: {
          current: c,
          size: this.paging.pageSize
        }
      }).then((res) => {
        let data = res.data;
        if(res.code === 200) {
          this.activityData = data.records;
          this.paging.total = data.total;
          if(this.activityData.length === 0) {
            this.listNull = false;
          }else {
            this.listNull = true;
          }
          this.saveTime();
          this.activityTime();
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
      this.getActivity(val);
    },
    //后一页
    nextChange(val) {
      //val是当前页
      this.getActivity(val);
    },
    //活动时间的显示情况
    activityTime() {
      for(let i = 0; i<this.activityData.length; i++) {
        if(this.activityData[i].startTime && this.activityData[i].endTime) {
          this.activityData[i].startTime = timeChange(this.activityData[i].startTime)
          this.activityData[i].endTime = timeChange(this.activityData[i].endTime)
          this.activityData[i].startTime = this.activityData[i].startTime + ' - ' + this.activityData[i].endTime;
        }
        else if(this.activityData[i].startTime) {
          this.activityData[i].startTime = timeChange(this.activityData[i].startTime)
          this.activityData[i].startTime = this.activityData[i].startTime + ' - ' + '暂无';
        }
        else if(this.activityData[i].endTime) {
          this.activityData[i].endTime = timeChange(this.activityData[i].endTime)
          this.activityData[i].startTime = '暂无' + ' - ' + this.activityData[i].endTime;
        }
        else {
          this.activityData[i].startTime = '暂无';
          this.activityData[i].endTime = '暂无';
          this.activityData[i].startTime = this.activityData[i].startTime + ' - ' + this.activityData[i].endTime;
        }
      }
    },
    //存储开始时间和结束时间
    saveTime() {
      for(let i = 0; i<this.activityData.length; i++) {
        if(this.activityData[i].startTime === undefined) {
          this.startTime[i] = ''
        }else {
          this.startTime[i] = this.activityData[i].startTime;
        }
        if(this.activityData[i].endTime === undefined) {
          this.endTime[i] = ''
        }else {
          this.endTime[i] = this.activityData[i].endTime;
        }
      }
    }
  },
  beforeMount() {
    this.role = roleJudge();
    this.getActivity(this.paging.currentPage);
  }
};
</script>

<style scoped>
.activity_box {
  margin-top: 20px;
  width: 100%;
  height: 655px;
  border-radius: 10px;
  border: 1px solid #dcdcdc;
  position: relative;
  left: 55px;
  font-size: 16px;
}
.activity_box h3,
.checkWindows h3{
  font-size: 24px;
  color: #666;
  margin-left: 88px;
  margin-top: 30px;
}
.checkWindows h3 {
  margin-left: 105px;
  margin-top: 20px;
}
.activity_box h3::before,
.checkWindows h3::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 60px;
  z-index: 1;
}
.checkWindows h3::before {
  left: 75px;
  top: 20px;
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
  top: 0;
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
  height: 55px;
  background: #d38cad;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 25px;
  margin-left: 150px;
}
.activity_table {
  /*margin-top: 50px;*/
  width: 90%;
  margin: 25px auto;
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
.deleteBox {
  width: 634px;
  height: 234px;
  background: #fff;
  margin: 177px auto;
  position: relative;
}
.addBox h4,
.modifyBox h4,
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
.modifyBox h4::before,
.deleteBox h4::before {
  background: #8a79af;
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
.deleteContent {
  margin: 80px 242px;
  font-size: 20px;
}
.addContentBox,
.modifyContentBox {
  padding: 20px 80px;
}
.addContentBox label,
.addContentBox p ,
.modifyContentBox label,
.modifyContentBox p{
  font-size: 20px;
  color: #666;
}
.addBox .input,
.modifyBox .input {
  width: 250px;
  height: 50px;
}
.startTimeSelect {
  display: block;
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
  margin-top: -55px;
  margin-left: 425px;
}
.startTimeSelect {
  margin-top: -40px;
  margin-left: 100px;
}
.endTimeSelect {
  margin-top: -50px;
  margin-left: 460px;
}
.time_liner {
  line-height: 65px;
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

.addBox .buttonBox,
.modifyBox .buttonBox {
  margin-top: -30px;
  width: 100%;
  height: 20%;
  background: #bcbcbc;
  overflow: hidden;
}
.deleteBox ul {
  width: 100%;
  height: 58px;
  background: #bcbcbc;
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
.modifyBox button {
  background: #8a79af;
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
/*查看活动*/
.back {
  float: right;
  margin-right: 7%;
  position: relative;
  bottom: 20px;
  cursor: pointer;
}
.checkWindows {
  width: 83%;
  height: 650px;
  background-color: white;
  position: absolute;
  top: 11%;
  margin-left: 1%;
  z-index: 999;
}
.check_box {
  width: 90%;
  height: 550px;
  margin: 35px 0 0 70px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  font-size: 20px;
}
.check_box1 {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.check_form {
  width: 40%;
  margin: 15px;
}
.check_time,
.check_content {
  width: 90%;
}
.check_detail {
  font-size: 22px;
  font-weight: bold;
  margin: 30px 0 30px 50px;
}
.check_title {
  color: rgba(0,0,0,0.5);
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>
<!--tips样式-->
<style>
.el-form-item__error {
  position: absolute;
  top: 95%;
  left: 100px;
}
.content .el-form-item__error {
  top: 100%;
  left: 0;
}
.activityName .el-form-item__error,
.telNumber .el-form-item__error {
  top: 40px;
  left: 100px;
}
.principal .el-form-item__error,
.host .el-form-item__error {
  top: 40px;
  left: 80px;
}
.startTimeSelect .el-form-item__error,
.endTimeSelect .el-form-item__error {
  top: 40px;
}
.startTimeSelect .el-input__inner,
.endTimeSelect .el-input__inner {
  width: 150px;
  display: block;
  float: left;
}
.el-date-editor.el-input {
  width: 160px;
}
</style>
