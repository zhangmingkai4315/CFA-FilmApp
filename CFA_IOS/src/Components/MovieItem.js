
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';
import util from '../common';
import MovieDetail from './MovieDetail';


export default class MovieItem  extends Component {
  constructor(props){
    super(props);
    this.DetailView=this.DetailView.bind(this);
  }
  DetailView(){
    this.props.navigator.push({
      component:MovieDetail,
      title:this.props.row.title,
      passProps:{
        url:this.props.row.douban_url
      }
    })
  }
  render(){
      const row=this.props.row;
      return (
        <TouchableOpacity style={[styles.row,styles.item]} onPress={this.DetailView}>
          <View style={[styles.center]}>
            <Image source={{uri:row.image}} style={styles.movie_img}/>
          </View>
          <View style={styles.content}>
          <View>
            <Text style={{width:200}} numberOfLines={1}>{row.movie_name}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={[styles.movie_play_time,{width:200}]} numberOfLines={1}>{row.movie_play_time}</Text>
          </View>
          <View style={{marginTop:10}}>
            <Text style={[styles.movie_play_location,{width:200}]} numberOfLines={1}>{row.movie_play_location}</Text>
          </View>
          </View>
        </TouchableOpacity>
      )
  }
}

const styles=StyleSheet.create({
  row:{
    flexDirection:'row'
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  item:{
    height:120,
    borderBottomWidth:util.pixel,
    borderTopWidth:util.pixel,
    borderBottomColor:'#cccccc00',
    borderTopColor:'#cccccc90',
  },
  movie_img:{
    width:80,
    height:100,
    resizeMode:Image.resizeMode.contain
  },
  content:{
    marginTop:10,
    marginLeft:10,
  },
  movie_name:{
    color:'#a3a3a3',
    fontSize:13,
    fontFamily: 'Verdana',
  },
  movie_play_time:{
    color:'#a3a3a3',
    fontSize:12,
    fontFamily: 'Helvetica',
  },
  movie_play_location:{
    color:'#a3a3a3',
    fontSize:12,
    fontFamily: 'Helvetica',
  }
})
