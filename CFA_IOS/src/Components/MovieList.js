
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  ActivityIndicatorIOS,
} from 'react-native';
import MovieItem from './MovieItem';

export default class MovieList  extends Component {
  constructor(props){
    super(props);
    this._renderMovie=this._renderMovie.bind(this);
  }
  _renderMovie(row){
    return <MovieItem row={row} {...this.props}/>
  }
  render(){
      return (
        <ScrollView style={styles.flex}>
          <ListView dataSource={this.props.dataSource} renderRow={this._renderMovie}/>
        </ScrollView>
      )
  }
}

const styles=StyleSheet.create({
  flex:{
    flex:1
  }
})
