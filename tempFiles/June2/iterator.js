var agg = (function() {
    var index = 0;
    var data = [1, 2, 3, 4, 5, 6];
    var length = data.length;
    return {
        next: function() { //这里是从第一个数据开始输出 本例中为 1
            if (!this.hasNext()) {
                return null;
            }
            var element = data[index];
            index++;
            return element;
        },
        hasNext: function() {
            return index < length;
        },
        reWind: function() {
            index = 0;
        },
        current: function() {
            return data[index];
        }
    }
})();
while (agg.hasNext()) {
    console.log(agg.next()); //1,2,3,4,5,6
}
agg.reWind(); //此时重置指针到0