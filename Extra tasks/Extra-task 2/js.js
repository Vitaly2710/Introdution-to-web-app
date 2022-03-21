function maxSum(arr) {
  let sum = 0;
  let now = 0;

  arr.forEach((elem) => {
    now += elem;
    sum = Math.max(sum, now);
    if (now < 0) {
      now = 0
    }

  })
  return sum
}
//test maxSum
// console.log(maxSum([1,2,56,-1,13,12,-87,23]));
// console.log(maxSum([-2,1,-3,4,-1,2,1,-5,4]));
console.log(maxSum([-1]));


function brokerProfit (arr) {
  let pointOfPurchase = 0;
  let buySell = 0;
  arr.forEach((elem,indexElem) => {

    arr.forEach((item,indexItem) => {

      if(indexElem >= indexItem){
        return
      } else {
        if(elem > item){
          buySell = -(elem - item)
        } else {
          buySell = item - elem
          pointOfPurchase = Math.max(buySell,pointOfPurchase)
        }
      }


    })
  })
  return pointOfPurchase
}

//test brokerProfit
console.log(brokerProfit([7,1,5,4,6,4]))
// console.log(brokerProfit([1,2,3,4,5]))
// console.log(brokerProfit([7,6,4,3,1]))






