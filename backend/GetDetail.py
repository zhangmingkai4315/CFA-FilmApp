#!/usr/bin/python
# -*- coding: UTF-8 -*-
import urllib2
import ConfigParser
import logging
import time
import json
import requests
from bs4 import BeautifulSoup
config = ConfigParser.RawConfigParser()
config.read('config.cfg')
url=config.get('default', 'url')
def getDetail(item):
    if not item['url']:
        return item
    response = urllib2.urlopen(item['url'])
    html = response.read()
    soup=BeautifulSoup(html,"html.parser")
    img=soup.find(id='ess_ctr1520_FilmDetail_imgTitle')
    item['img']=url+img['src']
    detailListDom=soup.find_all(attrs={'class':'MsoNormal'})
    detailList=[]
    for index,dom in enumerate(detailListDom):
        text=dom.get_text()
        if text.startswith(u'影片简介'):
            item[u'movie_detail']=detailListDom[index+1].get_text()
        else:
            temp=text.split(':')
            if len(temp)==1:
                continue
            else:
                if temp[0]==u'上映日期':
                    item['firstShow']=temp[1]
                elif temp[0]==u'导演':
                    item['director']=temp[1]
                elif temp[0]==u'主演':
                    item['castlist']=temp[1]
                elif temp[0]==u'制片国家/地区':
                    item['country']=temp[1]
                elif temp[0]==u'编剧':
                    item['scriptwriter']=temp[1]
                elif temp[0]==u'片长':
                    item['showingtime']=temp[1]
                elif temp[0]==u'又名':
                    item['anothername']=temp[1]
                elif temp[0]==u'类型':
                    item['filmtype']=temp[1]
    for i in item:
        print i

if __name__ == '__main__':
    item=dict()
    item['url']='http://www.cfa.gov.cn/tabid/575/Default.aspx?id=1869'
    getDetail(item)
