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
      <a style="float:left;color:dodgerblue;cursor: pointer" @click="resetPassword">更改密码</a>
      <a style="float:right;color:dodgerblue;cursor: pointer" @click="updateInfo">维护个人信息</a>
      <img slot="reference" style="height:50px;width:50px;" src="../assets/image/user.jpg"/>
    </el-popover>
    <!--更新信息的提示框-->
    <el-dialog title="更新信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="电话" :label-width="labelWidth" :label-position="labelPosition">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="labelWidth" :label-position="labelPosition">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="忘记密码问题" :label-width="labelWidth" :label-position="labelPosition">
          <el-input v-model="form.question" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="忘记密码答案" :label-width="labelWidth" :label-position="labelPosition">
          <el-input v-model="form.answer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfoConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!--更改密码提示框-->
    <el-dialog title="更新信息" :visible.sync="pswFormVisible">
      <el-form :model="passwordForm">
        <el-form-item label="旧密码" :label-width="labelWidth" :label-position="labelPosition">
          <el-input v-model="passwordForm.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="labelWidth" :label-position="labelPosition">
          <el-input v-model="passwordForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pswFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="resetPasswordConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as Utils from '../assets/js/Utile'
  import {
    loginOut, get_information, update_information, resetPassword
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
        dialogFormVisible: false,
        pswFormVisible: false,
        labelPosition: 'right',
        labelWidth: '120px',
        form: {
          phone: '',
          email: '',
          question: '',
          answer: '',
        },
        passwordForm: {
          oldPassword: '',
          newPassword: '',
        },
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
        this.dialogFormVisible = true;
        this.form.question = this.question;
        this.form.answer = this.answer;
        this.form.email = this.email;
        this.form.phone = this.phone;
      },
      updateInfoConfirm() {
        this.dialogFormVisible = false;
        this.update_information();
      },
      resetPassword() {
        this.pswFormVisible = true;
      },
      resetPasswordConfirm() {
        this.pswFormVisible = false;
        this.resetPassword_();
      },
      async resetPassword_() {
        let parmas = new URLSearchParams();
        parmas.append("passwordOld", this.passwordForm.oldPassword);
        parmas.append("passwordNew", this.passwordForm.newPassword);
        let res = await resetPassword(parmas);
        if (res.status == 0) {
          this.$message.success("修改成功");
          this.loginOut();
        }
        if (res.status == 1) {
          this.$message.error("修改失败,原密码错误");
          this.passwordForm = {
            oldPassword: '',
            newPassword: ''
          }
        }
      }

    },
    created() {
      this.get_information();
    }
  }
</script>

<style scoped>

</style>
