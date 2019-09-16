<template>
  <div class="promotionPage">
    <div class="dataPromotion boxSD pd-10 mb-15">
      <div class="subInfo">
        <h2 class="titleGroup">Thiết lập khuyến mãi</h2>
        <p class="desc">Thiết lập danh sách các khuyến mãi</p>
        <b-row class="smallPad">
          <b-col md="4" class="item">
            <p>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="none"
                  d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                ></path>
              </svg>
              <span> <b>Cấp độ 1</b>: Chắn chắn quay trúng </span>
            </p>
          </b-col>
          <b-col md="4" class="item">
            <p>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="none"
                  d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                ></path>
              </svg>
              <span> <b>Cấp độ 2</b>: Ngẫu nhiên quay trúng </span>
            </p>
          </b-col>
          <b-col md="4" class="item">
            <p>
              <svg class="svg-icon" viewBox="0 0 20 20">
                <path
                  fill="none"
                  d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                ></path>
              </svg>
              <span> <b>Cấp độ 3</b>: Không bao giờ quay trúng </span>
            </p>
          </b-col>
        </b-row>
        <p class="desc">Lưu ý:</p>
        <ul class="list">
          <li>
            <i>-> Độ ưu tiên bằng nhau sẽ ngẩu nhiên điểm trúng.</i>
          </li>
          <li>
            <i>
              ->
              <b>"Mã khuyến mãi"</b> nếu để trống mặc định sẽ là lượt quay
              trượt.
            </i>
          </li>
        </ul>
      </div>
    </div>
    <div class="dataPromotion boxSD pd-10 mb-15">
      <h2 class="titleGroup">Danh sách khuyến mãi</h2>
      <div class="promotions">
        <b-form class="promotionForm" @submit.prevent="onUpdateListPromotion()">
          <b-table responsive :fields="fields" :items="listPromotion">
            <template slot="STT" slot-scope="data">
              {{ data.index + 1 }}
            </template>
            <template slot="Tên khuyến mãi" slot-scope="data">
              <b-form-input
                v-model="data.item.promotionName"
                :state="invalidatePromotionName(data.item.promotionName)"
                @input="onHandleInput()"
                required
                placeholder="Ex: Vocher 50k"
              ></b-form-input>
            </template>
            <template slot="Mã khuyến mãi" slot-scope="data">
              <b-form-input
                v-model="data.item.promotionCode"
                @input="onHandleInput()"
                :state="true"
                placeholder="Ex: 9JH4UDTS2W20"
              ></b-form-input>
            </template>
            <template slot="Độ ưu tiên" slot-scope="data">
              <div class="selectGroup">
                <div class="selectText">
                  <button
                    type="button"
                    @click="onUpdatePromotionLevel(data.item, data.index)"
                    class="btnSelect"
                    :class="{ focus: data.item.toggle }"
                    v-text="renderTextPromotionLevel(data.item.promotionLevel)"
                  ></button>
                </div>
                <div
                  class="selectDropdown"
                  :data-test="data.item.toggle"
                  :class="{ toggle: data.item.toggle }"
                >
                  <ul class="list">
                    <li v-for="i in 3" :key="i">
                      <a
                        :id="'itemLevel-' + data.index + '-' + i"
                        :class="
                          data.item.promotionLevel === i - 1 ? 'active' : ''
                        "
                        href="javascript:;"
                        @click="
                          onUpdatePromotionLevel(data.item, data.index, i)
                        "
                        >Cấp độ ưu tiên {{ i }}</a
                      >
                      <b-tooltip
                        placement="left"
                        :target="'itemLevel-' + data.index + '-' + i"
                      >
                        {{ arrayPromotionList[i - 1] }}
                      </b-tooltip>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template slot="R&A" slot-scope="data">
              <a
                @click="onToggleItemPromotion(data.item)"
                v-if="
                  (data.index < listPromotion.length - 1 &&
                    listPromotion.length > 1) ||
                    data.index === 19
                "
                href="javascript:;"
                class="arButton"
              >
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M14.776,10c0,0.239-0.195,0.434-0.435,0.434H5.658c-0.239,0-0.434-0.195-0.434-0.434s0.195-0.434,0.434-0.434h8.684C14.581,9.566,14.776,9.762,14.776,10 M18.25,10c0,4.558-3.693,8.25-8.25,8.25c-4.557,0-8.25-3.691-8.25-8.25c0-4.557,3.693-8.25,8.25-8.25C14.557,1.75,18.25,5.443,18.25,10 M17.382,10c0-4.071-3.312-7.381-7.382-7.381C5.929,2.619,2.619,5.93,2.619,10c0,4.07,3.311,7.382,7.381,7.382C14.07,17.383,17.382,14.07,17.382,10"
                  ></path>
                </svg>
              </a>
              <a
                @click="onToggleItemPromotion()"
                v-else
                href="javascript:;"
                class="arButton"
              >
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"
                  ></path>
                </svg>
              </a>
            </template>
          </b-table>
          <button ref="bntSubmitPromotion" class="d-none">Submit</button>
        </b-form>
      </div>
    </div>
    <div class="settingAction boxSD mb-15 text-right">
      <button
        class="btn btn-success btnSendData"
        type="button"
        :disabled="isDisabledBtn"
        @click.prevent="$refs.bntSubmitPromotion.click()"
      >
        Lưu
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Promotion",
  data() {
    return {
      fields: ["STT", "Tên khuyến mãi", "Mã khuyến mãi", "Độ ưu tiên", "R&A"],
      items: [
        {
          promotionName: "",
          promotionCode: "",
          promotionLevel: -1,
          toggle: false
        }
      ],
      arrayPromotionList: [
        "Chắn chắn quay trúng",
        "Ngẫu nhiên quay trúng",
        "Không bao giờ quay trúng"
      ],
      isDisabledBtn: true
    };
  },
  computed: {
    listPromotion: {
      get: function() {
        return this.$store.getters.GET_PROMOTION;
      },
      set: function(newValue) {
        this.$store.commit("UPDATE_PROMOTION_ITEM", newValue);
      }
    }
    // listPromotion() {
    //   var listItem = this.$store.getters.GET_PROMOTION;
    //   if (!listItem) return [];
    //   listItem = listItem.map(obj => ({ ...obj, toggle: false }));
    //   return listItem;
    // }
  },
  methods: {
    invalidatePromotionName: function(name) {
      return name !== "";
    },
    onToggleItemPromotion: function(item) {
      this.isDisabledBtn = false;
      this.listPromotion = item;
    },
    renderTextPromotionLevel: function(level) {
      if (level < 0) return "Chọn độ ưu tiên";
      else return "Cấp độ ưu tiên " + (level + 1);
    },
    onUpdateListPromotion: function() {
      var data = {
        type: "list_promotions",
        data: this.listPromotion
      };
      this.$store.dispatch("SAVE_DATA_PROMOTION", data);
      this.isDisabledBtn = true;
    },
    onUpdatePromotionLevel: function(item, index, level) {
      var tam = item;
      if (level) {
        this.isDisabledBtn = false;
        tam.promotionLevel = level - 1;
      }
      tam.toggle = !tam.toggle;
      return (this.listPromotion[index] = tam);
    },
    onHandleInput: function() {
      this.isDisabledBtn = false;
    }
  },
  // watch: {
  //   items:{
  //     handler(val) {
  //       this.isDisabledBtn = false;
  //     },
  //     deep: true
  //   },
  //   listPromotion(){
  //     this.isDisabledBtn = true;
  //   }
  // },
  mounted() {
    this.isDisabledBtn = true;
  }
};
</script>
<style lang="scss" scoped>
$mainColor: #00a651;
.promotionForm {
  .selectDropdown {
    li {
      a {
        &:hover:not(.active) {
          background: #f1f1f1;
          color: #222;
        }
      }
    }
  }
}
.desc {
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  margin: 0;

  path,
  polygon,
  rect {
    fill: $mainColor;
  }

  circle {
    stroke: $mainColor;
    stroke-width: 1;
  }
}
.item {
  span {
    display: inline-block;
    vertical-align: middle;
  }
  p {
    margin-bottom: 0.5rem;
  }
}
</style>
