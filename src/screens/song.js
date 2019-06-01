import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, Button, Body, Title} from "react-native";
import { Button as ButPaper, IconButton } from "react-native-paper"
import { DefaultTheme, ListItem, Badge } from 'react-native-elements'


import CustomButton from "../components/button";
import CustomLoading from "../components/loading";
import DrawerHeader from '../components/header'

import PropTypes from 'prop-types';
import Styles, { COLOR } from "../config/styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as usersongActions from "../actions/songs_user";
import { connect } from "react-redux";
import Home from "../screens/home";


class Song extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: "Home",
    //     headerTintColor: COLOR.LIGHT,
    //     headerStyle: {
    //         borderBottomWidth: 0,
    //         backgroundColor: COLOR.PANTOME
    //     }
    // }); // navigationOptions
    
    componentDidMount() {
        // console.log(this.props.state.authSession.data.id)
        // const song = this.props.songs.get_user_song();
         // console.log(this.props.state.authSession.data.id);
         // this.props.state.isAuth
         this.props.songs.get_user_song_count(this.props.state.authSession.data.id)
         this.props.songs.reset_usersong_list(this.page.limit,this.page.offset)
         this.props.songs.get_usersong_list()
         
         //   : 
        setTimeout(() => {
            
        }, 2000);
    }

    handlePlusdeSong = () => {
        this.page.limit  = this.page.limit + this.page.increase
        this.props.songs.reset_usersong_list(this.page.limit,this.page.offset)
        
    }

    resetSonglist = () => {
        
        this.page.limit = 7
        this.page.offset = 0
        this.props.songs.reset_usersong_list(this.page.limit,this.page.offset)
        
    }

    renderSongList(songList) {
        return songList.slice(0,this.props.usersongs_status.usersongLimit)
            .map(song =>
                <ListItem
                    key={song.id}
                    leftAvatar={{ source: { uri: `https://lespornstash.com${song.song_image}` } }}
                    title={song.song_title}
                    // subtitle={song.user.album}
                />
            );
    }

    renderSongSection() {
        
            if (this.props.usersongs !== null) {
            // const songs = JSON.stringify( this.props.usersongs );
            const songList = Object.values(this.props.usersongs)
                .filter(song => song.user.id === Number(this.props.state.authSession.data.id));
            console.log(songList)
            if (songList.length !== 0) return (
                <View>
                    {this.renderSongList(songList)}
                </View>
               );
            } 
        
        // if (songList.length === 0) return null;
        return null;
    }
    page = {
            limit: 7,
            offset: 0,
            increase:7
            
          };
    render() {
        
        return (
            
            <View style={[Styles.container, { padding: 0 }]}>
                <View
                    style={{
                            flex: 1,
                            flexDirection: 'column',
                            // height: 50,
                            // justifyContent: "flex-end",
                            // alignItems: "flex-end",
                            marginTop: 10
                                }}
                >
                    <Text
                        style={{
                            color: COLOR.PANTOME,
                            margin: 8,
                            fontSize: 15,
                           // marginTop: 8
                        }}
                    >
                        {`Songs de ${this.props.state.authSession.data.first_name} ${this.props.state.authSession.data.last_name||
                            "Guest"} !`}
                                                         
                    </Text>

                    <IconButton
                        icon="sync"
                        color={COLOR.SONG}
                       
                        size={30}
                        onPress={() =>{ this.resetSonglist()}}
                    />
                    
                    
                    <View
                    style={{
                            // flex: 1,
                            flexDirection: 'row',
                            width: 150,
                            justifyContent: "flex-start",
                            // alignItems: "stretch",
                            marginTop: 10
                                }}
                    >   
                        <ButPaper icon="music-note" mode="contained" raised theme={{ colors: { primary: COLOR.SONG } }} onPress={() => {
                            this.handlePlusdeSong()
                        }}> mores songs
                        </ButPaper>
                    </View>
                    <Badge value={this.props.usersongs_status.usersongLimit} status="success" containerStyle={{ position: 'absolute', top: +110, right: -4 }}/>
                    <Badge value={this.props.usersongs_status.usersongTotal} status="error" containerStyle={{ position: 'absolute', top: -8, left: -4 }}/>
                    <ScrollView style={[Styles.container, { padding: 0 }]}>
                        {this.renderSongSection()}
                    </ScrollView>
                    
                </View>
               
            </View>
        );
    }
}


export default connect(
    state => ({ state: state.authenticate,
                usersongs_status : state.list_user_song,
                usersongs : state.list_user_song.usersongList
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                songs: bindActionCreators(usersongActions, dispatch)
                })
)(Song);
    