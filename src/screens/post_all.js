import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, Button} from "react-native";
import { ListItem } from 'react-native-elements'
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
import { connect } from "react-redux";


class PostAll extends Component {
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
         this.props.posts.get_user_post()
         
         //   : 
        setTimeout(() => {
            
        }, 2000);
    }

    

    renderPostList(postList) {
        return postList
            .map(post =>
                <ListItem
                    key={post.id}
                    leftAvatar={{ source: { uri: `https://lespornstash.com${post.image}` } }}
                    title={post.title}
                    subtitle={post.user.first_name}
                />
            );
    }

    renderPostSection() {
        
            if (this.props.userposts !== null) {
            // const posts = JSON.stringify( this.props.userposts );
            const postList = Object.values(this.props.userposts)
            console.log(postList)
            if (postList.length !== 0) return (
                <View>
                    {this.renderPostList(postList)}    
                </View>
               );
            } 
        
        // if (postList.length === 0) return null;
        return null;
    }

    render() {
        return (
            <View style={[Styles.container, { padding: 0 }]}>
            <Appbar.Header theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.POST } }}>
                    <Appbar.BackAction
                    
                    onPress={() => this.props.navigation.navigate("Home")}
                    />
                    <Appbar.Content
                    title="Posts ALL"
                    subtitle="Wait a minute Mr. postman..."
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
                {this.renderPostSection()}
            </ScrollView>
            </View>
        );
    }
}


export default connect(
    state => ({ state: state.authenticate,
                userposts_status : state.list_post,
                userposts : state.list_post.postList
             }),
    dispatch => ({
                actions: bindActionCreators(authActions, dispatch),
                posts: bindActionCreators(postActions, dispatch)
                })
)(PostAll);
    