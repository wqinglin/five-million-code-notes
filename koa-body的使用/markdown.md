# koa-body 的注意事项

1.中间件顺序问题;
2.next() 别忘记写; 3.表单 post( enctype="multipart/form-data")提交时,切记别额外添加点击事件或操作 DOM,会造成 ctx.request.files; !!!

 <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="text" name="name" />
      <input type="file" name="file" />
      <input type="submit" value="提交" />
</form>

如果要添加点击事件或操作 DOM,采用 new FormData()的方式，不用去声明 enctype="multipart/form-data"

<form id="myform">
      <input type="text" name="name" id="inp" value="" />
      <input type="file" name="file1" id="file1" />
      <button id="submitBtn">提交</button>
</form>

<script>
let submitBtn = document.getElementById('submitBtn');
let form = document.getElementById('myform');
let formData = new FormData(form);

function conDeal() {
    formData.delete('name');
    let inp = document.getElementById('inp');
    formData.append('name', inp.value);

    formData.delete('file1');
    let file1 = document.getElementById('file1');
    formData.append('file1', file1.files[0]);
}
function ajaxReq() {
    var ajax = new XMLHttpRequest();
    ajax.open('post', '/upload', true);
    ajax.send(formData);
    ajax.onload = function () {
        console.log(ajax.response);
    };
}
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    conDeal();
    ajaxReq();
});
</script>

3.一定要写multipart: true ！！！

app.use(
  koaBody({
    multipart: true,  !!!
    formidable: {
      maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      // 上传目录
       uploadDir: path.join(__dirname, '/public/upload'),
      // 保留文件扩展名
      keepExtensions: true,
    },
  })
);

4.encoding:'gzip' 会影响post 传值(ctx.request.body)
