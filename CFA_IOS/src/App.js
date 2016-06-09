
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
} from 'react-native';
import MovieList from './Components/MovieList';
const rows=[{
  image:'https://img1.doubanio.com/view/movie_poster_cover/mpst/public/p2345947329.jpg',
  movie_name:'背靠背，脸对脸 (1994)',
  movie_play_location:'小西天艺术影院,1号厅',
  movie_play_time:'141分钟',
  douban_url:"https://movie.douban.com/subject/1307856/"
},{
  image:'https://img1.doubanio.com/view/movie_poster_cover/mpst/public/p2345947329.jpg',
  movie_name:'背靠背，脸对脸 (1994)',
  movie_play_location:'小西天艺术影院,1号厅',
  movie_play_time:'142分钟',
  douban_url:"https://movie.douban.com/subject/1307856/"
},{
  image:'https://img1.doubanio.com/view/movie_poster_cover/mpst/public/p2345947329.jpg',
  movie_name:'背靠背，脸对脸 (1994)',
  movie_play_location:'小西天艺术影院,1号厅',
  movie_play_time:'143分钟',
  douban_url:"https://movie.douban.com/subject/1307856/"
}]
export default class App extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource: ds.cloneWithRows(rows),
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <MovieList dataSource={this.state.dataSource} {...this.props}/>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // marginTop:60,
    backgroundColor: '#F5FCFF',
  }
});
