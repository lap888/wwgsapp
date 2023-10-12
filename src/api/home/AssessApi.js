import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let AssessApi = {};


AssessApi.assess = (params) => { // "PageIndex": 1, "PageSize": 20
    return new Promise((resolve, reject) => {
        Send(`api/Community/Assess`, params)
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
        })
    })
}
AssessApi.sendPost = (params) => { // "PageIndex": 1, "PageSize": 20
    return new Promise((resolve, reject) => {
        Send(`api/Community/SendPost`, params)
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
        })
    })
}

AssessApi.assessOrder = (params) => { // "PageIndex": 1, "PageSize": 20
    return new Promise((resolve, reject) => {
        Send(`api/Community/BackOrder`, params)
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
        })
    })
}

AssessApi.getShopList = (params) => { // "PageIndex": 1, "PageSize": 20
    return new Promise((resolve, reject) => {
        Send(`api/Community/List`, params)
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
        })
    })
}

AssessApi.getCommuniyOrder = (params) => { // "PageIndex": 1, "PageSize": 20
    return new Promise((resolve, reject) => {
        Send(`api/Community/Order`, params)
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
        })
    })
}


AssessApi.pushOrder = (params) => { 
    return new Promise((resolve, reject) => {
        Send(`api/Community/Distribute`, params)
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
        })
    })
}


export default AssessApi