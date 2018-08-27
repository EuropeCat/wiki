<template>
  <div class="item">
    <div class="item-wrapper">
      <!-- 顶部标题 -->
      <header>
        <div class="menu" @click="goBack()"></div>
        <h2>材料库</h2>
      </header>
      <!-- 搜索和过滤工具路由导航 -->
      <section class="func-bar">
        <div class="func-box">
          <div class="search-bar">
            <input type="text" class="search-text" ref="_search">
            <div class="line-fix"></div>
            <button class="search-btn" @click="_searchItem()"></button>
          </div>
          <div class="filter">
            <div ref="_class" class="block" @click="_showClassBox()">分类</div>
            <div ref="_star" class="block" @click="_showStarBox()">星级</div>
          </div>
        </div>
      </section>
    </div>
    <div class="toggle-box" ref="_togglebox">
      <div class="list-box">
        <div v-if="toggleType != '_star'" class="box-item" v-for="(item, index) in typeList.typeList" :key="index" @click="_activeType(item.id)" :class="{active:item.id == typeActive}">{{item.name}}</div>
        <div v-if="toggleType == '_star'" class="box-item" v-for="(item, index) in starList" :key="index" @click="_activeStar(item.id)"  :class="{active:item.id == starActive}">{{item.name}}</div>
      </div>
      <button class="confirm-button" @click="_changeRoute()">确定</button>
    </div>
    <div class="mask" ref="_mask"></div>
    <transition name="fade">
      <BackTop :scrollTop="scrollTop"></BackTop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import BackTop from "@/components/BackTop/BackTop";
import router from "@/router";
import { urlParse, hasClass, addClass, removeClass } from "@/assets/js/util";
import Star from "@/components/Star/Star";
export default {
  name: 'Item',
  data () {
    return {
      msg: '我是材料菜单',
      scrollTop: 0,
      typeActive: "0",
      starActive: "0",
      toggleType: "",
      typeList: {},
      starList: [
        {name: "全部", id: 0},
        {name: "一星", id: 1},
        {name: "二星", id: 2},
        {name: "三星", id: 3},
        {name: "四星", id: 4},
        {name: "五星", id: 5}
      ]
    }
  },
  methods: {
    // 返回上一个页面
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    // 相应滑动
    _handleScroll() {
      let scrollTop = 
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
    },
    // 响应分类被点击
    _showClassBox() {
      if(this.toggleType == "_class") {
        // 改变自己的颜色
        removeClass(this.$refs._class, 'active')
        // 改变togglebox的状态
        removeClass(this.$refs._togglebox, 'active')
        // 改变蒙版的状态
        removeClass(this.$refs._mask, 'active')
        // 改变状态记录
        this.toggleType = ""
        
      } else if(this.toggleType == "_star") {
        this.toggleType = "_class"
        addClass(this.$refs._class, 'active')
        removeClass(this.$refs._star, 'active')
        removeClass(this.$refs._togglebox, 'active')
        addClass(this.$refs._togglebox, 'active')
      } else {
        this.toggleType = "_class"
        addClass(this.$refs._class, 'active')
        addClass(this.$refs._togglebox, 'active')
        addClass(this.$refs._mask, 'active')
      }
    },
    // 响应星级被点击
    _showStarBox() {
      if(this.toggleType == "_star") {
        this.toggleType = ""
        removeClass(this.$refs._star, 'active')
        removeClass(this.$refs._togglebox, 'active')
        removeClass(this.$refs._mask, 'active')
      } else if(this.toggleType == "_class") {
        this.toggleType = "_star"
        addClass(this.$refs._star, 'active')
        removeClass(this.$refs._class, 'active')
        removeClass(this.$refs._togglebox, 'active')
        addClass(this.$refs._togglebox, 'active')
      } else {
        this.toggleType = "_star"
        addClass(this.$refs._star, 'active')
        addClass(this.$refs._togglebox, 'active')
        addClass(this.$refs._mask, 'active')
      }
    },
    
    // 响应搜索被点击, 跳转路由
    _searchItem() {
      let value = document.getElementsByClassName('search-text')[0].value
      if(value != "") {
        router.push({path: "/item/list/search/" + value})
      } else {
        router.push({path: "/item/list/0/0" + value})
      }
      this._resetToggleBox()
    },
    _activeType(id) {
      this.typeActive = id
    },
    _activeStar(id) {
      this.starActive = id
    },
    _changeRoute() {
      router.push({path: "/item/list/" + this.typeActive + "/" + this.starActive})
      this._resetToggleBox()
    },
    _resetToggleBox() {
      this.toggleType = ""
      removeClass(this.$refs._togglebox, 'active')
      removeClass(this.$refs._class, 'active')
      removeClass(this.$refs._star, 'active')
      removeClass(this.$refs._mask, 'active')
    },
    _initView() {
      this.$http.get(this.HOST + "/Wiki/Material/MaterialTypeList",
      {
        before(request) {
          if (this.previousRequest) {
            this.previousRequest.abort();
          }
          this.previousRequest = request;
        }
      })
      .then(response => {
        this.typeList = Object.assign({}, this.typeList, JSON.parse(response.data));
      })
      .catch(error => {
        console.log(error);
      });
    },
    
  },
  components: {
    BackTop
  },
  mounted() {
    window.addEventListener("scroll", this._handleScroll)
    router.push({path: "/item/list/0/0"})
  },
  created() {
    this._initView()
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: rem(8000);
  background-color: rgb(243, 243, 243);
  padding-top: rem(120);
  .item-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
  }
  /* 顶部标题 */
  header {
    z-index: 10;
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


  .mask {
    transition: all .25s ease-in-out;
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    visibility: hidden;
  }
  .mask.active {
    background-color: #07070738;
    visibility: visible;
  }

  .func-bar {
    // 搜索工具
    .search-bar {
      height: rem(45);
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: rem(2);
      border-bottom: 1px solid rgb(206, 206, 206);
      .search-text {
        border-radius: 6px;
        border: 1px solid rgb(204, 204, 204);
        background-color: rgb(243, 243, 243);
        height: rem(30);
        width: rem(270);
        line-height: rem(30);
      }
      .line-fix {
        height: rem(30);
        width: rem(0);
        margin-left: rem(8);
        border-left: 1px solid rgb(206, 206, 206);
      }
      .search-btn {
        background-image: url(../../assets/images/search_icon.png);
        background-size: rem(20);
        background-color: transparent;
        border: none;
        height: rem(20);
        width: rem(20);
        margin-left: rem(8);
      }
    }

    // 过滤工具
    .filter {
      height: rem(42);
      border-bottom: 1px solid rgb(206, 206, 206);
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      .block {
        position: relative;
        display: flex;
        width: rem(120);
        height: rem(40);
        border: none;
        text-align: center;
        align-items: center;
        justify-content: center;
        transition-property: color;
        transition-duration: .25s;
      }
      .block:after {
        position: absolute;
        right: rem(29);
        top: rem(18);
        width: 0;
        height: 0;
        content: "";
        border-width: rem(3) rem(3) 0 rem(3);
        border-style: solid;
        border-color: #fff transparent;
        -webkit-transition: all .25s;
          -moz-transition: all .25s;
            -ms-transition: all .25s;
            -o-transition: all .25s;
                transition: all .25s;
      }
      .block:before {
        position: absolute;
        right: rem(28);
        top: rem(18);
        width: 0;
        height: 0;
        content: "";
        border-width: rem(4) rem(4) 0 rem(4);
        border-style: solid;
        border-color:rgb(177, 183, 187) transparent;
        -webkit-transition: transform .25s;
          -moz-transition: transform .25s;
            -ms-transition: transform .25s;
            -o-transition: transform .25s;
                transition: transform .25s;
      }
      .block.active:after {       
        top: rem(20);
        -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
                transform: rotate(180deg); 
      }
      .block.active:before {
        border-color:rgb(255, 180, 52)  transparent;
        -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
                transform: rotate(180deg);        
      }
      .block.active {
        color: rgb(255, 180, 52);
        
      }
    }
  }

  .toggle-box.active {
    transform: translateY(rem(135));
  }

  .toggle-box {
    transition: all .25s ease-in-out;
    transform: translateY(rem(-30));
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    .list-box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      background-color: #F8F9FA;
      border-bottom: 1px solid rgb(206, 206, 206);
      padding-bottom: rem(10);
      .box-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: rem(10) rem(7) 0 rem(7);
        height: rem(28);
        width: rem(75);
        font-size: rem(12);
        background-color: #1c2b42;
        border-radius: rem(4);
        background-color: #DCDDDE;
        transition: all .25s ease-in-out;
        color: #707886;
      }
      .box-item.active {
        background-color: #132135;
        color: #FCBD51;
      }
    }
    .confirm-button {
      width: 100%;
      text-align: center;
      background-color: #F8F9FA;
      border: none;
      color: #FCBD51;
      padding: rem(10);
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.5s;
}
.move-enter,
.move-leave-to {
  transform: translate(-6rem, 0);
  opacity: 0;
}
</style>
