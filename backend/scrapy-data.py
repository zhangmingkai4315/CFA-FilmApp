#!/usr/bin/python
# -*- coding: UTF-8 -*-
import urllib2
import ConfigParser
import logging
import time
import json
import requests
from bs4 import BeautifulSoup

#提取配置参数
logging.basicConfig(filename='scrapy.log', format='%(asctime)s %(message)s',datefmt='%m/%d/%Y %I:%M:%S %p',level=logging.INFO)
config = ConfigParser.RawConfigParser()
config.read('config.cfg')
url=config.get('default', 'url')
def initConfig():
    logging.info(u'获取配置文件')
    url=config.get('default', 'url')
    return (url,)

#解析首页html
def bs4ProcessHome(html):
    logging.info(u'解析首页html')
    soup=BeautifulSoup(html,"html.parser")
    for a_item in soup.find_all("a"):
        if a_item.string==u'本月排片':
            return a_item.get('href')
    return 'None'



# 提取电影的key信息
def getTH(item):
    titleArray=[]
    for i in item.find_all("th"):
        titleArray.append(i.string.strip())
    return titleArray


#提取电影的相应value信息
def getTB(film):
    filmArray=[]
    date=[]
    # 提取时间信息
    for d in film.find_all('span'):
        date.append(d.string)
    filmArray.append(date[1]+date[0])
    # 提取电影信息
    for i in film.find_all("td"):
        lenOfItem=len(list(i.descendants))
        if lenOfItem==1:
            filmArray.append(i.string.strip())
        else:
            filmWithLink=dict()
            filmWithLink['filmName']=i.find('a').string.strip()
            filmWithLink['filmLink']=i.find('a').get('href')
            filmArray.append(filmWithLink)
    return filmArray

# 从主页的：正在上映：链接的内容中获得信息
def bs4ProcessLink(html):
    soup=BeautifulSoup(html,"html.parser")
    fileArray=soup.find_all(attrs={'class':'rowPiece'})
    titleArry=getTH(fileArray[0])
    return_data=[]
    for film_item in fileArray:
        filmInfo=getTB(film_item)
        aFilm=dict()
        aFilm['datetime']=filmInfo[0]
        start=1
        for title in titleArry:
            aFilm[title]=filmInfo[start]
            start=start+1
        return_data.append(aFilm)
        del aFilm
    return return_data
# 获得详细的电影信息
def getDetail(item):
    if not item['url']:
        return item
    response = urllib2.urlopen(item['url'])
    html = response.read()
    soup=BeautifulSoup(html,"html.parser")
    img=soup.find(id='ess_ctr1520_FilmDetail_imgTitle')
    if img:
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
    return item

def PostData(data):
    post_key=time.strftime('%Y%m')
    api_key=config.get('api', 'key')
    api_url=config.get('api','cloud_url')
    post_url=api_url+'/playinfo/'+post_key+'.json?auth='+api_key
    for item in data:
        item['subtitle']=item[u'字幕']
        item['movie_play_location']=item[u'影厅']
        item['movie_name']=item[u'影片']['filmName']
        item['movie_time']=item[u'时长']
        item['movie_play_time']=item[u'放映时间']
        item['url']=config.get('default', 'url')+item[u'影片']['filmLink']
        item['lang']=item[u'语别']
        item['ticket']=item[u'购票']
        item['price']=item[u'票价']
        item=getDetail(item)
        # print item
    print data

    req=requests.post(post_url,data=json.dumps({'data':data}))
    print req.json()
def GetData():
    post_key=time.strftime('%Y%m')
    api_key=config.get('api', 'key')
    api_url=config.get('api','cloud_url')
    post_url=api_url+'/playinfo/'+post_key+'.json?auth='+api_key
    print post_url
    req=requests.get(post_url)
    print req.text


#执行主进程
def main():
    (url,)=initConfig()
    response = urllib2.urlopen(url)
    html = response.read()
    # print html
    link=bs4ProcessHome(html)
    if 'None'==link:
        logging.error(u'无法获取首页链接')
        return
    logging.info(u'已获取链接,查询排片目录')
    response = urllib2.urlopen(url+'/'+link)
    html = response.read()
    data=bs4ProcessLink(html)
    PostData(data)
    # GetData()



if __name__ == '__main__':
    main()
