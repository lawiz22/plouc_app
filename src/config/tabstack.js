import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { COLOR } from './styles'

import Home from "../screens/home";
import PostAll from "../screens/post_all";
import ArtistAll from "../screens/artist_all";
import AlbumAll from "../screens/album_all";



const TabNavigator = createMaterialBottomTabNavigator(  
    {  
        Posts: { screen: PostAll,  
            navigationOptions:{  
                tabBarLabel:'Posts',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'content-copy'}/>  
                    </View>),  
            }  
        },  
        Artists: { screen: ArtistAll,  
            navigationOptions:{  
                tabBarLabel:'Artists',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'music-note'}/>  
                    </View>),  
                activeColor: '#f0edf6',  
                inactiveColor: '#1c3b72',  
                barStyle: { backgroundColor: '#3062ba' },  
            }  
        },  
        Albums: { screen: AlbumAll,  
            navigationOptions:{  
                tabBarLabel:'Albums',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'library-music'}/>  
                    </View>),  
                activeColor: '#141414',  
                inactiveColor: '#dd7b35',  
                barStyle: { backgroundColor: '#e09523' },  
            }  
        },  
        
    },  
    {  
      initialRouteName: "Posts",  
      activeColor: '#f0edf6',  
      inactiveColor: '#587017',  
      barStyle: { backgroundColor: COLOR.POST },  
    },  
);

export default createStackNavigator({ TabNavigator }, { headerMode: "none" });