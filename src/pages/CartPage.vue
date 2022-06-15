<template>
  <div class="q-pa-lg" style="max-width: 70vw;margin: 0 auto">
    <div class="q-gutter-md">
      <q-card class="my-card" bordered>
        <q-card-section horizontal>

          <q-card-section style="flex:5;margin-left: 4vw">
            <div class="text-h6" style="color: #9696a1">
              商品信息
            </div>
          </q-card-section>

          <q-card-section style="flex:1">
            <div class="text-h6" style="color: #9696a1">
              单价
            </div>
          </q-card-section>
          <q-card-section style="flex:1">
            <div class="text-h6" style="color: #9696a1">
              数量
            </div>
          </q-card-section>
          <q-card-section style="flex:1">
            <div class="text-h6" style="color: #9696a1">
              金额
            </div>
          </q-card-section>
          <q-card-section style="flex:1">
            <div class="text-h6" style="color: #9696a1">
              操作
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>


      <q-card class="q-gutter-xs">
        <q-intersection
          v-for="item in mCart"
          :key="item"
          transition="scale"
        >
          <q-card
            flat
          >
            <q-card-section horizontal>
              <q-card-section horizontal style="flex:5;margin-left: 2vw;margin-right: 2vw">
                <q-checkbox v-model="item.selected" color="orange"/>
                <q-img
                  horizontal
                  class="col-5"
                  style="max-width: 9vw;max-height: 9vw"
                  :src="item.pthumbnail"
                />
                <div class="text-h6" style="margin-left: 1vw;max-height: 9vw;line-height: 9vw">
                  {{ item.name }}
                </div>
              </q-card-section>

              <q-card-section style="flex:1">
                <div class="text-h6" style="line-height: 6vw">
                  {{ item.pricel }}
                </div>
              </q-card-section>
              <q-card-section style="flex:1">
                <div class="text-h6" style="line-height: 6vw">
                  {{ item.num }}
                  <q-popup-edit v-model.number="item.num" buttons label-set="Save" label-cancel="Close"
                                @hide="changeNum(item)">
                    <q-input type="number" v-model.number="item.num" dense autofocus/>
                  </q-popup-edit>
                  <!--                <q-field rounded outlined>
                                    <q-btn round></q-btn>
                                    <template v-slot:control>
                                      <div class="self-center full-width no-outline" tabindex="0">{{ item.num }}</div>
                                    </template>

                                    <q-btn round></q-btn>
                                    &lt;!&ndash;                  <template v-slot:append>
                                                        &lt;!&ndash;                    <q-avatar>
                                                                              <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
                                                                            </q-avatar>&ndash;&gt;
                                                      </template>&ndash;&gt;
                                  </q-field>-->
                  <!--                <q-input rounded outlined v-model="item.num">
                                  </q-input>-->
                </div>
              </q-card-section>
              <q-card-section style="flex:1">
                <div class="text-h6" style="line-height: 6vw">
                  {{ item.num * item.pricel }}
                </div>
              </q-card-section>
              <!--            <q-card-section style="flex:1">
                            &lt;!&ndash;              <div class="text-h6" style="line-height: 6vw">
                                            123
                                          </div>&ndash;&gt;

                          </q-card-section>-->
              <q-card-actions style="flex:1 ; padding-bottom: 2vw">
                <q-btn
                  @click="deleteMyItem(item)"
                  size="1.2vw"
                  flat
                  icon="bi-trash2"
                />
              </q-card-actions>
            </q-card-section>
            <q-separator inset/>
          </q-card>

        </q-intersection>

      </q-card>

      <q-card class="my-card" bordered>
        <q-card-section horizontal>

          <q-card-section style="flex:1;margin-left: 4vw;">
            <div class="text-h6" style="color: #9696a1;line-height: 5vh">
              合计
            </div>
          </q-card-section>
          <q-card-section style="flex:5;">
            <div class="text-h6" style="color: #9696a1;line-height: 5vh">
              {{ totoalCount }}
            </div>
          </q-card-section>


          <q-card-actions style="flex:3">
            <q-btn @click="byMyOrder" color="deep-orange" push style="margin-left: 5vw;height: 5vh">
              <div class="row items-center no-wrap">
                <q-icon left name="map"/>
                <div class="text-center">
                  买！买！买！
                </div>
              </div>
            </q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>

    </div>

  </div>
</template>

<script>
import {shoppingStore} from 'stores/shopping-store';
import {computed} from 'vue';
import {addProduct, deleteItem, generateOrders, orderList} from '../request/api';

export default {
  name: 'CartPage',
  setup() {
    let shoppingStore1 = shoppingStore();
    let mItems = shoppingStore1.mItems;
    let mCart = computed(() => {
      return mItems.filter((e) => e.love === true);
    })
    let totoalCount = computed(() => {
      let temp = 0;
      mItems.forEach(e => {
        if (e.selected) {
          temp += (+e.pricel * e.num);
        }
      });
      return temp;
    });


    /*watch([...mItems], (newValue, oldValue) => {
      console.log('sum变化了', newValue, oldValue);
    })*/

    function changeNum(item) {
      deleteItem(item.cardid).then((res) => {
        console.log(res);
      })

      addProduct(item.id, item.num, item.pricel).then(
        (res) => {
          console.log(item.id);
          console.log(item.num);
          console.log(res);
          res.forEach((e) => {
            if (e.name === item.name) {
              item.cardid = e.cardid;
            }
          })
          console.log(item.cardid);
        }
      )
    }

    let alter = false;

    function deleteMyItem(item) {
      item.num = 1;
      item.selected = false;
      item.love = false;
      deleteItem(item.cardid).then((res) => {
        console.log(res);
      })
    }

    function selectAll() {
      mItems.forEach(e => {
        if (e.love) {
          e.checked = true;
        }
      })
    }

    function selectNone() {
      mItems.forEach(e => {
        if (e.love) {
          e.checked = false;
        }
      })
    }

    function byMyOrder() {
      let tmp = confirm('请确认您的订单');
      console.log(tmp);
      if (tmp) {
        console.log('执行到这一步了');
        let temp = [];
        mItems.forEach(e => {
          if (e.selected) {
            temp.push(e.cardid);
            e.num = 1;
            e.selected = false;
            e.love = false;
          }
        })
        generateOrders(temp).then(res => {
          console.log(res);
          orderList(shoppingStore1.userId).then(res => {
            shoppingStore1.mOrders = res;
            console.log('@@@@@@@@@@', shoppingStore1.mOrders);
          })
        }).catch(res => {
          console.log(res);
        })
      }
    }

    return {
      mItems, mCart, totoalCount, changeNum, deleteMyItem, byMyOrder, alter
    }
  }
}

</script>

<style scoped>

</style>
