(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35b647fc"],{5278:function(e,t,i){"use strict";i("cc66")},"5bc6":function(e,t,i){"use strict";i("bf90")},"747c":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("el-form",{attrs:{inline:""}},[i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:e.handleAdd}},[e._v("新增")])],1)],1),i("el-table",{attrs:{data:e.AdverData,border:"",stripe:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{type:"index",label:"序号",width:"50",align:"center"}}),i("el-table-column",{attrs:{prop:"title",label:"标题",align:"center"}}),i("el-table-column",{attrs:{prop:"imgUrl",label:"图片地址",align:"center",width:"160px"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:e.baseImagUrl+"/"+t.row.imgUrl}})]}}])}),i("el-table-column",{attrs:{prop:"content",label:"内容体","show-overflow-tooltip":!0,align:"center"}}),i("el-table-column",{attrs:{prop:"routerUrl",label:"外链地址",align:"center"}}),i("el-table-column",{attrs:{label:"当前使用中",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("el-tag",{attrs:{type:0==n.showPage?"success":"danger"}},[e._v(e._s(0==n.showPage?"使用中":"暂停使用"))])]}}])}),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间",align:"center"}}),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[i("el-button",{attrs:{type:"text"},on:{click:function(t){return e.handleUpdate(n)}}},[e._v("修改")]),i("el-button",{attrs:{type:"text"},on:{click:function(t){return e.handleDelete(n.id)}}},[e._v("删除")])]}}])})],1),i("el-dialog",{attrs:{title:e.dialogTitle,visible:e.dialogVisible,center:"",width:"85%",top:"5vh"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-form",{ref:"adverForm",attrs:{model:e.adverForm,rules:e.cusMiddleRules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"标题:",prop:"title"}},[i("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"请录入标题"},model:{value:e.adverForm.title,callback:function(t){e.$set(e.adverForm,"title",t)},expression:"adverForm.title"}})],1),i("el-form-item",{attrs:{label:"是否启用"}},[i("el-radio-group",{model:{value:e.adverForm.showPage,callback:function(t){e.$set(e.adverForm,"showPage",t)},expression:"adverForm.showPage"}},[i("el-radio",{attrs:{label:0}},[e._v("启用")]),i("el-radio",{attrs:{label:1}},[e._v("停用")])],1)],1),i("el-form-item",{attrs:{label:"广告外链地址:",prop:"routerUrl"}},[i("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"请录入广告外链地址"},model:{value:e.adverForm.routerUrl,callback:function(t){e.$set(e.adverForm,"routerUrl",t)},expression:"adverForm.routerUrl"}})],1),i("el-form-item",{attrs:{label:"切换图:",prop:"imgUrl"}},[i("el-upload",{ref:"logoImage",class:{hide:e.hidePageUploadEdit},attrs:{action:"/api/common/img/upload","list-type":"picture-card","on-change":e.onUploadChange,accept:".jpg,.jpeg,.png","file-list":e.pageFileList,"before-upload":e.beforeAvatarUpload,limit:1},scopedSlots:e._u([{key:"file",fn:function(t){var n=t.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:n.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(t){return e.handleRemove(n)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"}),i("div",{staticClass:"el-upload__tip",staticStyle:{color:"red"},attrs:{slot:"tip"},slot:"tip"},[e._v("注：您最多只能上传1张图片")])])],1),i("el-form-item",{attrs:{label:"内容体:",prop:"content"}},[i("el-input",{attrs:{type:"textarea",rows:5},model:{value:e.adverForm.content,callback:function(t){e.$set(e.adverForm,"content",t)},expression:"adverForm.content"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:""},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:e.adverConfirm}},[e._v("保存")])],1)],1)],1)},a=[],l=(i("a434"),i("8256")),o=i("b775");function r(){return Object(o["a"])({url:"/wAdver/findList",method:"get"})}function s(e){return Object(o["a"])({url:"/wAdver/save",method:"post",data:e})}function c(e){return Object(o["a"])({url:"/wAdver/update",method:"post",data:e})}function d(e){return Object(o["a"])({url:"/wAdver/delete/".concat(e),method:"get"})}var u={components:{Tinymce:l["a"]},data:function(){return{AdverData:[],dialogVisible:!1,dialogTitle:"",adverForm:{id:"",imgUrl:"",title:"",content:"",routerUrl:"",showPage:""},cusMiddleRules:{imgUrl:[{required:!0,message:"请选择展示图片",trigger:"blur"}],title:[{required:!0,message:"请录入标题",trigger:"blur"}],content:[{required:!0,message:"请录入内容",trigger:"blur"}]},baseUrl:"https://www.jshengzheng.com/file/video",baseImagUrl:"https://www.jshengzheng.com/file/img",videoInfo:{allVideo:[],deleteVideo:[]},pageFileList:[],dialogType:"create",hidePageUploadEdit:!1}},created:function(){this.handleSearch()},methods:{handleSearch:function(){var e=this;r().then((function(t){200===t.code&&t.result&&(e.AdverData=t.result||[])}))},handleAdd:function(){this.adverForm={id:"",imgUrl:"",title:"",content:"",routerUrl:"",showPage:0},this.pageFileList=[],this.dialogTitle="新增",this.dialogType="create",this.dialogVisible=!0},handleRemove:function(e){this.$refs.logoImage.uploadFiles.splice(0,1),this.hidePageUploadEdit=!1,this.adverForm.imgUrl=""},handleUpdate:function(e){this.adverForm={id:e.id,imgUrl:e.imgUrl,title:e.title,routerUrl:e.routerUrl,content:e.content,showPage:e.showPage},this.dialogTitle="修改",this.dialogType="update",this.dialogVisible=!0},handleDelete:function(e){var t=this;this.$confirm("确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){d(e).then((function(e){t.$notify({title:"成功",message:e.message,type:"success"}),t.handleSearch()}))}))},beforeAvatarUpload:function(e){var t=e.size/2048/2048<1;return t||this.$message.error("上传图片大小不能超过 2MB!"),t},onUploadChange:function(e){if("ready"!==e.status)if("success"===e.status){var t=e.response||{};t&&200===t.code?(this.adverForm.imgUrl=e.response.result,this.$message({type:"success",message:"上传成功!"}),this.hidePageUploadEdit=!0):this.$message.error("上传失败!")}else this.$message.error("上传失败!")},adverConfirm:function(){var e=this;this.$refs.adverForm.validate((function(t){t&&("create"===e.dialogType?s(e.adverForm).then((function(t){200===t.code?(e.$notify({title:"成功",message:t.message,type:"success"}),e.dialogVisible=!1,e.handleSearch()):e.$notify({title:"失败",message:t.message,type:"error"})})):c(e.adverForm).then((function(t){200===t.code?(e.$notify({title:"成功",message:t.message,type:"success"}),e.dialogVisible=!1,e.handleSearch()):e.$notify({title:"失败",message:t.message,type:"error"})})))}))}}},h=u,m=i("2877"),p=Object(m["a"])(h,n,a,!1,null,null,null);t["default"]=p.exports},8256:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tinymce-container",class:{fullscreen:e.fullscreen},style:{width:e.containerWidth}},[i("textarea",{staticClass:"tinymce-textarea",attrs:{id:e.tinymceId}}),e._v(" "),i("div",{staticClass:"editor-custom-btn-container"},[i("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff"},on:{successCBK:e.imageSuccessCBK}})],1)])},a=[],l=(i("b680"),i("a9e3"),i("159b"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"upload-container"},[i("el-button",{style:{background:e.color,borderColor:e.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v(" upload ")]),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":e.fileList,"show-file-list":!0,"on-remove":e.handleRemove,"on-success":e.handleSuccess,"before-upload":e.beforeUpload,action:"https://httpbin.org/post","list-type":"picture-card"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v(" Click upload ")])],1),i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v(" Cancel ")]),i("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v(" Confirm ")])],1)],1)}),o=[],r=(i("b64b"),i("d81d"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var e=this;return Object.keys(this.listObj).every((function(t){return e.listObj[t].hasSuccess}))},handleSubmit:function(){var e=this,t=Object.keys(this.listObj).map((function(t){return e.listObj[t]}));this.checkAllSuccess()?(this.$emit("successCBK",t),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!")},handleSuccess:function(e,t){for(var i=t.uid,n=Object.keys(this.listObj),a=0,l=n.length;a<l;a++)if(this.listObj[n[a]].uid===i)return this.listObj[n[a]].url=e.files.file,void(this.listObj[n[a]].hasSuccess=!0)},handleRemove:function(e){for(var t=e.uid,i=Object.keys(this.listObj),n=0,a=i.length;n<a;n++)if(this.listObj[i[n]].uid===t)return void delete this.listObj[i[n]]},beforeUpload:function(e){var t=this,i=window.URL||window.webkitURL,n=e.uid;return this.listObj[n]={},new Promise((function(a,l){var o=new Image;o.src=i.createObjectURL(e),o.onload=function(){t.listObj[n]={hasSuccess:!1,uid:e.uid,width:this.width,height:this.height}},a(!0)}))}}}),s=r,c=(i("5278"),i("2877")),d=Object(c["a"])(s,l,o,!1,null,"3dae379b",null),u=d.exports,h=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],m=h,p=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],f=p,g=i("b85c"),b=[];function v(){return window.tinymce}var y=function(e,t){var i=document.getElementById(e),n=t||function(){};if(!i){var a=document.createElement("script");a.src=e,a.id=e,document.body.appendChild(a),b.push(n);var l="onload"in a?o:r;l(a)}function o(t){t.onload=function(){this.onerror=this.onload=null;var e,i=Object(g["a"])(b);try{for(i.s();!(e=i.n()).done;){var n=e.value;n(null,t)}}catch(a){i.e(a)}finally{i.f()}b=null},t.onerror=function(){this.onerror=this.onload=null,n(new Error("Failed to load "+e),t)}}function r(e){e.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var t,i=Object(g["a"])(b);try{for(i.s();!(t=i.n()).done;){var n=t.value;n(null,e)}}catch(a){i.e(a)}finally{i.f()}b=null}}}i&&n&&(v()?n(null,i):b.push(n))},w=y,_="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",k={name:"Tinymce",components:{editorImage:u},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"},changeVal:{type:Boolean,default:function(){return!1}}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var e=this.width;return/^[\d]+(\.[\d]+)?$/.test(e)?"".concat(e,"px"):e}},watch:{value:function(e){var t=this;!this.changeVal&&this.hasChange||!this.hasInit||this.$nextTick((function(){return window.tinymce.get(t.tinymceId).setContent(e||"")}))}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var e=this;w(_,(function(t){t?e.$message.error(t.message):e.initTinymce()}))},initTinymce:function(){var e=this,t=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList["en"],height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:f,menubar:this.menubar,plugins:m,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(i){t.value&&i.setContent(t.value),t.hasInit=!0,i.on("NodeChange Change KeyUp SetContent",(function(){e.hasChange=!0,e.$emit("input",i.getContent())}))},setup:function(e){e.on("FullscreenStateChanged",(function(e){t.fullscreen=e.state}))},convert_urls:!1})},destroyTinymce:function(){var e=window.tinymce.get(this.tinymceId);this.fullscreen&&e.execCommand("mceFullScreen"),e&&e.destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(e){var t=this;e.forEach((function(e){return window.tinymce.get(t.tinymceId).insertContent('<img class="wscnph" src="'.concat(e.url,'" >'))}))}}},C=k,U=(i("5bc6"),Object(c["a"])(C,n,a,!1,null,"ce5a8c0a",null));t["a"]=U.exports},bf90:function(e,t,i){},cc66:function(e,t,i){}}]);