//判断用户角色：管理员/住户
export function roleJudge() {
  //管理员是true，住户是false
  let role = '';
  let roleId = localStorage.getItem("roleId")
/*  if(roleId === '1' || roleId === '4' || roleId === '3' || roleId === '5' || roleId === '6')  role = true;
  else if(roleId === '2')  role = false;*/
  if(roleId === '2')  role = false;
  else role = true;
  return role;
}

//判断用户角色
export function tranUserType() {
  let roleId = localStorage.getItem("roleId")
  let userType = ["超级管理员","住户","清洁人员","物业管理员","巡查人员","安保人员"];
  return userType[roleId-1];
}
