export const reducer = (state, action) => {
  if (action.type === "TOGGLE_DROPDOWN") {
    const aside = action.payload;
    const closeItem = state.asideContents.find((item) => item.id === aside.id);
    closeItem.open = closeItem.open ? false : true;

    return {
      ...state,
      asideContents: state.asideContents,
    };
  }
  if (action.type === "SET_USER") {
    localStorage.setItem("stakeholder", JSON.stringify(action.payload));
    console.log(action.payload);
    return {
      ...state,
      user: action.payload,
      isUser: true,
    };
  }
  if(action.type === 'TOGGLE_PROFILE'){
    return{
      ...state,
      isToggledProfile:!state.isToggledProfile
    }
  }
  return state;
};
