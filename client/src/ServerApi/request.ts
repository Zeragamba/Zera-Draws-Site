import axios, {AxiosResponse, Method} from 'axios';

async function request(method: Method, path: string, data: any = undefined): Promise<AxiosResponse> {
  const url = "/api" + path
  return axios.request({method, url, data});
}

export default request;
