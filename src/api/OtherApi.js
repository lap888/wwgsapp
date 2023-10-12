import { Send } from "../utils/Http";
import { Toast } from "../view/common";
let OtherApi = {};


OtherApi.uploadImage = (params) => { // 
    return new Promise((resolve, reject) => {
        Send(`api/Upload/Image`, params)
        .then((res) => {
            if (res.code === 200) {
                resolve(res.data)
            }else{
                reject(res)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

OtherApi.quickenTask = () => { // 
    return new Promise((resolve, reject) => {
        Send(`api/System/QuickenTask`, {}, 'get')
        .then((res) => {
            resolve(res)
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

OtherApi.getWechatToken = (code) => new Promise((resolve, reject) => {
    const getUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx7b42c1ef46624de5&secret=4f5da1785c3093be1a1bb0615c5c2cae&code=${code}&grant_type=authorization_code`
    fetch(getUrl,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then((response) => response.json())
    .then(data => resolve(data))
    .catch(error => reject(error));
}); 

OtherApi.getWechatUser = (access_token, openid) => new Promise((resolve, reject) => {
    const getUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    fetch(getUrl,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }).then((response) => response.json())
    .then(data => resolve(data))
    .catch(error => reject(error));
});


OtherApi.getActiveList = (source) => {
    return new Promise((resolve, reject) => {
        Send(`api/system/banners?source=${source}`, {}, 'GET')
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data)
            }else{
                reject(res)
                Toast.tipTop(res.message);
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}



export default OtherApi