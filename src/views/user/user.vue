<template>
  <div id="user">
    <userBox v-show="userList" @userBoxData="getUserBox"></userBox>
    <userInfo v-show="userInfo" @userInfoData="getUserInfo"></userInfo>
  </div>
</template>

<script>
  import userBox from "../../compoment/user/userBox";
  import userInfo from "../../compoment/user/userInfo";

export default {
  name: "user",
  components: { userBox, userInfo },
  data() {
    return {
      userList: true,
      userInfo: false
    };
  },
  methods: {
    //父子组件传值
    getUserBox(childData) {
      this.userList = childData;
      this.userInfo = true;
    },
    getUserInfo(childData) {
      console.log(childData);
      this.userInfo = childData;
      this.userList = true;
    }
  }
};
</script>

<style scoped>

</style>
