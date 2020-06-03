//性别从数字转换为文字
export function sexChange(sex) {
  if (sex === 0)  sex = '男';
  else if(sex === 1)  sex = '女';
  else sex = '';
  return sex;
}

//性别从文字转换为数字
export function sexChangeNum(sex) {
  if (sex === '男')  sex = 0;
  else if(sex === '女')  sex = 1;
  else sex = '';
  return sex;
}
