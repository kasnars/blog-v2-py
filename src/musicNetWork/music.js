import {request} from './request'


// 获取最新音乐
export function GetSong(keywords){
  return request({
    // url:'/cloudsearch',
    url:'/juheapi/getmusic',
    params:{
      keywords,
      limit:5
    }
  })
}

// 获取音乐播放地址
export function GetPlayMisicUrl(id){
  return request({
    // url:'/song/url',
    url:'/juheapi/geturl',
    params: {
      id
    }
  })
}

// 获取歌词 
export function GetPlayMisicLyric(id){
  return request({
    // url:'/lyric',
    url:'/juheapi/getlyric',
    params: {
      id
    }
  })
}

