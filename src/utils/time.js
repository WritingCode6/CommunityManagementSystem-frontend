//处理时间，显示年月日，不显示具体时间
export function timeChange(time) {
  let arr = [];
  arr = time.split(' ');
  return arr[0];
}

//处理时间，显示年月日，不显示具体时间
export function timeChangeT(time) {
  let arr = [];
  arr = time.split('T');
  return arr[0];
}

//处理时间，将标准时间转变为yyyy-mm-dd 00:00:00
export function timeChange2(date) {
  var newDate = '';
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  //判断小于10的月份
  if(m < 10) {
    newDate = y + '-0' + m;
  }
  else {
    newDate = y + '-' + m;
  }
  var d = date.getDate();
  //判断小于10的天数
  if(d < 10) {
    newDate = newDate + '-0' + d;
  }
  else {
    newDate = newDate + '-' + d;
  }
  //拼接字符串
  newDate = newDate + ' ' + '00:00:00';
  return newDate;
}

//处理时间，显示yyyy年mm月dd日，中文格式
export function timeChangeC(str) {
  let t1 = '';
  t1 = str.replace("-","年");
  t1 = t1.replace("-","月");
  t1 = t1.replace(" ","日");
  return t1;
}
