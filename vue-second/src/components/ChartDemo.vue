<template>
  <div id="chartDemo">
    <div class="row">
      <template v-for="variant in ['primary','secondary','success']">
        <div class="col-md-4 pb-2" v-for="size in ['sm','','lg']" :key="`${variant}_${size}`">
          <b-button :size="size" :variant="variant">
            {{variant}} {{size}}
          </b-button>
        </div>
      </template>
    </div>
    <canvas id='myChart'></canvas>
  </div>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Chart from "chart.js";
Vue.use(BootstrapVue);
export default {
  name: "chartDemo",
  mounted: function() {
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 14;
    Chart.defaults.global.defaultFontColor = "#777";

    let myChart = document.getElementById("myChart").getContext("2d");
    let chart = new Chart(myChart, {
      type: "bar",
      data: {
        labels: ["北京", "深圳", "广州", "上海", "杭州", "成都"],
        datasets: [
          {
            label: "城市工作热度",
            data: [617597, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: [
              "rgba(21,36,159,0.6)",
              "rgba(212,34,101,0.6)",
              "rgba(1,126,15,0.6)",
              "rgba(21,236,159,0.6)",
              "rgba(255,21,77,0.6)"
            ],
            borderWidth: 1,
            borderColor: "#aaa",
            hoverBorderWidth: 2,
            hoverBorderColor: "#333"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "中国各大城市热度",
          fontSize: 24
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            fontColor: "#000"
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 50,
            top: 50,
            bottom: 50
          }
        },
        tooltips: {
          enabled: true
        }
      }
    });
    console.log(myChart);
  }
};
</script>

<style scoped>
@import "bootstrap-vue/dist/bootstrap-vue.css";
@import "bootstrap/dist/css/bootstrap.css";
</style>
