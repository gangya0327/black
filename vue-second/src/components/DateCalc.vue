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
        <span class="content" id="content"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted: function() {
    let content = document.getElementById("content");
    let funcPanel = document.querySelectorAll(".funcPanel");

    funcPanel[0].addEventListener("click", function() {
      let startDate = document.getElementById("startDate").value;
      let endDate = document.getElementById("endDate").value;
      if (startDate == "" || endDate == "") {
        content.innerHTML = "日期输入有误";
        return;
      }

      let startTime = new Date(Date.parse(startDate.replace(/-/g, "/")));
      let endTime = new Date(Date.parse(endDate.replace(/-/g, "/")));

      let dateOffset = endTime.getTime() - startTime.getTime();
      let years = dateOffset / (1000 * 60 * 60 * 24 * 365);
      dateOffset = dateOffset - parseInt(years) * 1000 * 60 * 60 * 24 * 365;
      let days = dateOffset / (1000 * 60 * 60 * 24);

      content.innerHTML =
        parseInt(years) + " 年 " + days + " 天 ";
    });
  }
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
  border-radius: 5px;
  font-size: 16px;
}
.btn:hover {
  color: #fff;
  background-color: rgb(226, 118, 41);
}
</style>
