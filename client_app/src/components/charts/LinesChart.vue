<template>
  <div class="chartBox boxSD pd-10 mb-15">
    <canvas
      height="120"
      ref="canvasLine"
      style="max-width: 100% !important;"
    ></canvas>
  </div>
</template>
<script>
import Chart from "../../services/chart";
const defaultChartData = {
  labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
  datasets: [
    {
      label: "Tuần này",
      fill: "start",
      data: [5, 10, 12, 4, 20, 11, 7],
      backgroundColor: "rgba(0,123,255,0.1)",
      borderColor: "rgba(0,123,255,1)",
      pointBackgroundColor: "#ffffff",
      pointHoverBackgroundColor: "rgb(0,123,255)",
      borderWidth: 1.5,
      pointRadius: 0,
      pointHoverRadius: 3
    },
    {
      label: "Tuần trước",
      fill: "start",
      data: [22, 13, 5, 7, 8, 11, 20],
      backgroundColor: "rgba(255,65,105,0.1)",
      borderColor: "rgba(255,65,105,1)",
      pointBackgroundColor: "#ffffff",
      pointHoverBackgroundColor: "rgba(255,65,105,1)",
      borderDash: [3, 3],
      borderWidth: 1,
      pointRadius: 0,
      pointHoverRadius: 2,
      pointBorderColor: "rgba(255,65,105,1)"
    }
  ]
};
export default {
  data() {
    return {
      chartData: defaultChartData,
      lineChart: null
    };
  },
  props: {
    lineData: {
      type: [Object, Function],
      default: () => {}
    }
  },
  computed: {
    items: function() {
      return this.lineData;
    }
  },
  methods: {
    initRenderDashboardCanvas: function(chartData) {
      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: "top"
          },
          elements: {
            line: {
              // A higher value makes the line look skewed at this ratio.
              tension: 0.3
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  callback(tick) {
                    return tick;
                  }
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  suggestedMax: 30,
                  callback(tick) {
                    if (tick === 0) {
                      return tick;
                    }
                    // Format the amounts using Ks for thousands.
                    return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                  }
                }
              }
            ]
          },
          hover: {
            mode: "nearest",
            intersect: false
          },
          tooltips: {
            custom: false,
            mode: "nearest",
            intersect: false
          },
          stacked: false
        },
        ...this.chartOptions
      };
      this.lineChart = new Chart(this.$refs.canvasLine, {
        type: "LineWithLine",
        data: chartData,
        options: chartOptions
      });

      // They can still be triggered on hover.
      const buoMeta = this.lineChart.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[chartData.datasets[0].data.length - 1]._model.radius = 0;

      // Render the chart.
      this.lineChart.render();
    }
  },
  mounted() {
    if (this.items) {
      this.chartData.datasets[0].data = this.items.dashboardWeek[0];
      this.chartData.datasets[1].data = this.items.dashboardWeek[1];
    }
    this.initRenderDashboardCanvas(this.chartData);
  },
  beforeRouteLeave(to, from, next) {
    if (this.lineChart) this.lineChart.destroy();
    next();
  }
};
</script>
