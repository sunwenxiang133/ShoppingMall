<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          前端大作业
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-expansion-item>
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://tu.sunning.fit/i/2022/06/15/62a8c7a31834e.jpg">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              作业介绍
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <q-item clickable v-ripple>
                <q-item-section>Vue3+ts</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>pinia</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>quasar</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>axios</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section>黑暗模式，分页，轮播图，滚动加载,浮动操作按钮，首页多端适配</q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-toggle
          class="absolute-bottom"
          style="margin-bottom: 2vh"
          v-model="mBlack"
          :label=" `调整显示模式 ${MBlack}` "
          @click="this.$q.dark.toggle()"
          color="black"
          keep-color
        />
      </q-scroll-area>

      <q-img v-show="!login" class="absolute-top" src="https://tu.sunning.fit/i/2022/06/15/62a8d35c0b0cb.png"
             style="height: 150px;background-color: #9696a1">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://tu.sunning.fit/i/2022/06/15/62a8d315ec342.png">
          </q-avatar>
          <!--          <button>

                    </button>-->
          <q-btn style="font-size: 1.5vw" class="text-weight-bold">未登陆</q-btn>
          <q-btn style="font-size: 1.2vw" @click="myRouter">点击跳转登陆</q-btn>
        </div>
      </q-img>

      <q-img v-show="login" class="absolute-top" src="https://tu.sunning.fit/i/2022/06/15/62a8ce362fb2b.jpg"
             style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://tu.sunning.fit/i/2022/06/15/62a8c7a31834e.jpg">
          </q-avatar>
          <div style="font-size: 1.5vw" class="text-weight-bold">孙文祥</div>
          <div style="font-size: 1.2vw">2000300529</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {shoppingStore} from '../stores/shopping-store'
import {orderList, productList} from '../request/api';
import {tItem} from 'src/types';
import {useRouter} from 'vue-router';

const linksList1 = [
  {
    title: '商城',
    caption: '好吃又管胞',
    icon: 'bi-yin-yang',
    link: '/ShopPage'
  },
  {
    title: '购物车',
    caption: '买你所想',
    icon: 'bi-cart3',
    link: '/CartPage'
  },
  {
    title: '我的订单',
    caption: '下辈子一定不花钱了',
    icon: 'bi-handbag',
    link: '/OrderPage'
  },
];

const linksList2 = [
  {
    title: '商城',
    caption: '好吃又管胞',
    icon: 'bi-yin-yang',
    link: '/ShopPage'
  },
  {
    title: '登陆',
    caption: '下辈子一定不花钱了',
    icon: 'bi-handbag',
    link: '/LoginPage'
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {

    let shoppingStore1 = shoppingStore();
    const leftDrawerOpen = ref(false)
    let mBlack = ref(false);
    let MBlack = computed(() => {
      return mBlack.value ? '黑夜' : '白天'
    })

    let myLink = computed(() => {
      if (shoppingStore1.logined) {
        return linksList1;
      } else {
        return linksList2;
      }
    })
    let login = computed(() => {
        return shoppingStore1.logined;
      }
    )
    const router = useRouter();

    function myRouter() {
      router.push('/LoginPage');
    }

    onMounted(() => {
      productList().then((res) => {
        let temp = res as unknown as Array<tItem>;
        temp.forEach((e) => {
          if (shoppingStore1.mItems.length <= 22) {
            shoppingStore1.mItems.push({
              id: e.id,
              name: e.name,
              pricel: +e.price1,
              pthumbnail: 'http://202.193.53.235:8080/' + e.pthumbnail,
              num: 1,
              love: false,
              cardid: '',
              selected: false,
            } as {
              id: string;
              name: string;
              pricel: number;
              pthumbnail: string;
              num: number;
              love: boolean;
              cardid: string;
              selected: boolean;
            })
          }
        });
        console.log(shoppingStore1.mItems);
      }).catch((res) => {
        console.log(res);
        console.log('商品列表获取失败');
      })
    })
    return {
      essentialLinks: myLink,
      leftDrawerOpen, MBlack,
      mBlack,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      login, myRouter, shoppingStore1
    }
  }
});

</script>

<style>

</style>
