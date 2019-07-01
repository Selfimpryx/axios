//koa koa-bodyparser 获取请求数据 koa-router 路由  koa-art-template 渲染页面 path 获取绝对路径
//koa-statc 解析静态文件
const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')
const static = require('koa-static')
const session = require('koa-session')

let app = new Koa()
let router = new Router()

let msgs = [
    {
        username:'小明',
        content:'你好'
    },
    {
        username:'小红',
        content:'想撩我吗?'
    },
    {
        username:'小刚',
        content:'撩你妈卖批'
    }
]
//全局变量global
global.mysessionstore = {}

//获取对应的key
function findkey(socketid) {
    for(var key in global.mysessionstore){
        let obj = global.mysessionstore[key]
        if(obj.socketid == socketid){
            return key
        }
    }
}

//获取对应的数据
function findsocketid(socketid) {
    for(var tem in global.mysessionstore){
        let obj = global.mysessionstore[tem]
        if(obj.socketid == socketid){
            return obj
        }
    }
    
}

const IO = require( 'koa-socket' )
const io = new IO()
 
io.attach(app)
 
io.on( 'connection', ( ctx, data ) => {
    console.log('连接上了一个');
  console.log( 'join event fired', data )
  io.broadcast('event','我是服务器来的')
})

//接收用户的信息
io.on('sendmsg',(context)=>{
    // context.Socket.socket.id 私聊用的
    // console.log('消息来了',context.data.content)
    let obj = findsocketid(context.socket.socket.id)
    io.broadcast('allmessage',obj.username+'说:'+context.data.content)
})

//处理登录同步信息
io.on('login',context=>{
    console.log(context.data.id)
    let id = context.data.id
    global.mysessionstore[id].socketid=context.socket.socket.id
    // console.log(global.mysessionstore)

   io.broadcast('online',{
       online:global.mysessionstore
   })

   context.socket.on('disconnect',(context)=>{
       //删除这个用户对应的id
       //获取到socketid
       let socketid = context.socket.socket.id
       let key = findkey(socketid)
       delete global.mysessionstore[key]
       io.broadcast('online',{
           online:global.mysessionstore
       })
   })
})
 //发起私聊
 io.on('siliao',context=>{
    // console.log('96='+context.data.siliaoval)
    let {parveTo,siliaoval} = context.data
    let fromsocketid = context.socket.socket.id
    let username = findsocketid(fromsocketid).username
    //xxx对谁私聊说
    //koa-socket是scoket.io的语法糖 app._io就是对象
    app._io.to(parveTo).emit('allmessage',`${username}对你说:${siliaoval}`)
})

//处理加入组
io.on('joingroup',(ctx)=>{
    console.log(ctx.data)
    let groupid = ctx.data
    ctx.socket.socket.join(groupid)
    console.log('加入'+groupid)
})

//群聊天
io.on('qunliao',(ctx)=>{
    let {groupTo,msg} = ctx.data
    console.log(groupTo)
    let socketid = ctx.socket.socket.id
    let username = findsocketid(socketid).username
    // 
    app._io.to(groupTo).emit('allmessage',`
    来自${groupTo}组的${username}对大家说:${msg}
    `)
})


//加入socket.io结束

render(app,{
    root : path.join(__dirname,'views'),
    extname:'.html',
    debug: process.env.NODE_ENV !== 'production'
})

router.get('/', async (ctx,next)=>{
    ctx.render('index')
})
.post('/login',async (ctx,next)=>{
    let username  = ctx.request.body.username
    // console.log(username)
    let password = ctx.request.body.password
    //不验证直接挂在session
    ctx.session.user = {
        username
    }


    //1.生成时间戳  时间戳响应给客户端类似于cookie
    let id  = Date.now()
    ctx.session.user.id = id
    //   console.log(ctx.session)
    //   console.log('100==='+id)
    //2.保存到自己的sessionstore中
    global.mysessionstore[id] = {
        username:username
    }
    console.log(global.mysessionstore)
    // console.log(ctx.session.user)
    ctx.redirect('list')
})
.get('/list',async (ctx)=>{
    // console.log('134='+ctx.session)
    ctx.render('list',{
        username:ctx.session.user.username,
        id:ctx.session.user.id,
        msgs
    })
})
.post('/add',async (ctx)=>{
    let username = ctx.session.user.username
    var content = ctx.request.body.msg
    msgs.push({
        username,content
    })
    ctx.body = msgs
})
app.keys = ['some secret hurr'];
 
let store = {
    myStore:{},
    get(key){
        return this.myStore[key]
    },
    set(key,session){
        this.myStore[key] = session
    },
    destroy(key){
        delete this.myStore[key]
    }
}
 
app.use(session({store}, app));

app.use(static(path.resolve('./public')))

app.use(bodyparser())

//路由
app.use(router.routes())
//请求不在只是404
app.use(router.allowedMethods())

app.listen(8888,()=>{
    console.log('服务器正在启动中')
})