const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = 'Hello world!';
});

router.get('/getQueryData', async (ctx) => {
  const { bookname, author, publisher } = ctx.query;
  console.log(bookname, author, publisher);
  ctx.body = { bookname, author, publisher };
});

router.post('/getParamsData/:bookname/:author/:publisher', async (ctx) => {
  const { bookname, author, publisher } = ctx.params;
  console.log(bookname, author, publisher);
  ctx.body = { bookname, author, publisher };
});

router.post('/getBodyData', async (ctx) => {
  const { bookname, author, publisher } = JSON.parse(ctx.request.body);
  console.log(bookname, author, publisher);
  ctx.body = { bookname, author, publisher };
});

// 上传单个文件
router.post('/upload', async (ctx) => {
  // const file = ctx.request.files.file; // 获取上传文件
  // const content = ctx.request.body;
  // console.log(content, file);
  // // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // let filePath = path.join(__dirname, '/public/upload/') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);
  return (ctx.body = '上传成功！');
});

// 上传多个文件:
router.post('/uploadfiles', async (ctx) => {
  // 上传多个文件
  // const files = ctx.request.files.file; // 获取上传文件
  // for (let file of files) {
  //   // 创建可读流
  //   const reader = fs.createReadStream(file.path);
  //   // 获取上传文件扩展名
  //   let filePath = path.join(__dirname, '/public/upload/') + `/${file.name}`;
  //   // 创建可写流
  //   const upStream = fs.createWriteStream(filePath);
  //   // 可读流通过管道写入可写流
  //   reader.pipe(upStream);
  // }
  return (ctx.body = '上传成功！');
});

router.get('/layer', async (ctx) => {
  await ctx.render('index');
});

module.exports = router;
