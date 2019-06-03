import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, Button, FlatList} from "react-native";
import { DefaultTheme, Button as ButPaper, Appbar, Title, Headline, Avatar } from 'react-native-paper';
import { ListItem } from 'react-native-elements'


import CustomButton from "../components/button";
import CustomLoading from "../components/loading";
import DrawerHeader from '../components/header'

import PropTypes from 'prop-types';
import Styles, { COLOR } from "../config/styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";
import * as artistActions from "../actions/artists";
import ArtistPreviewCard from '../components/artist/ArtistPreviewCard';

import { connect } from "react-redux";


class ArtistAll extends Component {
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
        // const post = this.props.posts.get_user_post();
         // console.log(this.props.state.authSession.data.id);
         // this.props.state.isAuth
         this.props.artists.get_artist_list()
         
         //   : 
        setTimeout(() => {
            
        }, 2000);
    }

    

    renderArtistList(artistList) {
        return artistList
            .map(artist =>
                <ListItem
                    key={artist.id}
                    leftAvatar={{ source: { uri: `https://lespornstash.com${artist.artist_image}` } }}
                    title={artist.artist}
                />
            );
    }

    renderArtistSection() {
        console.log(this.props.userartists)
            if (this.props.userartists !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const artistList = Object.values(this.props.userartists)
            console.log(artistList)
            if (artistList.length !== 0) return (
                <FlatList
                contentContainerStyle={{
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                width: '100%'
                }}
                numColumns={2}
                data={artistList}
                renderItem={({ item }) => (
                <View
                    style={{
                    marginTop: 25,
                    width: '50%'
                    }}
                >
                    <ArtistPreviewCard name={item.artist} imageUrl={ `https://lespornstash.com${item.artist_image}`  } />
                </View>
                )}
                keyExtractor={item => item.id.toString()}
                // ListHeaderComponent={this._renderHeader}
                //ListFooterComponent={this._renderFooter}
                // onRefresh={this._handleRefresh}
                // refreshing={this.state.refreshing}
                // onEndReached={this._handleLoadMore}
                // onEndReachedThreshold={0.5}
                // initialNumToRender={10}
            />
               );
            } 
        
        // if (postList.length === 0) return null;
        return null;
    }

    render() {
        return (
            <View style={[Styles.container, { padding: 0 }]}>
                <Appbar.Header theme={{ colors: {
                                ...DefaultTheme.colors,primary: COLOR.ARTIST } }}>
                        <Appbar.BackAction
                        
                        onPress={() => this.props.navigation.navigate("Home")}
                        />
                        <Appbar.Content
                        title="Artist ALL"
                        subtitle="Ont est tous des artist quand ont est hop!!"
                        />
                        <Appbar.Action icon="search" />
                        <Appbar.Action icon="more-vert"  />
                </Appbar.Header>
                    <ScrollView style={[Styles.container, { padding: 0 }]}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                height: 4,
                                justifyContent: "center",
                                alignItems: "stretch",
                                // marginTop: 10
                            }}
                        >
                        </View>
                        {this.renderArtistSection()}
                    </ScrollView>
            </View>
        );
    }
}


export default connect(
    state => ({ state: state.authenticate,
                userposts_status : state.list_post,
                userposts : state.list_post.postList,
                userartists : state.list_artist.artistList
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                artists: bindActionCreators(artistActions, dispatch),
                posts: bindActionCreators(postActions, dispatch)
                })
)(ArtistAll);
    