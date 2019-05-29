import * as types from "../config/action-types/post";

const initialState = {
  isListSuccess: false,
  requestingPost: false,
  postList: null,
  postError: "",
};

export default function list_post(state = initialState, action = {}) {
  switch (action.type) {
    case types.GET_USER_POSTS_REQUEST: // When a login request action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingPost: true,
        postError: ""
      };
    case types.GET_USER_POSTS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        isListSuccess: true,
        postList: action.data.response.data,
        requestingPost: false,
      };
    case types.GET_USER_POSTS_FAILED: // When a login failed action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingPost: false,
        postError: action.data.error
      };
    default:
      return state;
  }
}
