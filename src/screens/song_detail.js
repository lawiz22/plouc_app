import React from 'react';
import {
  Player,
  Recorder,
  MediaStates
} from 'react-native-audio-toolkit';

import { View, Text, Button, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { DefaultTheme, IconButton as ButPaper, Appbar} from 'react-native-paper';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import Styles, { COLOR } from '../config/styles'

import Header from '../components/player/Header';
import AlbumArt from '../components/player/AlbumArt';
import TrackDetails from '../components/player/TrackDetails';
import SeekBar from '../components/player/SeekBar';
import Controls from '../components/player/Controls';

import Home from "../screens/home";
import PostAll from "../screens/post_all";
import ArtistAll from "../screens/artist_all";
import AlbumAll from "../screens/album_all";
import SongAll from "../screens/song_all";


filename =""



class SongDetail extends React.Component  {
    constructor() {
        super();
        this.state = {
          disabled: false,
          paused: true,
          totalLength: 1,
          currentPosition: 0,
          selectedTrack: 0,
          repeatOn: false,
          shuffleOn: false,
          playPauseButton: 'Preparing...',
          recordButton: 'Preparing...',

          stopButtonDisabled: true,
          playButtonDisabled: true,
          recordButtonDisabled: true,

          loopButtonStatus: false,
          progress: 0,

          error: null,
          recorder: Recorder | null,
          lastSeek: 0,
          _progressInterval: 0,
          player: Player | null,
        };
        // this.p = new Player("https://lespornstash.com/media/Bombe_au_clock.mp3");
        
    }

    componentWillMount() {
      const { navigation } = this.props;
      filename = navigation.getParam('trackUrl', "https://lespornstash.com/media/Bombe_au_clock.mp3");
      comeFrom = navigation.getParam('otherParam', "all");
      this.player = null;
      this.recorder = null;
      this.lastSeek = 0;
      this.totalLength = 1;
      
      this._reloadPlayer();
      this._reloadRecorder();
      
      console.log(this.state.totalLength);
      console.log(this.player)
      console.log(this.state.currentTime)
      this._progressInterval = setInterval(() => {
        if (this.player && this._shouldUpdateProgressBar()) {
          // this.setState({ progress: Math.max(0, this.player.currentTime) / this.player.duration });

          this.setState({ currentPosition: Math.floor(this.player.currentTime)} )
        }
      }, 100);
    }

    componentDidMount() {
      
    }

    componentWillUnmount() {
      clearInterval(this._progressInterval);
    }

    _shouldUpdateProgressBar() {
      // Debounce progress bar update by 200 ms
      return Date.now() - this.lastSeek > 200;
    }


     setDuration(data) {
      // console.log(this.state.totalLength);
      this.setState({ totalLength: Math.floor(data.duration) });
      
      // console.log(data.duration);
      // console.log(this.state.totalLength);
      
    }

    setTime(data) {
      //console.log(data);
      this.setState({currentPosition: Math.floor(data.currentTime)});
    }

    seek(time) {
      new_time = time ;
      time = Math.floor(time);

      this.player.seek(time, () => {
          this.setState({
          currentPosition: time,
          paused: this.player && this.player.isPlaying ? false : true,
        });
      });
      this.setState({
        currentPosition: time,
        paused: true,
      });
    }


    _updateState(err) {
      this.setState({
        playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
        recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
  
        stopButtonDisabled: !this.player || !this.player.canStop,
        playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
        recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
      });
    }

    _playPause() {
      this.player.playPause((err, paused) => {
        if (err) {
          this.setState({
            error: err.message
          });
        }
        //this._updateState();
        //console.log(this.player.currentTime)
        //console.log(this.player.duration);
        //console.log(this.state.progress);
        
      });
    }
  
    _stop() {
      this.player.stop(() => {
        // this._updateState();
      });
    }
  
    
  
    _reloadPlayer() {
      if (this.player) {
        this.player.destroy();

      }
  
      this.player = new Player(filename, {
        autoDestroy: false
      }).prepare((err) => {
        if (err) {
          console.log('error at _reloadPlayer():');
          console.log(err);
        } else {
          this.player.looping = this.state.loopButtonStatus;
        }
        this.setDuration(this.player);
        //this._updateState();
      });
      
      // this.setState({ totalLength: Math.floor(this.player.duration / 1000) });
      //this._updateState();
  
      this.player.on('ended', () => {
        //this._updateState();
      });
      this.player.on('pause', () => {
        //this._updateState();
      });
    }
  
    _reloadRecorder() {
      if (this.recorder) {
        this.recorder.destroy();
      }
  
      this.recorder = new Recorder(filename, {
        bitrate: 256000,
        channels: 2,
        sampleRate: 44100,
        quality: 'max'
      });
  
      //this._updateState();
    }
  
    _toggleRecord() {
      if (this.player) {
        this.player.destroy();
      }
  
      let recordAudioRequest;
      if (Platform.OS == 'android') {
        recordAudioRequest = this._requestRecordAudioPermission();
      } else {
        recordAudioRequest = new Promise(function (resolve, reject) { resolve(true); });
      }
  
      recordAudioRequest.then((hasPermission) => {
        if (!hasPermission) {
          this.setState({
            error: 'Record Audio Permission was denied'
          });
          return;
        }
  
        this.recorder.toggleRecord((err, stopped) => {
          if (err) {
            this.setState({
              error: err.message
            });
          }
          if (stopped) {
            this._reloadPlayer();
            this._reloadRecorder();
          }
  
          //this._updateState();
        });
      });
    }
  
    async _requestRecordAudioPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  
    _toggleLooping(value) {
      this.setState({
        loopButtonStatus: value
      });
      if (this.player) {
        this.player.looping = value;
      }
    }




    render() {

       
      /* 2. Get the param, provide a fallback value if not available */
      const { navigation } = this.props;
      // navigationOptions = ({ navigation }) => { return { itemId: navigation.getParam("itemId", "Default title"), }; };
      const itemId = navigation.getParam('itemId', 'DA MARDE!!');
      const itemArtist = navigation.getParam('itemArtist', 'Lawiz');
      const comeFrom = navigation.getParam('otherParam', "all");
      const trackUrl = navigation.getParam('trackUrl', "https://lespornstash.com/media/Bombe_au_clock.mp3");
      const filename = navigation.getParam('trackUrl', "https://lespornstash.com/media/Bombe_au_clock.mp3");
      const imageUrl = navigation.getParam('imageUrl', 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061132_960_720.png');
      console.log(itemId)
      let user = ("SongAll");
      const backAction = NavigationActions.back();
      
      
      return (
        <View style={[Styles.container, { padding: 0 }]}>
        <Appbar.Header theme={{ colors: {
                                ...DefaultTheme.colors,primary: COLOR.SONG } }}>
                        <Appbar.BackAction
                        
                        onPress={() => this.props.navigation.dispatch(backAction)}
                        />
                        <Appbar.Content
                        title="Songs ALL"
                        subtitle="Songs all for one one for all songs"
                        />
                        <Appbar.Action icon="search" />
                        <Appbar.Action icon="more-vert"  />
            </Appbar.Header>
        <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center',  backgroundColor: 'rgb(4,4,4)' }}>
          
           <AlbumArt url={ imageUrl }  onPress={() => this._playPause(trackUrl)} />
           <TrackDetails title={ itemId } artist={ itemArtist } />
           <SeekBar
                  onSeek={this.seek.bind(this)} 
                  trackLength={ this.state.totalLength } 
                  onSlidingStart={() => this.setState({paused: true})}
                  currentPosition={ this.state.currentPosition }
                  
                  />
           <Controls  
                   onPressPlay={() => {this.setState({paused: false}),this._playPause()}}
                   onPressPause={() =>{this.setState({paused: true}),this._playPause()}}
                   paused={this.state.paused}  
                   />
                  
           
        </View>
        </View>
      );
    }
  }
  var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
  export default createStackNavigator({ SongDetail }, { headerMode: "none" });