import axios, {AxiosResponse, Method} from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

async function request(method: Method, path: string, data: any = undefined): Promise<AxiosResponse> {
  const url = SERVER_URL + path;
  console.log(url)
  return axios.request({method, url, data});
}

export default request;
