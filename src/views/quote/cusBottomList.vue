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
      <el-table-column prop="imgUrl" label="图片地址" align="center" width="160px">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="baseImagUrl + '/' + scope.row.imgUrl"
          />
        </template>
      </el-table-column>
      <el-table-column prop="imgUrl" label="企业logo" align="center" width="160px">
        <template slot-scope="scope">
          <el-image
            style="width: 120px; height: 50px"
            :src="baseImagUrl + '/' + scope.row.logo"
          />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容体" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="bottomSign" label="落款" :show-overflow-tooltip="true" align="center" />
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
      <el-form ref="cusBottomForm" :model="cusBottomForm" :rules="cusBottomRules" label-width="100px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="cusBottomForm.title" placeholder="请录入标题" style="width: 50%" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="背景切换图:" prop="imgUrl">
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
                <div slot="tip" class="el-upload__tip" style="color:red">注：您最多只能上传1张图片(现阶段不使用，官网也不展示)</div>
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
                <div slot="tip" class="el-upload__tip" style="color:red">注：您最多只能上传1张图片(企业logo图片)</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容体:" prop="content">
          <!-- <tinymce v-model="cusBottomForm.content" :height="300" /> -->
          <el-input v-model="cusBottomForm.content" type="textarea" :rows="5" show-word-limit placeholder="" />
        </el-form-item>
        <el-form-item label="顺序号:" prop="sort">
          <el-input-number v-model="cusBottomForm.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="落款" prop="bottomSign">
          <el-input v-model="cusBottomForm.bottomSign" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmQuote">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import * as quoteServer from '@/api/quoteBottom'
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
      cusBottomForm: {
        id: '',
        imgUrl: '',
        title: '',
        logo: '',
        content: '',
        bottomSign: '',
        sort: 0
      },
      cusBottomRules: {
        title: [{ required: true, message: '请录入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请录入内容', trigger: 'blur' }],
        bottomSign: [{ required: true, message: '请录入内容', trigger: 'blur' }]
      },
      baseUrl: 'https://www.jshengzheng.com/file/video',
      baseImagUrl: 'https://www.jshengzheng.com/file/img',
      logoFileList: [],
      pageFileList: [],
      dialogType: 'create',
      hideLogoUploadEdit: false,
      hidePageUploadEdit: false
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      quoteServer.findPageList(this.searchForm).then(res => {
        if (res.code === 200 && res.result) {
          this.cusData = res.result.records || []
          this.total = res.result.total
        }
      })
    },
    handleAdd() {
      this.cusBottomForm = {
        id: '',
        imgUrl: '',
        title: '',
        logo: '',
        content: '',
        bottomSign: '',
        sort: 0
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
      this.cusBottomForm = {
        id: row.id,
        imgUrl: row.imgUrl,
        title: row.title,
        logo: row.logo,
        content: row.content,
        bottomSign: row.bottomSign,
        sort: row.sort
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
        quoteServer.delQuoteBottom(id).then(result => {
          this.$notify({
            title: '成功',
            message: result.message,
            type: 'success'
          })
          this.handleSearch()
        })
      })
    },
    beforeAvatarUpload(file) {
      const isLt1M = file.size / 2048 / 2048 < 1
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
          this.cusBottomForm.imgUrl = file.response.result
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
          this.cusBottomForm.logo = file.response.result
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
      this.cusBottomForm.imgUrl = ''
    },
    handleLogoRemove(file) {
      this.$refs.logoImage.uploadFiles.splice(0, 1)
      this.hideLogoUploadEdit = false
      this.cusBottomForm.logo = ''
    },

    confirmQuote() {
      this.$refs.cusBottomForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'create') {
            quoteServer.saveQuoteBottom(this.cusBottomForm).then(result => {
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
            quoteServer.updateQuoteBottom(this.cusBottomForm).then(result => {
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
