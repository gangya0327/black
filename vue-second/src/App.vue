<template>
  <div id="app">
    <div class="nav">
      <img src="./assets/logo.png">
      <ul>
        <li>
          <router-link to='/hello'>Hello</router-link>
        </li>
        <li>
          <router-link to='/dateCalc'>DateCalc</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import DateCalc from "./components/DateCalc";

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  // },
  routes: [
    { path: "/hello", component: HelloWorld },
    { path: "/dateCalc", component: DateCalc }
  ]
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100vh;
}
.nav {
  border-right: 1px solid #eee;
}
.nav img {
  width: 120px;
  margin: 10px;
}
.nav ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}
.nav li a {
  text-decoration: none;
  font-size: 18px;
  background-color: skyblue;
  color: #fff;
  line-height: 2;
  margin: 10px 10px;
  display: block;
  border-radius: 2px;
  border: 1px solid #fff;
}
.nav li a:hover {
  color: skyblue;
  background-color: #fff;
  border: 1px solid skyblue;
}
</style>
