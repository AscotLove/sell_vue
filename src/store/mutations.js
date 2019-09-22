import {
  SHOPS_UPDATE,
  ADDRESS_UPDATE,
  CATEGORY_UPDATE,
} from './mutation-type';

export default {
  [SHOPS_UPDATE](state, shops) {
    state.shops = shops
  },
  [ADDRESS_UPDATE](state, address) {
    state.address = address
  },
  [CATEGORY_UPDATE](state, categories) {
    state.categories = categories
  },
}