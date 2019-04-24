<template>
  <div class="loginD bgim">
    <div style="width: 100%;height: calc(100% - 90px);
    ">

      <div class="opacityc ">
        <div style="width:120px;height:30px;margin-left:140px;">
          <el-tag style="border-radius:0;width:60px;float: left;cursor:  pointer" @click="showLogin">登录</el-tag>
          <el-tag style="float: left;;border-radius:0;width:60px;cursor: pointer" type="success" @click="showRegister">注册</el-tag>
        </div>
        <div style="float:left;width: 100%;margin-top:25px" class="fade-enter-active">
          <p style="float:left;width: 20%;margin-left:40px">用户名:</p>
          <el-input style="float:left;width: 50%;" v-model="username" placeholder="用户名"
                    @focus="existsUserNameFalse"></el-input>
          <p style="float:left;width:30px;font-size:5px;color:red;margin-left:13px" v-if="existsUserName">用户名已存在</p>
        </div>
        <div style="float:left;width: 100%;">
          <p style="float:left;width: 20%;margin-left:40px">密码:</p>
          <el-input @keyup.enter.native="loginOrRegisterMethod" style="float:left;width: 50%;" v-model="password" placeholder="密码"></el-input>
        </div>
        <div style="float:left;width: 100%;" v-if="bindView">
          <p style="float:left;width: 20%;margin-left:40px">手机号:</p>
          <el-input style="float:left;width: 50%;" v-model="phone" placeholder="手机号"></el-input>
        </div>
        <div style="float:left;width: 100%;" v-if="bindView">
          <p style="float:left;width: 20%;margin-left:40px">邮箱:</p>
          <el-input style="float:left;width: 50%;" v-model="email" placeholder="邮箱"
                    @focus="existsEmailFalse"></el-input>
          <p style="float:left;width:30px;font-size:5px;color:red;margin-left:13px" v-if="existsEmail">Email已存在</p>
        </div>
        <div style="float:left;width: 100%;" v-if="bindView">
          <p style="float:left;width: 20%;margin-left:40px">提示问题:</p>
          <el-input style="float:left;width: 50%;" v-model="question" placeholder="忘记密码提示问题"></el-input>
        </div>
        <div style="float:left;width: 100%;" v-show="bindView">
          <p style="float:left;width: 20%;margin-left:40px">答案:</p>
          <el-input style="float:left;width: 50%;" v-model="answer" placeholder="忘记密码答案"></el-input>
        </div>
        <div style="margin-top:40px">
          <p style="float:left;margin-left:100px;font-size: 12px;color: #53A8FF;cursor: pointer" v-show="!bindView"
             @click="forgetPassword">忘记密码</p>
          <el-button style="float:right;margin-right:150px" type="primary" @click="loginOrRegisterMethod">
            {{loginOrRegister}}
          </el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {
    login, forgetGetQuestion, register
  } from '@/server/apiServer.js'

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        phone: '',
        email: '',
        question: '',
        answer: '',
        bindView: false,
        loginOrRegister: '登录',
        existsUserName: false,
        existsEmail: false,
      }
    },
    methods: {
      existsEmailFalse() {
        this.existsEmail = false;
      },
      existsUserNameFalse() {
        this.existsUserName = false;
      },
      showLogin() {
        this.loginOrRegister = "登录";
        this.bindView = false;
      },
      showRegister() {
        this.username = "";
        this.password="";
        this.loginOrRegister = "注册";
        this.bindView = true;
      },
      async loginOrRegisterMethod() {//登录注册通用
        if (this.loginOrRegister == "登录") {//登录
          let params = new URLSearchParams();
          params.append('username', this.username);       //你要传给后台的参数值 key/value
          params.append('password', this.password);
          try {
            let res = await login(params);
            if (res.status == 0) {
              this.$router.push('/home');
            }
            else{
              this.$message.error('密码错误');
            }
          } catch (e) {

          }
        }
        else {//注册
          let params = new URLSearchParams();
          params.append('username', this.username);
          params.append('password', this.password);
          params.append('phone', this.phone);
          params.append('email', this.email);
          params.append('question', this.question);
          params.append('answer', this.answer);
          try {
            let res = await register(params);
            if (res.status == 1) {
              if (res.msg == "用户名已存在") {
                this.existsUserName = true;
              }
              if (res.msg == "email已存在") {
                this.existsEmail = true;
              }
            }
            else {
              this.$message.success("注册成功");
              this.loginOrRegister = "登录";
              this.bindView = false;
              this.password = "";
              this.phone = "";
              this.email = "";
              this.question = "";
              this.answer = "";
            }
          } catch (e) {

          }

        }
      },
      async forgetPassword() {
        let params = new URLSearchParams();
        params.append('username', this.username);       //你要传给后台的参数值 key/value
        try {
          let res = await forgetGetQuestion(params);
          console.log(res.data);
          if (res.status == 0) {
            let question = res.data;
            sessionStorage.setItem("userName", this.username);
            sessionStorage.setItem("question", question);
            this.$router.push('/forgetQuestion');
          }
        } catch (e) {

        }
      }
    }
  }
</script>

<style scoped>
  .opacityc {
    width: 400px;
    height: 420px;
    border-radius: 10px;
    background: ghostwhite;
    opacity: 0.8;
    position: relative;
    top: 170px;
    left: 1000px;
    padding-top: 25px;
  }

  .bgim {
    background-image: url("../assets/image/timg.jpg");
    background-size: 100% 100%;
  }

  .errorClass {
    border-color: red;
  }
</style>
