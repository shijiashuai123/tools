<template>
    <div style="margin: 30px;">
        <el-button type="primary" style="margin-bottom: 20px;" @click="addFunConfgDialog">新建配置</el-button>
        <el-dialog :title="funListTit" :visible.sync="funConfigListDialog" width="60%">
            <el-form :model="funConfigForm">
                <el-form-item label="新建图片：" :label-width="formLabelWidth">
                    <el-upload
                        :action="uploadApi"
                        :data="uploadParams"
                        :on-success="successState"
                        style="display: inline-block;">
                        <img v-if="funConfigForm.songImage" v-lazy="funConfigForm.songImage" style="width: 50px; height: 50px;">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="名称：" required :label-width="formLabelWidth" prop="name"
                    :rules="{required:true,message:'名称不能为空', trigger:'blur'}">
                    <el-input v-model="funConfigForm.name" style="width: 320px;" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="描述：" required :label-width="formLabelWidth" prop="description"
                    :rules="{required:true,message:'描述不能为空', trigger:'blur'}">
                    <el-input v-model="funConfigForm.description" style="width: 320px;" placeholder="请输入描述"></el-input>
                </el-form-item>
                <el-form-item label="连接url：" required :label-width="formLabelWidth" prop="htmlUrl"
                    :rules="{required:true,message:'连接url不能为空', trigger:'blur'}">
                    <el-input v-model="funConfigForm.htmlUrl" style="width: 320px;" placeholder="请输入连接url"></el-input>
                </el-form-item>
                <!-- <el-form-item label="资源：" required :label-width="formLabelWidth" prop="resource"
                    :rules="{required:true,message:'资源不能为空', trigger:'blur'}">
                    <el-input v-model="funConfigForm.resource" style="width: 320px;" placeholder="请输入资源"></el-input>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="funConfigListDialog = false">取 消</el-button>
                <el-button type="primary" v-if="funListTit==='新建'"  @click="saveAddFunConfigBtn">确 定</el-button>
                <el-button type="primary" v-if="funListTit==='编辑'" @click="saveEditFunConfigBtn">确 定</el-button>
            </div>
        </el-dialog>
        <el-table
			:data="funConfigList"
			border
			style="width: 80%">
			<el-table-column
				label="id"
				width="100"
				align="center">
				<template slot-scope="scope">
				<span>{{scope.row.id}}</span>
				</template>
			</el-table-column>
            <el-table-column
				label="名字"
                width="130" 
				align="center">
				<template slot-scope="scope">
    				<span>{{scope.row.name}}</span>
				</template>
			</el-table-column>
            <el-table-column
				label="图片"
                width="120" 
				align="center">
				<template slot-scope="scope">
    				<!-- <span>{{scope.row.image}}</span> -->
                    <img v-lazy="scope.row.image" alt="" style="width: 50px; height: 50px;">
				</template>
			</el-table-column>
            <el-table-column
				label="连接"
                width="160" 
				align="center">
				<template slot-scope="scope">
    				<a target="_blank" :href="scope.row.htmlUrl">{{scope.row.htmlUrl}}</a>
				</template>
			</el-table-column>
            <el-table-column
				label="描述"
                width="120" 
				align="center">
				<template slot-scope="scope">
    				<span>{{scope.row.description}}</span>
				</template>
			</el-table-column>
            <el-table-column align="center" label="操作">
				<template slot-scope="scope">
                    <el-button-group>
					    <el-button type="primary" size="mini" @click="editFunBtn(scope.row)">编辑</el-button>
					    <el-button type="danger" size="mini" @click="deletesingleFunConfigBtn(scope.row)">删除</el-button>
                    </el-button-group>
				</template>
			</el-table-column>
		</el-table>
        <el-pagination
            @current-change="funListChangePage"
            :current-page.sync="page"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total"
            style="background-color: #fff;">
        </el-pagination>
    </div>
</template>

<script>
const uploadApi = 'http://manager.itinga.cn/uploadFile/file'
import * as resource from '@/api/resource'
export default {
    data() {
        return {
            uploadApi,
            uploadParams: {
                time: Date.parse(new Date()) + 1000 * 60 * 60 * 24 * 9999,
                distName: 'manager',
                fileName: 'protal'
            },
            page: 1,
            pageSize: 20,
            total: null,
            funConfigList: [],
            funConfigForm: {
                name: '',
                songImage: '',
                htmlUrl: '',
                type: 5,
                resource: 21,
                description: ''
            },
            funConfigListDialog: false,
            formLabelWidth: '130px',
            funListTit: '新建'
        }
    },
    created() {
        this._getFunList()
    },
    methods: {
        _getFunList() {
            resource.getConsultBannerList(this.page, this.pageSize).then( res => {
                console.log(res)
                this.funConfigList = res.data.lists
                this.total = res.data.total
            })
        },
        funListChangePage(val) {
            this.page = val
            this._getFunList()
        },
        addFunConfgDialog() {
            delete this.funConfigForm.id
            this.funConfigForm.name = ''
            this.funConfigForm.songImage = ''
            this.funConfigForm.htmlUrl = ''
            this.funConfigForm.description = ''
            this.funListTit = '新建'
            this.funConfigListDialog = true
        },
        saveAddFunConfigBtn() {
            resource.newResourceSheetList(this.funConfigForm).then(res => {
                console.log(res)
                if (res.data.ret === 0) {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this._getFunList()
                    this.funConfigListDialog = false
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        editFunBtn(scope) {
            this.funConfigForm = scope.row
            this.funListTit = '编辑'
            this.funConfigListDialog = true
        },
        saveEditFunConfigBtn() {
            resource.editResourceSheetList(this.funConfigForm).then(res => {
                console.log(res)
                if (res.data.ret === 0) {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this._getFunList()
                    this.funConfigListDialog = false
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        deletesingleFunConfigBtn(scope) {
            resource.deleteResourceSheetList(this.funConfigForm).then(res => {
                console.log(res)
                if (res.data.ret === 0) {
                    this.$message({
                        type: 'success',
                        message: res.data.msg
                    })
                    this._getFunList()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.data.msg
                    })
                }
            })
        },
        successState(file) {
            console.log(file)
            this.funConfigForm.songImage = file.url
        }
    }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .el-icon-plus {
        font-size: 15px;
        color: #8c939d;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border: 1px dashed #aaa;
        border-radius: 5px;
        text-align: center;
        &:hover {
            border: 1px dashed #438DD9;
        }
    }
</style>
