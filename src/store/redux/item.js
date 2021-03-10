import actionTypes from "../constants";
const initialState = {
  loading: false,
  error: null,
  items: [],
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_ITEMS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ITEMS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.payload,
      };
    default:
      return state;
  }
}
