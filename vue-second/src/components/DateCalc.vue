<template>
  <div id="dateCalc">
    <div class="dateCalcPanel">
      <div class="inputPanel">
        <div class="inputItem">
          <label for="startDate">开始日期：</label>
          <input type="date" name="" id="startDate">
        </div>
        <div class="inputItem">
          <label for="endDate">结束日期：</label>
          <input type="date" name="" id="endDate">
        </div>
      </div>
      <div class="funcPanel">
        <button class="btn" id="dateOffset">计算日期差</button>
      </div>
      <div class="outPanel">
        <label for="content">计算结果：</label>
        <span class="content" id="content">13</span>
      </div>
    </div>
  </div>
</template>

<script>
//export default {};
window.onload = function() {
  let startDate = document.getElementById("startDate");
  let endDate = document.getElementById("endDate");
  let content = document.getElementById("content");
  let funcPanel = document.querySelector(".funcPanel");

  funcPanel.addEventListener("click", function() {
    console.log(startDate.nodeName);
  });
};
</script>

<style scoped>
#dateCalc {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 20px;
}
.dateCalcPanel {
  border: 1px solid #eee;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 3px 3px 15px #ccc;
}
.dateCalcPanel > div {
  margin: 20px 0;
}
.inputItem {
  margin: 10px 0;
}
.inputItem input {
  width: 150px;
}
.funcPanel {
  text-align: left;
}
.outPanel .content {
  display: inline-block;
  text-align: left;
  width: 150px;
  border-bottom: 1px solid #ccc;
}
.btn {
  background-color: chocolate;
  border: 1px solid #eee;
  padding: 7px 10px;
  color: #fff;
  cursor: pointer;
  border-radius: 10px;
  font-size: 16px;
}
.btn:hover {
  color: #fff;
  background-color: rgb(226, 118, 41);
}
</style>
