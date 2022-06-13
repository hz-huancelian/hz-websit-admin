<template>
  <div class="app-container">
    <el-form :model="searchForm" inline>
      <el-form-item>
        <el-input v-model="searchForm.organNo" placeholder="请输入机构代号" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchForm.organName" placeholder="请输入机构名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="cusData"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column type="index" label="序号" width="50" align="center" />
      <el-table-column prop="organNo" label="机构代号" align="center" />
      <el-table-column prop="organName" label="机构名称" align="center" />
      <el-table-column prop="organLegal" label="机构法人" align="center" />
      <el-table-column prop="link" label="联系人" align="center" />
      <el-table-column prop="phone" label="联系电话" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />

      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="searchForm.pageNumber"
        :limit.sync="searchForm.pageSize"
        @pagination="handleSearch"
      />
    </div>

  </div>
</template>

<script>
import * as cusSeekServer from '@/api/customerSeek'
export default {
  data() {
    return {
      total: 0,
      searchForm: {
        organName: '',
        organNo: '',
        pageNumber: 1,
        pageSize: 10
      },
      cusData: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      cusSeekServer.findPageList(this.searchForm).then(res => {
        if (res.code === 200 && res.result) {
          this.cusData = res.result.records || []
          this.total = res.result.total
        }
      })
    },
    handleDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cusSeekServer.delCustomerSeek(id).then(result => {
          this.$notify({
            title: '成功',
            message: result.message,
            type: 'success'
          })
          this.handleSearch()
        })
      }).catch(() => {})
    }
  }
}
</script>
