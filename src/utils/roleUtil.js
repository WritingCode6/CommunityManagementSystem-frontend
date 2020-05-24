//判断用户角色：管理员/住户
export function roleJudge() {
  //管理员是true，住户是false
  let role = '';
  let roleId = localStorage.getItem("roleId")
  if(roleId === '1')  role = true;
  else if(roleId === '0')  role = false;
  return role;
}
