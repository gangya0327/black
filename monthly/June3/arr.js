function removeWithoutCopy(arr, item) {
    for (var i = 0; i < arr.length; i++) {
        console.log(i, "-", arr[i]);
        console.log("进入位置:", i);
        if (arr[i] == item) {
            arr.splice(i, 1);
            console.log("删除位置:", i);
            i--;
        }
        console.log("光标位置:", i);
    }
}
var arr = [1, 2, 2, 3, 4, 2, 2]
item = 2
removeWithoutCopy(arr, item)
console.log(arr)