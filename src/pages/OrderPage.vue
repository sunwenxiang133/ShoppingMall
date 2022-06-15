<template>
  <!--  <div class="q-pa-md flex justify-center">
      <div style="max-width: 90%; width: 76vw;">
        <q-expansion-item
          default-opened
          class="shadow-1 overflow-hidden"
          style="border-radius: 30px"
          v-for="myOrder in myOrders"
          :key="myOrder"
          icon="explore"
          label="订单页面"
          header-class="bg-primary text-white"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              Counting:
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>-->

  <q-page>

    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="item in tmyOrders"
          :key="item"
          transition="scale"
          style="width: 70vw;max-width: 80%"
        >
          <q-card class="q-ma-sm">
            <q-card-section>
              <div class="text-h6">订单编号:{{ item.id }}</div>
              <div class="text-subtitle2">订单时间:{{ item.orderTime }}</div>
              <q-card class="q-gutter-xs">
                <q-card
                  flat
                >
                  <q-card-section horizontal>
                    <q-card-section style="flex:5;margin-left: 2vw;margin-right: 2vw">
                      <div class="text-h6" style="margin-left: 1vw;line-height: 5vw">
                        商品详情
                      </div>
                    </q-card-section>

                    <q-card-section style="flex:1">
                      <div class="text-h6" style="line-height: 5vw">
                        个数
                      </div>
                    </q-card-section>
                    <q-card-section style="flex:1">
                      <div class="text-h6" style="line-height: 5vw">
                        单价
                      </div>
                    </q-card-section>
                    <!--                      <q-card-section style="flex:1">
                                            <div class="text-h6" style="line-height: 5vw">
                                              {{ mitem.nums * mitem.dealPrice }}
                                            </div>
                                          </q-card-section>-->
                  </q-card-section>
                  <q-separator inset/>
                </q-card>


                <q-intersection
                  v-for="mitem in item.orderDetail"
                  :key="mitem"
                  transition="scale"
                >
                  <q-card
                    flat
                  >
                    <q-card-section horizontal>
                      <q-card-section horizontal style="flex:5;margin-left: 2vw;margin-right: 2vw">
                        <q-img
                          horizontal
                          class="col-5"
                          style="max-width: 9vw;max-height: 9vw"
                          :src="myPthumbnail(mitem.goodsName)"
                        />
                        <div class="text-h6" style="margin-left: 1vw;max-height: 6vw;line-height: 6vw">
                          {{ mitem.goodsName }}
                        </div>
                      </q-card-section>

                      <q-card-section style="flex:1">
                        <div class="text-h6" style="line-height: 5vw">
                          {{ myCount(mitem.nums) }}
                        </div>
                      </q-card-section>
                      <q-card-section style="flex:1">
                        <div class="text-h6" style="line-height: 5vw">
                          {{ myDeal(mitem.nums) }}
                        </div>
                      </q-card-section>
                      <!--                      <q-card-section style="flex:1">
                                              <div class="text-h6" style="line-height: 5vw">
                                                {{ mitem.nums * mitem.dealPrice }}
                                              </div>
                                            </q-card-section>-->
                    </q-card-section>
                    <q-separator inset/>
                  </q-card>

                </q-intersection>

              </q-card>
            </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </div>
  </q-page>

</template>

<script>

import {computed, reactive} from 'vue';
import {shoppingStore} from '../stores/shopping-store';

export default {
  name: 'OrderPage',
  setup() {
    let shoppingStore1 = shoppingStore();
    /*let tmyOrders = computed(() => {
      return shoppingStore1.mOrders;
    })*/

    let tmp = shoppingStore1.mOrders;
    let tmyOrders = reactive(tmp);

    function myPthumbnail(name) {
      let temp;
      shoppingStore1.mItems.forEach(e => {
        if (e.name === name) {
          temp = e.pthumbnail;
        }
      })
      return temp;
    }

    function myCount(e) {
      // console.log(e.match(/(\S*),/)[1]);
      let temp = e.match(/(\S*),/)[1];
      // console.log(temp);
      return temp;
    }

    function myDeal(e) {
      console.log(e);
      let temp = e.match(/=(\S*)/)[1];
      // console.log(temp);
      return temp;
    }

    function test() {
      console.log('@@@@@@@@@@@@@', tmyOrders.value);
    }


    return {
      tmyOrders, myPthumbnail, myCount, myDeal, test

    }
  }
}
</script>

<style scoped>

</style>
