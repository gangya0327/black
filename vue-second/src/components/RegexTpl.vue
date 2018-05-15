<template>
  <div id="regexTpl">
    564
  </div>
</template>

<script>
export default {
  name: "regexTpl",
  mounted: function() {
    let str = "Hello, my name is  {{name}} . I am in  {{addr}} ";
    var reg = /{{\w+}}/g;
    console.log(str.match(reg));
  }
};
</script>

<style scoped>

</style>
