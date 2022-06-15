<template>
  <q-page>
    <div class="q-pa-md" style="max-width: 400px;margin: 26vh auto">

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="name"
          label="账户名 *"
          hint="请输入您的账户名称"
          lazy-rules
          :rules="[ val => val && val.length > 0 || '账户名称不能为空']"
        />

        <q-input
          filled
          v-model="passwd"
          label="密码 *"
          hint="请输入您的密码"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || '密码不能为空',
        ]"
        />

        <q-toggle v-model="accept" label="记住用户名和密码"/>

        <div>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
          <q-btn label="Register" type="submit" @click="Register" color="primary" class="q-ml-sm"/>
          <q-btn label="Submit" type="submit" @click="Submit" color="primary" class="q-ml-sm"/>
        </div>
      </q-form>
    </div>

  </q-page>

</template>

<script>
import {ref} from 'vue'
import {shoppingStore} from '../stores/shopping-store';
import {orderList, shoppingCartList, userLogin, userRegistration} from '../request/api';
import {useRoute, useRouter} from 'vue-router'

export default {
  name: 'LoginPage',
  setup() {
    let name = ref(null)
    let passwd = ref(null)
    const accept = ref(false)
    let shoppingStore1 = shoppingStore();
    const router = useRouter();


    return {
      name,
      passwd,
      accept,

      Register() {
        if (!name.value || !passwd.value) {
          return;
        }
        userRegistration(Number(name.value), Number(passwd.value)).then((res) => {
          if (res === 'OK') {
            console.log(res);
            alert('注册成功');
          } else if (res === 'isexist') {
            alert('已经存在');
          } else {
            console.log(res);
          }
        })
      },
      Submit() {
        userLogin(Number(name.value), Number(passwd.value)).then((res) => {
          if (res === 'invalid') {
            alert('尚未注册，登陆失败');
          } else {
            alert('登陆成功');
            console.log(res);
            shoppingStore1.logined = true;
            shoppingStore1.userId = res;
            let temp = shoppingStore1.mItems;
            shoppingCartList(shoppingStore1.userId).then((ress) => {
              console.log(ress);
              ress.forEach((e) => {
                temp.forEach((item) => {
                  if (e.name === item.name) {
                    item.love = true;
                    item.cardid = e.cardid;
                    item.num = e.num;
                    console.log(item);
                    console.log(item.name);
                  }
                })
              })
            })

            orderList(shoppingStore1.userId).then(res => {
              shoppingStore1.mOrders = res;
            })
            router.push('/ShopPage');
          }
        })
      },
      onSubmit() {
        console.log();
      },

      onReset() {
        name.value = null
        passwd.value = null
        accept.value = false
      }
    }
  }
}
</script>


<style scoped>

</style>
