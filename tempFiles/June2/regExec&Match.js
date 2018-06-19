var reg = new RegExp("abc", "g");
var str = "afde cbabc5adc babcdd";
var result = reg.exec(str)
console.log(result)
for (item in result) {
    console.log(item, result[item])
}

var reg = new RegExp("abc", "g")
var str = "afde cbabc5adc babcdd";
var result = str.match(reg)
console.log(result)
for (item in result) {
    console.log(item, result[item])
}

function toNonExponential(num) {
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

function toNonExponential2(num) {
    //var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    var reg = /\d(?:\.(\d*))?e([+-]\d+)/;
    var m = reg.exec(num.toExponential())
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}
console.log(toNonExponential(3.3e-7))
console.log(toNonExponential2(3.3e-7))

var reg = new RegExp("abc", "g");
var str = "3abc4,5abc6";
console.log(reg.exec(str));
console.log(str.match(reg));

var reg = new RegExp("a(bc)");
var str = "3abc4,5abc6";
console.log(reg.exec(str));
console.log(str.match(reg));

var reg = new RegExp("a(bc)", "g");
var str = "3abc4,5abc6";
console.log(reg.exec(str));
console.log(str.match(reg));