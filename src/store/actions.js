import {msiteApi} from '../api';
import {
  SHOPS_UPDATE,
  ADDRESS_UPDATE,
  CATEGORY_UPDATE
} from './mutation-type';

const OK = 0;


export default {
  async shopsUpdate({commit, state}) {
    const result = await msiteApi.getShops({
      latitude: state.latitude,
      longitude: state.longitude
    })
    if (result.data.code === OK) {
      const shops = result.data.data;
      commit(SHOPS_UPDATE, shops)
    }
  },
  async addressUpdate({commit, state}) {
    const result = await msiteApi.getAddress({
        latitude: state.latitude,
        longitude: state.longitude
      })

    if (result.data.code === OK) {
      const address = result.data.data;
      commit(ADDRESS_UPDATE, address)
    }
  },
  async categoryUpdate({commit}) {
    const result = await msiteApi.getCategory();

    if (result.data.code === OK) {
      const categories = result.data.data;
      commit(CATEGORY_UPDATE, categories)
    }
  }
}