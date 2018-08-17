import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    { //首页
      path: '/home',
      name: 'home',
      component: Home
    },
    { //女武神
      path: '/valkyria',
      name: 'valkyria',
      component: () => import('./views/Valkyria/Valkyria.vue'),
      children: [  //这里就是二级路由的配置
        {
          path: 'overview',
          name: 'overview',
          component: () => import('./views/Valkyria/Overview.vue'),
        },
        {
          path: 'skill',
          name: 'skill',
          component: () => import('./views/Valkyria/Skill.vue'),
        },
        {
          path: 'equipPro',
          name: 'equipPro',
          component: () => import('./views/Valkyria/EquipPro.vue'),
        },
        {
          path: 'team',
          name: 'team',
          component: () => import('./views/Valkyria/Team.vue'),
        },
        {
          path: 'raiders',
          name: 'raiders',
          component: () => import('./views/Valkyria/Raiders.vue'),
        }
      ]
    },
    { //武器
      path: '/weapon',
      name: 'weapon',
      component: () => import('./views/Weapon/Weapon.vue'),
      children: [
        {
          path: ':type',
          name: 'weaponList',
          component: () => import('./views/Weapon/WeaponList.vue'),
        },
        {
          path: 'weaponDetail/:id',
          name: 'weaponDetail',
          component: () => import('./views/Weapon/Detail.vue'),
        }
      ]
    },
    { //圣痕
      path: '/stigmata',
      name: 'stigmata',
      component: () => import('./views/Stigmata/Stigmata.vue'),
      children: [
        {
          path: ':type',
          name: 'stigmataList',
          component: () => import('./views/Stigmata/StigmataList.vue'),
        },
        {
          path: 'stigmataDetail/:id',
          name: 'stigmataDetail',
          component: () => import('./views/Stigmata/Detail.vue'),
        }
      ]
    },
    { //物品
      path: '/item',
      name: 'item',
      component: () => import('./views/Item/item.vue'),
      children: [
        {
          path: 'list/:type/:star',
          name: 'itemList',
          component: () => import('./views/Item/itemList.vue'),
        },
        {
          path: 'detail/:id',
          name: 'itemDetail',
          component: () => import('./views/Item/itemDetail.vue')
        }
      ]
    },
    { //攻略文章
      path: '/raidersArticle',
      name: 'raidersArticle',
      component: () => import('./views/RaidersArticle/RaidersArticle.vue'),
      children: [
        {
          path: ':type',
          name: 'raidersArticleList',
          component: () => import('./views/RaidersArticle/RaidersArticleList.vue'),
        }
      ]
    },
    { //404
      path: '/404',
      name: 'error404',
      component: () => import('./views/Error404.vue')
    },
  ]
});
