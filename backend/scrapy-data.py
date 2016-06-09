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
            filmWithLink['fileName']=i.find('a').string.strip()
            filmWithLink['fileLink']=i.find('a').get('href')
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
        aFilm['DateForPlay']=filmInfo[0]
        start=1
        for title in titleArry:
            aFilm[title]=filmInfo[start]
            start=start+1
        return_data.append(aFilm)
        del aFilm
    return return_data

def PostData(data):
    post_key=time.strftime('%Y%m')
    api_key=config.get('api', 'key')
    api_url=config.get('api','cloud_url')
    post_url=api_url+'/playinfo/'+post_key+'.json?auth='+api_key
    print post_url
    req=requests.post(post_url,data=json.dumps({'data':data}))
    print req.status_code
def GetData():
    post_key=time.strftime('%Y%m')
    api_key=config.get('api', 'key')
    api_url=config.get('api','cloud_url')
    post_url=api_url+'/playinfo/'+post_key+'.json?auth='+api_key
    print post_url
    req=requests.get(post_url)
    print req.json()


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
