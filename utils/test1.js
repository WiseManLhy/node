//计算函数执行时间
console.time('test')
function change(coins, amount) {
  // 将兑换金额每种情况种数的数组，第一位存1是为了方便计算
  const dp = new Array(amount + 1)
  // for (let i = 0; i < dp.length; i++) {
  //   if ( i === 0 ) {
  //     dp[i] = 1
  //   } else {
  //     dp[i] = 0
  //   }
  // } 
  // 余额有多少种情况
  dp.fill(0);
  dp[0]=1;
  // 循环面值池
  for ( let i = 0; i < coins.length; i++) {
    // 循环兑换金额
    for ( let j = 1; j <= amount; j++) {
      // 如果当前面值小于等于当前金额，说明可以兑换，
      if ( coins[i] <= j) {
        // 聚合数组的对应下标存入，当前下标中的值加上，当前余额为下标的值
        dp[j] = dp[j] + dp[j- coins[i]] 
      }
    }
  }
  return dp[amount]
}


console.log(change([50,20,10,5,1],100));
console.timeEnd('test')
