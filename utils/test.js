var count = 0;
var number = 0;
/**
 * 兑钱
 * @param {Number} sum 剩余兑换金额
 * @param {Array} arr 使用的面值种类
 */
console.time('time');
function sums(sum,arr){
  // 当剩余金额为0，表示出现一种正确兑换方案
  if(sum === 0) {
    count += 1;
    return false;
  }
  // 当剩余金额小于0，表示已经不能用当前面值兑换
  if(sum < 0) {
    return false;
  }
  // 可以面值种类没有了停止兑换
  if(arr.length===0) {
    return false;
  }
  // 当剩余金额大于0，并且可以还有可用兑换面值，将剩余的继续用当前面兑换
  // 当前兑换金额使用可以面值池的第一个
  let rem = sum - arr[0]
  // 有剩余继续兑换
  sums(rem, arr);
  // 当前兑换金额不使用面值池的第一个，将第一个从面值池删除
  let arrNew = JSON.parse(JSON.stringify(arr));
  arrNew.shift();
  sums(sum,arrNew);
  number+=1;
}
sums(400,[50,20,10,5,1])
console.log(count);
console.log(number);
console.timeEnd('time');
