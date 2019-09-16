<template>
  <div class="infoPage">
    <div class="infoDetail boxSD">
      <div class="subInfo">
        <h2 class="titleGroup">Thiết lập nội dung</h2>
        <p class="desc">
          Thiết lập tên các nút và tiều đề<br />
          <span class="subText"
            >(Nhập nội dung tương ứng cho các nút, tiêu đề để hiển thị ngoài
            giao diện, vui lòng không để trống nội dung nào)</span
          >
        </p>
      </div>
      <div class="formInfo">
        <form
          class="formPage"
          ref="infoForm"
          action="javascript:;"
          @submit.prevent="onInfoSubmit($event)"
        >
          <b-form-row>
            <b-col md="6">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ex: Bắt đầu quay"
                  required="required"
                  aria-required="true"
                  class="form-control"
                  :value="dataInfo ? dataInfo.name_button : ''"
                  name="name_button"
                  @input="onChangeInfo($event)"
                />
                <span class="floatingLabel">Tên nút quay *</span>
              </div>
            </b-col>
            <b-col md="6">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ex: Vui lòng đợi..."
                  required="required"
                  aria-required="true"
                  class="form-control"
                  :value="dataInfo ? dataInfo.name_button_turnning : ''"
                  name="name_button_turnning"
                  @input="onChangeInfo($event)"
                />
                <span class="floatingLabel">Tên nút khi đang quay *</span>
              </div>
            </b-col>
            <b-col md="6">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ex: Quà đã quay được"
                  required="required"
                  aria-required="true"
                  class="form-control"
                  :value="dataInfo ? dataInfo.name_button_view : ''"
                  name="name_button_view"
                  @input="onChangeInfo($event)"
                />
                <span class="floatingLabel">Tiêu đề nút xem quà *</span>
              </div>
            </b-col>
            <b-col md="6">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ex: Danh sách quà đã quay được"
                  required="required"
                  aria-required="true"
                  class="form-control"
                  :value="dataInfo ? dataInfo.name_popup : ''"
                  name="name_popup"
                  @input="onChangeInfo($event)"
                />
                <span class="floatingLabel">Tiêu đề popup xem quà *</span>
              </div>
            </b-col>
            <b-col md="6">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ex: Bạn có thể quay được"
                  required="required"
                  aria-required="true"
                  class="form-control"
                  :value="dataInfo ? dataInfo.name_list_gift : ''"
                  name="name_list_gift"
                  @input="onChangeInfo($event)"
                />
                <span class="floatingLabel"
                  >Tiêu đề danh sách quà sẽ quay được *</span
                >
              </div>
            </b-col>
            <b-col md="6">
              <div class="form-group">
                <input
                  type="text"
                  placeholder="Ex: Tiếc quá... Chúc bạn may mắn lần sau!!!"
                  required="required"
                  aria-required="true"
                  class="form-control"
                  :value="dataInfo ? dataInfo.name_miss_gift : ''"
                  name="name_miss_gift"
                  @input="onChangeInfo($event)"
                />
                <span class="floatingLabel">Nội dung khi quay trượt *</span>
              </div>
            </b-col>
            <button type="submit" class="d-none" ref="btnSubmitForm">
              Submit form
            </button>
          </b-form-row>
        </form>
      </div>
    </div>
    <div class="infoAction boxSD text-right mb-15">
      <button
        class="btn btn-success btnSendData"
        :disabled="isDisabledBtn"
        type="button"
        ref="infoSubmitForm"
        @click.prevent="$refs.btnSubmitForm.click()"
      >
        Lưu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      isDisabledBtn: true
    };
  },
  computed: {
    dataInfo: {
      get: function() {
        return this.$store.getters.GET_INFO;
      },
      set: function(newValue) {
        this.$store.commit("UPDATE_INFO", newValue);
      }
    }
  },
  methods: {
    onChangeInfo: function(event) {
      let { name, value } = event.target;
      this.isDisabledBtn = false;
      this.dataInfo = {[name]: value}
    },
    onInfoSubmit: function() {
      let payload = {
        type: "info",
        data: this.dataInfo
      };
      this.isDisabledBtn = true;
      this.$store.dispatch("SAVE_DATA_PROMOTION", payload);
    }
  }
  // watch: {
  //   info: {
  //     handler(val) {
  //       //return this.isDisabledBtn = false;
  //     },
  //     deep: true
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.infoDetail {
  padding: 10px;
  .desc {
    margin-bottom: 1em;
  }
}
.infoAction {
  margin-top: 15px;
}
</style>
