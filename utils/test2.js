
console.time('test')
function change(coins, i, amount) {
  // 无法凑整
  if (amount < 0) {
    return 0
  }
  // 符合结果的组合
  if (amount == 0) {
    return 1
  }
  // 所有硬币类型都试过了
  if (i >= coins.length) {
    return 0
  }
  // 选择当前硬币 + 不选择当前硬币
  return change(coins, i, amount-coins[i]) + change(coins, i+1, amount)
}

console.log(change([50,20,10,5,1],0,1000));
console.timeEnd('test')
