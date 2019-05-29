import * as types from "../config/action-types/artist";

const initialState_A = {
  isArtistSuccess: false,
  requestingArtist: false,
  artistList: null,
  artistError: "",
};

export default function list_artist(state = initialState_A, action = {}) {
  switch (action.type) {
    case types.GET_ARTISTS_REQUEST: // When a login request action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingArtist: true,
        artistError: ""
      };
    case types.GET_ARTISTS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        isArtistSuccess: true,
        artistList: action.data.response.data,
        requestingArtist: false,
      };
    case types.GET_ARTISTS_FAILED: // When a login failed action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingArtist: false,
        artistError: action.data.error
      };
    default:
      return state;
  }
}
