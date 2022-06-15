<template>
  <div class="col-md-3 col-sm-4 col-xs-12">
    <q-card class="my-card">
      <q-img :src="item.pthumbnail"/>

      <q-card-section>
        <q-btn
          outline
          fab
          color="primary"
          icon="bi-heart"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(65%);"
          @click="changeLove"
        />
        <q-btn
          fab
          v-show="item.love"
          color="red"
          icon="bi-heart"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(65%);"
          @click="changeLove"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{ item.name }}
          </div>
          <!--        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    <q-icon name="place"/>
                    250 ft
                  </div>-->
        </div>

        <!--      <q-rating v-model="stars" :max="5" size="32px"/>-->
      </q-card-section>

      <!--    <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              $・Italian, Cafe
            </div>
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>-->

      <q-separator/>

      <q-card-actions>
        <q-btn flat round icon="bi-currency-yen"/>
        <q-btn flat color="black" size="1.2vw">
          {{ item.pricel }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import {addProduct, deleteItem} from 'src/request/api';
import {shoppingStore} from 'stores/shopping-store';
import {useRouter} from 'vue-router';

export default {
  name: 'ShoppingCard',
  props: {
    item: {
      id: String,
      name: String,
      pricel: Number,
      pthumbnail: String,
      num: Number,
      love: Boolean,
    }
  },
  setup(props) {
    let item = reactive(props.item);
    const shoppingStore1 = shoppingStore();
    const router = useRouter();

    function changeLove() {
      if (!shoppingStore1.logined) {
        router.push('/LoginPage');
        alert('请登陆');
        return;
      }

      item.love = !item.love;
      if (item.love) {
        addProduct(item.id, item.num, item.pricel).then(
          (res) => {
            console.log(res);
            res.forEach((e) => {
              if (e.name === item.name) {
                item.cardid = e.cardid;
              }
            })
            console.log(item.cardid);
          }
        )
        return;
      }
      deleteItem(item.cardid).then((res) => {
        console.log(res);
      })

    }

    return {
      starts: ref(4),
      changeLove
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 315px;
}
</style>
