import axios from 'axios';
import authSrv from './userAuth';
const API_URL = "http://localhost:3000/api/cinema";

const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "content-type": "application/json"
    },
    responseType: "json"
  });

  instance.interceptors.request.use(
    request => {
        request.headers = { ...request.headers, "x-access-token": authSrv.USER_AUTH.get().token };
        return request;
    }, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    response => response,
  error => {
      const resStatus = error.response.status;
    if (resStatus === 401 || resStatus === 403) {
      return {status : resStatus};
    } 
   return Promise.reject(error);
  }
);

export default instance;