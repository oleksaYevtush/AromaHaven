export const actionType = {
  SET_USER: 'SET_USER',
  SET_CARTITEMS: 'SET_CARTITEMS',
  SET_AROMA_ITEMS: 'SET_AROMA_ITEMS',
  SET_CART_SHOW: 'SET_CART_SHOW'
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
      case actionType.SET_CARTITEMS:
        return {
          ...state,
          cartItems: action.cartItems,
        };
        case actionType.SET_CART_SHOW:
          return {
            ...state,
            cartShow: action.cartShow,
          };
    case actionType.SET_AROMA_ITEMS:
      return {
        ...state,
        aromaItems: action.aromaItems,
      };
    default:
      return state;
  }
};

export default reducer;
