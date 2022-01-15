<template>
  <el-container id="user">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            v-model="page.keywords"
            clearable
            placeholder="请输入关键字"
          />
        </el-col>
        <el-col :span="6">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="fetchData"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="4"> </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中..."
        element-loading-spinner="el-icon-loading"
        :data="list"
        border
        style="width: 100%"
      >
        <el-table-column  label="查询id" fixed>
          <template slot-scope="scope">
            {{ scope.row.rid }}
          </template>
        </el-table-column>
        <el-table-column  label="查询关键字">
          <template slot-scope="scope">
            {{ scope.row.querykey }}
          </template>
        </el-table-column>
        <el-table-column  label="是否是已导出">
          <template slot-scope="scope">
            {{ scope.row.isexported }}
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">{{
            scope.row.createTime | formatDateTime
          }}</template>
        </el-table-column>
        <el-table-column label="修改时间">
          <template slot-scope="scope">{{
            scope.row.lastUpdateTime | formatDateTime
          }}</template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="335">
          <template slot-scope="scope">
            <el-button type="primary" @click="updateUserEntity(scope.row)"
              >编辑</el-button
            >
            <el-button
              v-has="'pre_user:delete'"
              type="danger"
              @click="deleteUserEntity(scope.row)"
              >删除</el-button
            >
            <el-button
              v-has="'pre_user:reset:password'"
              type="danger"
              @click="resetUserPassword(scope.row)"
              >导出</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        :page-size="page.pageNum"
        :total="page.total"
        layout="total,prev, pager, next, jumper"
        background
        @current-change="currentChange"
      />
    </el-footer>
  </el-container>
</template>

<script>
import { getQueryHistory } from "@/api/fofa";

export default {
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10,
        keywords: "",
        total: 0,
      },
      dialog: {
        visible: false,
        title: "",
      },
      list:null,
      loading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  mounted(){
    console.log("xxxxxxx")
      this.fetchData;
      
  },
  created() {
    console.log("xxxxxxx")
    this.fetchData;
  },
  methods: {
    searchByKeyWord(){
    
    },
    currentChange(){

    },
    fetchData(){
      console.log("xxxx")
      getQueryHistory().then((res)=>{
        console.log("xxxx")
        this.list = res;
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.avatar-wrapper {
  cursor: pointer;
  position: relative;
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
}
</style>
<style lang="scss">
#user {
  .el-tag:hover {
    cursor: pointer;
  }
  .el-date-editor {
    width: 100%;
  }
  .el-cascader {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
</style>
