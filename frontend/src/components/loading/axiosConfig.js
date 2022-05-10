import axios from 'axios';
import { createStore } from 'redux';
import reducer from '../../_reducers/index';

class AxiosConfig {
  initInterceptor() {
    // const { contentRootStore } = rootStore;
    let store = createStore(reducer);
    axios.interceptors.request.use(
      (config) => {
        // API 호출시 Spinner 표시
        store.dispatch({ type: 'visibleSpinner' });
        console.log(store.getState());
        return config;
      },
      (error) => Promise.reject(error)
    );
    axios.interceptors.response.use(
      (response) => {
        // API 완료시 Spinner 제거
        store.dispatch({ type: 'unvisibleSpinner' });
        console.log(store.getState());
        return response;
      },
      (error) =>
        Promise.reject(error).catch((err) => {
          // API 오류시 Spinner 제거
          store.dispatch({ type: 'unvisibleSpinner' });
          console.log(store.getState());
          return err;
        })
    );
  }
}

export default AxiosConfig;
