import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let MinerApi = {};


MinerApi.doWork = (shopId) => { // shopId
    return new Promise((resolve, reject) => {
        Send(`api/Miner/DigMine`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data)
            }else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}


MinerApi.getHomeShops = (params) => { // index, size
    return new Promise((resolve, reject) => {
        Send(`api/Mall/List`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data)
            }else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}



export default MinerApi