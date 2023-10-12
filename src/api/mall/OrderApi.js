import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let OrderApi = {};

/**
 * 
 * @param {
 * "ItemId": 0,
 * "StoreId": 0,
 * "AddressId": 0
 * } params 
*/
OrderApi.subOrder = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Mall/SubOrder`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data);
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
            console.log('err', err)
        })
    })
}

/**
 * @name 提交订单支付
 * @param {
 * "OrderNo": "string",
 * "PayType": 1
 * } params 
 */
OrderApi.subPay = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Mall/SubPay`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data);
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
            console.log('err', err)
        })
    })
}

OrderApi.getOrderList = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Mall/MyOrders`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data);
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
            console.log('err', err)
        })
    })
}

//确认收货
OrderApi.sureGet = (orderId) => { // orderId
    return new Promise((resolve, reject) => {
        Send(`api/Mall/Receive?orderId=${orderId}`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data);
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
            console.log('err', err)
        })
    })
}

//取消订单
OrderApi.cancleOrder = (orderId) => { // orderId
    return new Promise((resolve, reject) => {
        Send(`api/Shop/CancleOrder?orderId=${orderId}`, {}, 'get')
        .then((res) => {
            if (res.code == 200) {
                resolve(res.data);
            } else {
                reject(res)
                Toast.tipTop(res.message)
            }
        })
        .catch((err) => {
            reject(err)
            console.log('err', err)
        })
    })
}


export default OrderApi