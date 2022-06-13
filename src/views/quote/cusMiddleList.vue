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
      <el-table-column prop="content" label="内容体" :show-overflow-tooltip="true" align="center" />
      <el-table-column prop="videoUrl" label="视频地址" align="center" />
      <el-table-column prop="sort" label="顺序号" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作">
        <template slot-scope="{row}" align="center">
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
      <el-form ref="cusMiddleForm" :model="cusMiddleForm" :rules="cusMiddleRules" label-width="100px">
        <el-form-item label="标题:" prop="title">
          <el-input v-model="cusMiddleForm.title" placeholder="请录入标题" style="width: 50%" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="切换图:" prop="imgUrl">
              <el-upload
                ref="logoImage"
                action="/api/common/img/upload"
                list-type="picture-card"
                :on-change="onUploadChange"
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
            <el-form-item label="视频:">
              <upload-video
                :videos="videoInfo.allVideo"
                :video-base-url="baseUrl"
                @delete="deleteVideo"
                @change="getVideo"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="顺序号:" prop="sort">
          <el-input-number v-model="cusMiddleForm.sort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="内容体:" prop="content">
          <el-input v-model="cusMiddleForm.content" type="textarea" :rows="5" />
          <!-- <tinymce v-model="cusMiddleForm.content" :value="cusMiddleForm.content" :height="300" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import Tinymce from '@/components/Tinymce'
import uploadVideo from '@/components/UploadVideo'
import * as quoteServer from '@/api/quoteMiddle'
import * as comServer from '@/api/common'
export default {
  components: { Tinymce, uploadVideo },
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
      cusMiddleForm: {
        id: '',
        imgUrl: '',
        title: '',
        videoUrl: '',
        content: '',
        sort: 0
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
      logoFileList: [],
      dialogType: 'create',
      hideLogoUploadEdit: false
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
      this.cusMiddleForm = {
        id: '',
        imgUrl: '',
        title: '',
        videoUrl: '',
        content: '',
        sort: 0
      }
      this.videoInfo = {
        allVideo: [],
        deleteVideo: []
      }
      this.dialogTitle = '新增'
      this.dialogType = 'create'
      this.dialogVisible = true
    },
    handleUpdate(row) {
      this.cusMiddleForm = {
        id: row.id,
        imgUrl: row.imgUrl,
        title: row.title,
        videoUrl: row.videoUrl,
        content: row.content,
        sort: row.sort
      }
      this.videoInfo = {
        allVideo: [],
        deleteVideo: []
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
        quoteServer.delQuoteMiddle(id).then(result => {
          this.$notify({
            title: '成功',
            message: result.message,
            type: 'success'
          })
          this.handleSearch()
        })
      })
    },
    getVideo(event) {
      this.videoInfo.allVideo = event
    },
    deleteVideo(index) {
      const video = this.videoInfo.allVideo[index]
      if (video.videoLink) {
        this.videoInfo.deleteVideo.push(video)
      }
      this.videoInfo.allVideo.splice(index, 1)
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
          this.cusMiddleForm.imgUrl = file.response.result
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
    uploadFiles() {
      this.videoInfo.allVideo.map(item => {
        console.log(item, 'video')
        const videoFile = new FormData()
        if (!item.videoLink) {
          videoFile.append('files', item.videoFile.raw)
          comServer.uploadVideo(videoFile).then(res => {
            if (res.code === 200) {
              this.cusMiddleForm.videoUrl = res.result
              this.confirmQuote()
            } else {
              this.$message('上传视频失败！')
            }
          })
        }
      })
    },

    handleRemove(file) {
      this.$refs.logoImage.uploadFiles.splice(0, 1)
      this.hideLogoUploadEdit = false
      this.cusMiddleForm.imgUrl = ''
    },
    confirm() {
      if (this.videoInfo.allVideo && this.videoInfo.allVideo.length > 0) {
        this.uploadFiles()
      } else {
        this.confirmQuote()
      }
    },
    confirmQuote() {
      this.$refs.cusMiddleForm.validate(valid => {
        if (valid) {
          if (this.dialogType === 'create') {
            quoteServer.saveQuoteMiddle(this.cusMiddleForm).then(result => {
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
            quoteServer.updateQuoteMiddle(this.cusMiddleForm).then(result => {
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
