<template>
  <q-page class="row items-center justify-evenly">
    <q-btn label="测试" @click="text"></q-btn>
    <q-btn label="注册" @click="text2"></q-btn>
    <q-btn label="注册" @click="text"></q-btn>

  </q-page>
</template>

<script lang="ts">
import {Todo, Meta} from 'components/models';
import {defineComponent, ref} from 'vue';
import {productList, userLogin, userRegistration} from 'src/request/api';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    function text() {
      productList().then((res) => {
        console.log(res);
      });
    }

    function text2() {
      /*userRegistration('1231414', '114141412413').then((res) => {
        console.log(res);
      }).catch((cor) => {
        console.log(cor);
      });*/
    }

    function text3() {
      userLogin('1231414', '114141412413').then((res) => {
        console.log(res);
      }).catch((cor) => {
        console.log(cor);
      });
    }

    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });
    return {todos, meta, text, text2, text3};
  }
});
</script>
