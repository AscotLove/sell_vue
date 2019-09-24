import {
  loginApi,
  msiteApi,
} from '../api';
import {
  USER_UPDATE,
  SHOPS_UPDATE,
  ADDRESS_UPDATE,
  CATEGORY_UPDATE,
} from './mutation-type';
import { loginSuccess } from './utils';

const OK = 0;
const ERROR = 1;

export default {
  async shopsUpdate({commit, state}) {
    const result = await msiteApi.getShops({
      latitude: state.latitude,
      longitude: state.longitude
    })
    if (result.code === OK) {
      const shops = result.data;
      commit(SHOPS_UPDATE, shops)
    }
  },
  async addressUpdate({commit, state}) {
    const result = await msiteApi.getAddress({
      latitude: state.latitude,
      longitude: state.longitude
    })

    if (result.code === OK) {
      const address = result.data;
      commit(ADDRESS_UPDATE, address)
    }
  },
  async categoryUpdate({commit}) {
    const result = await msiteApi.getCategory();

    if (result.code === OK) {
      const categories = result.data;
      commit(CATEGORY_UPDATE, categories)
    }
  },
  async userUpdate({commit}, user) {

    let result = null;

    if (user.name) {
      result = await loginApi.getUserName({
        name: user.name,
        pwd: user.pwd,
        captcha: user.captcha,
      })
    } else {
      result = await loginApi.getUserPhone({
        phone: user.phone,
        code: user.code
      })
    }

    if (result.code === OK) loginSuccess(commit, USER_UPDATE, result.data);
    if (result.code === ERROR) loginErr
  }
}