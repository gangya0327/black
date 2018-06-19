$(".showNext").click(function() {
    if ($(this).children("span").children("i").hasClass("fa-angle-down")) {
        $(this).children("span").children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
        $("." + class1 + " .Result").css("height", "auto");

    } else {
        $("." + class1 + " .Result").css("height", "30px");
        $(this).children("span").children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
    };

});


function toNonExponential(num) {
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    console.log(m);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

console.log(toNonExponential(3.6e-7));

function toNumberStr(num, digits) {
    // 正则匹配小数科学记数法
    if (/^(\d+(?:\.\d+)?)(e)([\-]?\d+)$/.test(num)) {
        // 正则匹配小数点最末尾的0
        var temp = /^(\d{1,}(?:,\d{3})*\.(?:0*[1-9]+)?)(0*)?$/.exec(num.toFixed(digits));
        if (temp) {
            return temp[1];
        } else {
            return num.toFixed(digits);
        }
    } else {
        return "" + num;
    }
}

function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
console.log(accMul(0.62, 2))


function accAdd(arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}
console.log(accAdd(2462, 0.322))

function priceCarry(price) {
    return parseInt(price) + 1
}
console.log(priceCarry(2))

facePrice
nightlyRate.length
totalPrice

total = facePrice * nightlyRate.length;
originTotal = roomPrice * nightlyRate.length;

originTotalPrice = accAdd(accAdd(originTotal * roomCount, price), serviceFee * roomCount * nightlyRate.length)
price = priceCarry(price); //对企业加价进1取整

totalPrice

originPrice

premiumRate = "( " + premium.rate * 100 + "% )";