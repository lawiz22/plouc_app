import * as types from "../config/action-types/album";

const initialState_A = {
  isAlbumSuccess: false,
  requestingAlbum: false,
  albumList: null,
  albumError: "",
};

export default function list_album(state = initialState_A, action = {}) {
  switch (action.type) {
    case types.GET_ALBUMS_REQUEST: // When a login request action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingAlbum: true,
        albumError: ""
      };
    case types.GET_ALBUMS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        isAlbumSuccess: true,
        albumList: action.data.response.data,
        requestingAlbum: false,
      };
    case types.GET_ALBUMS_FAILED: // When a login failed action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingAlbum: false,
        albumError: action.data.error
      };
    default:
      return state;
  }
}
