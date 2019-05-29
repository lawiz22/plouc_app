import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image} from "react-native";
import { StyleSheet, imageHeight, imageWidth } from "react-native";
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
import * as albumActions from "../actions/albums";
import BeerPreviewCard from '.../components/BeerPreviewCard';

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
                .filter(album => album.user.id === Number(this.props.state.authSession.data.id));
            console.log(albumList)
            if (albumList.length !== 0) return (
                
                <View style={{
                    // flex: 3,
                    flexDirection: 'column',
                    width: 200,
                    // height: 200,
                    flexWrap: 'wrap',
                    justifyContent: "space-evenly",
                    alignItems: "flex-start",
                    marginTop: 10,
                    marginLeft: 5
                        }}>
                    
                        {this.renderAlbumList(albumList)}
                    
                </View>        
                
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
    