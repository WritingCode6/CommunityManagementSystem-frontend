//判断用户角色：管理员/住户
export function roleJudge(roleId) {
  let role = '';
  if(roleId === 1) {
    role = "administrators";
    return role;
  }
  else if(roleId === 0) {
    role = "household";
    return role;
  }
}
