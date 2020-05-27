//判断值班类型
export function typeJudge(type) {
  //0是巡查，1是清洁，2是安保
  let duty0 = '巡查';
  let duty1 = '清洁';
  let duty2 = '安保';
  if(type === '0' || type === 0) {
    return duty0;
  }
  else if(type === '1' || type === 1) {
    return duty1;
  }
  else if(type === '2' || type === 2) {
    return duty2;
  }
}

//判断值班类型转为数字
export function typeJudgeNum(type) {
  //0是巡查，1是清洁，2是安保
  let duty0 = 0;
  let duty1 = 1;
  let duty2 = 2;
  if(type === '巡查') {
    return duty0;
  }
  else if(type === '清洁') {
    return duty1;
  }
  else if(type === '安保') {
    return duty2;
  }
}

