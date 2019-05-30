import React from 'react';

import { View, Text, Button, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { COLOR } from '../config/styles'

import Home from "../screens/home";
import PostAll from "../screens/post_all";
import ArtistAll from "../screens/artist_all";
import AlbumAll from "../screens/album_all";
import SongAll from "../screens/song_all";


class SongDetail extends React.Component {
    render() {
      /* 2. Get the param, provide a fallback value if not available */
      const { navigation } = this.props;
      // navigationOptions = ({ navigation }) => { return { itemId: navigation.getParam("itemId", "Default title"), }; };
      const itemId = navigation.getParam('itemId', 'DA MARDE!!');
      const imageUrl = navigation.getParam('imageUrl', 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png');
      console.log(itemId)
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Image
              source={{ uri: imageUrl }}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          <Text>Details Screen</Text>
          <Text>itemId: {JSON.stringify(itemId)}</Text>
          
          <Button
            title="Go to Details... again"
            onPress={() =>
              this.props.navigation.push('SongDetail', {
                itemId: Math.floor(Math.random() * 100),
              })}
          />
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('SongAll')}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      );
    }
  }

  export default createStackNavigator({ SongDetail }, { headerMode: "none" });