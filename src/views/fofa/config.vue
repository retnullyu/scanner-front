<template>
  <div class="app-container">
    <!-- <el-table
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
      <el-table-column label="HOST">
        <template slot-scope="scope">
          {{ scope.row.host }}
        </template>
      </el-table-column>
      <el-table-column label="title" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="IP" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.IP }}
        </template>
      </el-table-column>
     <el-table-column label="port" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.port }}
        </template>
      </el-table-column>
    <el-table-column label="cert-domain" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.cert-domain }}
        </template>
      </el-table-column>
    <el-table-column label="fingerprint" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.fingerprint }}
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import { getQuery } from '@/api/fofa'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      searchkey: null,
      currentPage:1
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const param={
          key:this.searchkey,
          currentPage:this.currentPage
      }
      getQuery(param).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
