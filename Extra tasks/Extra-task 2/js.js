function maxSum (arr) {
    let sum = 0;
    let now = 0;

    arr.forEach((elem) => {
        now += elem;
        sum = Math.max(sum,now);
        if(now<0) {now = 0}

    })
    return sum
}

console.log(maxSum([1,2,56,-1,13,12,-87,23]));
console.log(maxSum([-2,1,-3,4,-1,2,1,-5,4]));

















