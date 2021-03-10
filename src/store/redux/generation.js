import actionTypes from "../constants";
const initialState = {
  loading: false,
  error: null,
  generations: [],
};

export default function generationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_GENERATIONS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_GENERATIONS.SUCCESS:
      console.log("action", action);
      return {
        ...state,
        loading: false,
        error: null,
        generations: action.payload,
      };
    default:
      return state;
  }
}
