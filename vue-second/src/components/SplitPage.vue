<template>
  <div id="splitPage">
    <div class="container">
      <div class="split left">
        <h1>The Designer</h1>
        <a href="#" class="btn">Read More</a>
      </div>
      <div class="split right">
        <h1>The Programmer</h1>
        <a href="#" class="btn">Read More</a>
      </div>
    </div>
  </div>
</template>

<script>
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".container");

left.addEventListener("mouseenter", () => {
  container.classList.add("hover-left");
});
left.addEventListener("mouseleave", () => {
  container.classList.remove("hover-left");
});
right.addEventListener("mouseenter", () => {
  container.classList.add("hover-right");
});
right.addEventListener("mouseleave", () => {
  container.classList.remove("hover-right");
});

export default {
  name: "splitPage"
};
</script>

<style scoped>
/* 全局变量 */
#splitPage {
  --container-bg-color: #333;
  --left-bg-color: rgba(223, 39, 39, 0.7);
  --right-bg-color: rgba(43, 43, 43, 0.8);
  --left-btn-hover-color: rgba(161, 11, 11, 0.3);
  --right-btn-hover-color: rgba(92, 92, 92, 0.3);
}
html,
body,
#splitPage {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--container-bg-color);
}
.split {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.split.left {
  left: 0;
  background: url("../assets/designer.jpg") center center no-repeat;
  background-size: cover;
}
.split.right {
  right: 0;
  background: url("../assets/programmer.jpg") center center no-repeat;
  background-size: cover;
}
.split.left::before {
  position: absolute;
  left: 0;
  content: "";
  width: 100%;
  height: 100%;
  background: var(--left-bg-color);
}
.split.right::before {
  position: absolute;
  right: 0;
  content: "";
  width: 100%;
  height: 100%;
  background: var(--right-bg-color);
}
h1 {
  font-size: 4rem;
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  top: 20%;
}
.btn {
  display: block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 40%;
  height: 2.5rem;
  padding-top: 1.3rem;
  width: 15rem;
  text-align: center;
  color: #fff;
  border: 0.2rem solid #fff;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
}
.split.left .btn:hover {
  background-color: var(--left-btn-hover-color);
  border: var(--left-btn-hover-color);
}
.split.right .btn:hover {
  background-color: var(--right-btn-hover-color);
  border-color: var(--right-btn-hover-color);
}
</style>
