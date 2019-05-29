import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

import Home from "../screens/home";
import Post from "../screens/post";
import Artist from "../screens/artist";

// const HomeRoute = () => <Text>Home</Text>;

// const PostRoute = () => <Text>Posts</Text>;

// const ArtistRoute = () => <Text>Artists</Text>;

export default class BottomComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'login', title: 'Login', icon: 'queue-music' },
      { key: 'home', title: 'Home', icon: 'album' },
      { key: 'post', title: 'Post', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    Home: { screen: Home },
    Posts: { screen: Post },
    Artists: { screen: Artist },
  });

  render() {
    return (
      <BottomNavigation
        
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}