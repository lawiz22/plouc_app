import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";
import axios from 'axios';

import * as types from "../config/action-types/song_user";

export function get_usersong_list( limit, offset ) { // Fake authentication function
    return async dispatch => {
        dispatch(get_usersong_list_Request()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`https://lespornstash.com/songs?limit=${limit}&offset=${offset}`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response))
                dispatch(get_usersong_list_Success(response))
                console.log(response)
                
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(get_usersong_list_Failed("GET usersong CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something wen wong"));
        }
    };
} // login

// login



function get_usersong_list_Request() {
    return {
        type: types.GET_USER_SONGS_REQUEST,
        
    };
} //loginRequest

function get_usersong_list_Success(response) {
    return {
        type: types.GET_USER_SONGS_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function get_usersong_list_Failed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.GET_USER_SONGS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

export function reset_usersong_list(limit, offset) { // Fake logout request
    return async dispatch => {
        dispatch(reset_usersongRequest()) // Dispatch a logout request
        try {
            setTimeout(async () => { // Add a 1.5 second delay to fake an asynchronous ajax request
                // await AsyncStorage.removeItem(DATA_SESSION); // Remove the session data and unauthenticate the user
                
                dispatch(reset_usersongSuccess(limit, offset)) // Dispatch a logout success action
            }, 1500)
        } catch (err) { // When something goes wrong
            dispatch(reset_usersongFailed("Something went wrong"))
        }
    }
} // logout


function reset_usersongRequest() {
    return {
        type: types.RESET_USER_SONGS_REQUEST
    };
} //loginRequest

function reset_usersongSuccess(limit, offset) {
    return {
        type: types.RESET_USER_SONGS_SUCCESS,
        data: {
            limit,
            offset
        }
    };
} // loginSuccess

function reset_usersongFailed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.RESET_USER_SONGS_FAILED,
        data: {
            error: error
        }
    };
} // loginFailed

export function get_user_song_count(user) { // Fake authentication function
    return async dispatch => {
        dispatch(count_usersongRequest()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`https://lespornstash.com/songs`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response));
                // console.log(response['data'])
                console.log(user)
                const usersongList = Object.values(response['data'])
                    .filter(usersong => usersong.user.id === user);    
                console.log(usersongList)
                                
                dispatch(count_usersongSuccess(usersongList))
                // console.log(response.data.length)
                
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(count_usersongFailed("GET con usersong CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something wen wong"));
        }
    };
}

export function get_usersong_count(user) { // Fake authentication function
    return async dispatch => {
        dispatch(count_usersongRequest()); // dispatch a login request to update the state
        //console.log(id) 
        try {
    
            try {
                const response = await axios.get(`https://lespornstash.com/songs`);
                await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(response));
                // console.log(response['data'])
                // console.log(user)
                const usersongList = Object.values(response['data'])
                //    .filter(usersong => usersong.user.id === user);    
                console.log(usersongList)
                                
                dispatch(count_usersongSuccess(usersongList))
                // console.log(response.data.length)
                
              } catch (error) {// Otherwise display an error to the user
                setTimeout(() => { // Dispatch an error state
                    dispatch(count_usersongFailed("GET con usersong CHIE!!!"))
                }, 1500)
              }    

        } catch (err) { // When something goes wrong
            console.log(err)
            dispatch(loginFailed("Something wen wong"));
        }
    };
}

function count_usersongRequest() {
    return {
        type: types.COUNT_USER_SONGS_TOTAL_REQUEST
    };
} //loginRequest

function count_usersongSuccess(response) {
    return {
        type: types.COUNT_USER_SONGS_TOTAL_SUCCESS,
        data: {
            response
        }
    };
} // loginSuccess

function count_usersongFailed(error) {
    if (!error) {
        error = "Network Error";
    }
    return {
        type: types.COUNT_USER_SONGS_TOTAL_FAILED,
        data: {
            error: error
        }
    };
}