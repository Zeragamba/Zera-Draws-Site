import axios, {AxiosRequestConfig, AxiosResponse, Method} from 'axios';

export const API_URL = process.env.REACT_APP_API_URL;

async function request(method: Method, path: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse> {
  const url = API_URL + path;
  return axios.request({...config, method, url});
}

export default request;
