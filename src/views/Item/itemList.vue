<template>
  <div class="item_list">
    <div class="wrapper"> 
      <router-link v-for="(item, index) in itemList" :key="index" :to="'/item/detail/'+item.id">
        <div class="block" :class="{one: item.star==1, two: item.star==2, three: item.star==3, four: item.star==4, five: item.star==5}">
        <div class="icon" :style="{backgroundImage: 'url(' + HOST + item.icon + ')' }"></div>
        <div class="star" :class="{one: item.star==1, two: item.star==2, three: item.star==3, four: item.star==4, five: item.star==5}"></div>
      </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  data () {
    return {
      msg: '我是材料列表',
      typeList: {},
      itemList: [],
      listStorage: [],
    }
  },
  methods: {
    // 从服务器获取全部列表数据备用
    _initList() {
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
        this.typeList.typeList.forEach(e => {
          this.$http.get(this.HOST + "/Wiki/Material/MaterialList/" + e.id,
          {
            before(request) {
              if (this.previousRequest) {
                this.previousRequest.abort();
              }
              this.previousRequest = request;
            }
          })
          .then(response => {
            this.listStorage.push({id: e.id, list: JSON.parse(response.data)})
            if(e.id == this.$route.params.type) {
              this._changeList();
            }
          })
          .catch(error => {
            console.log(error);
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 根据路由改变现实对应分类的材料列表
    _changeList() {
      const that = this
      that.itemList = []
      that.listStorage.forEach(e => {
        if(e.id == that.$route.params.type) {
          e.list.itemList.forEach(solo => {
            if(!(that.$route.params.star != 0 && solo.star != that.$route.params.star)){
              that.itemList.push(solo)
            }
          });
        }
      });
    },
    _searchList() {
      console.log("执行了搜索");
      const that = this
      that.itemList = []
      that.listStorage.forEach(e => {
        e.list.itemList.forEach(solo => {
          if(solo.name.indexOf(that.$route.params.star) != -1){
            console.log(solo.name)
            console.log(that.$route.params.star)
            that.itemList.push(solo)
          }
        });
      });
    }
  },
  created() {
    this._initList();
  },
  watch: {
    $route (to, from) {
      if(to.params.type == "search") {
        this._searchList();
      } else {
        if (to.name == "itemList") {
          this._changeList();
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.item_list {
  .wrapper {
    margin-top: rem(40);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgb(243, 243, 243);
    .block {
      margin-left: rem(10);
      margin-right: rem(10);
      margin-bottom: rem(10);
      height: rem(64);
      width: rem(64);
      background-image: url(../../assets/images/blue_bg.png);
      background-size: rem(64);
      position: relative;
      &.one {
        background-image: url(../../assets/images/green_bg.png);
      }
      &.two {
        background-image: url(../../assets/images/blue_bg.png);
      }
      &.three {
        background-image: url(../../assets/images/dark_blue_bg.png);
      }
      &.four {
        background-image: url(../../assets/images/pink_bg.png);
      }
      .icon {
        height: rem(40);
        width: rem(40);
        position: absolute;
        background-image: url(../../assets/images/turbo.png);
        background-size: rem(40);
        background-repeat: no-repeat;
        top: rem(10);
        left: rem(12);
        
      }
      .star {
        height: rem(10);
        width: rem(30);
        position: absolute;
        background-image: url(../../assets/images/star_4.png);
        background-size: rem(30) rem(10);
        top: rem(52);
        left: rem(18);
        &.one {
          background-image: url(../../assets/images/star_1.png);
          background-size: rem(8) rem(10);
          width: rem(8);
          left: rem(30);
        }
        &.two {
          background-image: url(../../assets/images/star_2.png);
          background-size: rem(15) rem(10);
          width: rem(15);
          left: rem(26);
        }
        &.three {
          background-image: url(../../assets/images/star_3.png);
          background-size: rem(22) rem(10);
          width: rem(22);
          left: rem(22);
        }
        &.four {
          background-image: url(../../assets/images/star_4.png);
          background-size: rem(30) rem(10);
        }
      }
    }
  }
}
</style>
