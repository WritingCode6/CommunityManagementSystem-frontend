//车位或车辆的函数显示
export function parkingProgress(amount, total) {
  return parseFloat(amount / total * 100).toFixed(2);
}
