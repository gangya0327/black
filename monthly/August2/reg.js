//var reg=/^[0-9]+\.?[0-9]{0,9}$/;
var reg = /(^\d+\d$)|(^\d+\.\d+$)/;
console.log(reg.test("afafd"))
console.log(reg.test("56af15"))
console.log(reg.test("15dsa"))
console.log(reg.test("faa563"))
console.log(reg.test("-123.5"))
console.log(reg.test("1565."))
console.log(reg.test("-1565"))
console.log(reg.test("1565.32"))

var reg = /(12)|(45)/;
console.log(reg.test("113abrcfa"))

// 定义一个动物类
function Animal(name) {
    // 属性
    this.name = name || 'Animal';
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉！');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
};

function Cat(){ }
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';
//&emsp;Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.eat('fish'));
console.log(cat.sleep());
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true
