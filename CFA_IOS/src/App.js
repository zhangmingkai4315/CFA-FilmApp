
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
import Loading from './Components/Loading';
import util from './common';
import services from './services';

const rows=[];
const ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:true,
      dataSource: ds.cloneWithRows([]),
    }
  }
  componentDidMount(){
    util.get(services.wilddog_cfa_current_month_playinfo,data=>{
      console.log(data);
      this.setState({
        dataSource:ds.cloneWithRows(util.ConvertData(data)),
        loading:false
      })
      },err=>{
      this.setState({
        loading:false
      });
    })
  }
  render() {
    return (
        this.state.loading===false?
        <ScrollView style={styles.container}>
         <MovieList dataSource={this.state.dataSource} {...this.props}/>
        </ScrollView>
        :<Loading/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop:60,
    backgroundColor: '#F5FCFF',
  }
});
