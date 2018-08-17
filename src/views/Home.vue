<template>
  <div class="home">
    <header class="header">
      <img class="logo" :src="img_logo" alt="情报姬">
    </header>
    <section class="main">
      <div class="hbox">
        <div class="pic valkyria">
          <router-link to="/valkyria">
            <button class="enter_button"></button>
          </router-link>
        </div>
        <div class="pic weapon">
          <router-link to="/weapon/gun">
            <button class="enter_button"></button>
          </router-link>
        </div>
      </div>
      <div class="hbox">
        <div class="pic stigmata">
          <router-link to="/stigmata/fiveStar">
            <button class="enter_button"></button>
          </router-link>
        </div>
        <div class="pic goods">
          <router-link to="/item">
            <button class="enter_button"></button>
          </router-link>
        </div>
      </div>
    </section>
    <footer class="footer">
      <router-link to="/raidersArticle/activityGuide">攻略文章</router-link>
      <router-link to="/404">最新活动</router-link>
      <router-link to="/404">关注我们</router-link>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import img_logo from '@/assets/images/logo.png';

export default {
  name: 'home',
  data () {
    return {
      img_logo: img_logo
    }
  },
  components: {
    
  }
}
</script>

<style scoped lang="scss">
.home{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: rem(60);
  padding-bottom: rem(50);
  overflow-x: hidden;
  overflow-y: auto;
  background: url('../assets/images/home_bg.png') center bottom;
  background-size: 100%;
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    height: rem(60);
    line-height: rem(60);
    background-color: #1e263b;
    .logo{
      height: rem(25);
    }
  }
  .main{
    .hbox {
      padding: rem(15) rem(15) 0 rem(15);
      display: flex;
      .pic {
        position: relative;
        height: rem(240);
        text-align: center;
        flex: 1;
        background-size: cover;
        &.valkyria{
          background-image: url('../assets/images/home_valkyria.png');
          margin-right: rem(3);
        }
        &.weapon{
          background-image: url('../assets/images/home_weapon.png');
          margin-left: rem(3);
        }
        &.stigmata{
          background-image: url('../assets/images/home_stigmata.png');
          margin-right: rem(3);
        }
        &.goods{
          background-image: url('../assets/images/home_goods.png');
          margin-left: rem(3);
        }
        .enter_button {
          position: absolute;
          top: rem(205);
          left: rem(50);
          width: rem(72);
          height: rem(28);
          border: none;
          background-image: url('../assets/images/home_enter_dark.png');
          background-size: cover;
          background-color: transparent;
          &:hover{
            background-image: url('../assets/images/home_enter_light.png');
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    height: rem(50);
    background-image: url('../assets/images/home_footer_bg.png');
    background-size: cover;
    a{
      font-size: rem(18);
      flex: 1;
      text-align: center;
      color: white;
    }
  }
}
</style>
