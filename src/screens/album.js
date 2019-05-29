import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image} from "react-native";
import { StyleSheet, imageHeight, imageWidth, FlatList } from "react-native";
import { Card, ListItem, Button, Badge } from 'react-native-elements'



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


class Album extends Component {
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
                
                    
                    null
               
            );
    }

    renderAlbumSection() {
        console.log(this.props.useralbums)
            if (this.props.useralbums !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const albumList = Object.values(this.props.useralbums)
                .filter(album => album.user.id === Number(this.props.state.authSession.data.id));
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
                            <BeerPreviewCard name={item.album_title} imageUrl={ `https://lespornstash.com${item.album_logo}`} artistes={item.artist} />
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
                    <Text
                        style={{
                            color: COLOR.PANTOME,
                            margin: 8,
                            fontSize: 15,
                            marginTop: 8
                        }}
                    >
                        {`Albums de ${this.props.state.authSession.data.first_name} ${this.props.state.authSession.data.last_name||
                            "Guest"} !`}                             
                    </Text>
                   
                    
                         <ScrollView contentContainerStyle={styles.container}>
                            
                                
                                   {this.renderAlbumSection()} 
                              
                                
                               
                        </ScrollView>
                       
                    
                
                      
               
            </View>  
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      //flex: 1,
      flexWrap: 'wrap',
      justifyContent: "space-evenly",
    },
    child: {
      height: imageHeight+5,
      marginTop: 1
    },
    image: {
      width: imageWidth,
      height: imageHeight
    }
  });

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
)(Album);
    