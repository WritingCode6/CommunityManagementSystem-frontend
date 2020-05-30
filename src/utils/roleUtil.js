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
