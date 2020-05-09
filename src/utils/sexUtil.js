//性别从数字转换为文字
export function sexChange(sex) {
  if (sex === 0 || sex === '0')  sex = '男';
  else if(sex === 1 || sex === '1')  sex = '女';
  else sex = '';
  return sex;
}
