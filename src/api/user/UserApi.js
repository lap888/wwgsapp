import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let UserApi = {};


/**
 * @name 注册
 * @param {     "Mobile": "string",
                "MsgId": "string",
                "VerifyCode": "string",
                "InvitationCode": "string",
                "Password": "string",
                "NickName": "string"} params 
 */
UserApi.signUp = (params) => { // 
    return new Promise((resolve, reject) => {
        Send(`api/User/SignUp`, params)
        .then((res) => {
            if (res.code === 200) {
                resolve(res.data)
            }else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
        })
    })
}

/**
 * @name 注册
 * @param {
    "Mobile": "string",
    "Password": "string",
    "UniqueID": "string",
    "SystemName": "string",
    "SystemVersion": "string",
    "DeviceName": "string",
    "Version": "string",
    "UserPic": "string",
    "Lat": 0,
    "Lng": 0,
    "Province": "string",
    "ProvinceCode": "string",
    "City": "string",
    "CityCode": "string",
    "Area": "string",
    "AreaCode": "string"
} params
*/

UserApi.login = (params) => { // 
    return new Promise((resolve, reject) => {
        Send(`api/User/Login`, params)
            .then((res) => {
                if (res.code === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                    Toast.tipTop(res.message)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/**
 * @name 获取用户信息
 */
UserApi.getUserInfo = () => {
    return new Promise((resolve, reject) => {
        Send("api/system/InitInfo", {}, 'GET')
        .then(res => {
            if (res.code === 200) {
                resolve(res.data)
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
        });
    })
}


UserApi.getWallet = () => { // 
    return new Promise((resolve, reject) => {
        Send(`api/Account/Wallet`, {}, 'get')
        .then((res) => {
            if (res.code === 200) {
                resolve(res.data)
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
        })
    })
}

/**
 * @name 兑换积分
 * @param {num} params 
 */
UserApi.exchange = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Mall/Exchange`, params)
            .then((res) => {
                if (res.code === 200) {
                    resolve(res.data)
                } else {
                    reject(res)
                    Toast.tipTop(res.message)
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}















UserApi.getEquityDetail = (mobile) => { // mobile
    return new Promise((resolve, reject) => {
        Send(`api/GetUserByMobile?mobile=${mobile}`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}



UserApi.ticketInfo = () => { 
    return new Promise((resolve, reject) => {
        Send(`api/Ticket/Info`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * @name 兑换
 * @param {} params 
 */
UserApi.exchangeTicket = (params) => { // 
    return new Promise((resolve, reject) => {
        Send(`api/Ticket/Exchange`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * @name 记录
 * @param {*} params 
 */
UserApi.ticketRecords = (params) => { 
    return new Promise((resolve, reject) => {
        Send(`api/Ticket/Records`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}
/**
 * @name 使用新人券
 * @param {*} params 
 */
UserApi.useTicket = () => { // mobile
    return new Promise((resolve, reject) => {
        Send(`api/Ticket/Use`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * @name 修改是否使用新人券
 * @param {*} params 
 */
UserApi.ticketState = (params) => { // mobile
    return new Promise((resolve, reject) => {
        Send(`api/Ticket/Switch`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * @name 把糖果转到小鱼
 * @param {*} params 
 */
UserApi.toSmallFish = (params) => { // params
    return new Promise((resolve, reject) => {
        Send(`api/Account/ToSmallFish`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
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
/**
 * @name 查询充值订单是否成功
 * @param {*} params 
 */
UserApi.searchOrderState = (tradeNo) => { // TradeNo
    return new Promise((resolve, reject) => {
        Send(`api/Notify/QueryCashRecharge?TradeNo=${tradeNo}`, '', 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(true)
            }else {
                resolve(false)
                // Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

UserApi.getAddress = () => {
    return new Promise((resolve, reject) => {
        Send('api/UserAddress/List', {}, 'get').then(res => {
            if (res.code == 200) {
                resolve(res.data);
            } else {
                reject(res);
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

UserApi.exchangeYB = (candyNum, passward) => {
    return new Promise((resolve, reject) => {
        Send(`api/Coin/ExchangeYB?candyNum=${candyNum}&passward=${passward}`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
                reject(res)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * @name 贡献值流水
 * @param {*} params 
 */
UserApi.getGlodsRecord = (params) => { 
    return new Promise((resolve, reject) => {
        Send(`api/Coin/GlodsRecord`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tipTop(res.message)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}



export default UserApi