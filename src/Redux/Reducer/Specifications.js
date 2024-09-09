import * as ActionTypes from "../Types/ActionTypes";

export const Specifications = (
  state = {
    isLoading: false,
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SPECIFICATIONS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
      };

    case ActionTypes.SPECIFICATIONS_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
      };

    case ActionTypes.SPECIFICATIONS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };

    default:
      return state;
  }
};
