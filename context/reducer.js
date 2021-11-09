import { defaultState } from "./defaultState";
import deleteAllCookiesFactory from "delete-all-cookies";

export const reducer = (state = defaultState, action) => {
  if (action.type === "TOGGLE_DROPDOWN") {
    const aside = action.payload;
    const closeItem = state.asideContents.find((item) => item.id === aside.id);
    closeItem.open = closeItem.open ? false : true;

    return {
      ...state,
      asideContents: state.asideContents,
    };
  }
  if (action.type === "SET_TOKEN") {
    document.cookie = `accessToken=${action.payload}`;
    localStorage.setItem("accessToken", action.payload);
    return {
      ...state,
      token: action.payload,
    };
  }
  if (action.type === "SET_USER") {
    localStorage.setItem("user", JSON.stringify(action.payload));

    return {
      ...state,
      user: action.payload,
      isUser: true,
    };
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("user");
    localStorage.clear();
    localStorage.removeItem("accessToken");
    return {
      ...state,
      user: {},
      isUser: false,
    };
  }
  if (action.type === "TOGGLE_PROFILE") {
    return {
      ...state,
      isToggledProfile: !state.isToggledProfile,
    };
  }
  if (action.type === "TOGGLE_NAV") {
    return {
      ...state,
      isToggled: !state.isToggled,
    };
  }
  return state;
};
