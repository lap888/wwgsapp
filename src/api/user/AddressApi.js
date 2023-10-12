import { Send } from "../../utils/Http";
import { Toast } from "../../view/common";
let AddressApi = {};


AddressApi.getAddressList = () => { 
    return new Promise((resolve, reject) => {
        Send(`api/Address/List`, {}, 'get')
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

AddressApi.setDefault = (id) => { 
    return new Promise((resolve, reject) => {
        Send(`api/Address/Set?id=${id}`, {}, 'get')
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

AddressApi.delAddress = (id) => { 
    return new Promise((resolve, reject) => {
        Send(`api/Address/Del?id=${id}`, {}, 'get')
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

AddressApi.editAddress = (params) => {
    return new Promise((resolve, reject) => {
        Send(`api/Address/Edit`, params)
        .then((res) => {
            if (res.code == 200) {
                resolve(res)
            }else {
                Toast.tip(res.message)
                reject(res)
            }
        })
        .catch((err) =>{
            reject(err)
            console.log('err', err)
        })
    })
}



export default AddressApi