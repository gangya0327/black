$.ajax({
    type: post,
    data: param,                    //含有page参数，请求第几页
    url: "xxx/xxx",
    error:function(){},
    success: function(data){
        if(data==null){             //数据空，内容空
            html = "空。。。"
        }else{
            listHTML = dododo(data) //渲染数据
            if(param.page==1){      
                html = listHTML     //请求参数是第一页时，内容为覆盖
            }else{                  
                html += listHTML    //请求参数不是第一页，内容为添加
            }
        }
    }
})