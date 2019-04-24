<template>
  <div style="height: 50px;width:100%;background: #333536;line-height: 50px">
    <button style="float: right;background: #DF4A68;border:1px solid #DF4A68;margin-top:15px;margin-right:15px"
            @click="loginOut">退出登录
    </button>
    <el-popover
      placement="top-start"
      style="height:50px;width:50px;float: right;margin-right: 20px;"
      width="220"
      transition="fade-in-linear"
      trigger="hover"
    >
      <p>用户名:{{username}}</p>
      <p>邮箱:{{email}}</p>
      <p>电话:{{phone}}</p>
      <p>角色:{{role}}</p>
      <p>创建时间:{{createTime}}</p>
      <p>更新时间:{{updateTime}}</p>
      <a @click="updateInfo">更新信息</a>
      <img slot="reference" style="height:50px;width:50px;" src="../assets/image/user.jpg"/>
    </el-popover>

  </div>
</template>

<script>
  import * as Utils from '../assets/js/Utile'
  import {
    loginOut, get_information
  } from '@/server/apiServer.js'

  export default {
    name: "Header",
    data() {
      return {
        username: "",
        email: "",
        phone: "",
        role: '',
        createTime: '',
        updateTime: '',
      }
    },
    methods: {
      async loginOut() {
        try {
          let res = await loginOut({});
          if (res.status == 0) {
            this.$router.push('/');
          }
        } catch (e) {
          console.log(e)
        }
      },
      async get_information() {
        try {
          let res = await get_information({});
          if (res.status == 0) {
            this.username = res.data.username;
            this.email = res.data.email;
            this.phone = res.data.phone;
            this.role = res.data.role == 1 ? "普通用户" : "管理员";
            this.createTime = Utils.unicodeToTime(res.data.createTime);
            this.updateTime = Utils.unicodeToTime(res.data.updateTime);
          }
        } catch (e) {
          console.log(e)
        }
      },
      updateInfo() {

      },
    },
    created() {
      this.get_information();
    }
  }
</script>

<style scoped>

</style>
