import { createStore } from 'vuex';
import auth from './modules/auth';
import brands from './modules/brands';
import category from './modules/category';
import user from './modules/user';
import product from './modules/product';



const store = createStore({
  state: {
    isLoading: true,
  },
  modules: {
    auth,
    brands,
    category,
    user,
    product
  },
});

export default store;