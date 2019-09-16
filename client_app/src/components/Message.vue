<template>
  <div class="pageMessage" :class="{ toggle: getMessage !== '', error : getMessage !== '' && getMessage.indexOf('Lỗi') !== -1 }">
    <span>{{ getMessage }}</span>
  </div>
</template>
<script>
export default {
  name: "pageMessage",
  computed: {
    getMessage() {
      return this.$store.getters.GET_MESSAGE;
    }
  }
};
</script>
<style lang="scss" scoped>
.pageMessage {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  border-radius: 30px;
  animation-delay: 2s;
  border: 2px solid #00a651;
  color: #00a651;
  background: #fff;
  box-shadow: 0px 4px 5px 1px rgba(0, 166, 81, 0.2);
  transition: all 0.3s ease-in-out 0s;
  -moz-transition: all 0.3s ease-in-out 0s;
  -o-transition: all 0.3s ease-in-out 0s;
  -ms-transition: all 0.3s ease-in-out 0s;
  visibility: hidden;
  opacity: 0;
  &.toggle {
    animation: fadeinout 3s linear forwards;
  }
  &.error{
    color: #f10b0b;
    border-color: #ef0b0b;
    box-shadow: 0px 4px 5px 1px rgba(241, 11, 11, 0.2);
  }
}
@keyframes fadeinout {
  0%,
  100% {
    opacity: 0;
    bottom: -100px;
    visibility: hidden;
  }
  20%,
  50%,
  80% {
    opacity: 1;
    bottom: 0px;
    visibility: visible;
  }
}
</style>
