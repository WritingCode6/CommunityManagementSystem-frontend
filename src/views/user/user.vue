<template>
  <div id="user">
    <userBox v-show="userList" @userBoxData="getUserBox"></userBox>
    <userInfo v-show="userInfo"></userInfo>
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
      userList: false,
      userInfo: true
    };
  },
  methods: {
    //父子组件传值
    getUserBox(childData) {
      this.userList = childData;
      this.userInfo = true;
    }
  }
};
</script>

<style scoped>

</style>
