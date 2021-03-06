import * as types from "../config/action-types/song";

const initialState_A = {
  isSongSuccess: false,
  requestingSong: false,
  songList: null,
  songError: "",
  songShow: 0,
  songTotal: 0,
  songLimit: 7,
  songOffset: 0
};

export default function list_song(state = initialState_A, action = {}) {
  switch (action.type) {
    case types.GET_SONGS_REQUEST: // When a login request action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingSong: true,
        songError: ""
      };
    case types.GET_SONGS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        isSongSuccess: true,
        songList: action.data.response.data,
        songTotal: action.data.response.data.length,
        requestingSong: false,
        
      };
      case types.RESET_SONGS_REQUEST: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        // requestingSong: true,
      };
      case types.RESET_SONGS_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        songLimit: action.data.limit,
        songOffset: action.data.offset,
        requestingSong: false,
      };
    case types.COUNT_SONGS_TOTAL_SUCCESS: // When a Login success action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        songTotal: action.data.response.length
      
      };    
    case types.GET_SONGS_FAILED: // When a login failed action has been dispatched
      return { // See more on actions/authenticate.js on line 19 - 38
        ...state,
        requestingSong: false,
        songError: action.data.error
      };
    default:
      return state;
  }
}
