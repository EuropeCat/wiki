<template>
  <div class="item_detail">
    <div class="item-info">
      <div class="item-info-left">
        <div class="item-icon-border">
          <div class="item-icon-icon" :style="{backgroundImage: 'url('+ detail.icon + ')'}"></div>
          <div class="item-icon-star" :class="{one: detail.star==1, two: detail.star==2, three: detail.star==3, four: detail.star==4, five: detail.star==5}"></div>
        </div>
      </div>
      <div class="item-info-right">
        <div class="item-info-name">{{this.detail.name}}</div>
        <div class="item-line-fix"></div>
        <div class="item-info-type">
          <div class="item-info-type-name">{{this.detail.typeName}}</div>
        </div>
      </div>
    </div>
    <div class="item-detail">
      <BlockTitle title="info1" :icon="3"></BlockTitle>
      <div class="item-detail-panel">
        <p class="item-detail-text">{{detail.info1}}</p>
      </div>
      <BlockTitle title="info2" :icon="3"></BlockTitle>
      <div class="item-detail-panel">
        <p class="item-detail-text">{{detail.info2}}</p>
      </div>
      <BlockTitle title="获取方式" :icon="3"></BlockTitle>
      <div class="item-detail-panel">
        <div class="item-detail-text" ref="_detail">{{detail.access}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BlockTitle from "@/components/BlockTitle/BlockTitle";
export default {
  name: 'ItemDetail',
  data () {
    return {
      msg: '我是材料详情',
      detail: {
        id: "5007",
        name: "月光意志",
        info1: "帮助某些装备进化的特定进化材料，曜日活动关卡随机掉落",
        info2: "大量的月光破片结合成的结晶，在结晶中间仿佛可以看到淡绿色的月牙",
        star: 1,
        typeName: "曜日材料",
        icon: "http://115.159.89.91:8070/Picture/Material/5007/Icon.png",
        access: "后期终端（30级以上可购买），曜日活动-周一，分解部分初始三星武器（降临武器除外），舰团-保税仓库发布",
        remark: "" 
      }
    }
  },
  components: {
    BlockTitle,
  },
  methods: {
    _replaceCommaToEnter() {
      // 比较棘手，待解决
    },
    changeDetail() {
      this._replaceCommaToEnter();
    }
  },
  updated() {
    console.log("更新了");
    this.changeDetail();
  },
  created() {
    console.log("创建了");
    this.changeDetail();
  }
}
</script>

<style lang="scss" scoped>
.item_detail{
  .item-info{
    display: flex;
    margin-bottom: rem(20);
    .item-info-left{
      .item-icon-border{
        position: relative;
        background-image: url(../../assets/images/item_info_border.png);
        background-size: rem(128);
        height: rem(128);
        width: rem(128);
        margin-left: rem(49);
        .item-icon-icon{
          position: absolute;
          background-repeat: no-repeat;
          background-size: rem(80);
          height: rem(95);
          width: rem(80);
          top: rem(20);
          left: rem(25);
        }
        .item-icon-star{
          height: rem(15);
          width: rem(45);
          position: absolute;
          background-image: url(../../assets/images/star_4.png);
          background-size: rem(45) rem(15);
          top: rem(100);
          left: rem(30);
          &.one {
            background-image: url(../../assets/images/star_1.png);
            background-size: rem(12) rem(15);
            width: rem(12);
            left: rem(60);
          }
          &.two {
            background-image: url(../../assets/images/star_2.png);
            background-size: rem(23) rem(15);
            width: rem(23);
            left: rem(55);
          }
          &.three {
            background-image: url(../../assets/images/star_3.png);
            background-size: rem(33) rem(15);
            width: rem(33);
            left: rem(50);
          }
          &.four {
            background-image: url(../../assets/images/star_4.png);
            background-size: rem(45) rem(15);
            width: rem(45);
            left: rem(45);
          }
        }
      }
    }
    .item-info-right{
      text-align: center;
      width: rem(150);
      margin-left: rem(20);
      .item-info-name{
        font-size: rem(32);
        color: #FFB333;
        // border-bottom: 2px solid #8DBDDC;
      }
      .item-line-fix{
        margin-top: rem(20);
        width: rem(150);
        border-bottom: 2px solid #8DBDDC;
      }
      .item-info-type{
        margin-top: rem(20);
        display: inline-block;
        position: relative;
        text-align: center;
        background-image: url(../../assets/images/bubble2.png);
        background-size: rem(120) rem(40);
        height: rem(40);
        width: rem(120);
        background-repeat: no-repeat;
        .item-info-type-name{
          position: absolute;
          font-size: rem(16);
          top: rem(8);
          left: rem(12);
        }
      }
    }
  }
  .item-detail{
    .item-detail-panel{
      border-radius: rem(6);
      // border: 1px solid #aaa;
      background-image: url(../../assets/images/access_bg.png);
      background-size: rem(345) rem(190);
      width: rem(345);
      height: rem(190);
      margin:  rem(10) auto;
    }
    .item-detail-text{
      word-break: break-all;
      word-wrap: break-word; 
      display: inline-block;
      margin: rem(10) rem(20);
    }
  }
}
</style>
