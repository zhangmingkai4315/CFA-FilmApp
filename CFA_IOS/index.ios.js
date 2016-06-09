/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './src/App';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';

class CFA_IOS extends Component {
  render() {
    return (
      <NavigatorIOS
        style={{flex:1}}
        initialRoute={{
          component:App,
          title:'本月排片',
          passProps:{},
        }}
      />
  );
  }
}
AppRegistry.registerComponent('CFA_IOS', () => CFA_IOS);
