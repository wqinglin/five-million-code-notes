const Koa = require('koa');
const router = require('./router');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const views = require('koa-views');
const static = require('koa-static');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const json = require('koa-json');
const path = require('path');
const {
  getUploadDirName,
  getUploadFileExt,
  checkDirExist,
  getUploadFileName,
} = require('./utils/util');

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-control-Allow-Methods', '*');
  ctx.set('Access-Control-Max-Age', 1728000);
  ctx.set(
    'Access-control-Allow-Headers',
    'X-Requested-With,content-type,Authorization'
  ); // 设置接收携带Authorization的请求
  if (ctx.method == 'OPTIONS') {
    // 设置跨越, 预连接 :传输类型 OPTIONs
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(cors());

// app.use(
//   koaBody({
//     multipart: true,
//     formidable: {
//       maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
//       // 上传目录
//       // uploadDir: path.join(__dirname, '/public/upload'),
//       // // 保留文件扩展名
//       keepExtensions: true,
//     },
//   })
// );

app.use(
  koaBody({
    multipart: true, // 支持文件上传
    formidable: {
      uploadDir: path.join(__dirname, '/public/upload/'), // 设置文件上传目录
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: 10 * 1024 * 1024, // 文件上传大小限制
      onFileBegin: (name, file) => {
        // 获取文件后缀
        const ext = getUploadFileExt(file.name);
        // 最终要保存到的文件夹目录
        const dirName = getUploadDirName();
        const dir = path.join(__dirname, `public/upload/${dirName}`);
        // 检查文件夹是否存在如果不存在则新建文件夹
        checkDirExist(dir);
        // 获取文件名称
        const fileName = getUploadFileName(ext);
        // 重新覆盖 file.path 属性
        file.path = `${dir}/${fileName}`;
        app.context.uploadpath = app.context.uploadpath
          ? app.context.uploadpath
          : {};
        app.context.uploadpath[name] = `${dirName}/${fileName}`;
      },
    },
  })
);



app.use(static(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'html',
  })
);

app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());

app.use(logger());

app.use(router.routes());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});
//控制台监听不生效
app.listen(3500);

module.exports = app;
