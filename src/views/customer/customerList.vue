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
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="imgUrl" label="首页小图" align="center" width="160px">
        <template slot-scope="scope">
          <template v-if="scope.row.imgUrl">
            <el-image
              style="width: 100px; height: 100px"
              :src="baseImagUrl + '/' + scope.row.imgUrl"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="bigImgUrl" label="案例大图" align="center" width="160px">
        <template slot-scope="scope">
          <template v-if="scope.row.bigImgUrl">
            <el-image
              style="width: 100px; height: 100px"
              :src="baseImagUrl + '/' + scope.row.bigImgUrl"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="logo" label="客户logo" align="center" width="160px">
        <template slot-scope="scope">
          <template v-if="scope.row.logo">
            <el-image
              style="width: 100px; height: 100px"
              :src="baseImagUrl + '/' + scope.row.logo"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容体" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="sort" label="顺序号" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
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

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center width="85%" top="5vh">
      <el-form ref="customerForm" :model="customerForm" :rules="cusBottomRules" label-width="100px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="customerForm.title" placeholder="请录入标题" style="width: 50%" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="首页切换图:" prop="imgUrl">
              <el-upload
                ref="pageImage"
                action="http://8.136.159.136:9091/api/common/img/upload"
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
                <div slot="tip" class="el-upload__tip" style="color:red">注：您最多只能上传1张图片(图片尺寸为)</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="案例切换图:" prop="bigImgUrl">
              <el-upload
                ref="pageBigImage"
                action="/api/common/img/upload"
                list-type="picture-card"
                :on-change="onBigUploadChange"
                accept=".jpg,.jpeg,.png"
                :file-list="bigPageFileList"
                :before-upload="beforeAvatarUpload"
                :limit="1"
                :class="{hide:hideBigPageUploadEdit}"
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
                      @click="handleBigRemove(file)"
                    >
                      <i class="el-icon-delete" />
                    </span>
                  </span>
                </div>
                <div slot="tip" class="el-upload__tip" style="color:red">注：您最多只能上传1张图片(图片尺寸为)</div>
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
          <el-input-number v-model="customerForm.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="内容体:" prop="content">
          <!-- <tinymce v-model="customerForm.content" :height="300" /> -->
          <el-input v-model="customerForm.content" type="textarea" :rows="5" :maxlength="100" show-word-limit placeholder="" />
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
import * as cusServer from '@/api/customer'
export default {
  components: { Tinymce },
  data() {
    return {
      total: 0,
      searchForm: {
        pageNumber: 1,
        pageSize: 10
      },
      cusData: [],
      dialogVisible: false,
      dialogTitle: '',
      customerForm: {
        id: '',
        imgUrl: '',
        bigImgUrl: '',
        title: '',
        logo: '',
        sort: 0,
        content: ''
      },
      cusBottomRules: {
        title: [{ required: true, message: '请录入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请录入内容', trigger: 'blur' }]
      },
      baseUrl: 'https://www.jshengzheng.com/file/video',
      baseImagUrl: 'https://www.jshengzheng.com/file/img',

      logoFileList: [],
      pageFileList: [],
      bigPageFileList: [],
      dialogType: 'create',
      hideLogoUploadEdit: false,
      hidePageUploadEdit: false,
      hideBigPageUploadEdit: false
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      cusServer.findPageList(this.searchForm).then(res => {
        if (res.code === 200 && res.result) {
          this.cusData = res.result.records || []
          this.total = res.result.total
        }
      })
    },
    handleAdd() {
      this.customerForm = {
        id: '',
        imgUrl: '',
        bigImgUrl: '',
        title: '',
        logo: '',
        sort: 0,
        content: ''
      }
      this.pageFileList = []
      this.logoFileList = []
      this.bigPageFileList = []
      this.dialogTitle = '新增'
      this.dialogType = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.customerForm = {
        id: row.id,
        imgUrl: row.imgUrl,
        bigImgUrl: row.bigImgUrl,
        title: row.title,
        logo: row.logo,
        sort: row.sort,
        content: row.content
      }
      this.pageFileList = []
      this.logoFileList = []
      this.bigPageFileList = []
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
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isLt1M
    },
    onUploadChange(file) {
      if (file.status === 'ready') return
      if (file.status === 'success') {
        const res = file.response || {}
        if (res && res.code === 200) {
          this.customerForm.imgUrl = file.response.result
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
    onBigUploadChange(file) {
      if (file.status === 'ready') return
      if (file.status === 'success') {
        const res = file.response || {}
        if (res && res.code === 200) {
          this.customerForm.bigImgUrl = file.response.result
          this.$message({
            type: 'success',
            message: '上传成功!'
          })
          this.hideBigPageUploadEdit = true
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
          this.customerForm.logo = file.response.result
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
      this.customerForm.imgUrl = ''
    },
    handleBigRemove(file) {
      this.$refs.pageBigImage.uploadFiles.splice(0, 1)
      this.hideBigPageUploadEdit = false
      this.customerForm.bigImgUrl = ''
    },
    handleLogoRemove(file) {
      this.$refs.logoImage.uploadFiles.splice(0, 1)
      this.hideLogoUploadEdit = false
      this.customerForm.logo = ''
    },
    customerConfirm() {
      this.$refs.customerForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'create') {
            cusServer.saveCustomer(this.customerForm).then(result => {
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
            cusServer.updateCustomer(this.customerForm).then(result => {
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
