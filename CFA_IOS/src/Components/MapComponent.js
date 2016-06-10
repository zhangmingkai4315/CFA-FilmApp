import React, { Component } from 'react';
import {
  PixelRatio,
  ActivityIndicatorIOS,
  StyleSheet,
  ScrollView,
  Text,
  WebView,

} from 'react-native';
import Geolocation from 'Geolocation';
import util from '../common';
export default class MapComponent extends Component{
  constructor(props){
      super(props);
      this.state={
        lat:39.9589000000,
        lng:116.3765000000,
        location:0,
        html:''
      }
  }
  componentDidMount(){
    Geolocation.getCurrentPosition(data=>{
    let url=''
    let location=this.state.location;
    let pos=[data.coords.longitude,data.coords.latitude]
    let html=`
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
        <title>经纬度规划路线</title>
        <link rel="stylesheet" href="http://cache.amap.com/lbs/static/main1119.css"/>
        <style type="text/css">
            #panel {
                position: absolute;
                background-color: #ffffff99;
                max-height: 40%;
                overflow-y: auto;
                top: 0px;
                right: 0px;
                width: 250px;
                border: solid 1px white;
            }
        </style>
        <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=00f2500a26dda1bcf15733b1db69053b&plugin=AMap.Transfer"></script>
        <script type="text/javascript" src="http://cache.amap.com/lbs/static/addToolbar.js"></script>
    </head>
    <body>
      <h1>Hiello</h1>
    <div id="container"></div>
    <div id="panel"></div>
    <script type="text/javascript">
        var cinama_1=[116.3765000000,39.9589000000];
        var map = new AMap.Map("container", {
            resizeEnable: true,
            center:[${pos[0]},${pos[1]}],
            zoom: 11 //地图显示的缩放级别
        });
        if(${location}){
          cinama_1[0]=116.5184280000;
          cinama_1[1]=39.9028980000;
        }
        var transOptions = {
            map: map,
            city: '北京市',
            panel: 'panel',
            policy: AMap.TransferPolicy.LEAST_TIME
        };
        //构造公交换乘类
        var transfer = new AMap.Transfer(transOptions);
        transfer.search(new AMap.LngLat(cinama_1[0],cinama_1[1]), new AMap.LngLat(${pos[0]},${pos[1]}));
    </script>
    </body>
    </html>
    `;
    console.log(html);
      this.setState({
        lat:data.latitude,
        lng:data.longitude,
        location:0,
        html:html
      });

    },err=>{
      alert("获取坐标失败")
    })
  }
  render(){
    let webmap=null;
    if(this.state.html){
      webmap=<WebView source={{html:this.state.html}} style={styles.webView}/>
    }
    return (
      <ScrollView style={styles.container}>
        {webmap}
      </ScrollView>
    )
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1
  },
  webView:{
    height:util.size.height,
    width:util.size.width
  }
})
