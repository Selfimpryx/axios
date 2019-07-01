import {web} from "./config.js"

const serviceModule = {
	//删除客户
    customdel: {
        url: web.webUrl+'v2/sale/sale/delete',
        method: 'DELETE'
    },
	//线索列表
	 cluelist: {
	    url: web.webUrl+'v1/chance/chances',
	    method: 'GET'
	},
	//客户列表
	 customlist: {
	    url: web.webUrl+'v3/sale/sale/index',
	    method: 'GET'
	},
	//客户详情
	customdetail: {
	    url: web.webUrl+'v3/sale/sale/info',
	    method: 'post'
	},
	//线索详情
	cluedetail: {
	    url: web.webUrl+'v1/chance/chances',
	    method: 'GET'
	},
	//合同列表
	contractlist:{
		url: web.webUrl+'v3/contract/contracts',
		method: 'GET'
	},
	//合同详情
	contractdetail:{
		url: web.webUrl+'v3/contract/contracts/20',
		method: 'GET'
	},
	//客户状态
	customstatus:{
		url: web.webUrl+'v2/sales_status/sales-status',
		method: 'GET'
	},
	//客户分类
	customfenlei:{
		url: web.webUrl+'v2/custom_category/custom-category',
		method: 'GET'
	},
	//客户标签
	custombiaoqian:{
		url: web.webUrl+'v2/tag/tags',
		method: 'GET'
	},
	//新增客户
	addcustom:{
		url: web.webUrl+'v3/sale/sale/create',
		method: 'post'
	},
	//新增线索
	addclue:{
		url: web.webUrl+'v1/chance/chances',
		method: 'post'
	},
	//线索类型
	getleixing:{
		url: web.webUrl+'v1/config/configs',
		method: 'get'
	},
	//线索来源
	getlaiyuan:{
		url: web.webUrl+'v1/opportunity-froms',
		method: 'get'
	},
	//销售阶段
	getjieduan:{
		url: web.webUrl+'v1/sell_status/sell-statuses',
		method: 'get'
	},
	//我的客户列表
	getmykehu:{
		url: web.webUrl+'/v3/sale/sale/index',
		method: 'get'
	},
	//回款列表
	moneylist:{
		url: web.webUrl+'v1/payments',
		method: 'get'
	},
	//回款详情
	mondetail:{
		url: web.webUrl+'v1/payments',
		method: 'get'
	},
	//合同名称
	getht:{
		url: web.webUrl+'v1/payments',
		method: 'get'
	},
	//审核人列表
	shenherenlist:{
		url: web.webUrl+'v2/department/department/tree',
		method: 'get'
	},
	//新增回款
	addmoney:{
		url: web.webUrl+'v1/payments',
		method: 'post'
	},
	//联系人列表
	personlist:{
		url: web.webUrl+'v2/contact/contact/list',
		method: 'get'
	},
	//联系人详情
	persondetail:{
		url: web.webUrl+'v2/contact/contact/info',
		method: 'post'
	},
	//添加联系人
	addperson:{
		url: web.webUrl+'v2/contact/contact/create',
		method: 'post'
	},
	//任务列表
	tasklist:{
		url: web.webUrl+'v2/task/task/time',
		method: 'get'
	},
	//个人id对应的联系人
	personiddetail:{
		url: web.webUrl+'v2/contact/contact/sales-list',
		method: 'get'
	},
	//添加跟进记录
	addfollow:{
		url: web.webUrl+'v1/tracks',
		method: 'post'
	},
};


const ApiSetting = { ...serviceModule}
export default ApiSetting
