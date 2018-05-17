<template>
  <div id="regexTpl">
    因本人学业还未完成，现在打算回宁波学校做毕业设计答辩的准备，暂时离开杭州一段时间。
    目前主管安排的工作基本已经完成，剩余少量交接工作，预期能在一周内离职。
    感谢公司同事和领导两年来的帮助和关怀，希望予以批准。
  </div>
</template>

<script>
export default {
  name: "regexTpl",
  mounted: function() {
    let str = "Hello, my name is  {{name}} . I am in  {{addr}}. ";
    let strs = [
      "hello {{__}}",
      "hello {{}}",
      "hello {name}",
      "hello {{name.age}}",
      "hello {{name.age.abc}}",
      "hello {{ {good} }",
      "hello {{123ok no}}",
      "hello {{ {{dd}} {{ok.dd}}"
    ];
    var reg = /{{[a-zA-Z0-9_$][a-zA-Z0-9$_\.]+}}/g;
    strs.forEach(function(str) {
      console.log(str.match(reg));
    });
    var data = {
      name: 'raven',
      addr: 'balck knight'
    }
    str.replace(reg, function(raw, key, offset, string){
      console.log(arguments)
      return data[key]||raw
    })
  }
};
</script>

<style scoped>
</style>
