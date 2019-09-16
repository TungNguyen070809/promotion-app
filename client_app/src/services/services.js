import Api from "./api";
export default {
  fetchDataPromotionPage(shop, page) {
    return Api().get(`promotion?shop=${shop}&page=${page}`);
  },
  fetchDataPromotion() {
    return Api().get("promotion");
  },
  updateDataPromotion(data) {
    return Api().post(`promotion`, data);
  }
};
