import actionTypes from "../constants";
const initialState = {
  loading: false,
  error: null,
  versions: [],
};

export default function versionReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VERSIONS.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_VERSIONS.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        versions: action.payload,
      };
    default:
      return state;
  }
}
