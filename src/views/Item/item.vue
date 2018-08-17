<template>
  <div class="item">
    <!-- 顶部标题 -->
    <header>
      <div class="menu" @click="goHome"></div>
      <h2>材料页</h2>
    </header>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Item',
  data () {
    return {
      msg: '我是材料菜单'
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  /* 顶部标题 */
  header {
      height: rem(44);
      background: #1c2b42;
      position: relative;
      h2 {
        font-size: rem(20);
        color: #fff;
        height: rem(44);
        line-height: rem(44);
        text-align: center;
      }
      .menu {
        width: rem(24);
        height: rem(24);
        position: absolute;
        top: rem(10);
        left: rem(24);
        background: url("../../assets/images/back_btn.png") no-repeat;
        background-size: rem(13);
    }
  }
}
</style>
