<template>
    <div style="margin: 30px;">
        <el-button type="primary" style="margin-bottom: 20px;" @click="addFunConfgDialog">新建配置</el-button>
        <el-dialog :title="funListTit" :visible.sync="funConfigListDialog" width="60%">
            <el-form :model="funConfigForm">
                <el-form-item label="名称：" required :label-width="formLabelWidth" prop="cfgTypeName"
                    :rules="{required:true,message:'名称不能为空', trigger:'blur'}">
                    <el-input v-model="funConfigForm.cfgTypeName" style="width: 320px;" placeholder="请输入名称"></el-input>
                </el-form-item>
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
                width="120" 
				align="center">
				<template slot-scope="scope">
    				<span>{{scope.row.name}}</span>
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
import * as device from 'api/device'
export default {
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: null,
            funConfigList: [],
            funConfigForm: {
                cfgTypeName: ''
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
            device.getFunList(this.page, this.pageSize).then( res => {
                console.log(res)
            })
        },
        funListChangePage(val) {
            this.page = val
            this._getFunList()
        },
        addFunConfgDialog() {
            this.funListTit = '新建'
            this.funConfigListDialog = true
        },
        saveAddFunConfigBtn() {
        },
        editFunBtn(scope) {
            this.funListTit = '编辑'
            this.funConfigListDialog = true
        },
        saveEditFunConfigBtn() {
            
        },
        deletesingleFunConfigBtn(scope) {
          
        },
    }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
</style>
