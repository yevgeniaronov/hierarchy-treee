/* eslint-disable no-unused-vars */
import api from "@/api";
import { GET_USER_PROFILE, RESET_PROFILE } from "./consts";

const defaultState = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  managerId: "",
  photo: "",
};

const state = {
  ...defaultState,
  id: localStorage.getItem("app-userId"),
};

export default {
  state,
  getters: {
    getFullName: (state) => `${state.firstName} ${state.lastName}`,
  },
  actions: {
    [GET_USER_PROFILE]: async ({ commit }, { userId }) => {
      const { data } = await api.get("users.json");
      const user = data.find((user) => user.id == userId);

      if (user) {
        commit(GET_USER_PROFILE, user);
      }
    },
  },
  mutations: {
    [GET_USER_PROFILE]: (state, data) => {
      Object.entries(state).forEach((entry) => {
        state[entry[0]] = data[entry[0]];
      });
    },
    [RESET_PROFILE]: (state) => {
      Object.entries(state).forEach((entry) => {
        state[entry[0]] = defaultState[entry[0]];
      });
    },
  },
};
