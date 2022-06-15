import request from 'src/request/request';
import { shoppingStore } from 'stores/shopping-store';

const shoppingStore1 = shoppingStore();
//用户管理
//用户注册
export const userRegistration = (name: number, passwd: number) =>
  request.get('/user/register', {
    params: {
      name: name,
      password: passwd,
    },
  });
//用户登陆
export const userLogin = (name: string, passwd: string) =>
  request.get('/user/login', {
    params: {
      name: name,
      password: passwd,
    },
  });

//商品列表
export const productList = () => request.get('/goods/list');

//加入商品
export const addProduct = (goodsId: string, num: number, price: string) =>
  request.post(
    `/cart/add?userId=${shoppingStore1.userId}&goodsId=${goodsId}&&num=${num}&price=${price}`
  );

//购物车列表
export const shoppingCartList = (userId: string) =>
  request.get('/cart/listByUser', {
    params: {
      userId: userId,
    },
  });
//删除商品
export const deleteItem = (cardid: string) =>
  request.delete(
    `/cart/deleteById?userId=${shoppingStore1.userId}&cartId=${cardid}`
  );
//生成订单
export const generateOrders = (catList: string[]) =>
  request.post(
    `/order/addCastOrder?userId=${shoppingStore1.userId}&cartList=${catList}`
  );
//订单列表
export const orderList = (muserId: string) =>
  request.post(`/order/listByUser?userId=${muserId}`);
