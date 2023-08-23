import axios from 'axios';

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post(
          'https://ecommerce.olipiskandar.com/api/v1/auth/login',
          credentials
        );
        const token = response.data.access_token;

        // Save token to localStorage
        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        console.log("Token saved:", token);
        console.log(response.data)
        return response.data.success;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    async getUserData ({ commit }, token){
      let response;
      try {
        response = await axios.get('https://ecommerce.olipiskandar.com/api/v1/user/info',
        {
          headers: {
            Authorization: `Bearer $ {token}`
          }
        });
        console.log(response.data)
        return response.data;
      }
      catch (err) {
        console.log(err);
        console.log({})
        commit("USER_INFO")
        return false;
      }
    },
    async signup({ commit }, credentials) {
      try {
        const response = await axios.post(
          'https://ecommerce.olipiskandar.com/api/v1/auth/signup',
          credentials
        );
        const token = response.data.access_token;
        const user = response.data.user;

        
        localStorage.setItem('token', token);
        localStorage.setItem("user", JSON.stringify(user));

        commit('SET_TOKEN', token);
        console.log("token saved:", token);
        return response.data.success;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    logout({ commit }) {
      // Remove token from localStorage
      const token = localStorage.getItem('token');
      localStorage.removeItem('token');
      commit('SET_TOKEN', '');
      //   Log Token removed
      console.log('Token Removed:', token);
      window.location.href = "/login";
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  },
};

export default auth;