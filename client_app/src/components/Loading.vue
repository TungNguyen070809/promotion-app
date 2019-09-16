<template>
  <div class="pageLoading" :class="{ in: isLoading }"></div>
</template>
<script>
export default {
  name: "Loading",
  computed: {
    isLoading() {
      return this.$store.getters.GET_LOADING;
    }
  }
};
</script>
<style lang="scss" scoped>
.pageLoading {
  display: none;
  position: absolute;
  z-index: 99;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &.in {
    display: block;
  }

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:after {
    content: "";
    position: absolute;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #00a651;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    -webkit-transform-origin: 50%;
    -o-transform-origin: 50%;
    -ms-transform-origin: 50%;
    transform-origin: 50%;
    -moz-animation: spin 700ms infinite linear;
    -ms-animation: spin 1.5s infinite linear;
    -webkit-animation: spin 700ms infinite linear;
    -o-animation: spin 700ms infinite linear;
    animation: spin 700ms infinite linear;
    left: 45%;
    top: 45%;
  }
}

@-moz-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
