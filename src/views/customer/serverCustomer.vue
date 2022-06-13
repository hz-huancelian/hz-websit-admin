<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
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
      <el-table-column prop="title" label="标题" width="130px" align="center" />
      <el-table-column prop="comment" label="评论" :show-overflow-tooltip="true" min-width="120px" align="center" />
      <el-table-column prop="enterName" label="企业名称" width="140px" align="center" />
      <el-table-column prop="" label="企业分类" align="center">
        <template slot-scope="{row}">
          {{ TYPE_STATUS[row.serverType] }}
        </template>
      </el-table-column>

      <el-table-column prop="imgUrl" label="图片地址" align="center" width="160px">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="baseImagUrl + '/' + scope.row.imgUrl"
          />
        </template>
      </el-table-column>
      <el-table-column prop="logo" label="客户logo" align="center" width="160px">
        <template slot-scope="scope">
          <el-image
            style="width: 120px; height: 50px"
            :src="baseImagUrl + '/' + scope.row.logo"
          />
        </template>
      </el-table-column>
      <el-table-column prop="routerUrl" label="外链地址" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="serverDesc" label="公司描述" :show-overflow-tooltip="true" min-width="200px" align="center" />
      <el-table-column prop="descSign" label="描述落款" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="content" label="内容体" :show-overflow-tooltip="true" min-width="200px" align="center" />
      <el-table-column prop="sort" label="顺序号" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" width="160px" />
      <el-table-column label="操作" align="center" width="100px" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" size="mini" @click="handleUpdate(row)">修改</el-button>
          <el-button type="text" size="mini" @click="handleDelete(row.id)">删除</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center width="85%" top="5vh">
      <el-form ref="cusServerForm" :model="cusServerForm" :rules="cusServerRules" label-width="100px">
        <el-form-item label="企业名称:" prop="enterName">
          <el-input v-model="cusServerForm.enterName" placeholder="请录入" style="width: 50%" />
        </el-form-item>
        <el-form-item label="标题:" prop="title">
          <el-input v-model="cusServerForm.title" placeholder="请录入" style="width: 50%" />
        </el-form-item>
        <el-form-item label="评论:" prop="comment">
          <el-input v-model="cusServerForm.comment" placeholder="请录入" style="width: 50%" />
        </el-form-item>
        <el-form-item label="外链地址:" prop="routerUrl">
          <el-input v-model="cusServerForm.routerUrl" placeholder="请录入" style="width: 50%" />
        </el-form-item>
        <el-form-item label="企业分类:" prop="serverType">
          <el-select v-model="cusServerForm.serverType" placeholder="请选择" style="width: 300px;">
            <el-option v-for="item in Object.keys(TYPE_STATUS)" :key="item" :value="item" :label="TYPE_STATUS[item]" />
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="切换图:" prop="imgUrl">
              <el-upload
                ref="pageImage"
                action="/api/common/img/upload"
                list-type="picture-card"
                :on-change="onUploadChange"
                accept=".jpg,.jpeg,.png"
                :file-list="pageFileList"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :class="{hide:hidePageUploadEdit}"
              >
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
                <div slot="tip" class="el-upload__tip" style="color:red">注：您最多只能上传1张图片</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="logo:">
              <el-upload
                ref="logoImage"
                action="/api/common/img/upload"
                list-type="picture-card"
                :on-change="onUploadLogoChange"
                accept=".jpg,.jpeg,.png"
                :file-list="logoFileList"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :class="{hide:hideLogoUploadEdit}"
              >
                <i slot="default" class="el-icon-plus" />
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-delete"
                      @click="handleLogoRemove(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
                <div slot="tip" class="el-upload__tip" style="color:red">注：您最多只能上传1张图片</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="顺序号:" prop="sort">
          <el-input-number v-model="cusServerForm.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="企业描述:" prop="serverDesc">
          <el-input v-model="cusServerForm.serverDesc" type="textarea" :rows="5" :maxlength="80" show-word-limit placeholder="请录入企业描述信息" />
        </el-form-item>
        <el-form-item label="描述落款:" prop="descSign">
          <el-input v-model="cusServerForm.descSign" placeholder="请录入" style="width: 50%" />
        </el-form-item>
        <el-form-item label="内容体:" prop="content">
          <tinymce v-model="cusServerForm.content" :change-val="true" :value="cusServerForm.content" :height="300" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="customerConfirm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import * as cusServer from '@/api/serverCustomer'
import { selectByDictKey } from '@/api/dict'
const TYPE_STATUS = {
  '0': '环境检测',
  '1': '区块链'
}
export default {
  components: { Tinymce },
  data() {
    return {
      TYPE_STATUS,
      total: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10
      },
      cusData: [],
      dialogVisible: false,
      dialogTitle: '',
      cusServerForm: {
        id: '',
        enterName: '',
        imgUrl: '',
        logo: '',
        title: '',
        serverDesc: '',
        descSign: '',
        serverType: '',
        routerUrl: '',
        content: '',
        sort: 0,
        comment: ''
      },
      cusServerRules: {
        title: [{ required: true, message: '请录入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请录入内容', trigger: 'blur' }]
      },
      baseUrl: 'https://www.jshengzheng.com/file/video',
      baseImagUrl: 'https://www.jshengzheng.com/file/img',

      logoFileList: [],
      pageFileList: [],
      dialogType: 'create',
      hideLogoUploadEdit: false,
      hidePageUploadEdit: false,
      customerArray: {}
    }
  },
  created() {
    this.handleSearch()
    this.getDicKey('customerArray', 1001)
  },
  methods: {
    getDicKey(type, code) {
      selectByDictKey(code).then(result => {
        if (result.code === 200) {
          this[type] = result.result
        }
      })
    },
    handleSearch() {
      cusServer.findPageList(this.searchForm).then(res => {
        if (res.code === 200 && res.result) {
          this.cusData = res.result.records || []
          this.total = res.result.total
        }
      })
    },
    handleAdd() {
      this.cusServerForm = {
        id: '',
        imgUrl: '',
        enterName: '',
        logo: '',
        title: '',
        serverDesc: '',
        serverType: '',
        routerUrl: '',
        content: '',
        comment: '',
        sort: 0,
        descSign: ''
      }
      this.pageFileList = []
      this.logoFileList = []
      this.dialogTitle = '新增'
      this.dialogType = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.pageFileList = []
      this.logoFileList = []
      this.cusServerForm = {
        id: row.id,
        imgUrl: row.imgUrl,
        enterName: row.enterName,
        title: row.title,
        logo: row.logo,
        content: row.content,
        serverDesc: row.serverDesc,
        serverType: row.serverType,
        routerUrl: row.routerUrl,
        comment: row.comment,
        sort: row.sort,
        descSign: row.descSign
      }
      this.dialogTitle = '修改'
      this.dialogType = 'update'
      this.dialogVisible = true
    },
    handleDelete(id) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cusServer.delCustomer(id).then(result => {
          this.$notify({
            title: '成功',
            message: result.message,
            type: 'success'
          })
          this.handleSearch()
        })
      }).catch(() => {})
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt1M
    },
    onUploadChange(file) {
      if (file.status === 'ready') return
      if (file.status === 'success') {
        const res = file.response || {}
        if (res && res.code === 200) {
          this.cusServerForm.imgUrl = file.response.result
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
          this.hidePageUploadEdit = true
        } else {
          this.$message.error('上传失败!')
        }
      } else {
        this.$message.error('上传失败!')
      }
    },
    onUploadLogoChange(file) {
      if (file.status === 'ready') return
      if (file.status === 'success') {
        const res = file.response || {}
        if (res && res.code === 200) {
          this.cusServerForm.logo = file.response.result
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
          this.hideLogoUploadEdit = true
        } else {
          this.$message.error('上传失败!')
        }
      } else {
        this.$message.error('上传失败!')
      }
    },
    handleRemove(file) {
      this.$refs.pageImage.uploadFiles.splice(0, 1)
      this.hidePageUploadEdit = false
      this.cusServerForm.imgUrl = ''
    },
    handleLogoRemove(file) {
      this.$refs.logoImage.uploadFiles.splice(0, 1)
      this.hideLogoUploadEdit = false
      this.cusServerForm.logo = ''
    },
    customerConfirm() {
      this.$refs.cusServerForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'create') {
            cusServer.saveCustomer(this.cusServerForm).then(result => {
              if (result.code === 200) {
                this.$notify({
                  title: '成功',
                  message: result.message,
                  type: 'success'
                })
                this.dialogVisible = false
                this.handleSearch()
              } else {
                this.$notify({
                  title: '失败',
                  message: result.message,
                  type: 'error'
                })
              }
            })
          } else {
            cusServer.updateCustomer(this.cusServerForm).then(result => {
              if (result.code === 200) {
                this.$notify({
                  title: '成功',
                  message: result.message,
                  type: 'success'
                })
                this.dialogVisible = false
                this.handleSearch()
              } else {
                this.$notify({
                  title: '失败',
                  message: result.message,
                  type: 'error'
                })
              }
            })
          }
        }
      })
    }

  }
}
</script>
