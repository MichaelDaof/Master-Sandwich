import React, { Component, StyleSheet, DeviceEventEmitter } from 'react';
import { View, Text, AsyncStorage, Image } from 'react-native';
var RNUploader = require('NativeModules').RNUploader;

class UserProfile extends Component {
  state = {file: require('../../resources/placeholder.png')};

  render(){
    return (
      <View>
        <Image style={styles.imageStyle} source={this.state.file} />
      </View>
    );
  }
};

const styles = {
  imageContainer: {
    height: 250,
    width: 250
  },
  imageStyle: {
    height: 250,
    width: 250,
    borderRadius: 125
  }
}

export default UserProfile;