import React, { Component } from 'react';
import {
  PixelRatio,
  ActivityIndicatorIOS,
  StyleSheet,
  ScrollView
} from 'react-native';


export default class Loading extends Component{
  render(){
    return (
      <ScrollView style={styles.container}>
        <ActivityIndicatorIOS
                size="large"
                style={styles.loading}
        />
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  loading:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:200
  },
  container:{
    flex:1
  }
})
