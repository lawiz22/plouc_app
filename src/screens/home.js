import React, { Component } from "react";
import { View, Text, StatusBar, ScrollView, Image, Button, ImageBackground} from "react-native";
import { DefaultTheme, Button as ButPaper, Chip, Title, Headline, Avatar } from 'react-native-paper';



import CustomButton from "../components/button";
import CustomLoading from "../components/loading";
import DrawerHeader from '../components/header';
import BottomComponent from '../components/bottom';

import Styles, { COLOR } from "../config/styles";

import Icon from "react-native-vector-icons/FontAwesome";

import { bindActionCreators } from "redux";
import * as authActions from "../actions/authenticate";
// import * as postActions from "../actions/posts";
import { connect } from "react-redux";

class Home extends Component {
    // static navigationOptions = ({ navigation }) => ({
    //     title: "Home",
    //     headerTintColor: COLOR.LIGHT,
    //     headerStyle: {
    //         borderBottomWidth: 0,
    //         backgroundColor: COLOR.PANTOME
    //     }
    // }); // navigationOptions
    
    

    render() {
        const theme2 = {
            ...DefaultTheme,
            roundness: 3,
            colors: {
              ...DefaultTheme.colors,
              primary: 'tomato',
              accent: 'yellow',
              surface: 'green',
              backdrop: 'green',
              placeholder: 'green',
            }
          };
        return (
            
            <View style={[Styles.container, { padding: 0 }]}>
                    
                <ImageBackground source={require('../images/middlebackground.jpg')} style={{width: '100%', height: '100%'}}>
                {/* <View style={Styles.header}>
                    <DrawerHeader
                        headerTitle="Home"
                        icon="menu"
                        onPress={() => this.props.navigation.openDrawer()}
                    />
                </View> */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 10
                    }}
                >
                    
                    
                    
                        
                        
                        <Text>{' '}</Text>
                        <ButPaper icon="content-copy" mode="contained" compact="true" raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.POST } }}onPress={() => {
                        this.props.navigation.navigate("Post")
                            }}>
                            {`Posts ${this.props.state.authSession.data.first_name} `}
                        </ButPaper>
                        <Text>{' '}</Text>
                        <ButPaper icon="music-note" mode="contained" raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.ARTIST } }}onPress={() => {
                        this.props.navigation.navigate("Artist")
                            }}>
                            {`Artists ${this.props.state.authSession.data.first_name} `}
                        </ButPaper>
                        <Text>{' '}</Text>
                        <ButPaper icon="music-note" mode="contained" raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.ALBUM } }} onPress={() => {
                        this.props.navigation.navigate("Album")
                            }}>
                            {`Albums ${this.props.state.authSession.data.first_name} `}
                        </ButPaper>
                        
                    
                </View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 32,
                        left: 30,
                        right: 30,
                        height: 40
                    }}
                >   
                    <ButPaper icon="remove-circle-outline" mode="contained" raised theme={{ colors: {
                            ...DefaultTheme.colors,primary: COLOR.DANGER } }} onPress={() => {
                        this.props.actions.logout(this.props.navigation.navigate)
                    }}> Logout
                    </ButPaper>
                    
                </View>
                <CustomLoading text={"Signing you out..."} loading={this.props.state.clearingAuth} />
            </ImageBackground>    
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
        actions: bindActionCreators(authActions, dispatch)
    })
)(Home);
