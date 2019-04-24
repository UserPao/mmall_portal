<template>
  <div class="bgim forgetDiv">
    <div class="opacityc">

      <div style="float:left;width: 100%;margin-top:25px">
        <p style="float:left;width: 20%;margin-left:40px">用户名:</p>
        <el-input style="float:left;width: 50%;" v-model="username" placeholder="用户名"
                  ></el-input>
      </div>

      <div style="float:left;width: 100%;">
        <p style="float:left;width: 20%;margin-left:40px">提示问题:</p>
        <el-input style="float:left;width: 50%;" v-model="question" placeholder="忘记密码提示问题"></el-input>
      </div>
      <div style="float:left;width: 100%;">
        <p style="float:left;width: 20%;margin-left:40px">答案:</p>
        <el-input style="float:left;width: 50%;" v-model="answer" placeholder="找回密码使用的答案"></el-input>
      </div>
      <div style="float:left;width: 100%;" v-if="rightAnswer">
        <p style="float:left;width: 20%;margin-left:40px">新密码:</p>
        <el-input style="float:left;width: 50%;" v-model="newPassword" placeholder="请填写新密码"></el-input>
      </div>
      <div style="margin-top:40px">
        <el-button style="float:right;margin-right:140px" type="primary" @click="findPsw">
          {{findOrConfirm}}
        </el-button>
      </div>

    </div>

  </div>
</template>

<script>
  import {
    forgetCheckAnswer,forgetResetPassword
  } from '@/server/apiServer.js'

  export default {
    name: "ForgetQuestion",
    data() {
      return {
        question: '',
        username: "",
        answer: '',
        rightAnswer:false,
        newPassword:'',
        findOrConfirm:'找回',
        token_:'',
      }
    },
    mounted() {
      this.question = sessionStorage.getItem('question');
      this.username = sessionStorage.getItem("userName");
      sessionStorage.setItem('question','');
    },
    methods: {
      async findPsw() {
        if(this.findOrConfirm == '找回') {//验证问题答案
          let params = new URLSearchParams();
          params.append("username", this.username);
          params.append("question", this.question);
          params.append("answer", this.answer);
          try {
            let res = await forgetCheckAnswer(params);
            if (res.status == 0) {
              this.$message.success('答案正确，请填写新密码');
              this.findOrConfirm = "确认更改密码";
              this.rightAnswer = true;
              this.token_ = res.data;
            } else {
              this.$message.error('答案错误');
            }
          } catch (e) {
            console.log(e);
          }
        }else{//确认更改密码
          let params2 = new URLSearchParams();
          params2.append("username", this.username);
          params2.append("passwordNew", this.newPassword);
          params2.append("forgetToken", this.token_);
          let res = await forgetResetPassword(params2);
          if(res.status == 0){
            this.$message.success('重置密码成功');
            this.$router.push('/');
          }
          else{
            this.$message.error('');
          }
        }
      }
    }
  }
</script>

<style scoped>
  .forgetDiv {
    width: 100%;
    height: 100%;
  }

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
</style>
