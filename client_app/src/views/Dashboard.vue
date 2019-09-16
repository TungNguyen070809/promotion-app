<template>
  <div class="dashboardPage ">
    <b-row>
      <b-col md="12" class="dasItem chartLine">
        <lines-chart :line-data="getDashboardData" v-if="getDashboardData" />
      </b-col>
    </b-row>
    <b-row class="small">
      <b-col md="7" class="dasItem countChart">
        <div class="chartBox boxSD pd-10 mb-15">
          <b-row class="">
            <b-col sm="4" class="countItem">
              <div class="item text-center boxSD">
                <b>Lượt vào trang</b>
                <h3>{{ getDashboardData ? getDashboardData.totalView : 0 }}</h3>
              </div>
            </b-col>
            <b-col sm="4" class="countItem">
              <div class="item text-center boxSD">
                <b>Lượt quay</b>
                <h3>
                  {{ getDashboardData ? getDashboardData.totalTurned : 0 }}
                </h3>
              </div>
            </b-col>
            <b-col sm="4" class="countItem">
              <div class="item text-center boxSD">
                <b>Tổng email</b>
                <h3>
                  {{ getDashboardData ? getDashboardData.totalEmail : 0 }}
                </h3>
              </div>
            </b-col>
          </b-row>
        </div>
        <div class="exportExel boxSD pd-10 mb-15 clearfix">
          <h3 class="subText">
            Xuất File.
            <span
              >File Exel danh sách các khách hàng đã tham gia quay thưởng.</span
            >
          </h3>
          <button class="btn btn-success btnSendData" type="button">
            Xuất file
          </button>
        </div>
      </b-col>
      <b-col md="5" class="dasItem deviceChart">
        <device-chart
          :device-data="getDashboardData.dashboardDevice"
          v-if="getDashboardData"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import DeviceChart from "../components/charts/DeviceChart";
import LinesChart from "../components/charts/LinesChart";
export default {
  name: "Dashboard",
  components: {
    DeviceChart,
    LinesChart
  },
  computed: {
    getDashboardData() {
      // this.dashboardData = this.$store.getters.GET_DASHBOARD;
      // if (!this.dashboardData) return {};
      // if (
      //   this.chartUpdate &&
      //   this.dashboardData &&
      //   this.dashboardData.dashboardWeek.length > 1
      // ) {
      //   this.chartData.datasets[0].data = this.dashboardData.dashboardWeek[0];
      //   this.chartData.datasets[1].data = this.dashboardData.dashboardWeek[1];
      //   this.chartUpdate = false;
      //   this.dashboardDevice = this.dashboardData.dashboardDevice;
      //   if (this.lineChart) this.lineChart.update();
      // }
      // return this.dashboardData;
      return this.$store.getters.GET_DASHBOARD;
    }
  }
};
// var date = new Date();
// var days = [], tam = [], index = 0, currentDay = date.getDate(), timeDown = 0;
// var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// while (index < 2 && timeDown <= 14) {
// 		let dateTam = new Date();
// 		dateTam.setDate(dateTam.getDate() - timeDown);
//    tam.unshift(dateTam.getDate());
// 		let dd = dateTam.getDay();
//     console.log(dateTam.getDate() + ' / ' + dd)
//     if(dd === 1){
// 			days.push(tam);
//       tam = [];
//     	index ++;
//     }
//     timeDown++
// }
// console.log(days);
</script>
<style lang="scss" scoped>
.countItem {
  .item {
    padding: 1rem 5px;
    b {
      display: block;
      margin: 0px 0px 5px;
      line-height: 1.5;
      font-size: 0.8rem;
    }
    h3 {
      font-size: 3rem;
      margin: 0;
      line-height: 1;
      text-shadow: 2px 2px 3px rgba(0, 166, 81, 0.4);
      color: #00a651;
      overflow: hidden;
    }
  }
  @media screen and (max-width: 575px) {
    .item {
      margin: 0px auto 10px;
      width: 150px;
    }
    &:last-child {
      .item {
        margin-bottom: 0;
      }
    }
  }
}
.exportExel {
  .subText {
    font-size: 1rem;
    margin: 0;
    span {
      display: block;
      font-size: 80%;
      font-weight: normal;
      margin-top: 5px;
    }
  }
  .btn {
    margin: 10px 0 0;
  }
}
</style>
