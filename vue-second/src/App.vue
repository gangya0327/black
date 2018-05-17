<template>
  <div id="app">
    <div class="nav">
      <img src="./assets/logo.png">
      <ul>
        <li>
          <router-link to='/hello'>HelloWorld</router-link>
        </li>
        <li>
          <router-link to='/dateCalc'>DateCalc</router-link>
        </li>
        <li>
          <router-link to='/splitPage'>SplitPage</router-link>
        </li>
        <li>
          <router-link to='/chartDemo'>ChartDemo</router-link>
        </li>
        <li>
          <router-link to='/regexTpl'>RegexTpl</router-link>
        </li>
        <li>
          <router-link to='/rotateDiv'>RotateDiv</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import DateCalc from "./components/DateCalc";
import SplitPage from "./components/SplitPage";
import ChartDemo from "./components/ChartDemo";
import RegexTpl from "./components/RegexTpl";
import RotateDiv from "./components/RotateDiv";

export default {
  name: "App",
  // components: {
  //   HelloWorld,
  // },
  routes: [
    { path: "/hello", component: HelloWorld },
    { path: "/dateCalc", component: DateCalc },
    { path: "/splitPage", component: SplitPage },
    { path: "/chartDemo", component: ChartDemo },
    { path: "/regexTpl", component: RegexTpl },
    { path: "/rotateDiv", component: RotateDiv },
  ]
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100vh;
}
.nav {
  border-right: 1px solid #eee;
  background-color: #eee;
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
  border: 1px solid #ccc;
  box-shadow: 1px 1px 3px #777;
}
.nav li a:hover {
  color: skyblue;
  background-color: #fff;
  border: 1px solid skyblue;
}
</style>
