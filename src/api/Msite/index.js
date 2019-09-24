import ajaxInstance from './instance';
import apis from './Api';
import { axiosHttp } from '../utils/index';

export default axiosHttp(apis, ajaxInstance);
