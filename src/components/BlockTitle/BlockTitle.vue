<template>
  <div class="blockTitle">
    <div class="icon" :class="'blockTitleIcon' + icon"></div>
    <div class="title">{{title}}</div>
    <div class="rightTxt" v-if="rightTxt">{{rightTxt}}</div>
  </div>
</template>

<script>
export default {
  name: 'BlockTitle',
  props: {
      title: {
          type: String,
          default: '标题'
      },
      rightTxt: {
          type: String,
          default: ''
      },
      icon: {
          type: Number,
          default: 1
      }
  }
}
</script>

<style scoped lang="scss">
.blockTitle{
    width: rem(350);
    margin: 0 auto;
    height: rem(22.5);
    line-height: rem(22.5);
    padding-bottom: rem(4);
    background: url('../../assets/images/BlockTItleBorder.png') no-repeat center bottom;
    background-size: rem(350);
    font-size: rem(14);
    color: #1c2b42;
    font-weight: bold;
    display: flex;
    .icon{
        width: rem(24);
        height: rem(21);
        margin-right: rem(8);
        &.blockTitleIcon1{
            background: url('../../assets/images/BlockTitleIcon1.png') no-repeat;
            background-size: rem(24);
        }
        &.blockTitleIcon2{
            background: url('../../assets/images/BlockTitleIcon2.png') no-repeat;
            background-size: rem(24);
        }
        &.blockTitleIcon3{
            background: url('../../assets/images/BlockTitleIcon3.png') no-repeat;
            background-size: rem(24);
        }
    }
    .title{
        flex: 1;
        color: #1c2b42;
        font-weight: bold;
    }
    .rightTxt{
        text-align: right;
        margin-right: rem(5);
        color: #9ca3ad;
        font-size: rem(12);
    }
}
</style>
