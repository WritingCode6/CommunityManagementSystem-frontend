//判断反馈情况
export function receiveJudge(receive) {
  //0是未处理，1是已处理
  let result1 = '未处理';
  let result2 = '已处理';
  if(receive === '0' || receive === 0)  return result1;
  else if(receive === '1' || receive === 1)  return result2;
}

//判断反馈类型
export function fbTypeJudge(type) {
  //0是建议，1是投诉
  let type1 = '建议';
  let type2 = '投诉';
  if(type === '0' || type === 0)  return type1;
  else if(type === '1' || type === 1)  return type2;
}
