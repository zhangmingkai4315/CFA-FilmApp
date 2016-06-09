
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
} from 'react-native';
import util from '../common';

export default class MovieDetail  extends Component {
  constructor(props){
    super(props);
  }
  render(){
      console.log({width:util.size.width,height:util.size.height})
      return (
        <ScrollView >
          <WebView bounces={false} source={{url:this.props.url}}
            style={{width:util.size.width,height:util.size.height}}></WebView>
        </ScrollView>
      )
  }
}
