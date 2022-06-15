<template>
  <q-item
    clickable
    tag="a"
    @click="test"
    :to="link"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon"/>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="js">
import {defineComponent} from 'vue';
import {orderList} from 'src/request/api';
import {shoppingStore} from 'stores/shopping-store';


export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup() {
    let shoppingStore1 = shoppingStore();

    function test() {
      /*if (shoppingStore1.logined) {
        orderList().then(res => {
          shoppingStore1.mOrders = res;
          console.log('@@@@@@@@@@', shoppingStore1.mOrders);
        })
      }*/
      console.log('跳转啦');
    }

    return {
      test
    }
  }
});
</script>
