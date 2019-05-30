import React from 'react'

import {
    createSwitchNavigator,
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator
} from 'react-navigation';

import { COLOR } from './styles'

import Home from "../screens/home";
import Post from "../screens/post";
import Artist from "../screens/artist";
import Album from "../screens/album";
import Song from "../screens/song";
import PostAll from "../screens/post_all";
import ArtistAll from "../screens/artist_all";
import AlbumAll from "../screens/album_all";
import SongAll from "../screens/song_all";
import Login from "../screens/login";
import Splash from '../screens/splash'

import TabNavigator from './tabstack';


import DrawerComponent from "../components/drawer"
import BottomComponent from "../components/bottom"
import DrawerHeader from '../components/header';

import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// const BottomTab = createMaterialBottomTabNavigator({
//  Login: { screen: Login },
//  Home: { screen: Home },
//  Post: { screen: Post },
//}, {
//  initialRouteName: 'Home',
//  activeColor: '#F44336',
// });

const UnauthenticatedScreens = createStackNavigator(
    { // Screens
        Login: { screen: Login }
    }
);

const AuthenticatedInitialScreens = createStackNavigator(
    { // Screens
        Home: {
            screen: Home
        }
    }, { // Default options
        defaultNavigationOptions: ({ navigation }) => {
            return {
                  
                header:
                    <DrawerHeader // Default header component
                        headerTitle={navigation.state.routeName}
                        headerColor= {COLOR.HOME}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />,
                  
            };
        }
    }
);

const ShowPost = createStackNavigator(
    { // Screens
        Post: {
            screen: Post
        }
    }, { // Default options
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.POST}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const ShowPostAll = createStackNavigator(
    { // Screens
        PostAll: {
            screen: PostAll
        }
    }, { // Default options
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.POST}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const ShowArtistAll = createStackNavigator(
    { // Screens
        ArtistAll: {
            screen: ArtistAll
        }
    }, { // Default options
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.ARTIST}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
                    
            };
        }
    }
);

const ShowArtist = createStackNavigator(
    { // Screens
        Artist: {
            screen: Artist
        }
    }, { // Default options
        
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.ARTIST}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const ShowAlbum = createStackNavigator(
    { // Screens
        Album: {
            screen: Album
        }
    }, { // Default options
        
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.ALBUM}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const ShowAlbumAll = createStackNavigator(
    { // Screens
        AlbumAll: {
            screen: AlbumAll
        }
    }, { // Default options
        
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.ALBUM}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const ShowSong = createStackNavigator(
    { // Screens
        Song: {
            screen: Song
        }
    }, { // Default options
        
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.SONG}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const ShowSongAll = createStackNavigator(
    { // Screens
        SongAll: {
            screen: SongAll
        }
    }, { // Default options
        
        defaultNavigationOptions: ({ navigation }) => {
            return {
                header:
                    <DrawerHeader // Default header component
                        headerColor= {COLOR.SONG}
                        headerTitle={navigation.state.routeName}
                        icon="menu"
                        onPress={() => navigation.openDrawer()}
                    />
            };
        }
    }
);

const AppDrawerNavigator = createDrawerNavigator(
    { // Screens
        Home: AuthenticatedInitialScreens,
        PostAll: ShowPostAll,
        ArtistAll: ShowArtistAll,
        AlbumAll: ShowAlbumAll,
        SongAll: ShowSongAll,
        Post: ShowPost,
        Artist: ShowArtist,
        Album: ShowAlbum,
        Song: ShowSong,
        TabNavigator: { screen: TabNavigator },
    }, { // Default options
        initialRouteName: 'Home',
        contentComponent: DrawerComponent,// Default drawer component
        contentOptions: {
            activeTintColor: COLOR.PANTOME
        }
    }

);



const AppSwitchNavigator = createSwitchNavigator(
    { // Screens
        Splash: { screen: Splash },
        UnauthenticatedScreens: { screen: UnauthenticatedScreens },
        AuthenticatedInitialScreens: { screen: AppDrawerNavigator },
        

    }, { // Default options
        initialRouteName: 'Splash'
    }
);



const HomeStack = createStackNavigator({
    AppDrawerNavigator,
    TabNavigator,
  });

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer