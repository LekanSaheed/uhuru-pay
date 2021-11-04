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
  return state;
};
