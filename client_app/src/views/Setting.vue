<template>
  <div class="settingPage">
    <div class="dataSetting turn boxSD pd-10">
      <div class="subData">
        <h2 class="titleGroup">Thiết lập lượt quay</h2>
      </div>
      <div class="dataDetail">
        <div class="loginData mb-15">
          <div class="switchGroup">
            <div class="swRadio inline">
              <input
                type="radio"
                @change="toggleRequireLogin(true)"
                :checked="dataSetting && dataSetting.require_login"
                id="require_login_on"
                name="require_login"
                class="btnSwitchOn"
              />
              <input
                type="radio"
                @change="toggleRequireLogin(false)"
                :checked="dataSetting && !dataSetting.require_login"
                id="require_login_off"
                name="require_login"
                class="btnSwitchOff"
              />
              <label for="require_login_on" class="switchLabel on"
                ><span class="switchTxt">On</span></label
              >
              <label for="require_login_off" class="switchLabel off"
                ><span class="switchTxt">Off</span></label
              >
            </div>
            <div class="swText inline">
              <i
                >Bắt buộc người quay phải đăng nhập vào mới có thể thực hiện
                quay được.</i
              >
            </div>
          </div>
        </div>
        <div class="limitData">
          <div class="selectGroup inline">
            <div class="selectText">
              <button
                type="button"
                class="btnSelect"
                :class="{ focus: toggleDropdown }"
                @click="toggleDropdown = !toggleDropdown"
              >
                {{ dataSetting ? dataSetting.limit_turn : limitTurn }}</button
              ><span>Lượt</span>
            </div>
            <div class="selectDropdown" :class="{ toggle: toggleDropdown }">
              <ul class="list">
                <li v-for="i in 5" :key="i">
                  <a
                    :class="
                      dataSetting && dataSetting.limit_turn === i
                        ? 'active'
                        : ''
                    "
                    href="javascript:;"
                    @click="onUpdateLimitTurn(i)"
                    >{{ i }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="selectSub inline">
            <p>
              <i
                >Tổng lượt quay cho một người tham gia, sẽ dựa vào email để phân
                biệt</i
              >
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="dataSetting take boxSD pd-10">
      <div class="subData">
        <h2 class="titleGroup">Dữ liệu thu thập</h2>
        <p class="desc">
          Thiết lập các trường cần thu thập
          <br />
          <span class="subText"
            >(Chọn các trường cần thu thập dữ liệu,
            <b>mặc định luôn thu thập Email</b>)</span
          >
        </p>
      </div>
      <div class="dataDetail">
        <b-row>
          <b-col md="4">
            <div class="switchGroup">
              <div class="swRadio inline">
                <input
                  type="radio"
                  checked
                  id="take_email_on"
                  name="take_email"
                  class="btnSwitchOn"
                />
                <input
                  type="radio"
                  disabled
                  id="take_email_off"
                  name="take_email"
                  class="btnSwitchOff"
                />
                <label for="take_email_on" class="switchLabel on"
                  ><span class="switchTxt">On</span></label
                >
                <label for="take_email_off" class="switchLabel off"
                  ><span class="switchTxt">Off</span></label
                >
              </div>
              <div class="swText inline">
                <span>Thu thập Email</span>
              </div>
            </div>
          </b-col>
          <b-col md="4">
            <div class="switchGroup">
              <div class="swRadio inline">
                <input
                  type="radio"
                  @change="toggleNeedTake('take_name', true)"
                  :checked="dataNeedTake && dataNeedTake.take_name"
                  id="take_name_on"
                  name="take_name"
                  class="btnSwitchOn"
                />
                <input
                  type="radio"
                  @change="toggleNeedTake('take_name', false)"
                  :checked="dataNeedTake && !dataNeedTake.take_name"
                  id="take_name_off"
                  name="take_name"
                  class="btnSwitchOff"
                />
                <label for="take_name_on" class="switchLabel on"
                  ><span class="switchTxt">On</span></label
                >
                <label for="take_name_off" class="switchLabel off"
                  ><span class="switchTxt">Off</span></label
                >
              </div>
              <div class="swText inline">
                <span>Thu thập Tên</span>
              </div>
            </div>
          </b-col>
          <b-col md="4">
            <div class="switchGroup">
              <div class="swRadio inline">
                <input
                  type="radio"
                  @change="toggleNeedTake('take_phone', true)"
                  :checked="dataNeedTake && dataNeedTake.take_phone"
                  id="take_phone_on"
                  name="take_phone"
                  class="btnSwitchOn"
                />
                <input
                  type="radio"
                  @change="toggleNeedTake('take_phone', false)"
                  :checked="dataNeedTake && !dataNeedTake.take_phone"
                  id="take_phone_off"
                  name="take_phone"
                  class="btnSwitchOff"
                />
                <label for="take_phone_on" class="switchLabel on"
                  ><span class="switchTxt">On</span></label
                >
                <label for="take_phone_off" class="switchLabel off"
                  ><span class="switchTxt">Off</span></label
                >
              </div>
              <div class="swText inline">
                <span>Thu thập Tên</span>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="settingAction boxSD mb-15 text-right">
      <button
        class="btn btn-success btnSendData"
        type="button"
        :disabled="isDisabledBtn"
        @click.prevent="onUpdateSettingData()"
      >
        Lưu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data: function() {
    return {
      limitTurn: 1,
      toggleDropdown: false,
      isDisabledBtn: true
    };
  },
  computed: {
    dataSetting: {
      get: function() {
        return this.$store.getters.GET_SETTING;
      },
      set: function(newValue) {
        this.$store.commit("UPDATE_SETTING", newValue);
      }
    },
    dataNeedTake: {
      get: function() {
        return this.$store.getters.GET_NEED_TAKE;
      },
      set: function(newValue) {
        this.$store.commit("UPDATE_NEED_TAKE", newValue);
      }
    }
  },
  methods: {
    onUpdateLimitTurn: function(num) {
      this.isDisabledBtn = false;
      this.toggleDropdown = false;
      this.dataSetting = {limit_turn: num};
    },
    toggleRequireLogin: function(bool) {
      this.isDisabledBtn = false;
      this.dataSetting = {require_login: bool};
    },
    toggleNeedTake: function(key, bool) {
      this.isDisabledBtn = false;
      this.dataNeedTake = {[key]: bool};
    },
    onUpdateSettingData: function() {
      var payload = {
        type: "multiple",
        data: [
          {
            type: "need_take",
            data: this.dataNeedTake
          },
          {
            type: "settings",
            data: this.dataSetting
          }
        ]
      };
      this.$store.dispatch("SAVE_DATA_PROMOTION", payload);
      this.isDisabledBtn = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.dataDetail {
  margin: 20px 0 10px;
}
.dataSetting {
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  @media screen and (max-width: 767px) {
    &.take {
      .switchGroup {
        margin: 0px 0px 10px 0px;
      }
    }
  }
  @media screen and (max-width: 620px) {
    &.turn {
      .swText,
      .selectSub {
        margin: 10px 0 0 0;
      }
    }
  }
}
.selectGroup {
  min-width: 100px;
}
.loginData {
  .swRadio {
    margin-right: 40px;
  }
}

.selectSub {
  margin-left: 10px;
  p {
    margin: 0;
  }
}
</style>
