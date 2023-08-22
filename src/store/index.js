import { createStore } from 'vuex';
import auth from './modules/auth';
import brands from './modules/brands';
import category from './modules/category';



const store = createStore({
  state: {
    isLoading: true,
  },
  modules: {
    auth,
    brands,
    category
  },
});

export default store;