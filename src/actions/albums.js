import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import axios from 'axios';

import * as types from "../config/action-types/album";

export function get_album_list() { // Fake authentication function
    return async dispatch => {
        dispatch(get_album_list_Request()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`https://lespornstash.com/albums`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_album_list_Success(response))
                console.log(response) 
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_album_list_Failed("GET album CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
} // login



function get_album_list_Request() {
    return {
        type: types.GET_ALBUMS_REQUEST
    };
} //loginRequest

function get_album_list_Success(response) {
    return {
        type: types.GET_ALBUMS_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function get_album_list_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_ALBUMS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

