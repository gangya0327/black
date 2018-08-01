let arr = [1,2,3,4,5]
for(let i=0;i<arr.length;i++){//编程式
  console.log(arr[i]);
}

let arr2 = [1,2,3,4,5]
arr2.forEach(function(item){//声明式（不关心如何实现）
  console.log(item)
})
//（1）forEach不支持return

let arr3 = [1,2,3,4,5]
arr3.b = 'bbb'
for(let key in arr3){
  console.log(typeof key)//key会变成字符串，包括数组的私有属性也会被打印出来
  console.log(key)
}

let arr4 = [1,2,3,4,5]
arr3.b = 'bbb'
for(let val of arr4){//支持return，不能遍历对象
  console.log(val)
}