import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, FlatList} from "react-native";
import { Card, ListItem, Button } from 'react-native-elements'
import { DefaultTheme, Button as ButPaper, Appbar, Title, Headline, Avatar } from 'react-native-paper';



import CustomButton from "../components/button";
import CustomLoading from "../components/loading";
import DrawerHeader from '../components/header'

import PropTypes from 'prop-types';
import Styles, { COLOR } from "../config/styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
import * as postActions from "../actions/posts";
import * as albumActions from "../actions/albums";
import BeerPreviewCard from '../components/beer/BeerPreviewCard';

import { connect } from "react-redux";


class AlbumAll extends Component {
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
         this.props.albums.get_album_list()
         
         //   : 
        setTimeout(() => {
            
        }, 2000);
    }

    

    renderAlbumList(albumList) {
        return albumList
            .map(album =>
                
                    <Card
                        key={album.id}
                        title={album.album_title}
                        
                    // image={{ source:  {uri: `https://lespornstash.com${album.album_image}` } }}
                        image={{ uri: `https://lespornstash.com${album.album_logo}` } }
                    >
                    <Text style={{marginBottom: 8}}>Artist: {album.artist}</Text>
                    </Card>
               
            );
    }

    renderAlbumSection() {
        console.log(this.props.useralbums)
            if (this.props.useralbums !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const albumList = Object.values(this.props.useralbums)
            console.log(albumList)
            if (albumList.length !== 0) return (
                <FlatList
                        contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%'
                        }}
                        numColumns={2}
                        data={albumList}
                        renderItem={({ item }) => (
                        <View
                            style={{
                            marginTop: 25,
                            width: '50%'
                            }}
                        >
                            <BeerPreviewCard name={item.album_title} imageUrl={ `https://lespornstash.com${item.album_logo}`  } artistes={item.artist} />
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
                                ...DefaultTheme.colors,primary: COLOR.ALBUM } }}>
                        <Appbar.BackAction
                        
                        onPress={() => this.props.navigation.navigate("Home")}
                        />
                        <Appbar.Content
                        title="Albums ALL"
                        subtitle="Album it all ! Album it al!! Album it now!!"
                        />
                        <Appbar.Action icon="search" />
                        <Appbar.Action icon="more-vert"  />
                </Appbar.Header>
                    <ScrollView style={[Styles.container, { padding: 0 }]}>
                                            
                        
                                <View
                                    style={{
                                            flex: 2,
                                            flexDirection: 'row',
                                            // height: 4,
                                            //justifyContent: "flex-start",
                                            //alignItems: "stretch",
                                            // marginTop: 10,
                                            // marginLeft: 5
                                                }}
                                >
                                    <View style={[Styles.container, { padding: 0 }]}>
                                        {this.renderAlbumSection()}
                                    </View>
                                </View>
                                
                        
                    
                    </ScrollView>
            </View>
        );
    }
}


export default connect(
    state => ({ state: state.authenticate,
                userposts_status : state.list_post,
                userposts : state.list_post.postList,
                useralbums : state.list_album.albumList
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                albums: bindActionCreators(albumActions, dispatch),
                posts: bindActionCreators(postActions, dispatch)
                })
)(AlbumAll);
    