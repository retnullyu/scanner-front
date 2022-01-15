<template>
  <div class="app-container">
    <el-row>
      <el-col :span="12">
        <el-input v-model="searchkey" clearable placeholder="请输入关键字" />
      </el-col>
      <el-col :span="3">
        <el-select v-model="others" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2" style="margin-left: 0px">
        <el-button type="primary" icon="el-icon-search" @click="fetchData"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="5">
        <el-button type="primary"  @click="exportThis">导出当前查询结果</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="host" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.host }}</span>
        </template>
      </el-table-column>
      <el-table-column label="server" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.server }}
        </template>
      </el-table-column>
      <el-table-column label="domain" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.domain }}
        </template>
      </el-table-column>
       <el-table-column label="port" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.port }}
        </template>
      </el-table-column>
       <el-table-column label="protocol" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.protocol }}
        </template>
      </el-table-column>
      <el-table-column label="url" width="110" align="center">
        <template slot-scope="scope">
         <a :href="scope.row.url | dispalyURL" target="_blank" class="buttonText">{{scope.row.url | dispalyURL}}</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :pager-count = "page.totalPage"
      :page-size="page.pageSize"
      :total="page.size"
      :current-page="page.page"
      layout="total,prev, pager, next, jumper"
      background
      @current-change="getNextPage"
    />
  </div>
</template>

<script>
import { getQuery,doExport } from "@/api/fofa";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: false,
      searchkey: "",
      currentPage: 1,
      others: "",
      page: {
        page: 1,
        totalPage: 5,
        pageSize: 100,
        size:100
      },
      options: [
        {
          value: "&& is_honeypot=false && is_fraud=false",
          label: "排除干扰"
        },
        {
          value: "&& is_domain=true",
          label: "只要域名相关资产"
        },
        {
          value: "&& country!=\"CN\"",
          label: "排除中国"
        },
        {
          value:"&& status_code!=\"503\" && status_code!=\"404\" && status_code!=\"403\"",
          label:"排除无法访问的"
        }
      ],
    };
  },
  created() {
    // this.fetchData()
  },
  methods: {
    getNextPage(num){
       const param = {
        keyword: this.searchkey,
        currentPage: num,
      };
       getQuery(param)
        .then((response) => {
          this.list = response.result;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
      
      
    },
    exportThis(){
      console.log("xxxx")

      const param = {
        keyword: this.searchkey
      }
      doExport(param).then((res)=>{
        console.log(res)
        window.open(process.env.VUE_APP_BASE_API+"/"+res)
      })
    

    },

    //后端查询接口处理
    fetchData(num) {
      this.listLoading = true;
      if(this.others!=""){
        this.others.forEach(val=>{
          this.searchkey = this.searchkey + val
        })
      }
      const param = {
        keyword: this.searchkey,
        currentPage: this.page.page,
      };
      getQuery(param)
        .then((response) => {
          console.log(response.result);
          this.list = response.result;
          this.page.page = response.page;
          this.page.totalPage = response.totalPage;
          this.page.size = response.size;
          this.listLoading = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
  },
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:l ast-child {
    margin-bottom: 0;
  }
}
</style>