<template>
  <div class="app-container">
    <el-form inline>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="AdverData"
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
      <el-table-column prop="content" label="内容体" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="routerUrl" label="外链地址" align="center" />
      <el-table-column label="当前使用中" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.showPage == 0?'success':'danger'">{{ row.showPage == 0?'使用中':'暂停使用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleUpdate(row)">修改</el-button>
          <el-button type="text" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" center width="85%" top="5vh">
      <el-form ref="adverForm" :model="adverForm" :rules="cusMiddleRules" label-width="100px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="adverForm.title" placeholder="请录入标题" style="width: 50%" />
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="adverForm.showPage">
            <el-radio :label="0">启用</el-radio>
            <el-radio :label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告外链地址:" prop="routerUrl">
          <el-input v-model="adverForm.routerUrl" placeholder="请录入广告外链地址" style="width: 50%" />
        </el-form-item>
        <el-form-item label="切换图:" prop="imgUrl">
          <el-upload
            ref="logoImage"
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
        <el-form-item label="内容体:" prop="content">
          <el-input v-model="adverForm.content" type="textarea" :rows="5" />
          <!-- <tinymce v-model="adverForm.content" :height="300" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="adverConfirm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import * as adverServer from '@/api/adver'
export default {
  components: { Tinymce },
  data() {
    return {
      AdverData: [],
      dialogVisible: false,
      dialogTitle: '',
      adverForm: {
        id: '',
        imgUrl: '',
        title: '',
        content: '',
        routerUrl: '',
        showPage: ''
      },
      cusMiddleRules: {
        imgUrl: [{ required: true, message: '请选择展示图片', trigger: 'blur' }],
        title: [{ required: true, message: '请录入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请录入内容', trigger: 'blur' }]
      },
      baseUrl: 'https://www.jshengzheng.com/file/video',
      baseImagUrl: 'https://www.jshengzheng.com/file/img',
      videoInfo: {
        allVideo: [],
        deleteVideo: []
      },
      pageFileList: [],
      dialogType: 'create',
      hidePageUploadEdit: false
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      adverServer.findList().then(res => {
        if (res.code === 200 && res.result) {
          this.AdverData = res.result || []
        }
      })
    },
    handleAdd() {
      this.adverForm = {
        id: '',
        imgUrl: '',
        title: '',
        content: '',
        routerUrl: '',
        showPage: 0
      }
      this.pageFileList = []

      this.dialogTitle = '新增'
      this.dialogType = 'create'
      this.dialogVisible = true
    },

    handleRemove(file) {
      this.$refs.logoImage.uploadFiles.splice(0, 1)
      this.hidePageUploadEdit = false
      this.adverForm.imgUrl = ''
    },
    handleUpdate(row) {
      this.adverForm = {
        id: row.id,
        imgUrl: row.imgUrl,
        title: row.title,
        routerUrl: row.routerUrl,
        content: row.content,
        showPage: row.showPage
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
        adverServer.delAdver(id).then(result => {
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
          this.adverForm.imgUrl = file.response.result
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
    adverConfirm() {
      this.$refs.adverForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'create') {
            adverServer.saveAdver(this.adverForm).then(result => {
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
            adverServer.updateAdver(this.adverForm).then(result => {
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
