import Dimensions from 'Dimensions';
import lodash from 'lodash';
import React, { Component } from 'react';
import {
  PixelRatio,
  ActivityIndicatorIOS,
  StyleSheet,
} from 'react-native';

const common={
  pixel:1/PixelRatio.get(),
  size:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  get:function(url,successCallback,failCallback){
    fetch(url).then(response=>{
                  return response.text()
              })
              .then(responseText=>successCallback(JSON.parse(responseText)))
              .catch(err=>failCallback(err));
  },
  ConvertData:function(obj){

    let c_obj_array=[]
    for (let key in obj){
      // 只获取最后一个key对应的value
      c_obj_array=obj[key]['data']
    }
        console.log(c_obj_array);
    return c_obj_array;
  }
}

export default common;
