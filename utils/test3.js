/*
 * @Author: Kaiser
 * @Date: 2020-08-06 17:50:01
 * @Last Modified by: Lhy
 * @Last Modified time: yyyy-08-We 02:21:47
 * @Description: 换零钱
 */
console.time('time');
let totalOfRecursion = 0;
function getCountByRecursion(total, coins) {
  totalOfRecursion++;
  if (total === 0) {
    return 1;
  }
  if (total < 0) {
    return 0;
  }
  if (coins.length === 0) {
    return 0;
  }
  // 不包含当前硬币的组合
  const timesNotIncludingCurrentCoin = getCountByRecursion(total, coins.slice(1));
  // 包含当前硬币的组合
  const timesIncludingCurrentCoin = getCountByRecursion(total - coins[0], coins);
  return timesNotIncludingCurrentCoin + timesIncludingCurrentCoin;
  // return (
  //   // 不包含当前硬币的组合
  //   getCountByRecursion(total, coins.slice(1)) +
  //   // 包含当前硬币的组合
  //   getCountByRecursion(total - coins[0], coins)
  // );
}

function start(title, fun, total = 1000, coins = [50, 20, 10, 5, 1]) {
  console.time(title);
  console.log(title, fun(total, coins), '种组合');
  console.timeEnd(title);
}

start('换零钱 - 递归: ', getCountByRecursion);
console.log('换零钱 - 递归: 循环 ', totalOfRecursion, ' 次');

console.timeEnd('time');
