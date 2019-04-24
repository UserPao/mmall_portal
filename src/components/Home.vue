<template>
  <div style="width:100%;height: 100%;">
    <headers/>
    <ul class="ulClass">
      <li v-for="(tab,index) in categoryTreeList"
          class="liClass"
          :style="{height: (index == selectedIndex ? 45 + tab.children.length * 30 : 45)  + 'px' }">
        <p style="width:220px;height:45px;margin:0;line-height: 45px"
           @click="selectIndex(index)"
           :class="{'active-01':index == selectedIndex}">
          <img style="margin-left: 5px"
               src="../assets/image/高速.png">
          <span style="margin-left: 15px">{{tab.name}}</span>

          <img style="float: right;width: 45px;height:45px;cursor: pointer"
               @click="addCategoryLick(tab.id)"
               src="../assets/image/添加.png">

          <img style="float: right;width: 13px;height:13px;margin-top:17px;margin-right:-10px;cursor: pointer"
               @click="setCategoryNameClick(tab.id,tab.name)"
               src="../assets/image/编辑.png">
        </p>
        <ul class="fadeToLeftTan-active " style="list-style: none;margin:0;padding: 0;" v-if="index == selectedIndex">
          <li style="height:30px;width:220px;line-height: 30px" v-for="item in tab.children">
            <span style="margin-left: 80px" @click="showDetail(item.id)">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
<div style="width: calc(100% - 220px);height:calc(100% - 50px);float: right;">

  <el-table
    :data="productList"
    style="width: 100%">

    <el-table-column
      prop="name"
      label="名称"
      align="center"
      width="580">
    </el-table-column>
    <el-table-column
      prop="subtitle"
      label="标题"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      align="center"
      >
    </el-table-column>
  </el-table>
</div>

  </div>
</template>

<script>
  import Header from '@/components/Header'
  import {
    getProductList, get_deep_category, get_category, add_category, set_category_name, get_product_list
  } from '@/server/apiServer.js'

  export default {
    name: "Home",
    data() {
      return {
        categoryList: [],
        categoryTreeList: [],
        selectedIndex: -1,
        productList: [],
      }
    },
    components: {
      Headers: Header
    },
    methods: {
      async get_product_list(){
        let res = await  get_product_list();
        if(res.status ==0){
          this.productList = res.data.list;
        }
      },
      async set_category_name(id, value) {
        try {
          let res = await set_category_name({'categoryName': value, 'categoryId': id});
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '改名成功'
            });
            this.categoryTreeList = [];
            this.get_category(0, this.categoryTreeList);
          }
        } catch (e) {
          console.log(e)
        }
      },
      setCategoryNameClick(id, name) {
        let obj = this;
        //添加分类
        this.$prompt('请输入新分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPlaceholder: name,
        }).then(({value}) => {
          obj.set_category_name(id, value);
        }).catch(() => {
        });
      },
      async add_category(id, value) {
        try {
          let res = await add_category({'categoryName': value, 'parentId': id});
          if (res.status == 0) {
            this.$message({
              type: 'success',
              message: '你在id为：' + id + "下成功添加了一个名字为：" + value + "的分类"
            });
            this.categoryTreeList = [];
            this.get_category(0, this.categoryTreeList);
          }
        } catch (e) {
          console.log(e)
        }
      },
      addCategoryLick(id) {
        let obj = this;
        //添加分类
        this.$prompt('请输入分类名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          obj.add_category(id, value);
        }).catch(() => {
        });
      },
      showDetail(id) {

      },
      selectIndex(index) {
        if (this.selectedIndex != index) {
          this.selectedIndex = index;
        }
        else {
          this.selectedIndex = -1;
        }
      },
      async get_category(id, List) {//循环遍历，所有的节点及其子节点
        try {
          let res = await get_category({"categoryId": id});
          if (res.status == 0) {
            for (let i = 0; i < res.data.length; i++) {
              List.push({id: res.data[i].id, children: [], name: res.data[i].name});
              this.get_category(res.data[i].id, List[i].children)
            }
            return List;
          }
        } catch (e) {
          console.log(e)
        }
      },
      async get_deep_category(id) {
        let params = new URLSearchParams();
        params.append("categoryId", id);
        try {
          let res = await get_deep_category(params);
          if (res.status == 0) {
            this.categoryList = res.data;
            console.log(this.categoryList);
          }
        } catch (e) {
          console.log(e)
        }
      },
      async getProductList() {
        let params = new URLSearchParams();
        params.append("orderBy", "price_asc");
        params.append("keyword", "i");
        try {
          let res = await getProductList(params);
          if (res.status == 0) {
            console.log(res.data);
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      // this.getProductList()
      // this.get_deep_category(0);
      this.get_category(0, this.categoryTreeList);
      this.get_product_list();
    }
  }
</script>

<style scoped>
  .ulClass {
    height: calc(100% - 50px);
    width: 220px;
    background: whitesmoke;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    float: left;
  }

  .liClass {
    width: 220px;
    height: 45px;
    line-height: 45px;
  }

  .active-01 {
    background: #409EFF;
  }
</style>
