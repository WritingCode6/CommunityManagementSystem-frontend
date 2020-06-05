<template>
  <div id="property">
    <!-- 缺组件化管理 -->
    <div class="introRead" v-show="introRead">
      <ul>
        <li class="intro">
          <span>公司简介</span>
        </li>
        <li class="honor">
          <a href @click.prevent="toHonor">资质荣誉</a>
        </li>
      </ul>
      <div class="content">
        <h3>公司简介</h3>
<!--        <p>{{ msg }}</p>-->
        <p>{{ msg1 }}</p>
        <p>{{ msg2 }}</p>
        <p>{{ msg3 }}</p>
        <p>{{ msg4 }}</p>
      </div>
      <br>
      <button type="button" value="修改公司简介" @click="openModifyIntro" class="modifyButton" v-if="role">修改公司简介</button>
    </div>
    <div class="honorRead" v-show="honorRead">
      <ul>
        <li class="intro">
          <a href @click.prevent="toIntro">公司简介</a>
        </li>
        <li class="honor">
          <span>资质荣誉</span>
        </li>
      </ul>
      <div class="content honor_content">
        <!-- 可改为v-for -->
        <img src="../../assets/image/property/honor1.jpg" class="honor_photo" alt />
        <img src="../../assets/image/property/honor1.jpg" class="honor_photo" alt />
        <img src="../../assets/image/property/honor1.jpg" class="honor_photo" alt />
        <img src="../../assets/image/property/honor1.jpg" class="honor_photo" alt />
        <img src="../../assets/image/property/honor1.jpg" class="honor_photo" alt />
        <img src="../../assets/image/property/honor1.jpg" class="honor_photo" alt />
        <!--<div class="honor_photo">正在开发！</div>
        <div class="honor_photo">正在开发！</div>
        <div class="honor_photo">正在开发！</div>
        <div class="honor_photo">正在开发！</div>
        <div class="honor_photo">正在开发！</div>
        <div class="honor_photo">正在开发！</div>-->
      </div>
    </div>
    <div class="modifyIntroCover" v-show="modifyIntro">
      <div class="modifyContent">
        <div class="top">
          <h4>修改公司简介</h4>
          <div class="back">
            <a href @click.prevent="closeModifyIntro">
              <img src="../../assets/image/icon/icon_back.png" alt />
            </a>
          </div>
        </div>
        <div class="box">
          <p>公司简介</p>
          <div class="modifyContent">
            <textarea type="text" style="resize:none" v-model="msg"></textarea>
          </div>
        </div>
        <button type="button" value="保存修改" class="saveButton" @click="save">保存修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import {roleJudge} from "../../utils/roleUtil";

export default {
  name: "property",
  data() {
    return {
      msg: '成都众和为物业集团有限公司成立于2008年4月，注册资金5000万元，具有国家物业管理企业一级资质，是中国物业管理协会会员单位，' +
        '四川省房地产协会常务理事会员单位,四川省消防协会会员单位，成都市物业管理协会理事会员单位，中国皇金管家物业联盟创始成员副理事长' +
        '单位。\n    集团董事会下设：财务管理中心、综合管理中心、客户关系管理中心、品质管理中心、应急管理中心、企业发展中心，六大中心下设相关职' +
        '能部门，旗下拥有多家全资子公司，涵盖物业服务、资产管理、商业贸易、营销策划、餐饮管理等多类业务。集团成立了专职党支部，注重党建工作，' +
        '坚持以党建引领企业发展的宗旨，以成都为总部，业务覆盖全国，凭借着卓越的服务，雄厚的实力，一流的品牌，在全国各地先后设立多家分公司。' +
        '\n    集团主营业务以物业服务为主，顾问和接管物业类型包涵商业地产、工业地产、住宅、政府路政设施、学校医院等多种类型，接管物业的总建筑面积' +
        '逾3000万平方米。\n    众和为按照市场化、专业化、集团化的管理模式，建立了良好的运作机制，确定了科学规范、竭诚高效、安全文明、持续发展、依法' +
        '管理的质量方针。集团已形成了“以客为尊、追求完美、举贤用能、诚信敬业、精诚团结”的企业文化理念，以“专业管理、亲情服务”服务理念为宗旨，' +
        '努力营造安全、文明、整洁、舒适、充满亲情的服务氛围，为企业的健康发展打下了坚实的基础。',
      msg1:
        "成都众和为物业集团有限公司成立于2008年4月，注册资金5000万元，具有国家物业管理企业一级资质，是中国物业管理协会会员单位，四川省房地产协会常务理事会员单位,四川省消防协会会员单位，成都市物业管理协会理事会员单位，中国皇金管家物业联盟创始成员副理事长单位。",
      msg2:
        "集团董事会下设：财务管理中心、综合管理中心、客户关系管理中心、品质管理中心、应急管理中心、企业发展中心，六大中心下设相关职能部门，旗下拥有多家全资子公司，涵盖物业服务、资产管理、商业贸易、营销策划、餐饮管理等多类业务。集团成立了专职党支部，注重党建工作，坚持以党建引领企业发展的宗旨，以成都为总部，业务覆盖全国，凭借着卓越的服务，雄厚的实力，一流的品牌，在全国各地先后设立多家分公司。",
      msg3:
        "集团主营业务以物业服务为主，顾问和接管物业类型包涵商业地产、工业地产、住宅、政府路政设施、学校医院等多种类型，接管物业的总建筑面积逾3000万平方米。",
      msg4:
        "众和为按照市场化、专业化、集团化的管理模式，建立了良好的运作机制，确定了科学规范、竭诚高效、安全文明、持续发展、依法管理的质量方针。集团已形成了“以客为尊、追求完美、举贤用能、诚信敬业、精诚团结”的企业文化理念，以“专业管理、亲情服务”服务理念为宗旨，努力营造安全、文明、整洁、舒适、充满亲情的服务氛围，为企业的健康发展打下了坚实的基础。",
      introRead: true,
      honorRead: false,
      modifyIntro: false,
      role: false
    };
  },
  methods: {
    //切换到资质荣誉板块
    toHonor() {
      this.introRead = false;
      this.honorRead = true;
    },
    //切换到公司简介板块
    toIntro() {
      this.introRead = true,
      this.honorRead = false;
    },
    //打开修改公司简介窗口
    openModifyIntro() {
      this.modifyIntro = true;
    },
    //关闭修改公司简介窗口
    closeModifyIntro() {
      this.modifyIntro = false;
    },
    //保存修改按钮
    save(){
      this.modifyIntro = false;
    }
  },
  beforeMount() {
    this.role = roleJudge();
  }
}
</script>

<style scoped>
#property {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.introRead,
.honorRead {
  margin-top: 25px;
  position: relative;
  left: 55px;
}
.introRead ul {
  background-image: url("../../assets/image/tab/two_left.png");
}
.honorRead ul {
  background-image: url("../../assets/image/tab/two_right.png");
}
.introRead ul,
.honorRead ul {
  background-size: 202px;
  background-repeat: no-repeat;
  width: 1012px;
  height: 36px;
  position: relative;
  z-index: 1;
}
li {
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
.introRead a,
.honorRead span {
  left: 101px;
}
a:hover {
  color: #fff;
}
.content {
  margin-top: -1px;
  min-width: 1000px;
  max-width: 1200px;
/*  width: 100%;*/
  height: 550px;
  border: 1px solid #bcbcbc;
  overflow-y: scroll;
}
.honor_content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.honor_photo {
  width: 350px;
  height: 200px;
  font-size: 24px;
  border: 1px black solid;
  text-align: center;
  /* 文字上下居中：line-height = height */
  line-height: 200px;
  margin: auto 0;
}
h3 {
  margin-top: 20px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 30px;
}
.introRead p,
.honorRead p,
textarea{
  text-indent: 40px;
  font-size: 20px;
  margin: 20px 40px;
  letter-spacing: 2px;
  line-height: 40px;
}
.modifyButton {
  width: 242px;
  height: 36px;
  background: #d38cad;
  float: right;
  margin-top: 10px;
  font-size: 20px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 20px;
  cursor: pointer;
}
.modifyIntroCover {
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}
.modifyContent {
  width: 1000px;
  height: 100%;
  background: #fff;
  position: relative;
  margin: 0 auto;
}
h4 {
  font-size: 24px;
  font-weight: bold;
  padding-top: 24px;
  margin-left: 70px;
  display: inline-block;
}
h4::before {
  content: "";
  width: 7px;
  height: 26px;
  background: #8a79af;
  position: absolute;
  left: 40px;
  z-index: 1;
}
.back {
  position: absolute;
  left: 900px;
  top: 24px;
}
.box {
  width: 920px;
  height: 75%;
  margin: 20px auto;
  border: 1px solid #000;
  overflow: hidden;
}
.box p {
  margin-top: 30px;
  font-size: 24px;
  text-align: center;
}
.box textarea {
  width: 850px;
  height: 80%;
  margin: 20px 33px;
  overflow-y: scroll;
  font-size: 20px;
}
.saveButton {
  width: 143px;
  height: 43px;
  background: #8A79AF;
  margin-left: 420px;
  font-size: 20px;
  color: #fff;
  outline: none;
  border-width: 0px;
  border-radius: 20px;
  cursor: pointer;
}

</style>

