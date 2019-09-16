import Vue from "vue";
import Vuex from "vuex";
import Services from "./services/services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataPromotion: {},
    loading: false,
    message: ""
  },
  getters: {
    GET_INFO: state => {
      return state.dataPromotion.info;
    },
    GET_SETTING: state => {
      return state.dataPromotion.settings;
    },
    GET_NEED_TAKE: state => {
      return state.dataPromotion.need_take;
    },
    GET_PROMOTION: state => {
      if (
        !state.dataPromotion.list_promotions ||
        state.dataPromotion.list_promotions.length === 0
      )
        return [];
      let listItem = state.dataPromotion.list_promotions.map(obj => ({
        ...obj,
        toggle: false
      }));
      return listItem;
    },
    GET_LOADING: state => {
      return state.loading;
    },
    GET_MESSAGE: state => {
      return state.message;
    },
    GET_DASHBOARD: state => {
      return state.dataPromotion.dashboard;
    }
  },
  mutations: {
    SET_DATA_PROMOTION: (state, payload) => {
      state.dataPromotion = payload;
    },
    UPDATE_INFO: (state, payload) => {
      var obj = Object.assign({}, state.dataPromotion.info, payload);
      state.dataPromotion.info = obj;
    },
    UPDATE_SETTING: (state, payload) => {
      var obj = Object.assign({}, state.dataPromotion.settings, payload);
      state.dataPromotion.settings = obj;
    },
    UPDATE_NEED_TAKE: (state, payload) => {
      var obj = Object.assign({}, state.dataPromotion.need_take, payload);
      state.dataPromotion.need_take = obj;
    },
    UPDATE_PROMOTION: (state, payload) => {
      state.dataPromotion.list_promotions = payload;
    },
    UPDATE_LOADING: (state, payload) => {
      state.loading = payload;
    },
    UPDATE_MESSAGE: (state, payload) => {
      state.message = payload;
    },
    UPDATE_PROMOTION_ITEM: (state, payload) => {
      if (typeof payload !== "undefined") {
        delete payload.toggle;
        var { dataPromotion } = state;
        var { list_promotions } = dataPromotion;
        let index = list_promotions.findIndex(
          x =>
            x.promotionName === payload.promotionName &&
            x.promotionLevel === payload.promotionLevel
        );
        state.dataPromotion.list_promotions.splice(index, 1);
      } else {
        payload = {
          promotionName: "",
          promotionCode: "",
          promotionLevel: -1
        };
        state.dataPromotion.list_promotions.push(payload);
      }
    }
  },
  actions: {
    GET_DATA_PROMOTION: async context => {
      context.commit("UPDATE_LOADING", true);
      let data = await Services.fetchDataPromotion().then(res => res.data);
      context.commit("SET_DATA_PROMOTION", data.db_shop);
      context.commit("UPDATE_LOADING", false);
    },
    SAVE_DATA_PROMOTION: async (context, payload) => {
      context.commit("UPDATE_LOADING", true);
      context.commit("UPDATE_MESSAGE", "");
      let obj = Object.assign({}, payload, {
        shop_domain: "inspire-apps.myharavan.com"
      });
      let data = await Services.updateDataPromotion(obj).then(res => res.data);
      // if (data.statusCode === 200) {
      //   if (payload.type === "multiple") {
      //     for (let i = 0; i < payload.data.length; i++) {
      //       if (payload.data[i].type === "need_take")
      //         context.commit("UPDATE_NEED_TAKE", payload.data[i].data);
      //       else context.commit("UPDATE_SETTING", payload.data[i].data);
      //     }
      //   } else {
      //     if (payload.type === "info")
      //       context.commit("UPDATE_INFO", payload.data);
      //     else context.commit("UPDATE_PROMOTION", payload.data);
      //   }
      // }
      context.commit("UPDATE_MESSAGE", data.message);
      context.commit("UPDATE_LOADING", false);
    }
  }
});
