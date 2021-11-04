export const reducer = (state, action) => {
  if (action.type === "TOGGLE_DROPDOWN") {
    const aside = action.payload;
    const closeItem = state.asideContents.find((item) => item.id === aside.id);
    closeItem.open = !closeItem.open;

    return {
      ...state,
      asideContents: state.asideContents,
    };
  }
  if (action.type === "SET_USER") {
    localStorage.setItem(
      "stakeholder",
      JSON.stringify(action.payload.stakeholder)
    );
    console.log(action.payload.token);
    return {
      ...state,
      user: action.payload,
      isUser: true,
      token: action.payload.token,
    };
  }
  return state;
};
