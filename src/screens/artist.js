import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, FlatList} from "react-native";
import { Card, ListItem, Button } from 'react-native-elements'



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


class Artist extends Component {
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
                <Card
                    key={artist.id}
                    title={artist.artist}
                   // image={{ source:  {uri: `https://lespornstash.com${artist.artist_image}` } }}
                    image={{ uri: `https://lespornstash.com${artist.artist_image}` } }
                   >
                    
                    
                </Card>
            );
    }

    renderArtistSection() {
        console.log(this.props.userartists)
            if (this.props.userartists !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const artistList = Object.values(this.props.userartists)
                .filter(artist => artist.user.id === Number(this.props.state.authSession.data.id));
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
                    <Image
                        source={{ uri: `https://lespornstash.com${this.props.state.authSession.data.profile.image}` }}
                        style={{
                            marginTop: 10,
                            height: 60,
                            width: 60,
                            borderRadius: 80
                        }} />
                    <Text
                        style={{
                            color: COLOR.PANTOME,
                            margin: 8,
                            fontSize: 15,
                            marginTop: 8
                        }}
                    >
                        {`Artists de ${this.props.state.authSession.data.first_name} ${this.props.state.authSession.data.last_name||
                            "Guest"} !`}                             
                    </Text>
                <View
                    style={{
                            flex: 1,
                            flexDirection: 'column',
                            // height: 270,
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            marginTop: 10,
                            marginLeft: 5
                                }}
                >
                    
                    
                    
                    <ScrollView style={[Styles.container, { padding: 0 }]}>
                        {this.renderArtistSection()}
                    </ScrollView>
                </View>
               
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
)(Artist);
    