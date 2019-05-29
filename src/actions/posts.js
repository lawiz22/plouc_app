import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import axios from 'axios';

import * as types from "../config/action-types/post";

export function get_user_post() { // Fake authentication function
    return async dispatch => {
        dispatch(get_user_posts_Request()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`https://lespornstash.com/posts`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_user_posts_Success(response))
                console.log(response) 
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_user_posts_Failed("GET POSTS CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something went wrong"));
        }
    };
} // login



function get_user_posts_Request() {
    return {
        type: types.GET_USER_POSTS_REQUEST
    };
} //loginRequest

function get_user_posts_Success(response) {
    return {
        type: types.GET_USER_POSTS_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function get_user_posts_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_USER_POSTS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

