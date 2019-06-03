import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, Button, Body, Title} from "react-native";

import { DefaultTheme, Button as ButPaper, IconButton, Appbar } from "react-native-paper"

import { ListItem, Badge, Icon } from 'react-native-elements'


import CustomButton from "../components/button";
import CustomLoading from "../components/loading_2";
import DrawerHeader from '../components/header'

import PropTypes from 'prop-types';
import Styles, { COLOR } from "../config/styles";

// import Icon from "react-native-vector-icons/FontAwesome5";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as songActions from "../actions/songs";
import { connect } from "react-redux";



class SongAll extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: "Home",
    //     headerTintColor: COLOR.LIGHT,
    //     headerStyle: {
    //         borderBottomWidth: 0,
    //         backgroundColor: COLOR.PANTOME
    //     }
    // }); // navigationOptions
    constructor() {
        super();
        this.state = {
          random: false,
         
        };
        // this.p = new Player("https://lespornstash.com/media/Bombe_au_clock.mp3");
        
    }
    componentDidMount() {
        // console.log(this.props.state.authSession.data.id)
        // const song = this.props.songs.get_user_song();
         // console.log(this.props.state.authSession.data.id);
         // this.props.state.isAuth
         
         // this.props.songs.reset_song_list(this.page.limit,this.page.offset)
         //   : 
         
         this.props.songs.get_song_list()
         this.props.songs.reset_song_list(this.page.limit,this.page.offset)

    }
    componentWillMount() {
        
         
    }



    handlePlusdeSong = () => {
        this.page.limit  = this.page.limit + this.page.increase
        this.props.songs.reset_song_list(this.page.limit,this.page.offset)
    }
    
    resetSonglist = () => {
        
        this.page.limit = 7
        this.page.offset = 0
        this.props.songs.reset_song_list(this.page.limit,this.page.offset)
    }

    shuffle = (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let rnd = Math.floor(Math.random() * i);
    
            let temp = arr[i];
            arr[i] = arr[rnd];
            arr[rnd] = temp;
        }
        return arr;
    }

    renderSongList(songList) {
        if (this.state.random)
            songList = this.shuffle(songList)
                    
        return songList.slice(0,this.props.usersongs_status.songLimit)
            .map(song =>
                <ListItem
                    key={song.id}
                    leftAvatar={{ source: { uri: `https://lespornstash.com${song.song_image}` } }}
                    title={song.song_title}
                    onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                this.props.navigation.navigate('SongDetail', {
                                itemId: song.song_title,
                                imageUrl: `https://lespornstash.com${song.song_image}`,
                                trackUrl: `https://lespornstash.com${song.audio_file}`,
                                otherParam: 'anything you want here',
                                });
                            }}
                    // subtitle={song.user.album}
                />
            );
    }

    renderSongSection() {
        
            if (this.props.usersongs !== null) {
            // const songs = JSON.stringify( this.props.usersongs );
            const songList = Object.values(this.props.usersongs)
               
            // console.log(songList)
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
            increase:7,
            
            
          };
    render() {
        
        
        return (
            
            <View style={[Styles.container, { padding: 0 }]}>
            <Appbar.Header theme={{ colors: {
                                ...DefaultTheme.colors,primary: COLOR.SONG } }}>
                        <Appbar.BackAction
                        
                        onPress={() => this.props.navigation.navigate("Home")}
                        />
                        <Appbar.Content
                        title="Songs ALL"
                        subtitle="Songs all for one one for all songs"
                        />
                        <Appbar.Action icon="search" />
                        <Appbar.Action icon="more-vert"  />
            </Appbar.Header>
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
                            
                            marginTop: 12
                        }}
                    >
                        {`Songs!`}
                                                         
                    </Text>

                    <Icon
                        raised
                        name="sync"
                        type = "material"
                        color={COLOR.SONG}
                        underlayColor="#a02e2e"
                        // containerStyle={{ position: 'absolute', top: 28, left: 55  }}
                        size={30}
                        onPress={() =>{ this.resetSonglist()}}
                    />
                    <Icon
                        raised
                        reverse = { this.state.random }
                        name="dice-multiple"
                        type = "material-community"
                        color={COLOR.SONG}
                        underlayColor="#a02e2e"
                        containerStyle={{ position: 'absolute', top: 39, left: 65  }}
                        size={30}
                        onPress={() =>{ this.setState({
                                        random: !this.state.random
                                    }) ,console.log(this.state.random) }}
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
                    <Badge value={this.props.usersongs_status.songLimit} status="success" containerStyle={{ position: 'absolute', top: +110, right: -4 }}/>
                    <Badge value={this.props.usersongs_status.songTotal} status="error" containerStyle={{ position: 'absolute', top: -8, left: -4 }}/>
                    <ScrollView style={[Styles.container, { padding: 0 }]}>
                        {this.renderSongSection()}
                    </ScrollView>
                    <CustomLoading loading={this.props.usersongs_status.requestingSong} text ="Loading Songs" />
                </View>
               
            </View>
        );
    }
}


export default connect(
    state => ({ state: state.authenticate,
                usersongs_status : state.list_song,
                usersongs : state.list_song.songList
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                songs: bindActionCreators(songActions, dispatch)
                })
)(SongAll);
    