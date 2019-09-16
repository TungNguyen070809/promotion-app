<template>
  <div id="appPromotion">
    <b-container fluid>
      <b-row>
        <left-sidebar />
        <b-col offset-lg="3" lg="9" class="appContent">
          <div class="mainApp">
            <div class="mainItem appBanner text-center boxSD">
              <img alt="Vue logo" src="./assets/logo.png" />
            </div>
            <div class="mainItem appRouter">
              <Loading />
              <Message />
              <transition name="slide" appear>
                <router-view />
              </transition>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import LeftSidebar from "./components/LeftSidebar.vue";
import Loading from "./components/Loading";
import Message from "./components/Message";
export default {
  name: "appPromotion",
  data() {
    return {
      promotion: {}
    };
  },
  created() {
    this.$store.dispatch("GET_DATA_PROMOTION");
  },
  components: {
    LeftSidebar,
    Loading,
    Message
  }
};
</script>
