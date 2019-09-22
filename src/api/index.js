import ajaxInstance from './ajax';
import apis from './assets/api-options';
import { axiosHttp } from '../utils';

const msiteApi = axiosHttp(apis, ajaxInstance);
export {
  msiteApi,
}