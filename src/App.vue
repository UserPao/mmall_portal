<template>
  <div id="app">
    <!--<headers/>-->
    <router-view/>
  </div>
</template>

<script>
  import Headers from '@/components/Header.vue'
  import axios from "axios";

  export default {
    name: 'App',
    components: {
      Headers: Headers
    },
    created() {
     this.init();
    },
    methods: {
      init() {
        // 添加响应拦截器
        axios.interceptors.response.use(res => {
          if(res.data.status ==0){
              return res.data;
          }
          if(res.data.status == 1){
            return res.data;
          }
          // 对响应数据做点什么
           if (res.data.status == 10) {
            this.$message.error("检测到未登录，请先登录");
            this.$router.push('/');
          }
          else if(res.data.status ==2){
            this.$message.error("参数错误,请确认参数");
          }
        }, err => {
          // 对响应错误做点什么
          this.$message({
            type: 'error',
            message: '请求错误!'
          });
          return Promise.reject(err);
        });
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
