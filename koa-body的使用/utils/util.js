const fs = require('fs');
//子路径
function getUploadDirName() {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  day = date.getDate().length > 1 ? date.getDate() : `0${date.getDate()}`;
  const dir = `${date.getFullYear()}${month}${day}`;
  return dir;
}
// 获取文件后缀
function getUploadFileExt(name) {
  let ext = name.split('.');
  return ext[ext.length - 1];
}

//检查文件是否存在
function checkDirExist(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}
//文件名(包含扩展名)
function getUploadFileName(ext) {
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
}

module.exports = {
  getUploadDirName,
  getUploadFileExt,
  checkDirExist,
  getUploadFileName,
};
