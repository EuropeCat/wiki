<template>
  <div>
    <div class="backTop" @click="backTop" v-show="scrollTop > 500"></div>
    <router-link to="/"><div class="backIndex"></div></router-link>
  </div>
</template>

<script>
export default {
  props:['scrollTop'],
  name: 'BackTop',
  methods: {
    backTop () {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }
}
</script>

<style scoped lang="scss">
.backTop,.backIndex{
  width: rem(48);
  height: rem(48);
  position: fixed;
  right: rem(15);
  bottom: rem(15);
  background: url("../../assets/images/backTop.png") no-repeat;
  background-size: rem(48);
  z-index: 10;
}
.backIndex{
  bottom: rem(68);
  background: url("../../assets/images/backHome.png") no-repeat;
  background-size: rem(48);
}
</style>