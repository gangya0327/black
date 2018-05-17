<template>
  <div id="rotateDiv">
    <div class="rotatePanel">
      <ul class="cityList">
        <li></li>
      </ul>
      <div class="cityOne">
        <div class="cityOneHead">
          <div class="cityNameTemp">
            <div class="cityName">上海</div>
            <div class="cityTemp">30°</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rotateEasy">
      <div class="panel1">
        <span>hello</span>
        <h1>中国</h1>
        <p>中国</p>
      </div>
      <div class="panel2">
        <span>hello</span>
        <h1>CHINA</h1>
        <p>CHINA</p>
      </div>
    </div>
    <div class="parent">
      <div class="panel3" id='rotateDom'>
        <span>{{hello}}</span>
        <h1 v-if='china'>china</h1>
        <h1 v-else>中国</h1>
        <p v-if='china'>welcome</p>
        <p v-else>欢迎你</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rotateDiv",
  data() {
    return {
      hello: "你好",
      china: false
    };
  },
  created() {
    changeChina: {
      console.log(this.china);
      this.china = !this.china;
      this.hello = "4141";
      console.log(this.china);
      // setInterval(() => {
      //   this.china = !this.china;
      // }, 2000);
    }
    setTimeout(this.changeChina, 10);
  },
  mounted() {
    let rotateDom = document.getElementById("rotateDom");
    //console.log(rotateDom);
    console.log("Color: " + window.getComputedStyle(rotateDom, null).transform);
    // setInterval(() => {
    //   console.log("in");
    //   console.log("color: " + window.getComputedStyle(rotateDom, null).transform);
    // }, 3900);
  }
};
</script>

<style scoped>
#rotateDiv {
  background-color: rgb(0, 47, 86);
  color: white;
}
#rotateDom {
  background-color: forestgreen;
}
.panel1,
.panel2,
.panel3 {
  width: 200px;
  background-color: rgb(231, 79, 79);
  margin: 20px;
  height: 150px;
  padding: 10px;
  position: absolute;
}
.panel1 {
  animation: rotateX1 4s ease-in-out forwards infinite;
}
.panel2 {
  animation: rotateX2 4s ease-in-out forwards infinite;
}
@keyframes rotateX1 {
  0% {
    transform: perspective(1000) rotateX(90deg);
  }
  25% {
    transform: perspective(1000) rotateX(0deg);
  }
  50% {
    transform: perspective(1000) rotateX(-90deg);
  }
  100% {
    transform: perspective(1000) rotateX(-90deg);
  }
}
@keyframes rotateX2 {
  0% {
    transform: perspective(1000) rotateX(90deg);
  }
  50% {
    transform: perspective(1000) rotateX(90deg);
  }
  75% {
    transform: perspective(1000) rotateX(0deg);
  }
  100% {
    transform: perspective(1000) rotateX(-90deg);
  }
}
.pp {
  perspective: 1000px;
}
.panel3 {
  top: 400px;
  animation: r1otateX3 4s ease-out forwards infinite;
  transform: rotateX(89deg);
}
@keyframes rotateX3 {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(-180deg);
  }
  100% {
    transform: rotateX(-360deg);
  }
}
</style>
