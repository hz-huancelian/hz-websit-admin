(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eb1e0be4"],{"04d1":function(t,e,i){var o=i("342f"),n=o.match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},"4e82":function(t,e,i){"use strict";var o=i("23e7"),n=i("1c0b"),a=i("7b0b"),s=i("50c4"),l=i("577e"),r=i("d039"),c=i("addb"),u=i("a640"),d=i("04d1"),m=i("d998"),h=i("2d00"),p=i("512ce"),f=[],g=f.sort,b=r((function(){f.sort(void 0)})),v=r((function(){f.sort(null)})),y=u("sort"),w=!r((function(){if(h)return h<70;if(!(d&&d>3)){if(m)return!0;if(p)return p<603;var t,e,i,o,n="";for(t=65;t<76;t++){switch(e=String.fromCharCode(t),t){case 66:case 69:case 70:case 72:i=3;break;case 68:case 71:i=4;break;default:i=2}for(o=0;o<47;o++)f.push({k:e+o,v:i})}for(f.sort((function(t,e){return e.v-t.v})),o=0;o<f.length;o++)e=f[o].k.charAt(0),n.charAt(n.length-1)!==e&&(n+=e);return"DGBEFHACIJK"!==n}})),_=b||!v||!y||!w,k=function(t){return function(e,i){return void 0===i?-1:void 0===e?1:void 0!==t?+t(e,i)||0:l(e)>l(i)?1:-1}};o({target:"Array",proto:!0,forced:_},{sort:function(t){void 0!==t&&n(t);var e=a(this);if(w)return void 0===t?g.call(e):g.call(e,t);var i,o,l=[],r=s(e.length);for(o=0;o<r;o++)o in e&&l.push(e[o]);l=c(l,k(t)),i=l.length,o=0;while(o<i)e[o]=l[o++];while(o<r)delete e[o++];return e}})},"512ce":function(t,e,i){var o=i("342f"),n=o.match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},5181:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("el-form",{attrs:{inline:""}},[i("el-form-item",[i("el-button",{attrs:{type:"primary",icon:"el-icon-plus"},on:{click:t.handleAdd}},[t._v("新增")])],1)],1),i("el-table",{attrs:{data:t.cusData,border:"",stripe:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{type:"index",label:"序号",width:"50",align:"center"}}),i("el-table-column",{attrs:{prop:"title",label:"标题",align:"center"}}),i("el-table-column",{attrs:{prop:"imgUrl",label:"图片地址",align:"center",width:"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-image",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.baseImagUrl+"/"+e.row.imgUrl}})]}}])}),i("el-table-column",{attrs:{prop:"imgUrl",label:"企业logo",align:"center",width:"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-image",{staticStyle:{width:"120px",height:"50px"},attrs:{src:t.baseImagUrl+"/"+e.row.logo}})]}}])}),i("el-table-column",{attrs:{prop:"content",label:"内容体","show-overflow-tooltip":!0,align:"center"}}),i("el-table-column",{attrs:{prop:"bottomSign",label:"落款","show-overflow-tooltip":!0,align:"center"}}),i("el-table-column",{attrs:{prop:"sort",label:"顺序号",align:"center"}}),i("el-table-column",{attrs:{prop:"createTime",label:"创建时间",align:"center"}}),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){var o=e.row;return[i("el-button",{attrs:{type:"text"},on:{click:function(e){return t.handleUpdate(o)}}},[t._v("修改")]),i("el-button",{attrs:{type:"text"},on:{click:function(e){return t.handleDelete(o.id)}}},[t._v("删除")])]}}])})],1),i("div",{staticStyle:{float:"right"}},[i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.searchForm.pageNumber,limit:t.searchForm.pageSize},on:{"update:page":function(e){return t.$set(t.searchForm,"pageNumber",e)},"update:limit":function(e){return t.$set(t.searchForm,"pageSize",e)},pagination:t.handleSearch}})],1),i("el-dialog",{attrs:{title:t.dialogTitle,visible:t.dialogVisible,center:"",width:"85%",top:"5vh"},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-form",{ref:"cusBottomForm",attrs:{model:t.cusBottomForm,rules:t.cusBottomRules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"标题:",prop:"title"}},[i("el-input",{staticStyle:{width:"50%"},attrs:{placeholder:"请录入标题"},model:{value:t.cusBottomForm.title,callback:function(e){t.$set(t.cusBottomForm,"title",e)},expression:"cusBottomForm.title"}})],1),i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"背景切换图:",prop:"imgUrl"}},[i("el-upload",{ref:"pageImage",class:{hide:t.hidePageUploadEdit},attrs:{action:"/api/common/img/upload","list-type":"picture-card","on-change":t.onUploadChange,accept:".jpg,.jpeg,.png","file-list":t.pageFileList,"before-upload":t.beforeAvatarUpload,limit:1},scopedSlots:t._u([{key:"file",fn:function(e){var o=e.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:o.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(e){return t.handleRemove(o)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"}),i("div",{staticClass:"el-upload__tip",staticStyle:{color:"red"},attrs:{slot:"tip"},slot:"tip"},[t._v("注：您最多只能上传1张图片(现阶段不使用，官网也不展示)")])])],1)],1),i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"logo:"}},[i("el-upload",{ref:"logoImage",class:{hide:t.hideLogoUploadEdit},attrs:{action:"/api/common/img/upload","list-type":"picture-card","on-change":t.onUploadLogoChange,accept:".jpg,.jpeg,.png","file-list":t.logoFileList,"before-upload":t.beforeAvatarUpload,limit:1},scopedSlots:t._u([{key:"file",fn:function(e){var o=e.file;return i("div",{},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:o.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(e){return t.handleLogoRemove(o)}}},[i("i",{staticClass:"el-icon-delete"})])])])}}])},[i("i",{staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"}),i("div",{staticClass:"el-upload__tip",staticStyle:{color:"red"},attrs:{slot:"tip"},slot:"tip"},[t._v("注：您最多只能上传1张图片(企业logo图片)")])])],1)],1)],1),i("el-form-item",{attrs:{label:"内容体:",prop:"content"}},[i("el-input",{attrs:{type:"textarea",rows:5,"show-word-limit":"",placeholder:""},model:{value:t.cusBottomForm.content,callback:function(e){t.$set(t.cusBottomForm,"content",e)},expression:"cusBottomForm.content"}})],1),i("el-form-item",{attrs:{label:"顺序号:",prop:"sort"}},[i("el-input-number",{attrs:{"controls-position":"right",min:0},model:{value:t.cusBottomForm.sort,callback:function(e){t.$set(t.cusBottomForm,"sort",e)},expression:"cusBottomForm.sort"}})],1),i("el-form-item",{attrs:{label:"落款",prop:"bottomSign"}},[i("el-input",{model:{value:t.cusBottomForm.bottomSign,callback:function(e){t.$set(t.cusBottomForm,"bottomSign",e)},expression:"cusBottomForm.bottomSign"}})],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:""},on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.confirmQuote}},[t._v("保存")])],1)],1)],1)},n=[],a=(i("4e82"),i("a434"),i("8256")),s=i("b775");function l(t){return Object(s["a"])({url:"/wQuoteBottom/findPageList",method:"get",params:t})}function r(t){return Object(s["a"])({url:"/wQuoteBottom/save",method:"post",data:t})}function c(t){return Object(s["a"])({url:"/wQuoteBottom/update",method:"post",data:t})}function u(t){return Object(s["a"])({url:"/wQuoteBottom/delete/".concat(t),method:"get"})}var d={components:{Tinymce:a["a"]},data:function(){return{total:0,searchForm:{pageNumber:1,pageSize:10},cusData:[],dialogVisible:!1,dialogTitle:"",cusBottomForm:{id:"",imgUrl:"",title:"",logo:"",content:"",bottomSign:"",sort:0},cusBottomRules:{title:[{required:!0,message:"请录入标题",trigger:"blur"}],content:[{required:!0,message:"请录入内容",trigger:"blur"}],bottomSign:[{required:!0,message:"请录入内容",trigger:"blur"}]},baseUrl:"https://www.jshengzheng.com/file/video",baseImagUrl:"https://www.jshengzheng.com/file/img",logoFileList:[],pageFileList:[],dialogType:"create",hideLogoUploadEdit:!1,hidePageUploadEdit:!1}},created:function(){this.handleSearch()},methods:{handleSearch:function(){var t=this;l(this.searchForm).then((function(e){200===e.code&&e.result&&(t.cusData=e.result.records||[],t.total=e.result.total)}))},handleAdd:function(){this.cusBottomForm={id:"",imgUrl:"",title:"",logo:"",content:"",bottomSign:"",sort:0},this.pageFileList=[],this.logoFileList=[],this.dialogTitle="新增",this.dialogType="create",this.dialogVisible=!0},handleUpdate:function(t){this.pageFileList=[],this.logoFileList=[],this.cusBottomForm={id:t.id,imgUrl:t.imgUrl,title:t.title,logo:t.logo,content:t.content,bottomSign:t.bottomSign,sort:t.sort},this.dialogTitle="修改",this.dialogType="update",this.dialogVisible=!0},handleDelete:function(t){var e=this;this.$confirm("确定删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){u(t).then((function(t){e.$notify({title:"成功",message:t.message,type:"success"}),e.handleSearch()}))}))},beforeAvatarUpload:function(t){var e=t.size/2048/2048<1;return e||this.$message.error("上传图片大小不能超过 2MB!"),e},onUploadChange:function(t){if("ready"!==t.status)if("success"===t.status){var e=t.response||{};e&&200===e.code?(this.cusBottomForm.imgUrl=t.response.result,this.$message({type:"success",message:"上传成功!"}),this.hidePageUploadEdit=!0):this.$message.error("上传失败!")}else this.$message.error("上传失败!")},onUploadLogoChange:function(t){if("ready"!==t.status)if("success"===t.status){var e=t.response||{};e&&200===e.code?(this.cusBottomForm.logo=t.response.result,this.$message({type:"success",message:"上传成功!"}),this.hideLogoUploadEdit=!0):this.$message.error("上传失败!")}else this.$message.error("上传失败!")},handleRemove:function(t){this.$refs.pageImage.uploadFiles.splice(0,1),this.hidePageUploadEdit=!1,this.cusBottomForm.imgUrl=""},handleLogoRemove:function(t){this.$refs.logoImage.uploadFiles.splice(0,1),this.hideLogoUploadEdit=!1,this.cusBottomForm.logo=""},confirmQuote:function(){var t=this;this.$refs.cusBottomForm.validate((function(e){e&&("create"===t.dialogType?r(t.cusBottomForm).then((function(e){200===e.code?(t.$notify({title:"成功",message:e.message,type:"success"}),t.dialogVisible=!1,t.handleSearch()):t.$notify({title:"失败",message:e.message,type:"error"})})):c(t.cusBottomForm).then((function(e){200===e.code?(t.$notify({title:"成功",message:e.message,type:"success"}),t.dialogVisible=!1,t.handleSearch()):t.$notify({title:"失败",message:e.message,type:"error"})})))}))}}},m=d,h=i("2877"),p=Object(h["a"])(m,o,n,!1,null,null,null);e["default"]=p.exports},5278:function(t,e,i){"use strict";i("cc66")},"5bc6":function(t,e,i){"use strict";i("bf90")},8256:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tinymce-container",class:{fullscreen:t.fullscreen},style:{width:t.containerWidth}},[i("textarea",{staticClass:"tinymce-textarea",attrs:{id:t.tinymceId}}),t._v(" "),i("div",{staticClass:"editor-custom-btn-container"},[i("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff"},on:{successCBK:t.imageSuccessCBK}})],1)])},n=[],a=(i("b680"),i("a9e3"),i("159b"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"upload-container"},[i("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v(" upload ")]),i("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":t.fileList,"show-file-list":!0,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"before-upload":t.beforeUpload,action:"https://httpbin.org/post","list-type":"picture-card"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[t._v(" Click upload ")])],1),i("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v(" Cancel ")]),i("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v(" Confirm ")])],1)],1)}),s=[],l=(i("b64b"),i("d81d"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var t=this;return Object.keys(this.listObj).every((function(e){return t.listObj[e].hasSuccess}))},handleSubmit:function(){var t=this,e=Object.keys(this.listObj).map((function(e){return t.listObj[e]}));this.checkAllSuccess()?(this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!")},handleSuccess:function(t,e){for(var i=e.uid,o=Object.keys(this.listObj),n=0,a=o.length;n<a;n++)if(this.listObj[o[n]].uid===i)return this.listObj[o[n]].url=t.files.file,void(this.listObj[o[n]].hasSuccess=!0)},handleRemove:function(t){for(var e=t.uid,i=Object.keys(this.listObj),o=0,n=i.length;o<n;o++)if(this.listObj[i[o]].uid===e)return void delete this.listObj[i[o]]},beforeUpload:function(t){var e=this,i=window.URL||window.webkitURL,o=t.uid;return this.listObj[o]={},new Promise((function(n,a){var s=new Image;s.src=i.createObjectURL(t),s.onload=function(){e.listObj[o]={hasSuccess:!1,uid:t.uid,width:this.width,height:this.height}},n(!0)}))}}}),r=l,c=(i("5278"),i("2877")),u=Object(c["a"])(r,a,s,!1,null,"3dae379b",null),d=u.exports,m=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],h=m,p=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],f=p,g=i("b85c"),b=[];function v(){return window.tinymce}var y=function(t,e){var i=document.getElementById(t),o=e||function(){};if(!i){var n=document.createElement("script");n.src=t,n.id=t,document.body.appendChild(n),b.push(o);var a="onload"in n?s:l;a(n)}function s(e){e.onload=function(){this.onerror=this.onload=null;var t,i=Object(g["a"])(b);try{for(i.s();!(t=i.n()).done;){var o=t.value;o(null,e)}}catch(n){i.e(n)}finally{i.f()}b=null},e.onerror=function(){this.onerror=this.onload=null,o(new Error("Failed to load "+t),e)}}function l(t){t.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var e,i=Object(g["a"])(b);try{for(i.s();!(e=i.n()).done;){var o=e.value;o(null,t)}}catch(n){i.e(n)}finally{i.f()}b=null}}}i&&o&&(v()?o(null,i):b.push(o))},w=y,_="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",k={name:"Tinymce",components:{editorImage:d},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"},changeVal:{type:Boolean,default:function(){return!1}}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var t=this.width;return/^[\d]+(\.[\d]+)?$/.test(t)?"".concat(t,"px"):t}},watch:{value:function(t){var e=this;!this.changeVal&&this.hasChange||!this.hasInit||this.$nextTick((function(){return window.tinymce.get(e.tinymceId).setContent(t||"")}))}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var t=this;w(_,(function(e){e?t.$message.error(e.message):t.initTinymce()}))},initTinymce:function(){var t=this,e=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList["en"],height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:f,menubar:this.menubar,plugins:h,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(i){e.value&&i.setContent(e.value),e.hasInit=!0,i.on("NodeChange Change KeyUp SetContent",(function(){t.hasChange=!0,t.$emit("input",i.getContent())}))},setup:function(t){t.on("FullscreenStateChanged",(function(t){e.fullscreen=t.state}))},convert_urls:!1})},destroyTinymce:function(){var t=window.tinymce.get(this.tinymceId);this.fullscreen&&t.execCommand("mceFullScreen"),t&&t.destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach((function(t){return window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'.concat(t.url,'" >'))}))}}},S=k,C=(i("5bc6"),Object(c["a"])(S,o,n,!1,null,"ce5a8c0a",null));e["a"]=C.exports},addb:function(t,e){var i=Math.floor,o=function(t,e){var s=t.length,l=i(s/2);return s<8?n(t,e):a(o(t.slice(0,l),e),o(t.slice(l),e),e)},n=function(t,e){var i,o,n=t.length,a=1;while(a<n){o=a,i=t[a];while(o&&e(t[o-1],i)>0)t[o]=t[--o];o!==a++&&(t[o]=i)}return t},a=function(t,e,i){var o=t.length,n=e.length,a=0,s=0,l=[];while(a<o||s<n)a<o&&s<n?l.push(i(t[a],e[s])<=0?t[a++]:e[s++]):l.push(a<o?t[a++]:e[s++]);return l};t.exports=o},bf90:function(t,e,i){},cc66:function(t,e,i){},d998:function(t,e,i){var o=i("342f");t.exports=/MSIE|Trident/.test(o)}}]);