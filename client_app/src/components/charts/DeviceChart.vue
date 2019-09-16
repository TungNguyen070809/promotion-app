<template>
  <div class="chartBox boxSD mb-15">
    <canvas
      height="220"
      ref="canvasDevice"
      class="blog-users-by-device m-auto"
    ></canvas>
  </div>
</template>
<script>
import Chart from "../../services/chart";
const defaultChartData = {
  datasets: [
    {
      hoverBorderColor: "#ffffff",
      data: [68.3, 24.2, 7.5],
      backgroundColor: [
        "rgba(0, 166, 81, 0.9)",
        "rgba(0, 166, 81, 0.7)",
        "rgba(0, 166, 81, 0.5)"
      ]
    }
  ],
  labels: ["Desktop", "Tablet", "Mobile"]
};
export default {
  data() {
    return {
      chartData: defaultChartData,
      deviceChart: null,
      chartUpdate: true
    };
  },
  props: {
    deviceData: {
      type: [Array, Function],
      default: () => {}
    }
  },
  computed: {
    items: function() {
      // if (this.chartUpdate && this.deviceData) {
      //   this.chartData.datasets[0].data = this.deviceData;
      //   this.chartUpdate = false;
      //   if (this.deviceChart) this.deviceChart.update();
      // }
      return this.deviceData;
    }
  },
  methods: {
    initRenderDashboardCanvas: function(chartData) {
      if (this.deviceChart) {
        this.deviceChart.update();
        return true;
      }
      const chartConfig = {
        type: "pie",
        data: chartData,
        options: {
          ...{
            legend: {
              position: "bottom",
              labels: {
                padding: 25,
                boxWidth: 20
              }
            },
            cutoutPercentage: 0,
            tooltips: {
              custom: false,
              mode: "index",
              position: "nearest"
            }
          },
          ...this.chartOptions
        }
      };
      this.deviceChart = new Chart(this.$refs.canvasDevice, chartConfig);
    }
  },
  mounted() {
    if (this.items) {
      this.chartData.datasets[0].data = this.items;
    }
    this.initRenderDashboardCanvas(this.chartData);
  },
  beforeRouteLeave(to, from, next) {
    if (this.deviceChart) this.deviceChart.destroy();
    next();
  }
};
</script>
<style lang="scss" scoped>
.deviceChart {
  .chartBox {
    padding: 15px 10px;
  }
}
</style>
