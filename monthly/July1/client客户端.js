var testBtn = document.getElementById("testBtn")
testBtn.onclick = function(){
    console.log("testBtn")
}

function foo() {
    var stamp = new Date().getTime();
    $.ajax({
        url: "/",
        type: "get",
        success: function (data) {
            console.log(data);
            console.log("foo", stamp);
        }
    });
}

foo();