<template>
  <q-page>
    <RotationChart></RotationChart>
    <div
      class=" myCard q-pa-md row wrap justify-start items-start content-start q-col-gutter-md"
      style="margin: 0 auto">
      <ShoppingCard
        v-for="item in mItems"
        :key="item.id"
        :item="item"
      ></ShoppingCard>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          :max="5"
          direction-links
        />
      </div>
    </div>
  </q-page>


</template>

<script lang="ts">
import ShoppingCard from 'components/ShoppingCard.vue';
import RotationChart from 'components/RotationChart.vue';
import {shoppingStore} from 'stores/shopping-store';

export default {
  name: 'ShopPage',
  components: {RotationChart, ShoppingCard},
  setup() {
    let shoppingStore1 = shoppingStore();
    let mItems = shoppingStore1.mItems;
    return {
      mItems
    }
  }
}
</script>

<style scoped>
.myCard {
  max-width: 1200px;
}
</style>
