var priceList = [
  {
    id: 0,
    price: 1,
    linkageIdList: [{
      id: 1,
      multiple: 4
    }]
  },
  {
    id: 1,
    price: 4,
    linkageIdList: [{
      id: 2,
      multiple: 2
    }]
  },
  {
    id: 2,
    price: 2,
    linkageIdList: []
  }
]
console.time('time');
function priceLinkage(id,price) {
  // 目标索引值
  const index = getIndexById(id);
  // 设置数组中目标索引值价格
  priceList[index].price = price;
  // 判断目标值是否有联动
  if(priceList[index].linkageIdList.length === 0) {
    return false;
  }
  // 赋值联动值
  priceList[index].linkageIdList.forEach(function(e){
    priceLinkage( e.id, price * e.multiple )
  });
}
// 根据id得到索引
function getIndexById(id) {
  return priceList.findIndex(function(e){
    return e.id === id
  });
}

priceLinkage(0,1);
console.log(priceList);
console.timeEnd('time');
