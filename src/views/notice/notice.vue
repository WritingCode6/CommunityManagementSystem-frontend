<template>
  <div id="notice">
    <div class="notice_box">
      <h3>社区通知</h3>
      <div class="search">
          <el-input
                  v-model="title"
                  class="search_input"
                  placeholder="请输入通知标题/发布时间"></el-input>
          <el-button type="primary">搜索</el-button>
      </div>
      <div class="option">
        <h4>操作</h4>
        <button type="button" @click="openAdd">新增社区通知</button>
      </div>
      <div class="notice_table">
        <el-table
                :data="noticeData"
                style="width: 100%"
                highlight-current-row>
          <!-- 设置min-width来自适应宽度 -->
          <el-table-column prop="title" min-width="45%"></el-table-column>
          <el-table-column prop="date" min-width="18%"></el-table-column>
          <el-table-column min-width="20%">
            <a href>
              <span class="operation" @click.prevent="openCheck">查看</span>
            </a>
            <a href>
              <span class="operation" @click.prevent="openModify">修改</span>
            </a>
            <a href>
              <span class="operation" @click.prevent="openDelete">删除</span>
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
                :rules="formRules"
                :show-message="false">
            <el-form-item class="title" prop="title">
              <el-input
                  type="text" 
                  class="input" 
                  placeholder="请输入通知标题"
                  style="font-size:20px"
                  v-model="noticeContent.title">
              </el-input>
            </el-form-item>
            <el-form-item class="addContent" prop="content">
              <el-input
                  type="textarea" 
                  placeholder="请输入通知内容"
                  style="font-size:18px"
                  resize="none" 
                  :rows="16"
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
                :rules="formRules"
                :show-message="false">
            <el-form-item class="title" prop="title">
              <el-input
                  type="text" 
                  class="input" 
                  placeholder="请输入通知标题"
                  style="font-size:20px"
                  v-model="noticeMsg.title">
              </el-input>
            </el-form-item>
            <el-form-item class="addContent" prop="content">
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
          <div>大概是这样 我懒得分段写了T T</div>
        </div>
        <div class="button">
          <button type="button" value="返回" @click="closeCheck">返回</button>
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
            <button type="button">是</button>
          </li>
          <li class="no">
            <button type="button" @click="closeDelete">否</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {
        title:'',

        noticeData:[
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          },
          {
            title:"“喜迎羊年，共贺新春”通知",
            date:"2020/05/08",
          }
        ],

        noticeContent:{
          title:"",
          content:"",
        },

        noticeMsg:{
          title:"关于举报群租房的通知",
          content:"各位居民：\n"+
              "为进一步依法规范地区房屋租赁管理，加强对“群租房”的依法治理，"+
              "保障出租房屋使用安全，消除各种安全隐患，落实人口调控措施，"+
              "谐稳定，为居民创造良好的居住环境，大屯街道将开展"+
              "房屋违法出租和“群租房”清理整治工作。为摸清底数和掌握房屋使用情况"+
              "，欢迎广大居民朋友随时举报您所居住楼层的“群租房屋”。"+
              "同时提醒已经将自己房屋出租并存在群租打隔断情况的业主尽快自行拆除"+
              "，避免给您带来不必要的损失。\n"+
              "符合群租房的条件：\n"+
              "1、 出租房屋人均面积低于5平米，每个房间居住人数超过2人；\n"+
              "2、 改变房屋内部结构分割出租，按床位等方式变相分割出租；\n"+
              "3、 将厨房、卫生间、阳台等作为卧室出租供人居住。\n"+
              "举报电话：欧陆经典社区流管站 84850529"
        },

        formRules:{
          title:[
            { required: true, trigger: "blur" }
          ],
          content:[
            { required: true, trigger: "blur" }
          ]
        },

        pageSize: 4,
        pageCount:400,
        currentPage: 1,

        addWindows:false,
        modifyWindows:false,
        checkWindows:false,
        deleteWindows:false,
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
      /* 打开新增社区通知窗口 */
      openAdd() {
        this.addWindows = true;
      },
      /* 关闭新增社区通知窗口 */
      closeAdd() {
        this.addWindows = false;
      },
      /* 确认新增社区通知 */
      saveAdd() {
        this.addWindows = false;
      },
      /* 打开修改社区通知窗口 */
      openModify() {
        this.modifyWindows = true;
      },
      /* 关闭修改社区通知窗口 */
      closeModify() {
        this.modifyWindows = false;
      },
      /* 保存修改社区通知 */
      saveModify() {
        this.modifyWindows = false;
      },
      /* 打开查看社区通知窗口 */
      openCheck() {
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
    }
  }
</script>

<style scoped>
.notice_box {
  margin-top: 20px;
  width: 100%;
  height: 650px;
  border-radius: 10px;
  position: relative;
  left: 55px;
  font-size: 16px;
}
.notice_box h3 {
  font-size: 24px;
  color: #666;
  margin-left: 28px;
  margin-top: 20px;
}
.notice_box h3::before {
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
.notice_table {
  margin-top: 10px;
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
  left: 900px;
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
  height: 75%;
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
  margin: 30px auto;
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
  overflow-y: scroll;
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
  margin-top: 30px;
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
