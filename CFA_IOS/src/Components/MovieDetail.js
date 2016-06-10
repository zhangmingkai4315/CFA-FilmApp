
import React, { Component } from 'react';
import { BlurView, VibrancyView } from 'react-native-blur';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  WebView,
  Image,
  TabBarIOS,
} from 'react-native';
import util from '../common';
import MapComponent from './MapComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class MovieDetail  extends Component {
  constructor(props){
    super(props);
    this.state={
      tab:'detail'
    }
  }
  select(tabname){
    this.setState({
      tab:tabname
    });
  }
  render(){
      const row=this.props.row;
      let imageRender='';
      if(typeof row['img']=='undefined'){
        imageRender=require('../images/default.jpg')
      }else{
        imageRender={uri:row.img}
      }
      return (
        <TabBarIOS style={{flex:1}}>
          <Icon.TabBarItemIOS iconName='film' iconSize={20} title="电影介绍" onPress={this.select.bind(this,'detail')} selected={this.state.tab==='detail'}>
            <ScrollView>
            <Image source={imageRender} style={styles.container}>
              <BlurView blurType="dark" style={styles.container}>
                <View style={[styles.header,styles.center]}>
                    <Image source={imageRender} style={[styles.headerImg]}/>
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detail_film_name}>{row["movie_name"]}</Text>
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detail}>别名:{row["anothername"]}</Text>
                  <Text style={styles.detail}>主演:{row["castlist"]}</Text>
                  <Text style={styles.detail}>国家:{row["country"]}</Text>
                  <Text style={styles.detail}>导演:{row["director"]}</Text>
                  <Text style={styles.detail}>编剧:{row["scriptwriter"]}</Text>
                  <Text style={styles.detail}>电影类型:{row["filmtype"]}</Text>
                  <Text style={styles.detail}>首映时间:{row["firstShow"]}</Text>

                  <Text style={styles.detail}>语言:{row["lang"]}</Text>
                  <Text style={styles.detail}>字幕:{row["subtitle"]}</Text>
                  <Text style={styles.detail}>影片长度:{row["movie_time"]}</Text>
                  <Text style={styles.detail}>放映地点:{row["movie_play_location"]}</Text>
                  <Text style={styles.detail}>价格:{row["price"]}</Text>
                  <Text style={styles.detail}>购票:{row["ticket"]}</Text>
                </View>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detail_film_desc_title}>影片简介</Text>
                  <Text style={styles.detail_film_desc}>{row["movie_detail"]}</Text>
                </View>
              </BlurView>
            </Image>
            </ScrollView>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS iconName='map' iconSize={20} title="前往影院" onPress={this.select.bind(this,'map')} selected={this.state.tab==='map'}>
              <MapComponent/>
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS iconName="ticket" iconSize={20} title="在线购票"onPress={this.select.bind(this,'ticket')} selected={this.state.tab==='ticket'}>
            <ScrollView>
              <Text>在线购票</Text>
            </ScrollView>
          </Icon.TabBarItemIOS>
        </TabBarIOS>
      )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    width:null,
    height:null,
    // backgroundColor: 'transparent',
  },
  header:{
    marginTop:16,
    marginBottom:10,
    // shadowColor: "#fff",
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    // backgroundColor:'#ffffff00',
    // flex:1
  },
  headerImg:{
    height:260,
    width:200,
    resizeMode:Image.resizeMode.contain
  },
  center:{
    justifyContent:'center',
    alignItems:'center'
  },
  detailTextContainer:{
    marginLeft:15,
    marginRight:15,
    marginTop:5,
  },
  detail_film_name:{
    fontSize:20,
    marginTop:10,
    marginBottom:10,
    color:'#ffffff',
    fontStyle:'italic',
    fontWeight:'bold',
    fontFamily: 'Verdana',
  },
  detail:{
    fontSize:14,
    color:'#ffffffdd',
    marginBottom:5,
  },
  detail_film_desc_title:{
    fontSize:18,
    marginTop:10,
    marginBottom:10,
    color:'#ffffff',
    fontStyle:'italic',
    fontWeight:'bold',
    fontFamily: 'Verdana',

  },
  detail_film_desc:{
    fontSize:15,
    color:'#ffffffdd',
    marginBottom:100
  },
  movie_img:{
    width:200,
    height:300,
    resizeMode:Image.resizeMode.contain
  }

})
