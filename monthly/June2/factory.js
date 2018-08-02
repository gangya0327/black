var XMLHttpFactory = function() {};　　　　　　 //这是一个简单工厂模式
　　
XMLHttpFactory.createXMLHttp = function() {　　　
        var XMLHttp = null;　　　　
        if (window.XMLHttpRequest) {　　　　　　
            XMLHttp = new XMLHttpRequest()　　　
        } else if (window.ActiveXObject) {　　　　　　
            XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")　　　　
        }　　
        return XMLHttp;　　
    }　　 //XMLHttpFactory.createXMLHttp()这个方法根据当前环境的具体情况返回一个XHR对象。
    　　
var AjaxHander = function() {　　　　
    var XMLHttp = XMLHttpFactory.createXMLHttp();　　　　　　
}


function User(name, birthday) {
    // only visible from other methods inside User
    function calcAge() {
        return new Date().getFullYear() - birthday.getFullYear();
    }
    this.sayHi = function() {
        //alert(`${name,age:${calcAge()}}`);
    }
}
let user = new User("john", new Date(2000, 0, 1));
user.sayHi(); // john,age:18


function User(name, birthday) {
    // only visible from other methods inside User
    function calcAge() {
        return new Date().getFullYear() - birthday.getFullYear();
    }
    return {
        sayHi() {
            //alert(`${name},age:${calcAge()}`);
        }
    }
}
let user = User("john", new Date(2000, 0, 1)); // 函数名的调用,函数表达式赋值
user.sayHi();