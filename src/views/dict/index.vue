<template>
  <div class="app-container">
    <el-form :model="searchForm" inline>
      <el-form-item>
        <el-input v-model="searchForm.dictVal" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="dictTable"
      :data="dictTable"
      border
      stripe
      row-key="dictKey"
      :lazy="loadLazy"
      :load="subLoad"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="dictKey" label="字典key" />
      <el-table-column prop="dictVal" label="字典值" />
      <el-table-column prop="dictDesc" label="字典描述" />
      <el-table-column label="操作" width="180px" align="left">
        <template slot-scope="{row}">
          <el-button v-if="!row.dictStatus" type="text" icon="el-icon-plus" @click="handleAddChildren(row)">添加子集</el-button>
          <el-button v-if="!row.dictStatus" type="text" icon="el-icon-edit" @click="handleUpdate(row)">编辑</el-button>
          <el-button v-if="row.dictStatus" type="text" @click="handleSubUpdate(row)">编辑</el-button>
          <el-button v-if="row.dictStatus" type="text" @click="handleSubDelete(row.id)">删除</el-button>
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
    <el-dialog :visible.sync="dictVisible" :title="dialogType==='edit'?'字典编辑':'字典创建'" width="40%">
      <el-form ref="dictForm" :model="dictForm" :rules="dictRules" label-width="130px" class="create-form" label-position="right">
        <!-- <el-form-item label="字典key:" prop="dictKey">
          <el-input v-model="dictForm.dictKey" placeholder="请输入key值" :disabled="dialogType==='edit'" />
        </el-form-item> -->
        <el-form-item label="字典值:" prop="dictValue">
          <el-input v-model="dictForm.dictVal" placeholder="请输入字典值" />
        </el-form-item>
        <el-form-item label="字典描述:">
          <el-input v-model="dictForm.dictDesc" placeholder="请输入字典描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictVisible = false">取 消</el-button>
        <el-button type="primary" @click="dictConfirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="subDictVisible" :title="dialogSubType==='edit'?'子集编辑':'子集创建'" width="40%">
      <el-form ref="subDictForm" :model="subDictForm" :rules="subDictRules" label-width="130px" class="create-form" label-position="right">
        <el-form-item label="字典值:" prop="dictValue">
          <el-input v-model="subDictForm.dictVal" placeholder="请输入字典值" />
        </el-form-item>
        <el-form-item label="字典描述:">
          <el-input v-model="subDictForm.dictDesc" placeholder="请输入字典描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subDictVisible = false">取 消</el-button>
        <el-button type="primary" @click="subDictConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import * as dictService from '@/api/dict'
export default {
  components: { Pagination },
  data() {
    return {
      searchForm: {
        dictVal: '',
        pageNumber: 1,
        pageSize: 10
      },
      total: 0,
      dictForm: {
        id: '',
        dictVal: '',
        dictDesc: ''
      },
      dictRules: {
        dictVal: [{ required: true, message: 'Value不能为空', trigger: 'blur' }]
      },
      subDictRules: {
        dictVal: [{ required: true, message: 'Value不能为空', trigger: 'blur' }]
      },
      loadLazy: true,
      empArray: [],
      dialogType: 'create',
      dictVisible: false,
      dictTable: [],
      subDictVisible: false,
      dialogSubType: 'create',
      subDictForm: {
        id: '',
        parentDictKey: '',
        dictDesc: '',
        dictVal: ''
      }
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      dictService.findPageByCondition(this.searchForm).then(result => {
        this.dictTable = result.result.records.map(item => {
          return {
            ...item,
            dictType: '0',
            hasChildren: true
          }
        }) || []
        this.total = result.result.total
      }).catch(() => {})
    },
    subLoad(tree, treeNode, resolve) {
      // 记录加载行信息
      dictService.selectByDictKey(tree.dictKey).then(result => {
        var data = result.result
        if (data && data.length > 0) {
          data.forEach(item => {
            this.$set(item, 'supDictKey', tree.dictKey)
          })
          resolve(data)
        } else {
          resolve([])
        }
        this.loadLazy = false
      }).catch(() => {
        this.loadLazy = false
      })
    },
    handleAdd() {
      this.dialogType = 'create'
      this.dictVisible = true
      this.formReset()
      this.$nextTick(() => {
        this.$refs['dictForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.formReset()
      this.dialogType = 'edit'
      this.dictForm.id = row.id
      this.dictForm.dictVal = row.dictVal
      this.dictForm.dictDesc = row.dictDesc
      this.dictVisible = true
      this.$nextTick(() => {
        this.$refs['dictForm'].clearValidate()
      })
    },
    handleSubUpdate(row) {
      this.subFormReset()
      this.dialogSubType = 'edit'
      this.subDictForm.id = row.id
      this.subDictForm.dictVal = row.dictVal
      this.subDictForm.dictDesc = row.dictDesc
      this.subDictForm.parentDictKey = row.parentDictKey
      this.subDictVisible = true
      this.$nextTick(() => {
        this.$refs['subDictForm'].clearValidate()
      })
    },
    handleSubDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dictService.delChildDict(id).then(result => {
          this.$notify({
            title: '成功',
            message: result.message,
            type: 'success'
          })
          this.handleSearch()
        })
      }).catch(() => {})
    },
    dictConfirm() {
      this.$refs.dictForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'create') {
            dictService.saveDict(this.dictForm).then(result => {
              this.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
              })
              this.formReset()
              this.handleSearch()
              this.dictVisible = false
            }).catch(() => {})
          } else {
            dictService.updateDict(this.dictForm).then(result => {
              this.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
              })
              this.formReset()
              this.handleSearch()
              this.dictVisible = false
            }).catch(() => {})
          }
        }
      })
    },
    subDictConfirm() {
      this.$refs.subDictForm.validate((valid) => {
        if (valid) {
          if (this.dialogSubType === 'create') {
            dictService.saveChildDict(this.subDictForm).then(result => {
              this.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
              })
              this.subDictVisible = false
              this.lazyLoad(this.subDictForm.parentDictKey)
              this.subFormReset()
              this.handleSearch()
            }).catch(() => {})
          } else {
            dictService.updateChildDict(this.subDictForm).then(result => {
              this.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
              })
              this.subDictVisible = false
              this.lazyLoad(this.subDictForm.parentDictKey)
              this.subFormReset()
              this.handleSearch()
            }).catch(() => {})
          }
        }
      })
    },
    lazyLoad(key) {
      this.$refs.dictTable['store'].states.treeData[key].loaded = false
      this.$refs.dictTable['store'].states.treeData[key].expanded = false
    },
    handleAddChildren(row) {
      this.subFormReset()
      this.dialogSubType = 'create'
      this.subDictForm.parentDictKey = row.dictKey
      this.subDictVisible = true
      this.$nextTick(() => {
        this.$refs['subDictForm'].clearValidate()
      })
    },
    formReset() {
      this.dictForm = {
        id: '',
        dictVal: ''
      }
    },
    subFormReset() {
      this.subDictForm = {
        id: '',
        parentDictKey: '',
        dictDesc: '',
        dictVal: ''
      }
    }
  }
}
</script>
