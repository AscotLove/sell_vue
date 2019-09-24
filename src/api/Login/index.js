import Api from './Api';
import loginInstance from './instance';
import { axiosHttp } from '../utils';

export default axiosHttp(Api, loginInstance);
