import api from "@/api";
import encode from "@/utils/encode";
import { GET_USER_PROFILE, RESET_PROFILE } from "../user/consts";
import { LOGIN, LOGOUT } from "./consts";

const state = {
  isAuth: localStorage.getItem("app-authToken"),
};

export default {
  state,
  getters: {
    getIsAuth: (state) => state.isAuth,
  },
  actions: {
    [LOGIN]: async ({ dispatch, commit }, { email, password }) => {
      const res = encode(email, password);
      const { data } = await api.get("secrets.json");
      const userId = data[res];
      if (!userId) {
        throw Error("incorrect password");
      }
      localStorage.setItem("app-authToken", res); // better to use a wrapper function for localstorage, but this will do for this project (i.e: useLocalStorage).
      localStorage.setItem("app-userId", userId);
      commit(LOGIN);
      dispatch(GET_USER_PROFILE, { userId });
    },
    [LOGOUT]: ({ commit }) => {
      state.isAuth = false;
      commit(RESET_PROFILE);
      localStorage.clear();
    },
  },
  mutations: {
    [LOGIN]: (state) => {
      state.isAuth = true;
    },
  },
};
