import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import axios from 'axios';
import AuthReducer from '../store/reducer/auth.reducer';
import Env from '../env/env';
// import Env from '../env/env';
// Axios config
axios.defaults.baseURL = Env.BASE_URL;
// axios.defaults.headers.app_key = Env.APP_KEY;

axios.interceptors.request.use(
  config => {
    config.headers.token = STORE.getState()?.auth?.user?.token
      ? STORE.getState()?.auth?.user?.token
      : STORE.getState()?.auth?.user?.token;
 
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// REDUX CONFIGURATIONS
const rootReducer = combineReducers({
  auth: AuthReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // blacklist: []
};
const middleware = applyMiddleware(promise, thunk);
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const STORE = createStore(
  persistedReducer,
  composeEnhancers(middleware),
);
export const PERSISTOR = persistStore(STORE);