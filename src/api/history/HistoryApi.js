import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let HistoryApi = {};

/**
 * 
 * @param {
 * "PageIndex": 0, 
 * "PageSize": 0
 * } params 
 */
HistoryApi.IntegralRecord = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Account/IntegralRecord`, params)
        .then((res) => {
            if (res.code === 200) {
                resolve(res.data)
            }else {
                reject(res)
                Toast.tip(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * 
 * @param {
    * "PageIndex": 0, 
    * "PageSize": 0
    * } params 
    */
HistoryApi.CottonRecord = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Account/CottonRecord`, params)
        .then((res) => {
            if (res.code === 200) {
                resolve(res.data)
            }else {
                reject(res)
                Toast.tip(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * 
 * @name 钱包流水
 * @param {
    * "PageIndex": 0, 
    * "PageSize": 0
    * } params 
    */
HistoryApi.WalletRecord = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Account/WalletRecord`, params)
        .then((res) => {
            if (res.code === 200) {
                resolve(res.data)
            }else {
                reject(res)
                Toast.tip(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}


export default HistoryApi